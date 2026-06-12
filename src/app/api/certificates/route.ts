import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      participantName,
      participantEmail,
      eventName,
      eventId,
      templateUrl,
    } = await request.json()

    const issuer = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    })

    const certificateId = `CERT-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`

    const certificate = await prisma.certificate.create({
      data: {
        certificateId,
        participantName,
        participantEmail,
        eventName,
        eventId,
        templateUrl,
        issuedById: issuer!.id,
      },
    })

    return NextResponse.json(certificate, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const certificateId = searchParams.get('certificateId')

    let query: any = {}
    if (certificateId) {
      query.certificateId = certificateId
    }

    const certificate = await prisma.certificate.findFirst({
      where: query,
      include: {
        issuedBy: true,
      },
    })

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    return NextResponse.json({
      ...certificate,
      isVerified: !certificate.isTampered,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
