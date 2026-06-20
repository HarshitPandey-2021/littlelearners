'use client'

import { motion } from 'framer-motion'
import { Users, Star, Award, Video } from 'lucide-react'

export default function TrustStrip() {
  const stats = [
    { icon: Users, value: '1,016+', label: 'Happy Learners' },
    { icon: Star, value: '4.8', label: 'Parent Rating' },
    { icon: Award, value: '100%', label: 'Experienced Educators' },
    { icon: Video, value: 'Live', label: 'Interactive Classes' },
  ]

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 mb-3 sm:mb-4">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-ink mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-ink-muted">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}