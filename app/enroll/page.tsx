'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { ArrowLeft, CheckCircle, Phone, Mail, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

export default function EnrollPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    childAge: '',
    parentMobile: '',
    whatsappNumber: '',
    email: '',
    city: '',
    preferredBatch: '',
    howDidYouHear: '',
    additionalNotes: '',
    agreedToReceiveInfo: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required'
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required'
    if (!formData.childAge) newErrors.childAge = 'Please select child age'
    if (!formData.parentMobile.trim()) newErrors.parentMobile = 'Mobile number is required'
    if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = 'WhatsApp number is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.howDidYouHear) newErrors.howDidYouHear = 'Please tell us how you found us'
    if (!formData.agreedToReceiveInfo) {
      newErrors.agreedToReceiveInfo = 'Please agree to receive course information'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/v1/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          childAge: parseInt(formData.childAge),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const data = await response.json()
        alert(data.error || 'Something went wrong. Please try again.')
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
          className="max-w-lg w-full"
        >
          <Card className="text-center p-8 sm:p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-16 h-16 text-success" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-ink mb-4">
              🎉 Enrollment Received!
            </h1>

            <p className="text-lg text-ink-muted mb-8 leading-relaxed">
              Thank you for enrolling <span className="font-semibold text-primary">{formData.studentName}</span>! 
              <br />
              Our team will contact you within <span className="font-semibold text-ink">24 hours</span>.
            </p>

            <div className="bg-background-lavender rounded-xl p-6 mb-8 text-left">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-ink-muted">We'll email you at:</span>
                  <span className="font-semibold text-ink ml-auto">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-ink-muted">We'll call/WhatsApp:</span>
                  <span className="font-semibold text-ink ml-auto">{formData.whatsappNumber}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
             <Button
  className="w-full"
  onClick={() => window.location.href = 'https://wa.me/1234567890'}
>
  💬 Chat on WhatsApp
</Button>

<Link href="/" className="block mt-4">
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-ink-muted hover:text-primary transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-ink mb-3">
              Enroll Your Child
            </h1>
            <p className="text-lg text-ink-muted">
              Fill in the details below and we'll get back to you within 24 hours
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Student Information Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-ink">
                    Student Information
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      Student Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.studentName ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="Emma Watson"
                    />
                    {errors.studentName && (
                      <p className="error-message mt-1 text-sm text-error">{errors.studentName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      Child Age <span className="text-error">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[5, 6, 7, 8].map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, childAge: age.toString() })
                            setErrors({ ...errors, childAge: '' })
                          }}
                          className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                            formData.childAge === age.toString()
                              ? 'border-primary bg-primary text-white shadow-lg scale-105'
                              : errors.childAge
                              ? 'border-error hover:border-error/70'
                              : 'border-border hover:border-primary hover:bg-primary/5'
                          }`}
                        >
                          {age} yrs
                        </button>
                      ))}
                    </div>
                    {errors.childAge && (
                      <p className="error-message mt-1 text-sm text-error">{errors.childAge}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Parent Contact Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-ink">
                    Parent Contact Details
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-ink mb-2">
                      Parent Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.parentName ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="John Watson"
                    />
                    {errors.parentName && (
                      <p className="error-message mt-1 text-sm text-error">{errors.parentName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      Parent Mobile Number <span className="text-error">*</span>
                    </label>
                    <input
                      type="tel"
                      name="parentMobile"
                      value={formData.parentMobile}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.parentMobile ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.parentMobile && (
                      <p className="error-message mt-1 text-sm text-error">{errors.parentMobile}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      WhatsApp Number <span className="text-error">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.whatsappNumber ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.whatsappNumber && (
                      <p className="error-message mt-1 text-sm text-error">{errors.whatsappNumber}</p>
                    )}
                    <p className="mt-1 text-xs text-ink-muted">We'll send updates via WhatsApp</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      Email Address <span className="text-error">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.email ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="error-message mt-1 text-sm text-error">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      City <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.city ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="Mumbai"
                    />
                    {errors.city && (
                      <p className="error-message mt-1 text-sm text-error">{errors.city}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-ink">
                    Additional Information
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      How did you hear about us? <span className="text-error">*</span>
                    </label>
                    <select
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.howDidYouHear ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white`}
                    >
                      <option value="">Select an option</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="google">Google Search</option>
                      <option value="friends-family">Friends & Family</option>
                      <option value="peers">Peers / Colleagues</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.howDidYouHear && (
                      <p className="error-message mt-1 text-sm text-error">{errors.howDidYouHear}</p>
                    )}
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      Preferred Batch <span className="text-ink-muted text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="preferredBatch"
                      value={formData.preferredBatch}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g., Weekday Mornings, Weekend Evenings"
                    />
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      Additional Notes <span className="text-ink-muted text-xs">(Optional)</span>
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="bg-background-lavender rounded-xl p-5">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="agreedToReceiveInfo"
                    checked={formData.agreedToReceiveInfo}
                    onChange={handleChange}
                    className={`mt-1 w-5 h-5 rounded border-2 ${
                      errors.agreedToReceiveInfo ? 'border-error' : 'border-primary'
                    } text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer`}
                  />
                  <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">
                    I agree to receive course information, updates, and promotional content via email, WhatsApp, and SMS.
                  </span>
                </label>
                {errors.agreedToReceiveInfo && (
                  <p className="error-message mt-2 text-sm text-error ml-8">{errors.agreedToReceiveInfo}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full text-lg py-4"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  'Submit Enrollment ✨'
                )}
              </Button>

              <p className="text-center text-sm text-ink-muted">
                By submitting this form, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}