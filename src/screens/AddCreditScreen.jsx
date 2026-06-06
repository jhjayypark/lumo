import { useState } from 'react'
import { CaretLeft, Info, Wallet } from '@phosphor-icons/react'
import {
  paymentMethods,
  TOPUP_PRESETS,
  fmtKHR,
  fmtUSD,
} from '../data/mock.js'
import AmountSelector from '../components/AmountSelector.jsx'
import PaymentMethodCard from '../components/PaymentMethodCard.jsx'

export default function AddCreditScreen({ goto, balance, amount, setAmount, method, setMethod }) {
  return (
    <div className="pt-[58px] pb-[120px] animate-rise">
      {/* Top */}
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => goto('wallet')}
            className="text-zinc-700 text-[14px] font-medium flex items-center gap-0.5 -ml-1 press"
          >
            <CaretLeft size={16} weight="bold" /> Wallet
          </button>
          <div className="text-center">
            <div
              className="text-[10.5px] uppercase text-zinc-400 font-medium"
              style={{ letterSpacing: '0.06em' }}
            >
              Top up
            </div>
            <div
              className="font-semibold text-zinc-950 leading-tight font-mono tabular-nums"
              style={{ fontSize: 13, letterSpacing: '-0.015em' }}
            >
              {fmtKHR(balance)}
            </div>
          </div>
          <div className="w-9 h-9" />
        </div>

        <h1
          className="font-semibold text-zinc-950 leading-[1.04] mt-5"
          style={{ fontSize: 30, letterSpacing: '-0.032em' }}
        >
          Add Credit
        </h1>
        <div className="text-[13px] text-zinc-500 mt-1">
          Current balance · <span className="font-mono tabular-nums text-zinc-950 font-semibold">{fmtKHR(balance)}</span>
        </div>
      </div>

      {/* Amount selector */}
      <div className="px-5 mt-6">
        <div
          className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1"
          style={{ letterSpacing: '0.06em' }}
        >
          Choose amount
        </div>
        <AmountSelector
          presets={TOPUP_PRESETS}
          value={amount}
          onChange={setAmount}
          onCustom={() => {}}
        />
      </div>

      {/* Selected amount summary */}
      <div className="px-5 mt-5">
        <div className="rounded-3xl bg-zinc-50 border border-zinc-200/80 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shrink-0">
            <Wallet size={18} weight="fill" />
          </div>
          <div className="flex-1">
            <div
              className="text-[10.5px] uppercase text-zinc-500 font-medium"
              style={{ letterSpacing: '0.05em' }}
            >
              You'll add
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span
                className="font-semibold text-zinc-950 tabular-nums leading-none"
                style={{ fontSize: 22, letterSpacing: '-0.026em' }}
              >
                {fmtKHR(amount)}
              </span>
              <span className="text-[12.5px] text-zinc-500 font-mono tabular-nums">
                ≈ {fmtUSD(amount)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-[10.5px] uppercase text-zinc-500 font-medium"
              style={{ letterSpacing: '0.05em' }}
            >
              New balance
            </div>
            <div className="font-mono font-semibold tabular-nums text-zinc-950 text-[14px]">
              {fmtKHR(balance + amount)}
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="px-5 mt-7">
        <div
          className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1"
          style={{ letterSpacing: '0.06em' }}
        >
          Payment method
        </div>
        <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-diffuse divide-y divide-zinc-200/80 overflow-hidden">
          {paymentMethods.map((m) => (
            <PaymentMethodCard
              key={m.id}
              method={m}
              selected={method === m.id}
              onSelect={setMethod}
            />
          ))}
        </div>
      </div>

      {/* Info note */}
      <div className="px-5 mt-4">
        <div className="rounded-2xl bg-zinc-50 border border-zinc-200/80 p-3.5 flex items-start gap-2.5">
          <Info size={14} weight="regular" className="text-zinc-500 mt-0.5 shrink-0" />
          <div className="text-[12.5px] text-zinc-600 leading-relaxed">
            Your credit will be available instantly after payment is confirmed.
            Lumo Credit can be used for EV charging, store purchases, and
            pickup orders.
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="absolute bottom-[88px] left-3 right-3 z-20">
        <button
          onClick={() => goto('khqr')}
          className="w-full bg-zinc-950 text-white rounded-full h-13 py-3.5 flex items-center justify-center gap-2 press font-semibold text-[16px] shadow-lg"
        >
          <span>Continue to Payment</span>
          <span className="font-mono tabular-nums opacity-80">{fmtKHR(amount)}</span>
        </button>
      </div>
    </div>
  )
}
