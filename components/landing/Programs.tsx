'use client'

import { motion } from 'framer-motion'
import Card from '../ui/Card'
import BlobIcon from '../ui/BlobIcon'
import Badge from '../ui/Badge'
import { BookOpen, Calculator, Palette, Microscope } from 'lucide-react'

export default function Programs() {
  const programs = [
    {
      icon: BookOpen,
      title: 'Phonics & Reading',
      description: 'Build strong reading foundations with phonics-based learning',
      ageRange: '5-8 years',
      variant: 'primary' as const,
    },
    {
      icon: Calculator,
      title: 'Grammar',
      description: 'English Grammar made easy through fun activities, and adequate learning resources.',
      ageRange: '5-8 years',
      variant: 'secondary' as const,
    },
    {
      icon: Palette,
      title: 'Creative Writing',
      description: 'Express through the structure of writing and storytelling',
      ageRange: '5-8 years',
      variant: 'accent' as const,
    },
    {
      icon: Microscope,
      title: 'Confidence',
      description: 'Explore and discover to become GLOBALLY READY',
      ageRange: '5-8 years',
      variant: 'success' as const,
    },
  ]

  return (
    <section id="programs" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge variant="primary" className="mb-4">Our Programs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto">
            Carefully designed programs that make learning fun and effective
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="text-center p-6 h-full">
                <BlobIcon variant={program.variant} size="lg" className="mx-auto mb-4">
                  <program.icon />
                </BlobIcon>
                <h3 className="text-xl font-display font-semibold text-ink mb-2">
                  {program.title}
                </h3>
                <p className="text-ink-muted text-sm mb-4">
                  {program.description}
                </p>
                <Badge variant={program.variant}>{program.ageRange}</Badge>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}