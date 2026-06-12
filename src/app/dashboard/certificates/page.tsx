'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Certificate {
  id: string
  certificateId: string
  participantName: string
  eventName: string
  isVerified: boolean
  createdAt: string
}

export default function CertificatesDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    participantName: '',
    participantEmail: '',
    eventName: '',
    eventId: '',
    templateUrl: '',
  })

  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
      return
    }
  }, [session, router])

  const handleGenerateCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const newCert = await response.json()
        setCertificates([newCert, ...certificates])
        setShowForm(false)
        setFormData({
          participantName: '',
          participantEmail: '',
          eventName: '',
          eventId: '',
          templateUrl: '',
        })
      }
    } catch (error) {
      console.error('Error generating certificate:', error)
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Certificate Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          + Generate Certificate
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Generate New Certificate</h2>
          <form onSubmit={handleGenerateCertificate} className="space-y-4">
            <input
              type="text"
              placeholder="Participant Name"
              value={formData.participantName}
              onChange={(e) => setFormData({ ...formData, participantName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Participant Email"
              value={formData.participantEmail}
              onChange={(e) => setFormData({ ...formData, participantEmail: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Event Name"
              value={formData.eventName}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Event ID"
              value={formData.eventId}
              onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="url"
              placeholder="Template URL (optional)"
              value={formData.templateUrl}
              onChange={(e) => setFormData({ ...formData, templateUrl: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button type="submit" className="btn-primary w-full">
              Generate Certificate
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left py-3 px-4">Participant</th>
              <th className="text-left py-3 px-4">Event</th>
              <th className="text-left py-3 px-4">Certificate ID</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Generated</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{cert.participantName}</td>
                <td className="py-3 px-4">{cert.eventName}</td>
                <td className="py-3 px-4 text-sm font-mono text-blue-600">{cert.certificateId}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    cert.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cert.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{new Date(cert.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
