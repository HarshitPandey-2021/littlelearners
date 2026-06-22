'use client'

import { motion } from 'framer-motion'
import BlobIcon from '../ui/BlobIcon'
import Badge from '../ui/Badge'
import { Award, Users, BarChart3, Shield, Clock, DollarSign, GlobeCheck } from 'lucide-react'

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: 'Experienced Educator',
      description: 'Experienced educator with early childhood teaching methods.',
    },
    {
      icon: Users,
      title: 'Small Batch Sizes',
      description: 'Maximum 5-8 students per session for personalized attention.',
    },
    {
      icon: BarChart3,
      title: 'Progress Reports',
      description: 'Weekly updates on learning journey of every child.',
    },
    {
      icon: Shield,
      title: 'Safe & Moderated',
      description: 'Secure platform with learner-friendly environment and parent inclusive working.',
    },
    {
      icon: Clock,
      title: 'Adequate Class Turns',
      description: 'Sessions to be held thrice a week to keep the learning - retaining balance.',
    },
    {
      icon: GlobeCheck,
      title: 'British English - American Accent',
      description: 'Learning that is inclusive of understanding pace of learner while abiding to AMERICAN ACCENT. ',
    },
  ]

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-background-lavender">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge variant="primary" className="mb-4">Why Choose Us</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink mb-4">
            Learning You Can Trust
          </h2>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto">
            We understand what parents look for in their child's oration
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl bg-white hover:shadow-card transition-shadow"
            >
              <BlobIcon variant="primary" size="md">
                <feature.icon className="w-6 h-6" />
              </BlobIcon>
              <div>
                <h3 className="font-display font-semibold text-ink mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-ink-muted">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}