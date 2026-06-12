import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { eventId, participantEmail, checkInMethod } = await request.json()

    const participant = await prisma.user.findUnique({
      where: { email: participantEmail },
    })

    if (!participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 })
    }

    const attendance = await prisma.attendanceRecord.create({
      data: {
        eventId,
        participantId: participant.id,
        participantEmail,
        checkInMethod: checkInMethod || 'MANUAL',
        checkInTime: new Date(),
        status: 'CHECKED_IN',
      },
    })

    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { attendanceId } = await request.json()

    const updated = await prisma.attendanceRecord.update({
      where: { id: attendanceId },
      data: {
        checkOutTime: new Date(),
        status: 'CHECKED_OUT',
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const eventId = searchParams.get('eventId')

    const attendance = await prisma.attendanceRecord.findMany({
      where: eventId ? { eventId } : {},
      include: {
        participant: true,
        event: true,
      },
      orderBy: { checkInTime: 'desc' },
    })

    return NextResponse.json(attendance)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
