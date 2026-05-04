/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Geist — premium, distinctive. NOT Inter.
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"SF Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Off-white canvas, white cards, zinc neutrals, single emerald accent.
        canvas: '#FAFAF9',
        surface: '#FFFFFF',
        // Single accent — Apple system green, naturally <80% saturation.
        accent: {
          DEFAULT: '#34C759',
          dark: '#248A3D',
          ink: '#0E5E2A',
          soft: '#E8F8EE',
        },
      },
      borderRadius: {
        '2.5xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
      },
      boxShadow: {
        // Skill spec: diffusion shadow — wide, soft, low-opacity.
        'diffuse': '0 18px 40px -20px rgba(15, 23, 42, 0.08)',
        'diffuse-lg': '0 28px 60px -28px rgba(15, 23, 42, 0.12)',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'rise': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'shine': {
          '0%': { transform: 'translateX(-120%)' },
          '60%, 100%': { transform: 'translateX(120%)' },
        },
      },
      animation: {
        'rise': 'rise 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
        'shine': 'shine 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
