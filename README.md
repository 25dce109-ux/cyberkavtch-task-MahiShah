# CyberKavach Club - Digital Operating System Platform

A comprehensive, role-based web platform for managing CyberKavach Club operations including events, certifications, attendance tracking, approvals, and member appreciation.

## 🎯 Features

### Module 1: Role-Based Authentication & Multi-Level Approval Workflow
- 7 distinct user roles with specific permissions
- JWT-based session management
- SSO integration (Google OAuth)
- Multi-level approval hierarchy
- Permission request system with escalation

### Module 2: Smart Certificate Generation System
- Bulk certificate generation (300+ per batch)
- Certificate verification and tamper detection
- Customizable templates
- Direct email delivery to participants
- Unique certificate IDs with verification links

### Module 3: Event Registration & Team Management
- Event creation and management
- Team-based registration
- Real-time registration tracking
- Event dashboard with analytics
- Shareable registration links with QR codes

### Module 4: Event Check-In & Check-Out Attendance System
- Manual and QR code-based check-in
- Real-time attendance dashboard
- Check-out tracking
- Attendance reports and exports
- Late arrival/early departure flags

### Module 5: Appreciation, Reward Points & Recognition System
- Points assignment with categories
- Achievement badges system
- Leaderboard with rankings
- Automatic badge awards at milestones
- Recognition reports by semester/year

### Module 6: Analytics, Notifications & Platform Settings
- Comprehensive analytics dashboards
- Real-time event analytics
- Email and in-app notifications
- Platform administration controls
- Audit logging of all actions

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (optimized)
- **Additional**: JWT, bcrypt, Nodemailer

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Vercel account (for deployment)

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd cyberkavach-app
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/cyberkavach?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_SECRET=your-secret-key-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional for SSO)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Service (optional for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 3. Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to MongoDB
npm run prisma:push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

- **Email**: admin@cyberkavach.com
- **Password**: password123

## 📁 Project Structure

```
cyberkavach-app/
├── src/
│   ├── app/
│   │   ├── api/              # All API routes
│   │   ├── auth/             # Authentication pages
│   │   ├── dashboard/        # Module dashboards
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client
│   │   └── utils/            # Utility functions
│   └── components/           # Reusable components
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static files
├── .env.example              # Environment template
├── next.config.js            # Next.js config
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind config
└── package.json              # Dependencies
```

## 🔌 API Routes

| Module | Endpoint | Method | Purpose |
|--------|----------|--------|---------|
| Auth | `/api/auth/[...nextauth]` | POST | User authentication |
| Users | `/api/users/register` | POST | User registration |
| Approvals | `/api/approvals/request` | POST/GET | Approval requests |
| Events | `/api/events` | POST/GET | Event management |
| Attendance | `/api/attendance` | POST/GET/PUT | Attendance tracking |
| Certificates | `/api/certificates` | POST/GET | Certificate generation |
| Appreciation | `/api/appreciation` | POST/GET | Points & rewards |
| Notifications | `/api/notifications` | POST/GET/PUT | User notifications |
| Analytics | `/api/analytics` | GET | Platform analytics |

## 🚀 Deployment to Vercel

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Initial CyberKavach deployment"
git push origin main
```

### 2. Connect to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Configure environment variables in Project Settings
5. Add all `.env.local` variables
6. Click "Deploy"

### 3. Post-Deployment

After deployment:
```bash
# Run migrations on production database
npm run prisma:push -- --skip-generate
```

## 🔐 User Roles & Permissions

| Role | Dashboard Access | Key Actions |
|------|------------------|-------------|
| Faculty Coordinator | Full System | Final approvals, analytics |
| Student Coordinator | Events, Attendance | Event planning, team mgmt |
| Tech Coordinator | Tech module | Resource requests, IT support |
| Content Coordinator | Content module | Blog, newsletters, content |
| Social Media Coordinator | Social module | Social posts, campaigns |
| Club Member | Member dashboard | Register events, view points |
| Student (Guest/New) | Public registration | Browse events, register |

## 📊 Database Schema

The application uses MongoDB with Prisma ORM. Key collections:

- **User**: User accounts and profiles
- **ApprovalRequest**: Workflow requests
- **Event**: Event details and metadata
- **Team**: Team registrations for events
- **AttendanceRecord**: Check-in/out logs
- **Certificate**: Generated certificates
- **AppreciationPoints**: Reward tracking
- **Notification**: User notifications
- **AuditLog**: System activity logs

## 🛠️ Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database management
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Create migration
npm run prisma:push        # Push schema to DB
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify connection string in `.env.local`
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### NextAuth Not Working
- Generate new NEXTAUTH_SECRET
- Verify NEXTAUTH_URL matches deployment URL
- Check OAuth credentials are correct

### Prisma Errors
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Regenerate Prisma client: `npm run prisma:generate`

## 📝 License

© 2024 CyberKavach Club. All rights reserved.

## 🤝 Support

For issues and questions, contact the development team.
