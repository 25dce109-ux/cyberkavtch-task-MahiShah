import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    })

    // Event stats
    const eventCount = await prisma.event.count()
    const attendanceCount = await prisma.attendanceRecord.count()

    // Approval stats
    const pendingApprovals = await prisma.approvalRequest.count({
      where: { status: 'PENDING' },
    })

    // Certificate stats
    const certificateCount = await prisma.certificate.count()

    // Member stats
    const memberCount = await prisma.user.count({
      where: { role: 'CLUB_MEMBER' },
    })

    // Top contributors
    const topContributors = await prisma.appreciationPoints.findMany({
      take: 10,
      orderBy: { totalPoints: 'desc' },
    })

    return NextResponse.json({
      eventCount,
      attendanceCount,
      pendingApprovals,
      certificateCount,
      memberCount,
      topContributors,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
