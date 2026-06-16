# CyberKavach Club Management System

A polished static web application built with HTML, CSS, JavaScript and Local Storage.

## Overview
CyberKavach is a complete club management suite for event administration, approval workflows, certificate generation, attendance tracking, rewards, analytics, and role-based dashboards.

## Features
- Landing page with modern cyber-security design
- Login and registration system stored in Local Storage
- Multi-role dashboards for faculty, student, tech, content, social, member and guest
- Approval management with timeline and status badges
- Certificate creation, preview, verification and download simulation
- Event creation, edit, delete, search and team registration with QR simulation
- Attendance check-in/out, live counts and CSV export
- Rewards leaderboard, badges and achievement history
- Analytics charts using Chart.js
- Settings with theme preferences and account details
- AI assistant widget, notifications, toast messages, back-to-top and scroll progress

## Project Structure
```
CyberKavach/
│ index.html
│ login.html
│ register.html
│ 404.html
│
├── pages/
│      dashboard-faculty.html
│      dashboard-student.html
│      dashboard-tech.html
│      dashboard-content.html
│      dashboard-social.html
│      dashboard-member.html
│      dashboard-guest.html
│      approvals.html
│      certificates.html
│      events.html
│      attendance.html
│      rewards.html
│      analytics.html
│      settings.html
│
├── css/
│      style.css
│      dashboard.css
│      forms.css
│      animations.css
│      responsive.css
│
├── js/
│      auth.js
│      dashboard.js
│      approval.js
│      event.js
│      certificate.js
│      attendance.js
│      rewards.js
│      analytics.js
│      settings.js
│      storage.js
│
├── assets/
│      images/
│      icons/
│      logo/
```

## Deployment
This is a static site ready for deployment on Vercel. Upload the `CyberKavach` folder and set the root to `CyberKavach` if needed.

## How to Use
1. Open `index.html` in a browser.
2. Register a new user or use the sample data.
3. Login with a selected role to explore role-specific dashboards.

## Notes
- All data is stored locally in the browser using Local Storage.
- Charts use a CDN copy of Chart.js in the analytics page.
