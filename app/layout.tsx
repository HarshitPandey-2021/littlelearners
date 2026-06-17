import type { Metadata } from 'next'
import { fredoka, jakarta } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'LittleLearners Academy — Where Curious Minds Begin',
  description: 'Interactive online learning for kids aged 5-8. Certified teachers, small batches, live classes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${fredoka.variable} ${jakarta.variable}`} 
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className={jakarta.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}