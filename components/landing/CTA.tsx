'use client'

import { motion } from 'framer-motion'
import Button from '../ui/Button'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Give Your Child Their Best Start
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 2,000+ happy families. Enroll in just 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enroll">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-2xl"
              >
                Enroll Now →
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="secondary"
              className="border-white text-white hover:bg-white/10"
            >
              Book a Free Trial
            </Button>
          </div>

          <p className="text-white/70 text-sm mt-6">
            ✓ No commitment required  ✓ Money-back guarantee  ✓ Start anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}