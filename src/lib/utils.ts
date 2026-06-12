// Common utility functions

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateCertificateId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `CERT-${timestamp}-${random}`
}

export function generateQRCode(data: string): string {
  // In production, use a QR code library like qrcode
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`
}

export async function validateEmail(email: string): Promise<boolean> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function calculatePointsPercentage(current: number, total: number): number {
  return Math.round((current / total) * 100)
}

export const APPROVAL_HIERARCHY = [
  'CLUB_MEMBER',
  'STUDENT_COORDINATOR',
  'TECH_COORDINATOR',
  'CONTENT_COORDINATOR',
  'SOCIAL_MEDIA_COORDINATOR',
  'FACULTY_COORDINATOR',
]

export const ROLE_LABELS: Record<string, string> = {
  FACULTY_COORDINATOR: 'Faculty Coordinator',
  STUDENT_COORDINATOR: 'Student Coordinator',
  TECH_COORDINATOR: 'Tech Coordinator',
  CONTENT_COORDINATOR: 'Content Coordinator',
  SOCIAL_MEDIA_COORDINATOR: 'Social Media Coordinator',
  CLUB_MEMBER: 'Club Member',
  STUDENT_PARTICIPANT: 'Student (Guest/New)',
}

export const REQUEST_TYPES: Record<string, string> = {
  EVENT_PERMISSION: 'Event Permission',
  RESOURCE_VENUE: 'Resource/Venue Booking',
  BUDGET_APPROVAL: 'Budget Approval',
  SOCIAL_MEDIA_POSTING: 'Social Media Posting',
  CERTIFICATE_GENERATION: 'Certificate Generation',
  EXTERNAL_COLLABORATION: 'External Collaboration',
}

export const APPRECIATION_CATEGORIES = [
  'Event Management',
  'Creative Contribution',
  'Technical Contribution',
  'Leadership',
  'Community Building',
  'Innovation Award',
  'Excellence Award',
]
