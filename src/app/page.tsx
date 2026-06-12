'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700">
      <nav className="bg-white shadow">
        <div className="container flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-blue-600">CyberKavach Club</h1>
          <div className="flex gap-4">
            <span className="text-gray-700">{session?.user?.name}</span>
            <Link href="/api/auth/signout" className="text-red-600">Logout</Link>
          </div>
        </div>
      </nav>

      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module Cards */}
          <ModuleCard 
            title="Authentication"
            description="Role-based login & Multi-level approvals"
            icon="🔐"
            href="/dashboard/auth"
          />
          <ModuleCard 
            title="Certificates"
            description="Generate, verify & track certificates"
            icon="📜"
            href="/dashboard/certificates"
          />
          <ModuleCard 
            title="Events"
            description="Create & manage events"
            icon="📅"
            href="/dashboard/events"
          />
          <ModuleCard 
            title="Attendance"
            description="Check-in/Check-out with QR codes"
            icon="✓"
            href="/dashboard/attendance"
          />
          <ModuleCard 
            title="Appreciation"
            description="Points & recognition system"
            icon="⭐"
            href="/dashboard/appreciation"
          />
          <ModuleCard 
            title="Analytics"
            description="Dashboards & reporting"
            icon="📊"
            href="/dashboard/analytics"
          />
        </div>
      </main>
    </div>
  )
}

function ModuleCard({ title, description, icon, href }: any) {
  return (
    <Link href={href}>
      <div className="card cursor-pointer hover:scale-105 transition">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </Link>
  )
}
