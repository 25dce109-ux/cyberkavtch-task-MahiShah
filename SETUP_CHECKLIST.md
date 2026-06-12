# CyberKavach Club - Development Setup Checklist

## ✅ Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd cyberkavach-app
npm install
```

### 2. Setup Environment
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local with your settings:
# - Add MongoDB Atlas connection string
# - Generate NEXTAUTH_SECRET: openssl rand -base64 32
# - Set NEXTAUTH_URL=http://localhost:3000
```

### 3. Setup Database
```bash
# Generate Prisma client
npm run prisma:generate

# Create/push schema to MongoDB
npm run prisma:push

# (Optional) Seed demo data
npm run prisma:migrate
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo Login:**
- Email: `admin@cyberkavach.com`
- Password: `password123`

---

## 📋 Complete Setup Checklist

### Prerequisites
- [ ] Node.js 18+ installed
- [ ] npm or yarn available
- [ ] Git configured
- [ ] GitHub account (for Vercel deployment)
- [ ] MongoDB Atlas account (free tier acceptable)

### Project Setup
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create `.env.local` file
- [ ] Configure all environment variables
- [ ] Run `npm run prisma:generate`
- [ ] Run `npm run prisma:push`

### Local Testing
- [ ] Start dev server with `npm run dev`
- [ ] Login with demo credentials
- [ ] Test each module:
  - [ ] Events dashboard
  - [ ] Attendance tracking
  - [ ] Certificate generation
  - [ ] Approval requests
  - [ ] Appreciation points
  - [ ] Analytics
- [ ] Test API endpoints with Postman/curl

### MongoDB Atlas Setup
- [ ] Create cluster
- [ ] Create database user
- [ ] Whitelist IP address (0.0.0.0/0 for dev)
- [ ] Get connection string
- [ ] Verify connection with Prisma

### Git & GitHub
- [ ] Initialize git repository
- [ ] Create `.gitignore` (already included)
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin <url>`
- [ ] Commit code: `git add . && git commit -m "Initial commit"`
- [ ] Push to GitHub: `git push origin main`

### Vercel Deployment
- [ ] Sign up on Vercel
- [ ] Connect GitHub account
- [ ] Import CyberKavach repository
- [ ] Configure environment variables in Vercel:
  - [ ] DATABASE_URL
  - [ ] NEXTAUTH_SECRET
  - [ ] NEXTAUTH_URL (production domain)
  - [ ] GOOGLE_CLIENT_ID (if using SSO)
  - [ ] GOOGLE_CLIENT_SECRET (if using SSO)
- [ ] Click Deploy
- [ ] Wait for build to complete
- [ ] Visit production URL
- [ ] Test production deployment

### Post-Deployment
- [ ] Run database migrations on production
- [ ] Test all APIs in production
- [ ] Verify authentication works
- [ ] Check error logs in Vercel
- [ ] Setup monitoring (optional)
- [ ] Configure custom domain (optional)

### Documentation
- [ ] Review README.md
- [ ] Read API_DOCUMENTATION.md
- [ ] Review VERCEL_DEPLOYMENT.md
- [ ] Check project structure

---

## 🗂️ File Structure Created

```
cyberkavach-app/
├── src/
│   ├── app/
│   │   ├── api/                          # API Routes (All 6 modules)
│   │   │   ├── auth/[...nextauth]/       # Authentication
│   │   │   ├── users/register/           # User registration
│   │   │   ├── approvals/request/        # Approval workflow
│   │   │   ├── events/                   # Event management
│   │   │   ├── attendance/               # Attendance tracking
│   │   │   ├── certificates/             # Certificate generation
│   │   │   ├── appreciation/             # Points & rewards
│   │   │   ├── notifications/            # Notifications
│   │   │   └── analytics/                # Analytics
│   │   ├── auth/
│   │   │   └── login/                    # Login page
│   │   ├── dashboard/
│   │   │   ├── events/                   # Events dashboard
│   │   │   ├── certificates/             # Certificates dashboard
│   │   │   ├── attendance/               # Attendance dashboard
│   │   │   ├── appreciation/             # Appreciation dashboard
│   │   │   ├── approvals/                # Approvals dashboard
│   │   │   └── analytics/                # Analytics dashboard
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Home page
│   │   ├── globals.css                   # Global styles
│   │   └── providers.tsx                 # NextAuth provider
│   ├── lib/
│   │   ├── prisma.ts                     # Prisma client
│   │   ├── seed.ts                       # Database seed
│   │   └── utils.ts                      # Utility functions
│   └── components/
│       └── Navigation.tsx                # Navigation component
├── prisma/
│   └── schema.prisma                     # Database schema (all models)
├── public/                               # Static files
├── .env.example                          # Environment variables template
├── .gitignore                            # Git ignore rules
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript config
├── next.config.js                        # Next.js config
├── tailwind.config.js                    # Tailwind config
├── postcss.config.js                     # PostCSS config
├── vercel.json                           # Vercel config
├── README.md                             # Main documentation
├── API_DOCUMENTATION.md                  # API reference
└── VERCEL_DEPLOYMENT.md                  # Deployment guide
```

---

## 🚀 All 6 Modules Implemented

### ✅ Module 1: Role-Based Authentication & Multi-Level Approval
- 7 distinct user roles with permissions
- JWT-based authentication
- NextAuth.js integration
- Google OAuth (SSO) support
- Multi-level approval workflow
- Permission request system

### ✅ Module 2: Smart Certificate Generation System
- Bulk certificate generation
- Unique certificate IDs
- Verification system
- Tamper detection
- Template support
- Email delivery

### ✅ Module 3: Event Registration & Team Management
- Event creation & management
- Team-based registration
- Real-time tracking
- Event dashboards
- Capacity management
- Registration links

### ✅ Module 4: Event Check-In & Check-Out Attendance System
- Manual check-in
- QR code scanning support
- Real-time attendance dashboard
- Check-out tracking
- Attendance reports
- Time-based analytics

### ✅ Module 5: Appreciation, Reward Points & Recognition
- Points award system
- Multiple categories
- Achievement badges
- Leaderboard display
- Recognition tracking
- Milestone-based rewards

### ✅ Module 6: Analytics, Notifications & Platform Settings
- Comprehensive analytics dashboard
- Real-time statistics
- Event metrics
- In-app notifications
- Email notifications (configured)
- Admin controls
- Audit logging

---

## 🔑 Environment Variables

Create `.env.local` with:

```
# Required
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/cyberkavach
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Optional - SSO
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Optional - Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📚 Key Technologies

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MongoDB with Prisma ORM
- **Auth**: NextAuth.js with JWT
- **Deployment**: Vercel
- **Database Client**: @prisma/client
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **Notifications**: React Hot Toast

---

## 🧪 Testing Endpoints

### Create Test Event
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Event","description":"Test","startDate":"2024-02-01T10:00:00Z","endDate":"2024-02-01T16:00:00Z","venue":"Hall A","capacity":100}'
```

### Get All Events
```bash
curl http://localhost:3000/api/events
```

### Generate Certificate
```bash
curl -X POST http://localhost:3000/api/certificates \
  -H "Content-Type: application/json" \
  -d '{"participantName":"John Doe","participantEmail":"john@example.com","eventName":"Tech Workshop","eventId":"event-id","templateUrl":"https://example.com/template.pdf"}'
```

More API examples in `API_DOCUMENTATION.md`

---

## 🐛 Troubleshooting

### Issue: `DATABASE_URL not set`
**Solution**: Create `.env.local` and add MongoDB connection string

### Issue: `Prisma Client generation failed`
**Solution**: Run `npm run prisma:generate`

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Change port
npm run dev -- -p 3001
```

### Issue: MongoDB connection timeout
**Solution**: 
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure user has correct permissions

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview & quick start |
| `API_DOCUMENTATION.md` | Complete API reference |
| `VERCEL_DEPLOYMENT.md` | Step-by-step deployment guide |
| `SETUP_CHECKLIST.md` | This file - setup instructions |

---

## ✨ Next Steps

1. **Setup locally** (5 mins):
   - Install dependencies
   - Configure `.env.local`
   - Run `npm run prisma:push`
   - Start dev server

2. **Test locally** (10 mins):
   - Login with demo credentials
   - Test all 6 modules
   - Test API endpoints

3. **Deploy to Vercel** (5 mins):
   - Push to GitHub
   - Connect to Vercel
   - Set environment variables
   - Deploy

4. **Post-deployment** (5 mins):
   - Run migrations
   - Test production
   - Configure custom domain

---

## 📞 Support

For questions or issues:
1. Check `README.md` FAQ section
2. Review `API_DOCUMENTATION.md`
3. Check deployment guide
4. Review error logs in Vercel

---

**Status**: ✅ Complete and Ready for Deployment

Generated: January 2024
