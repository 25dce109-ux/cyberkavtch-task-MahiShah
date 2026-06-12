'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ApprovalRequest {
  id: string
  requestType: string
  status: string
  title: string
  requesterEmail: string
  createdAt: string
}

export default function ApprovalsDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [requests, setRequests] = useState<ApprovalRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    requestType: 'EVENT_PERMISSION',
    title: '',
    description: '',
    timeline: '',
    priority: 'NORMAL',
  })

  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
      return
    }
    fetchRequests()
  }, [session, router])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/approvals/request')
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.error('Error fetching approval requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/approvals/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        fetchRequests()
        setShowForm(false)
        setFormData({
          requestType: 'EVENT_PERMISSION',
          title: '',
          description: '',
          timeline: '',
          priority: 'NORMAL',
        })
      }
    } catch (error) {
      console.error('Error submitting request:', error)
    }
  }

  if (loading) return <div className="p-8">Loading approval requests...</div>

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Approval Requests</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          + New Request
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Submit Approval Request</h2>
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <select
              value={formData.requestType}
              onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="EVENT_PERMISSION">Event Permission</option>
              <option value="RESOURCE_VENUE">Resource/Venue Booking</option>
              <option value="BUDGET_APPROVAL">Budget Approval</option>
              <option value="SOCIAL_MEDIA_POSTING">Social Media Posting</option>
              <option value="CERTIFICATE_GENERATION">Certificate Generation</option>
              <option value="EXTERNAL_COLLABORATION">External Collaboration</option>
            </select>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Timeline"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
            <button type="submit" className="btn-primary w-full">
              Submit Request
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Type</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Requester</th>
              <th className="text-left py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{request.title}</td>
                <td className="py-3 px-4">{request.requestType}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{request.requesterEmail}</td>
                <td className="py-3 px-4 text-sm">{new Date(request.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
