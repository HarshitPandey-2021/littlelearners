
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BlobIconProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'success'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function BlobIcon({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className 
}: BlobIconProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full',
        {
          'bg-primary-tint text-primary': variant === 'primary',
          'bg-background-peach text-secondary': variant === 'secondary',
          'bg-accent/20 text-amber-700': variant === 'accent',
          'bg-success/20 text-success': variant === 'success',
        },
        {
          'w-10 h-10 text-lg': size === 'sm',
          'w-16 h-16 text-2xl': size === 'md',
          'w-24 h-24 text-4xl': size === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  )
}