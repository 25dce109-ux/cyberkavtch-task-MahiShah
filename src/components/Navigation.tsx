'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Navigation() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <nav className="bg-white shadow-md">
      <div className="container flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🛡️ CyberKavach
        </Link>

        {session && (
          <div className="hidden md:flex gap-6">
            <NavLink
              href="/dashboard/events"
              label="Events"
              active={isActive('/dashboard/events')}
            />
            <NavLink
              href="/dashboard/certificates"
              label="Certificates"
              active={isActive('/dashboard/certificates')}
            />
            <NavLink
              href="/dashboard/attendance"
              label="Attendance"
              active={isActive('/dashboard/attendance')}
            />
            <NavLink
              href="/dashboard/appreciation"
              label="Appreciation"
              active={isActive('/dashboard/appreciation')}
            />
            <NavLink
              href="/dashboard/approvals"
              label="Approvals"
              active={isActive('/dashboard/approvals')}
            />
            <NavLink
              href="/dashboard/analytics"
              label="Analytics"
              active={isActive('/dashboard/analytics')}
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          {session && (
            <>
              <span className="text-gray-700 text-sm">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, label, active }: any) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-lg transition ${
        active
          ? 'bg-blue-100 text-blue-600 font-semibold'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </Link>
  )
}
