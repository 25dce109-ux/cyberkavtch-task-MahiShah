'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface AppreciationRecord {
  id: string
  member: { name: string }
  points: number
  category: string
  reason: string
  createdAt: string
}

export default function AppreciationDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [records, setRecords] = useState<AppreciationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    memberId: '',
    points: 0,
    category: 'Event Management',
    reason: '',
  })

  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
      return
    }
    fetchRecords()
  }, [session, router])

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/appreciation')
      const data = await response.json()
      setRecords(data)
    } catch (error) {
      console.error('Error fetching appreciation records:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAwardPoints = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/appreciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        fetchRecords()
        setShowForm(false)
        setFormData({ memberId: '', points: 0, category: 'Event Management', reason: '' })
      }
    } catch (error) {
      console.error('Error awarding points:', error)
    }
  }

  if (loading) return <div className="p-8">Loading appreciation records...</div>

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Appreciation & Rewards</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          + Award Points
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Award Appreciation Points</h2>
          <form onSubmit={handleAwardPoints} className="space-y-4">
            <input
              type="text"
              placeholder="Member ID"
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Points"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>Event Management</option>
              <option>Creative Contribution</option>
              <option>Technical Contribution</option>
              <option>Leadership</option>
              <option>Community Building</option>
            </select>
            <textarea
              placeholder="Reason for awarding"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <button type="submit" className="btn-primary w-full">
              Award Points
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record) => (
          <div key={record.id} className="card">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-800">{record.member.name}</h3>
              <span className="text-2xl font-bold text-yellow-500">+{record.points}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{record.category}</p>
            <p className="text-gray-700 mb-3">{record.reason}</p>
            <p className="text-xs text-gray-500">{new Date(record.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
