'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from './ui/Button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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
          ? 'bg-white/95 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="\" className="flex items-center space-x-2">
          <img src ="/logo.png" alt="La English Atelier logo" width={40} height={40}/>
            <span className="font-display font-bold text-xl text-ink">
              La English Atelier
            </span>
          </Link>

          {/* Nav Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#programs" className="text-ink-muted hover:text-primary transition-colors">
              Programs
            </a>
            <a href="#why-us" className="text-ink-muted hover:text-primary transition-colors">
              Why Us
            </a>
            <a href="#outcomes" className="text-ink-muted hover:text-primary transition-colors">
              Outcomes
            </a>
            <a href="#contact" className="text-ink-muted hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <Link href="/enroll">
            <Button size="md">Enroll Now</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}