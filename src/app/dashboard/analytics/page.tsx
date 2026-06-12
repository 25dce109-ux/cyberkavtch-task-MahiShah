'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface AnalyticsData {
  eventCount: number
  attendanceCount: number
  pendingApprovals: number
  certificateCount: number
  memberCount: number
  topContributors: any[]
}

export default function AnalyticsDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
      return
    }

    fetchAnalytics()
  }, [session, router])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8">Loading analytics...</div>
  }

  if (!analytics) {
    return <div className="p-8">Failed to load analytics</div>
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Events" value={analytics.eventCount} icon="📅" />
        <StatCard title="Attendance Records" value={analytics.attendanceCount} icon="✓" />
        <StatCard title="Pending Approvals" value={analytics.pendingApprovals} icon="⏳" />
        <StatCard title="Certificates Issued" value={analytics.certificateCount} icon="📜" />
        <StatCard title="Club Members" value={analytics.memberCount} icon="👥" />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Contributors</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Contributor</th>
                <th className="text-left py-2">Total Points</th>
                <th className="text-left py-2">Badges</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topContributors.map((contributor) => (
                <tr key={contributor.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{contributor.id}</td>
                  <td className="py-3 font-bold text-blue-600">{contributor.totalPoints || 0}</td>
                  <td className="py-3">{contributor.badges?.join(', ') || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className="card bg-white">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  )
}
