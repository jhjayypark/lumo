// ───────────────────────────── Currency ─────────────────────────────
export const FX_RATE = 4080 // KHR per USD (approx)

export const fmtKHR = (amount) =>
  '៛' + Math.round(amount).toLocaleString('en-US')

export const fmtUSD = (khr) => '$' + (khr / FX_RATE).toFixed(2)

export const khrToUsd = (khr) => khr / FX_RATE

// Image helper — Unsplash CDN, verified URLs.
const IMG = (id, w = 600, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`

// ───────────────────────────── User ─────────────────────────────
export const user = {
  firstName: 'Jay',
  lastName: 'Park',
  email: 'jay@lumo.kh',
  tier: 'Lumo Gold',
  points: 1240,
  nextTierPoints: 2000,
  memberSince: 2024,
  vehicle: {
    make: 'BYD',
    model: 'Atto 3',
    plate: '2AB-1138',
    range: 412,
    battery: 78,
  },
  card: {
    number: '•••• 4242',
    type: 'Visa',
  },
  settings: {
    autoTopup: true,
    autoTopupThreshold: 20000, // KHR
    autoTopupAmount: 40000,
    lowBalanceAlert: true,
    notifications: true,
  },
}

// ───────────────────────────── Wallet ─────────────────────────────
export const wallet = {
  available: 76500,   // KHR
  reserved: 24000,    // KHR currently held by an active charging session
  promo: 8000,        // KHR promotional credit
  // Total = available + reserved + promo
}

// Sequential numbered top-up amounts (KHR)
export const TOPUP_PRESETS = [10000, 20000, 40000, 100000]

// Recent wallet transactions (most recent first)
export const transactions = [
  {
    id: 't1',
    kind: 'topup',
    method: 'KHQR',
    label: 'KHQR top-up',
    amount: +40000,
    when: 'Today · 8:42',
    icon: 'QrCode',
  },
  {
    id: 't2',
    kind: 'charging',
    label: 'Charging · Lumo BKK1 · Bay A3',
    amount: -17280,
    when: 'Today · 8:46',
    icon: 'Zap',
  },
  {
    id: 't3',
    kind: 'store',
    label: 'Iced Latte · Lumo BKK1',
    amount: -8500,
    when: 'Today · 8:55',
    icon: 'Coffee',
  },
  {
    id: 't4',
    kind: 'promo',
    label: 'Promo reward · Welcome week',
    amount: +5000,
    when: 'Yesterday',
    icon: 'Gift',
  },
  {
    id: 't5',
    kind: 'topup',
    method: 'ABA Pay',
    label: 'ABA Pay top-up',
    amount: +60000,
    when: 'Apr 28',
    icon: 'CreditCard',
  },
  {
    id: 't6',
    kind: 'store',
    label: 'Chicken Sandwich · Combo',
    amount: -14000,
    when: 'Apr 28',
    icon: 'Sandwich',
  },
]

// ─────────────────── Payment methods (Cambodia-local) ───────────────────
export const paymentMethods = [
  {
    id: 'khqr',
    label: 'KHQR',
    sub: 'Bakong-compatible',
    recommended: true,
    badge: 'Most popular in Cambodia',
    swatch: '#E11E2C',
  },
  {
    id: 'aba',
    label: 'ABA Pay',
    sub: 'ABA Mobile app',
    swatch: '#003B7E',
  },
  {
    id: 'acleda',
    label: 'ACLEDA',
    sub: 'ACLEDA mobile / Bakong',
    swatch: '#0B7C3D',
  },
  {
    id: 'card',
    label: 'Card',
    sub: 'Visa or Mastercard',
    swatch: '#1A1A1C',
  },
  {
    id: 'cash',
    label: 'Cash at counter',
    sub: 'Pay at Lumo store',
    swatch: '#8E8E93',
  },
]

// KHQR live session (mock)
export const khqrSession = {
  merchant: 'Lumo Energy Cambodia',
  city: 'Phnom Penh',
  amount: 40000,
  reference: 'LMO-A3-9482',
  bakongId: 'lumo@bakong.kh',
  expiresInSec: 8 * 60 + 42, // 8:42
}

// ───────────────────────────── Stations ─────────────────────────────
export const stations = [
  {
    id: 'bkk1',
    name: 'Lumo BKK1',
    address: 'St. 294, Boeung Keng Kang 1, Phnom Penh',
    distanceKm: 1.2,
    etaMin: 7,
    available: 4,
    total: 6,
    ultraFast: 2,
    maxKw: 120,
    pricePerKwh: 1350, // KHR
    open247: true,
    cafe: true,
    khqr: true,
    rating: 4.9,
    reviews: 312,
    amenities: ['Coffee', 'Snacks', 'Restroom', 'Seating', 'Wi-Fi', 'Car wash'],
    color: ['#0FBF6E', '#06803F'],
  },
  {
    id: 'toulkork',
    name: 'Lumo Toul Kork',
    address: 'St. 315, Toul Kork, Phnom Penh',
    distanceKm: 3.4,
    etaMin: 12,
    available: 3,
    total: 8,
    ultraFast: 4,
    maxKw: 150,
    pricePerKwh: 1280,
    open247: true,
    cafe: true,
    khqr: true,
    rating: 4.8,
    reviews: 187,
    amenities: ['Coffee', 'Snacks', 'Restroom', 'Seating', 'Wi-Fi'],
    color: ['#1B5BFF', '#0A2E99'],
  },
  {
    id: 'aeon',
    name: 'Lumo AEON Sen Sok',
    address: 'AEON Mall Sen Sok City, Phnom Penh',
    distanceKm: 7.8,
    etaMin: 18,
    available: 6,
    total: 10,
    ultraFast: 6,
    maxKw: 180,
    pricePerKwh: 1420,
    open247: false,
    cafe: true,
    khqr: true,
    rating: 4.7,
    reviews: 524,
    amenities: ['Coffee', 'Snacks', 'Restroom', 'Seating', 'Wi-Fi', 'Car wash', 'Lounge'],
    color: ['#A855F7', '#5B21B6'],
  },
  {
    id: 'siemreap',
    name: 'Lumo Siem Reap Riverside',
    address: 'Sivutha Blvd, Siem Reap',
    distanceKm: 312,
    etaMin: null,
    available: 2,
    total: 4,
    ultraFast: 2,
    maxKw: 120,
    pricePerKwh: 1320,
    open247: true,
    cafe: true,
    khqr: true,
    rating: 4.9,
    reviews: 96,
    amenities: ['Coffee', 'Snacks', 'Restroom', 'Seating', 'Wi-Fi'],
    color: ['#F59E0B', '#B45309'],
  },
  {
    id: 'sihanoukville',
    name: 'Lumo Sihanoukville',
    address: 'Ekareach Street, Sihanoukville',
    distanceKm: 230,
    etaMin: null,
    available: 1,
    total: 4,
    ultraFast: 2,
    maxKw: 120,
    pricePerKwh: 1380,
    open247: false,
    cafe: false,
    khqr: false,
    rating: 4.6,
    reviews: 41,
    amenities: ['Restroom', 'Wi-Fi'],
    color: ['#06B6D4', '#0E7490'],
  },
]

// ───────────────────────────── Charging ─────────────────────────────
export const charging = {
  active: true,
  stationId: 'bkk1',
  stationName: 'Lumo BKK1',
  bay: 'A3',
  startBattery: 42,
  currentBattery: 58,
  targetBattery: 80,
  remainingMin: 28,
  energyKwh: 18.4,
  speedKw: 120,
  chargerType: 'Ultra Fast DC',
  // Money in KHR
  reservedKhr: 24000, // hold
  usedKhr: 17280,     // billed so far
  // estimatedReturnKhr = reservedKhr - estimatedTotalKhr
  estimatedTotalKhr: 22500,
  pricePerKwh: 1350,
}

// Charge options the user can pick on Station Detail.
export const chargeOptions = [
  { id: 'to80', label: 'Charge to 80%', sub: 'Recommended', detail: '≈ 18 kWh', holdKhr: 24000 },
  { id: 'kwh20', label: 'Add 20 kWh', sub: 'Top-up energy', detail: '≈ ៛27,000', holdKhr: 28000 },
  { id: 'khr20k', label: 'Spend ៛20,000', sub: 'Fixed budget', detail: '≈ 14.8 kWh', holdKhr: 20000 },
  { id: 'manual', label: 'Manual stop', sub: 'I will stop it', detail: 'Charge until I stop', holdKhr: 40000 },
]

// ───────────────────────────── Categories & Products ─────────────────────────────
export const categories = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'fresh', label: 'Fresh Food' },
  { id: 'essentials', label: 'Essentials' },
]

export const products = [
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    sub: 'Single origin · Battambang',
    price: 8500,
    category: 'coffee',
    image: IMG('1517701604599-bb29b565090c'),
    badge: 'Bestseller',
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken Sandwich',
    sub: 'Lemongrass · Brioche',
    price: 14000,
    category: 'fresh',
    image: IMG('1528735602780-2552fd46c7af'),
  },
  {
    id: 'mango-smoothie',
    name: 'Mango Smoothie',
    sub: 'Kampot mango',
    price: 10000,
    category: 'drinks',
    image: IMG('1623065422902-30a2d299bbe4'),
    badge: 'Seasonal',
  },
  {
    id: 'coconut-water',
    name: 'Coconut Water',
    sub: 'Cold-pressed · 500ml',
    price: 5500,
    category: 'drinks',
    image: IMG('1581006852262-e4307cf6283a'),
  },
  {
    id: 'energy-bar',
    name: 'Energy Bar',
    sub: 'Cashew · Palm sugar',
    price: 4000,
    category: 'snacks',
    image: IMG('1599058917765-a780eda07a3e'),
  },
  {
    id: 'instant-noodles',
    name: 'Instant Noodles',
    sub: 'Khmer beef · Spicy',
    price: 6000,
    category: 'fresh',
    image: IMG('1569718212165-3a8278d5f624'),
  },
]

export const cafeSpecialImage = IMG('1497935586351-b67a49e012bf')

export const initialCart = [
  { productId: 'iced-latte', qty: 1 },
  { productId: 'chicken-sandwich', qty: 1 },
  { productId: 'coconut-water', qty: 1 },
]

// ───────────────────────────── Rewards ─────────────────────────────
// Rewards now live inside Wallet.
export const rewards = [
  { id: 'r1', title: 'Free iced coffee', cost: 400, icon: 'Coffee', sub: 'Today only' },
  { id: 'r2', title: '៛8,000 charging credit', cost: 800, icon: 'Zap', sub: 'Auto-applied' },
  { id: 'r3', title: 'Free snack with charge', cost: 600, icon: 'Cookie', sub: 'Any 30 min charge' },
  { id: 'r4', title: '10% off fresh food', cost: 1200, icon: 'Sandwich', sub: 'Lumo BKK1 only' },
]

// ───────────────────────────── Order status ─────────────────────────────
// Pipeline for in-store pickup orders.
export const ORDER_STAGES = ['Received', 'Preparing', 'Ready', 'Delivered']
