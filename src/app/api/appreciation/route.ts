import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { memberId, points, category, reason } = await request.json()

    const awardUser = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    })

    const appreciation = await prisma.appreciationPoints.create({
      data: {
        memberId,
        points,
        category,
        reason,
        awardedBy: awardUser!.email,
      },
    })

    return NextResponse.json(appreciation, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const memberId = searchParams.get('memberId')

    const appreciation = await prisma.appreciationPoints.findMany({
      where: memberId ? { memberId } : {},
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(appreciation)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
