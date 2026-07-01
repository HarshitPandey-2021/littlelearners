'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { ArrowLeft, CheckCircle, Phone, Mail, MapPin, Users, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { API_URL } from '@/lib/config'

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳' },
  { code: '+1', flag: '🇺🇸' },
  { code: '+44', flag: '🇬🇧' },
  { code: '+971', flag: '🇦🇪' },
]

const NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/
const MOBILE_REGEX = /^\d{10}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EnrollPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    childAge: '',
    countryCode: '+91',
    parentMobile: '',
    whatsappCountryCode: '+91',
    whatsappNumber: '',
    email: '',
    city: '',
    preferredBatch: '',
    howDidYouHear: '',
    additionalNotes: '',
    agreedToReceiveInfo: false,
  })

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'studentName':
        if (!String(value).trim()) return 'Student name is required'
        if (!NAME_REGEX.test(String(value).trim())) return 'Name can only contain letters'
        return ''
      case 'parentName':
        if (!String(value).trim()) return 'Parent name is required'
        if (!NAME_REGEX.test(String(value).trim())) return 'Name can only contain letters'
        return ''
      case 'childAge':
        if (!value) return 'Please select child age'
        return ''
      case 'parentMobile':
        if (!String(value).trim()) return 'Mobile number is required'
        if (!MOBILE_REGEX.test(String(value).trim())) return 'Enter exactly 10 digits'
        return ''
      case 'whatsappNumber':
        if (!String(value).trim()) return 'WhatsApp number is required'
        if (!MOBILE_REGEX.test(String(value).trim())) return 'Enter exactly 10 digits'
        return ''
      case 'email':
        if (!String(value).trim()) return 'Email is required'
        if (!EMAIL_REGEX.test(String(value).trim())) return 'Please enter a valid email'
        return ''
      case 'city':
        if (!String(value).trim()) return 'City is required'
        if (!NAME_REGEX.test(String(value).trim())) return 'City can only contain letters'
        return ''
      case 'howDidYouHear':
        if (!value) return 'Please tell us how you found us'
        return ''
      case 'agreedToReceiveInfo':
        if (!value) return 'Please agree to receive course information'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    let nextValue: string | boolean =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    // Letters / spaces / hyphens / apostrophes only
    if ((name === 'studentName' || name === 'parentName' || name === 'city') && typeof nextValue === 'string') {
      nextValue = nextValue.replace(/[^A-Za-z '-]/g, '')
    }

    // Digits only, max 10
    if ((name === 'parentMobile' || name === 'whatsappNumber') && typeof nextValue === 'string') {
      nextValue = nextValue.replace(/\D/g, '').slice(0, 10)
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }))

    // Live validation if the field has already been touched
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, nextValue) }))
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, fieldValue) }))
  }

  const handleAgeSelect = (age: number) => {
    setFormData((prev) => ({ ...prev, childAge: age.toString() }))
    setTouched((prev) => ({ ...prev, childAge: true }))
    setErrors((prev) => ({ ...prev, childAge: '' }))
  }

  const validateForm = () => {
    const fields = [
      'studentName',
      'parentName',
      'childAge',
      'parentMobile',
      'whatsappNumber',
      'email',
      'city',
      'howDidYouHear',
      'agreedToReceiveInfo',
    ] as const

    const newErrors: Record<string, string> = {}
    fields.forEach((field) => {
      const err = validateField(field, formData[field] as string | boolean)
      if (err) newErrors[field] = err
    })

    setErrors(newErrors)
    setTouched(
      fields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as Record<string, boolean>)
    )
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      const firstError = document.querySelector('.error-message')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)

    try {
const response = await fetch('/api/v1/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          studentName: formData.studentName.trim(),
          parentName: formData.parentName.trim(),
          city: formData.city.trim(),
          email: formData.email.trim(),
          parentMobile: `${formData.countryCode}${formData.parentMobile}`,
          whatsappNumber: `${formData.whatsappCountryCode}${formData.whatsappNumber}`,
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

  const FieldError = ({ message }: { message?: string }) => (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.15 }}
          className="error-message mt-1.5 text-sm text-error flex items-center gap-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )

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
                  <span className="font-semibold text-ink ml-auto">
                    {formData.whatsappCountryCode} {formData.whatsappNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => (window.location.href = 'https://wa.me/9569467196')}
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
    <div className="min-h-screen bg-gradient-to-br from-background-cream via-background-lavender to-background-peach pt-24 sm:pt-32 pb-8 sm:pb-16 px-4">
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
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.studentName ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="Emma Watson"
                    />
                    <FieldError message={errors.studentName} />
                  </div>

                  <div>
  <label className="block text-sm font-medium text-ink mb-2">
    Child Age <span className="text-error">*</span>
  </label>
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
    {[5, 6, 7, 8, 9, 10].map((age) => (
      <button
        key={age}
        type="button"
        onClick={() => handleAgeSelect(age)}
        className={`py-3 rounded-xl border-2 font-semibold transition-all text-sm sm:text-base ${
          formData.childAge === age.toString()
            ? 'border-primary bg-primary text-white shadow-lg scale-105'
            : errors.childAge
            ? 'border-error hover:border-error/70'
            : 'border-border hover:border-primary hover:bg-primary/5'
        }`}
      >
        <span className="sm:hidden">{age}</span>
        <span className="hidden sm:inline">{age} yrs</span>
      </button>
    ))}
  </div>
  <FieldError message={errors.childAge} />
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.parentName ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="John Watson"
                    />
                    <FieldError message={errors.parentName} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      Parent Mobile Number <span className="text-error">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="px-2 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="parentMobile"
                        value={formData.parentMobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={10}
                        inputMode="numeric"
                        className={`flex-1 w-full px-4 py-3 rounded-xl border-2 ${
                          errors.parentMobile ? 'border-error' : 'border-border'
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                        placeholder="98765 43210"
                      />
                    </div>
                    <FieldError message={errors.parentMobile} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      WhatsApp Number <span className="text-error">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="whatsappCountryCode"
                        value={formData.whatsappCountryCode}
                        onChange={handleChange}
                        className="px-2 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={10}
                        inputMode="numeric"
                        className={`flex-1 w-full px-4 py-3 rounded-xl border-2 ${
                          errors.whatsappNumber ? 'border-error' : 'border-border'
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                        placeholder="98765 43210"
                      />
                    </div>
                    <FieldError message={errors.whatsappNumber} />
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.email ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="john@example.com"
                    />
                    <FieldError message={errors.email} />
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
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.city ? 'border-error' : 'border-border'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="Mumbai"
                    />
                    <FieldError message={errors.city} />
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
                      onBlur={handleBlur}
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
                    <FieldError message={errors.howDidYouHear} />
                  </div>

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
                    onBlur={handleBlur}
                    className={`mt-1 w-5 h-5 rounded border-2 ${
                      errors.agreedToReceiveInfo ? 'border-error' : 'border-primary'
                    } text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer`}
                  />
                  <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">
                    I agree to receive course information, updates, and promotional content via email, WhatsApp, and SMS.
                  </span>
                </label>
                <FieldError message={errors.agreedToReceiveInfo} />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full text-lg py-4 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
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