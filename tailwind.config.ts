import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B4FE8',
          dark: '#4438C9',
          tint: '#EFEDFE',
        },
        secondary: {
          DEFAULT: '#FF8A3D',
          dark: '#F0701B',
        },
        accent: {
          DEFAULT: '#FFC93C',
        },
        success: {
          DEFAULT: '#22C08E',
        },
        background: {
          cream: '#FFFBF5',
          lavender: '#F4F2FE',
          peach: '#FFF3E9',
        },
        ink: {
          DEFAULT: '#1E1B3A',
          muted: '#615D7D',
        },
        border: {
          DEFAULT: '#E7E3FB',
        },
        error: {
          DEFAULT: '#FF5A5A',
        },
      },
      fontFamily: {
        display: ['var(--font-fredoka)', 'sans-serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'hero-mobile': ['34px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'h2': ['38px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h2-mobile': ['28px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h3': ['22px', { lineHeight: '1.3' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
      },
      boxShadow: {
        'card': '0 8px 24px rgba(91, 79, 232, 0.08)',
        'card-hover': '0 16px 32px rgba(91, 79, 232, 0.14)',
        'button': '0 6px 16px rgba(255, 138, 61, 0.35)',
      },
      backgroundImage: {
        'hero-glow': 'linear-gradient(135deg, #6C5FF0 0%, #8B7FFF 100%)',
        'cta-gradient': 'linear-gradient(90deg, #FF8A3D 0%, #FFB23D 100%)',
      },
    },
  },
  plugins: [],
}

export default config