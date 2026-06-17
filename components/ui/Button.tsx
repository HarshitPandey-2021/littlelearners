'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          
          // Variants
          {
            'bg-cta-gradient text-white shadow-button hover:scale-[1.03] active:scale-[0.97]': 
              variant === 'primary',
            'border-2 border-primary text-primary hover:bg-primary-tint active:scale-[0.97]': 
              variant === 'secondary',
            'text-primary hover:bg-primary-tint': 
              variant === 'ghost',
          },
          
          // Sizes
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button