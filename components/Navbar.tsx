'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from './ui/Button'
import { cn } from '@/lib/utils'
import { Menu, X, ShieldCheck } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="font-display font-bold text-xl text-ink">
              La English Atelier
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#programs" className="text-ink-muted hover:text-primary transition-colors font-medium">
              Programs
            </a>
            <a href="#why-us" className="text-ink-muted hover:text-primary transition-colors font-medium">
              Why Us
            </a>
            <a href="#outcomes" className="text-ink-muted hover:text-primary transition-colors font-medium">
              Outcomes
            </a>
            <a href="#contact" className="text-ink-muted hover:text-primary transition-colors font-medium">
              Contact
            </a>
            {/* Admin Link - Discreet */}
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

            {/* Mobile menu button */}
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
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <a href="#programs" className="block px-4 py-2 text-ink-muted hover:text-primary hover:bg-primary-tint rounded-lg transition-colors">
              Programs
            </a>
            <a href="#why-us" className="block px-4 py-2 text-ink-muted hover:text-primary hover:bg-primary-tint rounded-lg transition-colors">
              Why Us
            </a>
            <a href="#outcomes" className="block px-4 py-2 text-ink-muted hover:text-primary hover:bg-primary-tint rounded-lg transition-colors">
              Outcomes
            </a>
            <a href="#contact" className="block px-4 py-2 text-ink-muted hover:text-primary hover:bg-primary-tint rounded-lg transition-colors">
              Contact
            </a>
            <Link href="/login" className="block px-4 py-2 text-ink-muted hover:text-primary hover:bg-primary-tint rounded-lg transition-colors">
              Admin Login
            </Link>
            <div className="px-4 pt-2">
              <Link href="/enroll" className="block">
                <Button size="md" className="w-full">Enroll Now</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}