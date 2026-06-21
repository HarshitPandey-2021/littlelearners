'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import { Heart, Target, Users } from 'lucide-react'

export default function AboutUs() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-card-hover border-4 border-primary/10">
              {/* Placeholder image — swap src with the founder/teacher photo */}
              <Image
                src="/About.png"
                alt="Founder of La English Atelier"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-2xl shadow-card px-5 py-4 border-2 border-primary/10">
              <div className="text-2xl font-display font-bold text-primary">Rashida Zaidi</div>
              <div className="text-sm text-ink-muted">Founder & Academic Director</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-4">About Us</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink mb-6 leading-tight">
              Meet the Visionary Behind La English Atelier
            </h2>
            <h3>Ms. Rashida Zaidi</h3> 
              <p>Founder and Academic Director, La English Atelier</p>
              <p></p>
              <h4>M.A. (English Literature), M.Ed., B.Ed.</h4>

              <p>   </p>


            <p className="text-base sm:text-lg text-ink-muted mb-6 leading-relaxed">
               
              
              Ms. Rashida Zaidi is a distinguished educationist, language mentor,
              and academic leader with nearly two decades of experience in education.
              Renowned for her passion for language learning and academic excellence, she has dedicated
              her career to nurturing confident communicators and lifelong learners.

            </p>
            <p className="text-base sm:text-lg text-ink-muted mb-8 leading-relaxed">
              As the Founder and Academic Director of La English Atelier, she has envisioned and established
              a unique learning environment where English is not merely taught but experienced through
              meaningful conversations, storytelling, grammar, critical thinking, creativity, and self-expression.
            </p>

            <p className="text-base sm:text-lg text-ink-muted mb-8 leading-relaxed">
              Throughout, her career she has mentored students, guided educators, and championed
              innovative language-learning practices that help  learners develop 
              confidence, communication skills, and a lifelong love for English.
            </p>
            
            <p></p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                <Heart className="w-6 h-6 text-primary mb-2" />
                <span className="text-sm font-semibold text-ink">Taught with Care</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary/5 border border-secondary/10">
                <Target className="w-6 h-6 text-secondary mb-2" />
                <span className="text-sm font-semibold text-ink">Goal-Focused</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-success/5 border border-success/10">
                <Users className="w-6 h-6 text-success mb-2" />
                <span className="text-sm font-semibold text-ink">1,016+ Families</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}