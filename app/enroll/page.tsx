'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function EnrollPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    phone: '',
    email: '',
    program: '',
    classMode: '',
    preferredBatch: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // For now, use a mock program ID - replace with real one later
      const response = await fetch('http://localhost:5000/api/v1/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          childAge: parseInt(formData.childAge),
          program: '507f1f77bcf86cd799439011', // Mock MongoDB ObjectId
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Could not connect to server. Make sure backend is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background-cream via-background-lavender to-background-peach flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Card className="text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mx-auto w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-12 h-12 text-success" />
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink mb-4">
              🎉 Enrollment Submitted!
            </h1>

            <p className="text-ink-muted mb-6">
              Thank you for enrolling <span className="font-semibold text-ink">{formData.childName}</span>! 
              Our team will contact you within 24 hours at{' '}
              <span className="font-semibold text-ink">{formData.email}</span>
            </p>

            <div className="space-y-3">
              <Button className="w-full" onClick={() => window.location.href = 'tel:+1234567890'}>
                📞 Call Us Now
              </Button>
              <Link href="/">
                <Button variant="secondary" className="w-full">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-cream via-background-lavender to-background-peach py-8 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-ink-muted hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-ink">
              Enroll Your Child
            </h1>
            <Badge variant="primary">Step {step} of 3</Badge>
          </div>

          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full flex-1 transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Child & Parent Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-display font-semibold text-ink mb-6">
                  Child & Parent Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Child's Name *
                  </label>
                  <input
                    type="text"
                    name="childName"
                    required
                    value={formData.childName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Emma Watson"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Child's Age *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 6, 7, 8].map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setFormData({ ...formData, childAge: age.toString() })}
                        className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                          formData.childAge === age.toString()
                            ? 'border-primary bg-primary text-white'
                            : 'border-border hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Parent's Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Watson"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full"
                  disabled={!formData.childName || !formData.childAge || !formData.parentName || !formData.phone || !formData.email}
                >
                  Continue to Program Selection →
                </Button>
              </motion.div>
            )}

            {/* Step 2: Program Selection */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-display font-semibold text-ink mb-6">
                  Choose a Program
                </h2>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Program *
                  </label>
                  <select
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="">Select a program</option>
                    <option value="phonics-reading">📚 Phonics & Reading</option>
                    <option value="math-foundations">🔢 Math Foundations</option>
                    <option value="creative-arts">🎨 Creative Arts</option>
                    <option value="curiosity-lab">🔬 Curiosity Lab (Science)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Class Mode *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: 'online', label: '💻 Online Live', desc: 'Interactive video classes' },
                      { value: 'in-person', label: '🏫 In-Person', desc: 'Physical classroom' },
                      { value: 'hybrid', label: '🔄 Hybrid', desc: 'Best of both worlds' },
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, classMode: mode.value })}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.classMode === mode.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="font-semibold text-ink mb-1">{mode.label}</div>
                        <div className="text-xs text-ink-muted">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Preferred Batch (Optional)
                  </label>
                  <input
                    type="text"
                    name="preferredBatch"
                    value={formData.preferredBatch}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g., Weekday Mornings, Weekend Evenings"
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="secondary" onClick={() => setStep(1)} className="flex-1">
                    ← Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1"
                    disabled={!formData.program || !formData.classMode}
                  >
                    Review & Submit →
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-display font-semibold text-ink mb-6">
                  Review Your Enrollment
                </h2>

                <div className="bg-background-lavender rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-ink-muted uppercase tracking-wide mb-1">Child's Name</div>
                      <div className="font-semibold text-ink">{formData.childName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-muted uppercase tracking-wide mb-1">Age</div>
                      <div className="font-semibold text-ink">{formData.childAge} years</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-muted uppercase tracking-wide mb-1">Parent's Name</div>
                      <div className="font-semibold text-ink">{formData.parentName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-muted uppercase tracking-wide mb-1">Phone</div>
                      <div className="font-semibold text-ink">{formData.phone}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-ink-muted uppercase tracking-wide mb-1">Email</div>
                      <div className="font-semibold text-ink">{formData.email}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-muted uppercase tracking-wide mb-1">Program</div>
                      <div className="font-semibold text-ink">{formData.program}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-muted uppercase tracking-wide mb-1">Class Mode</div>
                      <div className="font-semibold text-ink capitalize">{formData.classMode}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="secondary" onClick={() => setStep(2)} className="flex-1">
                    ← Edit
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Enrollment ✨'}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </Card>
      </div>
    </div>
  )
}