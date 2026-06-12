# Vercel Deployment Guide for CyberKavach Club

## Pre-Deployment Checklist

- [ ] All code committed to GitHub
- [ ] Environment variables documented
- [ ] MongoDB Atlas account created and configured
- [ ] All tests passing locally
- [ ] README.md updated
- [ ] API documentation complete

---

## Step-by-Step Deployment

### 1. Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (Free tier: M0)
3. Create a database user
4. Get connection string (copy to `.env.local`)
5. Add `0.0.0.0/0` to IP allowlist for development

### 2. Generate NextAuth Secret

```bash
# On your local machine
openssl rand -base64 32
# Copy the output for use in Vercel
```

### 3. Connect GitHub to Vercel

1. Visit [vercel.com](https://vercel.com/dashboard)
2. Sign up or log in with GitHub
3. Click "New Project"
4. Select your GitHub repository
5. Import the project

### 4. Configure Environment Variables

In Vercel Project Settings > Environment Variables, add:

```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/cyberkavach?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-generated-secret-key
NEXTAUTH_URL=https://your-app.vercel.app
GOOGLE_CLIENT_ID=your-google-id (optional)
GOOGLE_CLIENT_SECRET=your-google-secret (optional)
SMTP_HOST=smtp.gmail.com (optional)
SMTP_PORT=587 (optional)
SMTP_USER=your-email (optional)
SMTP_PASS=your-app-password (optional)
```

### 5. Deploy

1. Vercel automatically detects Next.js
2. Configure build settings (usually auto-detected):
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. Click "Deploy"
4. Wait for deployment to complete (~2-3 minutes)

### 6. Post-Deployment Setup

After successful deployment:

```bash
# Option A: Use Vercel CLI locally
npm i -g vercel
vercel env pull  # Pull production env vars
npm run prisma:push  # Run migrations on production DB

# Option B: Through Vercel Dashboard
# The app will automatically run migrations on first deployment
```

---

## Troubleshooting Deployment

### Build Failures

**Error**: `Module not found`
```
Solution:
1. Clear build cache: Vercel Dashboard > Settings > Build Cache > Clear
2. Redeploy
```

**Error**: `Prisma Client generation failed`
```
Solution:
1. Add to vercel.json:
{
  "buildCommand": "npm run prisma:generate && next build"
}
```

### Runtime Errors

**Error**: `DATABASE_URL is not set`
```
Solution:
1. Go to Vercel > Settings > Environment Variables
2. Ensure DATABASE_URL is set for Production
3. Redeploy
```

**Error**: `NextAuth error on production`
```
Solution:
1. Verify NEXTAUTH_SECRET is set
2. Verify NEXTAUTH_URL matches your domain
3. Check OAuth credentials (if using SSO)
```

---

## Performance Optimization

### 1. Enable ISR (Incremental Static Regeneration)

For analytics pages, add revalidation:
```typescript
export const revalidate = 60 // Revalidate every 60 seconds
```

### 2. Use Image Optimization

Ensure images are optimized:
```typescript
import Image from 'next/image'

<Image 
  src="/certificate.png" 
  alt="Certificate" 
  width={800} 
  height={600}
  priority={false}
/>
```

### 3. Enable Compression

Vercel handles this automatically, but verify in logs.

---

## Monitoring & Logs

### View Deployment Logs

1. Go to Vercel Dashboard > Deployments
2. Click on a deployment
3. View Build Logs or Function Logs

### Setup Error Tracking

```typescript
// In your API routes, add error logging
import { captureException } from '@sentry/nextjs'

try {
  // Your code
} catch (error) {
  captureException(error)
}
```

---

## Continuous Integration

### Auto-Deploy on Push

Vercel automatically deploys when you push to main branch.

To prevent deployment:
- Commit message: `[skip ci]`

### Preview Deployments

Every pull request gets a preview URL automatically.

---

## Scaling & Limits

### Vercel Free Plan Limits
- Deployments: Unlimited
- Bandwidth: 100 GB/month
- Function timeout: 10 seconds
- Database: Use MongoDB Atlas free tier

### When to Upgrade
- Traffic exceeds 100GB/month
- Need longer function timeout (Pro: 60s)
- Need advanced features

---

## Custom Domain

1. Go to Vercel Project > Settings > Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Update NEXTAUTH_URL to custom domain

---

## Rollback

To roll back to previous deployment:

1. Vercel Dashboard > Deployments
2. Find previous deployment
3. Click "..." > "Promote to Production"

---

## Backup & Recovery

### Database Backups

MongoDB Atlas automatically backs up every 2 hours (paid plans).

For free tier, manually export:
```bash
mongoexport --uri="your-connection-string" --out=backup.json
```

---

## SSL/TLS Certificate

Vercel automatically provides free SSL certificate for all domains.

---

## Environment-Specific Configuration

### Development
```
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=local or development database
```

### Staging (optional)
```
NEXTAUTH_URL=https://staging-cyberkavach.vercel.app
DATABASE_URL=staging database
```

### Production
```
NEXTAUTH_URL=https://cyberkavach.vercel.app
DATABASE_URL=production database
```

---

## Post-Deployment Testing

```bash
# Test API endpoints
curl https://your-app.vercel.app/api/events

# Test authentication
curl -X POST https://your-app.vercel.app/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Test database connection
# Check logs in Vercel dashboard
```

---

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [MongoDB Atlas Support](https://docs.atlas.mongodb.com/)

---

## Quick Deployment Commands

```bash
# Clone and setup locally
git clone <repo>
cd cyberkavach-app
npm install
npm run prisma:push

# Test locally
npm run dev

# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Visit: https://vercel.com/dashboard
# Select repository and click Deploy
```

---

## Troubleshooting Checklist

- [ ] Environment variables set in Vercel
- [ ] MongoDB Atlas accessible (IP whitelist)
- [ ] GitHub repository connected
- [ ] Build logs showing success
- [ ] Production database migrated (prisma:push)
- [ ] API endpoints responding
- [ ] Authentication working
- [ ] Static assets loading

For issues, check Vercel Function Logs and MongoDB Atlas logs.
