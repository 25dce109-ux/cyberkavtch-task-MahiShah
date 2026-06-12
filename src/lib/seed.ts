import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...')

    // Create admin user
    const adminEmail = 'admin@cyberkavach.com'
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('password123', 10)
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: 'Admin User',
          password: hashedPassword,
          role: 'FACULTY_COORDINATOR',
          department: 'Administration',
          isEmailVerified: true,
        },
      })
      console.log('✅ Admin user created')
    }

    // Create sample students
    const studentEmails = [
      'student1@cyberkavach.com',
      'student2@cyberkavach.com',
      'student3@cyberkavach.com',
    ]

    for (const email of studentEmails) {
      const existing = await prisma.user.findUnique({ where: { email } })
      if (!existing) {
        const hashedPassword = await bcrypt.hash('password123', 10)
        await prisma.user.create({
          data: {
            email,
            name: email.split('@')[0],
            password: hashedPassword,
            role: 'CLUB_MEMBER',
            isEmailVerified: true,
          },
        })
      }
    }

    console.log('✅ Database seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run seed if executed directly
if (require.main === module) {
  seedDatabase()
}
