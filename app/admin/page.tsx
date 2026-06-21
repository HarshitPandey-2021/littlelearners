'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import { Users, UserCheck, Clock, XCircle } from 'lucide-react'

export default function AdminOverview() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    enrolled: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/v1/enrollments/stats', {
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const statCards = [
    { label: 'Total Enrollments', value: stats.total, icon: Users, color: 'primary' },
    { label: 'New', value: stats.new, icon: Clock, color: 'accent' },
    { label: 'Contacted', value: stats.contacted, icon: UserCheck, color: 'secondary' },
    { label: 'Enrolled', value: stats.enrolled, icon: UserCheck, color: 'success' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-ink mb-8">Dashboard Overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-muted mb-1">{stat.label}</p>
                <p className="text-3xl font-display font-bold text-ink">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}