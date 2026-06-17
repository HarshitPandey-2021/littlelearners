import { Fredoka, Plus_Jakarta_Sans } from 'next/font/google'

export const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})