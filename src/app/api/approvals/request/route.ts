import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { requestType, title, description, timeline, priority } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    })

    const approvalRequest = await prisma.approvalRequest.create({
      data: {
        requestType,
        title,
        description,
        timeline: timeline || '',
        priority: priority || 'NORMAL',
        requesterEmail: session.user?.email!,
        requesterId: user!.id,
      },
    })

    return NextResponse.json(approvalRequest, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const requests = await prisma.approvalRequest.findMany({
      where: {
        requesterEmail: session.user?.email,
      },
      include: {
        requester: true,
        approvedBy: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(requests)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
