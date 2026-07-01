'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Lock, Mail, Save, AlertCircle, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (passwords.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters' })
      return
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/v1/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password updated successfully' })
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update password' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Could not connect to server' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-ink mb-8">Settings</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Account Info */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-semibold text-ink">Account</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs text-ink-muted uppercase mb-1">Role</div>
              <div className="font-semibold text-ink">Administrator</div>
            </div>
            <div>
              <div className="text-xs text-ink-muted uppercase mb-1">Platform</div>
              <div className="font-semibold text-ink">La English Atelier Admin Panel</div>
            </div>
          </div>
        </Card>

        {/* Change Password */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-xl font-display font-semibold text-ink">Change Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            {message && (
              <div
                className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
                  message.type === 'success'
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-error/10 text-error border border-error/20'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                {message.text}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}