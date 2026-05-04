// Mock data for the Lumo prototype.
// All names are illustrative and tuned for the Cambodian market.

export const user = {
  firstName: 'Jay',
  tier: 'Volt Gold',
  points: 2840,
  nextTierPoints: 3500,
  vehicle: {
    make: 'BYD',
    model: 'Atto 3',
    plate: '2AB-1138',
    range: 412,
    battery: 78,
  },
  card: {
    number: '•••• 4419',
    type: 'Visa',
  },
}

export const stations = [
  {
    id: 'bkk1',
    name: 'Lumo BKK1',
    address: 'St. 294, Boeung Keng Kang 1, Phnom Penh',
    distanceKm: 1.2,
    etaMin: 6,
    available: 4,
    total: 6,
    ultraFast: 2,
    pricePerKwh: 0.32,
    open247: true,
    cafe: true,
    rating: 4.9,
    reviews: 312,
    amenities: ['Restroom', 'Seating', 'Wi-Fi', 'Car wash'],
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
    pricePerKwh: 0.30,
    open247: true,
    cafe: true,
    rating: 4.8,
    reviews: 187,
    amenities: ['Restroom', 'Seating', 'Wi-Fi'],
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
    pricePerKwh: 0.34,
    open247: false,
    cafe: true,
    rating: 4.7,
    reviews: 524,
    amenities: ['Restroom', 'Seating', 'Wi-Fi', 'Car wash', 'Lounge'],
    color: ['#A855F7', '#5B21B6'],
  },
  {
    id: 'siemreap',
    name: 'Lumo Siem Reap',
    address: 'Sivutha Blvd, Siem Reap',
    distanceKm: 312,
    etaMin: null,
    available: 2,
    total: 4,
    ultraFast: 2,
    pricePerKwh: 0.31,
    open247: true,
    cafe: true,
    rating: 4.9,
    reviews: 96,
    amenities: ['Restroom', 'Seating', 'Wi-Fi'],
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
    pricePerKwh: 0.33,
    open247: false,
    cafe: false,
    rating: 4.6,
    reviews: 41,
    amenities: ['Restroom', 'Wi-Fi'],
    color: ['#06B6D4', '#0E7490'],
  },
]

export const charging = {
  active: true,
  stationId: 'bkk1',
  bay: 'A3',
  startBattery: 42,
  currentBattery: 58,
  targetBattery: 80,
  remainingMin: 28,
  energyKwh: 18.4,
  costUsd: 4.2,
  speedKw: 120,
  chargerType: 'Ultra Fast DC',
}

export const categories = [
  { id: 'coffee', label: 'Coffee', icon: '☕' },
  { id: 'drinks', label: 'Drinks', icon: '🥤' },
  { id: 'snacks', label: 'Snacks', icon: '🍫' },
  { id: 'fresh', label: 'Fresh Food', icon: '🥪' },
  { id: 'essentials', label: 'Essentials', icon: '🧴' },
]

// Real food photography from Unsplash CDN. All URLs HEAD-checked 200.
const IMG = (id) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=80`

export const products = [
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    sub: 'Single origin · Battambang',
    price: 2.8,
    category: 'coffee',
    image: IMG('1517701604599-bb29b565090c'),
    badge: 'Bestseller',
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken Sandwich',
    sub: 'Lemongrass · Brioche',
    price: 4.5,
    category: 'fresh',
    image: IMG('1528735602780-2552fd46c7af'),
  },
  {
    id: 'mango-smoothie',
    name: 'Mango Smoothie',
    sub: 'Kampot mango',
    price: 3.4,
    category: 'drinks',
    image: IMG('1623065422902-30a2d299bbe4'),
    badge: 'Seasonal',
  },
  {
    id: 'coconut-water',
    name: 'Coconut Water',
    sub: 'Cold-pressed · 500ml',
    price: 2.2,
    category: 'drinks',
    image: IMG('1581006852262-e4307cf6283a'),
  },
  {
    id: 'energy-bar',
    name: 'Energy Bar',
    sub: 'Cashew · Palm sugar',
    price: 1.6,
    category: 'snacks',
    image: IMG('1599058917765-a780eda07a3e'),
  },
  {
    id: 'instant-noodles',
    name: 'Instant Noodles',
    sub: 'Khmer beef · Spicy',
    price: 1.2,
    category: 'fresh',
    image: IMG('1569718212165-3a8278d5f624'),
  },
]

// Café special hero image (Battambang highlands coffee).
export const cafeSpecialImage = IMG('1497935586351-b67a49e012bf')

export const initialCart = [
  { productId: 'iced-latte', qty: 1 },
  { productId: 'chicken-sandwich', qty: 1 },
]

export const rewards = [
  { id: 'r1', title: 'Free iced coffee', cost: 400, color: ['#C9A87C', '#6B4423'], icon: 'Coffee' },
  { id: 'r2', title: '$2 charging credit', cost: 800, color: ['#9FF5C2', '#00A855'], icon: 'Zap' },
  { id: 'r3', title: 'Free snack with charge', cost: 600, color: ['#FFD166', '#E07A1A'], icon: 'Cookie' },
  { id: 'r4', title: '10% off fresh food', cost: 1200, color: ['#F4D9A4', '#A87332'], icon: 'Sandwich' },
]

export const recentActivity = [
  { id: 'a1', label: 'Charging session · BKK1', delta: +120, when: 'Today, 8:42' },
  { id: 'a2', label: 'Iced Latte, Sandwich', delta: +35, when: 'Today, 8:46' },
  { id: 'a3', label: 'Charging session · AEON', delta: +210, when: 'Yesterday' },
  { id: 'a4', label: 'Redeemed: Free coffee', delta: -400, when: 'Apr 28' },
]

export const chargingHistory = [
  { id: 'h1', station: 'Lumo BKK1', date: 'May 03', kwh: 18.4, cost: 4.2 },
  { id: 'h2', station: 'Lumo AEON Sen Sok', date: 'May 01', kwh: 32.1, cost: 7.8 },
  { id: 'h3', station: 'Lumo Toul Kork', date: 'Apr 27', kwh: 24.6, cost: 5.9 },
]
