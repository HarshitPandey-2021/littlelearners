'use client'

import { motion } from 'framer-motion'
import Badge from '../ui/Badge'
import { CheckCircle } from 'lucide-react'

export default function Outcomes() {
  const outcomes = [
    'Read simple sentences confidently',
    'Solve basic math problems independently',
    'Express creativity through art and music',
    'Think critically and ask questions',
    'Work collaboratively with peers',
    'Build self-confidence and curiosity',
    'Develop focus and attention skills',
    'Love learning and exploring new topics',
  ]

  return (
    <section id="outcomes" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge variant="success" className="mb-4">Learning Outcomes</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink mb-4">
            What Your Child Will Achieve
          </h2>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto">
            By the end of our program, your child will be able to:
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-success/5 border-2 border-success/20"
            >
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-ink">{outcome}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}