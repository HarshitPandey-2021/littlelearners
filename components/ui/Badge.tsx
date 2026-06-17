import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide',
          {
            'bg-primary-tint text-primary': variant === 'primary',
            'bg-background-peach text-secondary': variant === 'secondary',
            'bg-accent/20 text-amber-700': variant === 'accent',
            'bg-success/20 text-success': variant === 'success',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge