import { useState, useEffect } from 'react'
import {
  CaretLeft,
  DownloadSimple,
  ShareNetwork,
  Check,
  DotsThreeVertical,
} from '@phosphor-icons/react'
import { khqrSession, fmtKHR, fmtUSD } from '../data/mock.js'
import KHQRPaymentCard from '../components/KHQRPaymentCard.jsx'
import PaymentStatusCard from '../components/PaymentStatusCard.jsx'

// Three states demo-driven by `status` prop: 'pending' | 'success' | 'expired'
export default function KHQRPaymentScreen({
  goto,
  amount,
  status,
  setStatus,
  balance,
  applyTopup,
}) {
  // live countdown when pending
  const [seconds, setSeconds] = useState(khqrSession.expiresInSec)

  useEffect(() => {
    if (status !== 'pending') return
    if (seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [status, seconds])

  const handleRetry = () => {
    setSeconds(khqrSession.expiresInSec)
    setStatus('pending')
  }

  const handleDone = () => {
    applyTopup()
    goto('wallet')
  }

  const handleAlreadyPaid = () => {
    applyTopup()
    setStatus('success')
  }

  return (
    <div className="pt-[58px] pb-8 animate-rise">
      {/* Top */}
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => goto('addcredit')}
            className="text-zinc-700 text-[14px] font-medium flex items-center gap-0.5 -ml-1 press"
          >
            <CaretLeft size={16} weight="bold" /> Back
          </button>
          <div className="text-center">
            <div
              className="text-[10.5px] uppercase text-zinc-400 font-medium"
              style={{ letterSpacing: '0.06em' }}
            >
              Pay with
            </div>
            <div
              className="font-semibold text-zinc-950 leading-tight"
              style={{ fontSize: 13, letterSpacing: '-0.015em' }}
            >
              KHQR
            </div>
          </div>
          <button className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center press">
            <DotsThreeVertical size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* Status card */}
      <div className="px-5 mt-5">
        <PaymentStatusCard
          status={status}
          secondsLeft={seconds}
          amount={amount}
          newBalance={balance + amount}
          onRetry={handleRetry}
          onDone={handleDone}
        />
      </div>

      {/* QR card */}
      {status === 'pending' && (
        <div className="px-5 mt-4">
          <KHQRPaymentCard session={khqrSession} amount={amount} />
        </div>
      )}

      {/* Success summary detail */}
      {status === 'success' && (
        <div className="px-5 mt-4">
          <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-diffuse p-4">
            <div
              className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1"
              style={{ letterSpacing: '0.06em' }}
            >
              Receipt
            </div>
            <Row label="Merchant" value={khqrSession.merchant} />
            <Row label="Reference" value={khqrSession.reference} mono />
            <Row label="Method" value="KHQR · Bakong" />
            <Row label="Amount" value={fmtKHR(amount)} mono bold />
            <Row label="USD" value={fmtUSD(amount)} mono />
          </div>
        </div>
      )}

      {/* Expired filler — show ghost QR */}
      {status === 'expired' && (
        <div className="px-5 mt-4 opacity-40 pointer-events-none">
          <KHQRPaymentCard session={khqrSession} amount={amount} />
        </div>
      )}

      {/* Instructions */}
      {status === 'pending' && (
        <div className="px-5 mt-5">
          <div
            className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1"
            style={{ letterSpacing: '0.06em' }}
          >
            How to pay
          </div>
          <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-diffuse divide-y divide-zinc-200/80">
            <Step n="1" label="Open your banking app." sub="ABA, ACLEDA, Wing, AMK — any Bakong-connected app." />
            <Step n="2" label="Tap Scan and aim at the QR." sub="Or save the QR and import it." />
            <Step n="3" label="Confirm the amount and pay." sub={`${fmtKHR(amount)} → ${khqrSession.merchant}`} />
          </div>
        </div>
      )}

      {/* Actions for pending */}
      {status === 'pending' && (
        <div className="px-5 mt-5 grid grid-cols-3 gap-2">
          <ActionBtn Icon={DownloadSimple} label="Save QR" />
          <ActionBtn Icon={ShareNetwork} label="Share QR" />
          <ActionBtn Icon={Check} label="I paid" onClick={handleAlreadyPaid} primary />
        </div>
      )}
    </div>
  )
}

function Row({ label, value, mono, bold }) {
  return (
    <div className="flex items-center justify-between py-1.5 first:pt-0 last:pb-0">
      <span className="text-[13px] text-zinc-500">{label}</span>
      <span
        className={`${mono ? 'font-mono' : ''} tabular-nums text-[13.5px] ${
          bold ? 'font-semibold text-zinc-950' : 'text-zinc-700'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function ActionBtn({ Icon, label, onClick, primary }) {
  return (
    <button
      onClick={onClick}
      className={`h-12 rounded-full font-semibold text-[13px] press flex items-center justify-center gap-1.5 ${
        primary
          ? 'bg-zinc-950 text-white'
          : 'bg-white border border-zinc-200 text-zinc-950 shadow-diffuse'
      }`}
    >
      <Icon size={14} weight={primary ? 'bold' : 'regular'} />
      {label}
    </button>
  )
}

function Step({ n, label, sub }) {
  return (
    <div className="flex items-start gap-3 p-3.5">
      <div className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center text-[12px] font-bold tabular-nums shrink-0">
        {n}
      </div>
      <div className="flex-1">
        <div
          className="font-medium text-zinc-950"
          style={{ fontSize: 14, letterSpacing: '-0.018em' }}
        >
          {label}
        </div>
        <div className="text-[12px] text-zinc-500 mt-0.5">{sub}</div>
      </div>
    </div>
  )
}
