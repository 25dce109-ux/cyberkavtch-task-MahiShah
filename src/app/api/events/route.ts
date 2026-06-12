import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description, startDate, endDate, venue, capacity } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    })

    const event = await prisma.event.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        venue,
        capacity: capacity || 0,
        organizerId: user!.id,
      },
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        organizer: true,
      },
      orderBy: { startDate: 'desc' },
    })

    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
