'use client'

import { motion } from 'framer-motion'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Link from 'next/link'
import { Star, Sparkles, BookOpen, Palette, Microscope } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-success/5">
      {/* Animated Background Blobs */}
      <motion.div 
        className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-success/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="primary" className="mb-4 sm:mb-6">
                For Curious Kids
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ink mb-4 sm:mb-6 leading-tight"
            >
              Crafting Confidence{' '}
              <span className="text-primary bg-clip-text">Creating Expression</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-ink-muted mb-6 sm:mb-8 max-w-xl leading-relaxed"
            >
              Live, interactive online classes with experienced educator. 
              Small batches, big learning. Build strong foundations in English Grammar, 
              Phonics, Creative Expression, and fluent communication.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <Link href="/enroll" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Enroll Now →
                </Button>
              </Link>
              
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              {/* Avatar cluster */}
              <div className="flex -space-x-2">
                {[
                  { bg: 'from-primary to-secondary', letter: 'A' },
                  { bg: 'from-secondary to-accent', letter: 'M' },
                  { bg: 'from-accent to-success', letter: 'S' },
                  { bg: 'from-success to-primary', letter: 'R' },
                ].map((avatar, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.bg} border-2 border-white shadow-md flex items-center justify-center text-white font-semibold text-sm`}
                  >
                    {avatar.letter}
                  </motion.div>
                ))}
              </div>

              <div className="text-sm">
                <div className="flex items-center gap-1 text-ink font-semibold">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span>4.9</span>
                </div>
                <div className="text-ink-muted">
                  Loved by 2,000+ parents
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Main illustration container */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 opacity-30 blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Center sparkle icon */}
                <div className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-white shadow-card-hover flex items-center justify-center border-4 border-primary/10">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Sparkles className="w-20 sm:w-32 h-20 sm:h-32 text-primary" />
                  </motion.div>
                </div>
              </div>

              {/* Floating subject icons - Fixed animations */}
              <motion.div
                className="absolute top-5 sm:top-10 right-5 sm:right-10"
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br from-secondary/20 to-secondary shadow-card flex items-center justify-center backdrop-blur-sm border-2 border-secondary/20">
                  <BookOpen className="w-8 sm:w-10 h-8 sm:h-10 text-secondary" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-16 sm:bottom-20 right-10 sm:right-20"
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary shadow-card flex items-center justify-center backdrop-blur-sm border-2 border-primary/20">
                  <Palette className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-2 sm:left-0"
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br from-success/20 to-success shadow-card flex items-center justify-center backdrop-blur-sm border-2 border-success/20">
                  <Microscope className="w-8 sm:w-10 h-8 sm:h-10 text-success" />
                </div>
              </motion.div>

              {/* Sparkle decorations */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-3 sm:top-5 left-8 sm:left-10"
              >
                <Star className="w-5 sm:w-6 h-5 sm:h-6 fill-accent text-accent drop-shadow-lg" />
              </motion.div>

              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -180, -360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-8 sm:bottom-10 left-16 sm:left-20"
              >
                <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-primary drop-shadow-lg" />
              </motion.div>

              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-1/3 right-2 sm:right-5"
              >
                <Star className="w-4 sm:w-5 h-4 sm:h-5 fill-success text-success drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}