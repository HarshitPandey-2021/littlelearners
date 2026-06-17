'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Search, Download, Eye } from 'lucide-react'

interface Enrollment {
  _id: string
  studentName: string
  parentName: string
  childAge: number
  parentMobile: string
  whatsappNumber: string
  email: string
  city: string
  howDidYouHear: string
  status: 'new' | 'contacted' | 'enrolled' | 'closed'
  createdAt: string
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)

  useEffect(() => {
    fetchEnrollments()
  }, [statusFilter])

  const fetchEnrollments = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      
      const response = await fetch(`http://localhost:5000/api/v1/enrollments?${params}`, {
        credentials: 'include',
      })
      
      if (response.ok) {
        const data = await response.json()
        setEnrollments(data.enrollments || [])
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/enrollments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchEnrollments()
        if (selectedEnrollment?._id === id) {
          setSelectedEnrollment({ ...selectedEnrollment, status: newStatus as any })
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const exportToCSV = () => {
    const headers = ['Student Name', 'Parent Name', 'Age', 'Mobile', 'WhatsApp', 'Email', 'City', 'Source', 'Status', 'Date']
    const rows = enrollments.map(e => [
      e.studentName,
      e.parentName,
      e.childAge,
      e.parentMobile,
      e.whatsappNumber,
      e.email,
      e.city,
      e.howDidYouHear,
      e.status,
      new Date(e.createdAt).toLocaleDateString()
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `enrollments-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredEnrollments = enrollments.filter(e =>
    e.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    e.parentName?.toLowerCase().includes(search.toLowerCase()) ||
    e.email?.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      new: 'primary',
      contacted: 'secondary',
      enrolled: 'success',
      closed: 'accent',
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-ink">Enrollments</h1>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="enrolled">Enrolled</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-lavender border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">
                  Parent
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-ink-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEnrollments.map((enrollment) => (
                <tr key={enrollment._id} className="hover:bg-background-cream transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-ink">{enrollment.studentName}</div>
                    <div className="text-sm text-ink-muted">{enrollment.childAge} years</div>
                  </td>
                  <td className="px-6 py-4 text-ink">{enrollment.parentName}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-ink">{enrollment.parentMobile}</div>
                    <div className="text-sm text-ink-muted">{enrollment.email}</div>
                  </td>
                  <td className="px-6 py-4 text-ink">{enrollment.city}</td>
                  <td className="px-6 py-4">
                    <select
                      value={enrollment.status}
                      onChange={(e) => updateStatus(enrollment._id, e.target.value)}
                      className="px-3 py-1 rounded-lg border border-border text-sm"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="enrolled">Enrolled</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-ink-muted">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedEnrollment(enrollment)}
                      className="text-primary hover:text-primary-dark"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEnrollments.length === 0 && (
          <div className="text-center py-12 text-ink-muted">
            No enrollments found
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedEnrollment(null)}>
          <Card className="max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-display font-bold text-ink mb-6">Enrollment Details</h2>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-xs text-ink-muted uppercase mb-1">Student Name</div>
                <div className="font-semibold text-ink">{selectedEnrollment.studentName}</div>
              </div>
              <div>
                <div className="text-xs text-ink-muted uppercase mb-1">Age</div>
                <div className="font-semibold text-ink">{selectedEnrollment.childAge} years</div>
              </div>
              <div>
                <div className="text-xs text-ink-muted uppercase mb-1">Parent Name</div>
                <div className="font-semibold text-ink">{selectedEnrollment.parentName}</div>
              </div>
              <div>
                <div className="text-xs text-ink-muted uppercase mb-1">City</div>
                <div className="font-semibold text-ink">{selectedEnrollment.city}</div>
              </div>
              <div>
                <div className="text-xs text-ink-muted uppercase mb-1">Mobile</div>
                <div className="font-semibold text-ink">{selectedEnrollment.parentMobile}</div>
              </div>
              <div>
                <div className="text-xs text-ink-muted uppercase mb-1">WhatsApp</div>
                <div className="font-semibold text-ink">{selectedEnrollment.whatsappNumber}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs text-ink-muted uppercase mb-1">Email</div>
                <div className="font-semibold text-ink">{selectedEnrollment.email}</div>
              </div>
              <div>
                <div className="text-xs text-ink-muted uppercase mb-1">Source</div>
                <div className="font-semibold text-ink capitalize">{selectedEnrollment.howDidYouHear}</div>
              </div>
              <div>
                <div className="text-xs text-ink-muted uppercase mb-1">Status</div>
                {getStatusBadge(selectedEnrollment.status)}
              </div>
            </div>

            <button
              onClick={() => setSelectedEnrollment(null)}
              className="w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            >
              Close
            </button>
          </Card>
        </div>
      )}
    </div>
  )
}