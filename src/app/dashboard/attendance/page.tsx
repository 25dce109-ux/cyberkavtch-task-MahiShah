'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface AttendanceRecord {
  id: string
  participant: { name: string; email: string }
  checkInTime: string
  checkOutTime: string | null
  status: string
  event: { name: string }
}

export default function AttendanceDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [qrValue, setQrValue] = useState('')
  const [eventId, setEventId] = useState('')

  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
      return
    }
    fetchAttendance()
  }, [session, router])

  const fetchAttendance = async () => {
    try {
      const response = await fetch('/api/attendance')
      const data = await response.json()
      setRecords(data)
    } catch (error) {
      console.error('Error fetching attendance:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckIn = async (email: string) => {
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          participantEmail: email,
          checkInMethod: 'QR_CODE',
        }),
      })
      if (response.ok) {
        fetchAttendance()
        setQrValue('')
      }
    } catch (error) {
      console.error('Error checking in:', error)
    }
  }

  if (loading) return <div className="p-8">Loading attendance records...</div>

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Attendance Tracking</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Check-In via QR</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Event ID"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="QR Code / Email"
            value={qrValue}
            onChange={(e) => setQrValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && qrValue) {
                handleCheckIn(qrValue)
              }
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Participant</th>
                <th className="text-left py-2">Event</th>
                <th className="text-left py-2">Check-In Time</th>
                <th className="text-left py-2">Check-Out Time</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <div>
                      <p className="font-semibold">{record.participant.name}</p>
                      <p className="text-sm text-gray-600">{record.participant.email}</p>
                    </div>
                  </td>
                  <td className="py-3">{record.event.name}</td>
                  <td className="py-3">{new Date(record.checkInTime).toLocaleTimeString()}</td>
                  <td className="py-3">
                    {record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString() : '-'}
                  </td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      record.status === 'CHECKED_IN' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
