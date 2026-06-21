'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from './ui/Button'
import { cn } from '@/lib/utils'
import { Menu, X, ShieldCheck } from 'lucide-react'

const navLinks = [
  { href: '/about', label: 'About Us', isRoute: true },
  { href: '/#programs', label: 'Programs', isRoute: false },
  { href: '/#why-us', label: 'Why Us', isRoute: false },
  { href: '/#outcomes', label: 'Outcomes', isRoute: false },
  { href: '/#contact', label: 'Contact', isRoute: false },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white/50 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="La English Atelier logo" width={40} height={40} />
            <span className="font-display font-bold text-xl text-ink">
              La English Atelier
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = link.isRoute && pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors font-medium',
                    isActive ? 'text-primary' : 'text-ink-muted hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}

            <Link
              href="/login"
              className="text-ink-muted/60 hover:text-primary transition-colors flex items-center gap-1 text-sm"
              title="Admin Login"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link href="/enroll" className="hidden sm:block">
              <Button size="md">Enroll Now</Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-ink hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border bg-white rounded-b-xl shadow-lg">
            {navLinks.map((link) => {
              const isActive = link.isRoute && pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'text-primary bg-primary-tint'
                      : 'text-ink-muted hover:text-primary hover:bg-primary-tint'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-ink-muted hover:text-primary hover:bg-primary-tint rounded-lg transition-colors"
            >
              Admin Login
            </Link>
            <div className="px-4 pt-2">
              <Link href="/enroll" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button size="md" className="w-full">Enroll Now</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}