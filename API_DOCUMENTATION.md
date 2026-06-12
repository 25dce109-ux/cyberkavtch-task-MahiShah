# CyberKavach Club API Documentation

## Base URL
```
http://localhost:3000/api
https://cyberkavach.vercel.app/api (Production)
```

## Authentication
All protected endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

Tokens are automatically set via NextAuth.js session cookies.

---

## Endpoints

### 1. Authentication & Users

#### Register User
```
POST /users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "User Name",
  "password": "securePassword",
  "role": "CLUB_MEMBER"
}

Response: 201 Created
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "User Name",
    "role": "CLUB_MEMBER"
  }
}
```

#### Sign In
```
POST /auth/[...nextauth]
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

Response: 200 OK
Returns session cookie automatically
```

---

### 2. Approval Requests

#### Create Approval Request
```
POST /approvals/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "requestType": "EVENT_PERMISSION",
  "title": "Sports Meet 2024",
  "description": "Request to organize annual sports meet",
  "timeline": "March 15-20, 2024",
  "priority": "HIGH"
}

Response: 201 Created
{
  "id": "...",
  "requestType": "EVENT_PERMISSION",
  "status": "PENDING",
  "title": "Sports Meet 2024",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Get User's Approval Requests
```
GET /approvals/request
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "...",
    "requestType": "EVENT_PERMISSION",
    "status": "PENDING",
    "title": "Sports Meet 2024",
    "requesterEmail": "user@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### 3. Events

#### Create Event
```
POST /events
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Tech Workshop 2024",
  "description": "Learn latest web technologies",
  "startDate": "2024-02-01T10:00:00Z",
  "endDate": "2024-02-01T16:00:00Z",
  "venue": "Main Auditorium",
  "capacity": 300
}

Response: 201 Created
{
  "id": "...",
  "name": "Tech Workshop 2024",
  "status": "DRAFT",
  "capacity": 300,
  "registeredCount": 0,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Get All Events
```
GET /events

Response: 200 OK
[
  {
    "id": "...",
    "name": "Tech Workshop 2024",
    "startDate": "2024-02-01T10:00:00Z",
    "venue": "Main Auditorium",
    "capacity": 300,
    "registeredCount": 45,
    "status": "PUBLISHED"
  }
]
```

---

### 4. Attendance

#### Check-In
```
POST /attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventId": "event-id",
  "participantEmail": "student@example.com",
  "checkInMethod": "QR_CODE"
}

Response: 201 Created
{
  "id": "...",
  "eventId": "event-id",
  "participantEmail": "student@example.com",
  "checkInTime": "2024-02-01T10:05:30Z",
  "status": "CHECKED_IN"
}
```

#### Check-Out
```
PUT /attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "attendanceId": "record-id"
}

Response: 200 OK
{
  "id": "record-id",
  "checkOutTime": "2024-02-01T15:55:30Z",
  "status": "CHECKED_OUT"
}
```

#### Get Attendance Records
```
GET /attendance?eventId=event-id
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "...",
    "participant": { "name": "John Doe", "email": "john@example.com" },
    "checkInTime": "2024-02-01T10:05:30Z",
    "checkOutTime": "2024-02-01T15:55:30Z",
    "status": "CHECKED_OUT"
  }
]
```

---

### 5. Certificates

#### Generate Certificate
```
POST /certificates
Authorization: Bearer <token>
Content-Type: application/json

{
  "participantName": "John Doe",
  "participantEmail": "john@example.com",
  "eventName": "Tech Workshop 2024",
  "eventId": "event-id",
  "templateUrl": "https://example.com/certificate-template.pdf"
}

Response: 201 Created
{
  "id": "...",
  "certificateId": "CERT-1234567890-ABC123",
  "participantName": "John Doe",
  "eventName": "Tech Workshop 2024",
  "isVerified": true,
  "createdAt": "2024-02-01T16:00:00Z"
}
```

#### Verify Certificate
```
GET /certificates?certificateId=CERT-1234567890-ABC123

Response: 200 OK
{
  "id": "...",
  "certificateId": "CERT-1234567890-ABC123",
  "participantName": "John Doe",
  "eventName": "Tech Workshop 2024",
  "isVerified": true,
  "isTampered": false,
  "issuedBy": { "name": "Admin User" }
}
```

---

### 6. Appreciation Points

#### Award Points
```
POST /appreciation
Authorization: Bearer <token>
Content-Type: application/json

{
  "memberId": "member-id",
  "points": 50,
  "category": "Event Management",
  "reason": "Excellently organized the tech workshop"
}

Response: 201 Created
{
  "id": "...",
  "memberId": "member-id",
  "points": 50,
  "category": "Event Management",
  "reason": "Excellently organized the tech workshop",
  "awardedBy": "admin@example.com",
  "createdAt": "2024-02-01T16:00:00Z"
}
```

#### Get Member's Points
```
GET /appreciation?memberId=member-id
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "...",
    "points": 50,
    "category": "Event Management",
    "reason": "Excellently organized the tech workshop",
    "createdAt": "2024-02-01T16:00:00Z"
  }
]
```

---

### 7. Notifications

#### Create Notification
```
POST /notifications
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipientId": "user-id",
  "title": "Event Reminder",
  "message": "Tech Workshop starts in 1 hour",
  "type": "EVENT_REMINDER",
  "relatedId": "event-id"
}

Response: 201 Created
{
  "id": "...",
  "title": "Event Reminder",
  "message": "Tech Workshop starts in 1 hour",
  "type": "EVENT_REMINDER",
  "isRead": false,
  "createdAt": "2024-02-01T09:00:00Z"
}
```

#### Get Notifications
```
GET /notifications
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "...",
    "title": "Event Reminder",
    "message": "Tech Workshop starts in 1 hour",
    "type": "EVENT_REMINDER",
    "isRead": false,
    "createdAt": "2024-02-01T09:00:00Z"
  }
]
```

#### Mark as Read
```
PUT /notifications
Authorization: Bearer <token>
Content-Type: application/json

{
  "notificationId": "notification-id"
}

Response: 200 OK
{
  "id": "notification-id",
  "isRead": true,
  "readAt": "2024-02-01T09:05:00Z"
}
```

---

### 8. Analytics

#### Get Analytics
```
GET /analytics
Authorization: Bearer <token>

Response: 200 OK
{
  "eventCount": 12,
  "attendanceCount": 450,
  "pendingApprovals": 5,
  "certificateCount": 320,
  "memberCount": 85,
  "topContributors": [
    {
      "id": "...",
      "totalPoints": 500,
      "badges": ["Leadership Award", "Excellence Award"]
    }
  ]
}
```

---

## Error Responses

All errors follow this format:

```
{
  "error": "Error message description"
}
```

### Common Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- 100 requests per 10 minutes per IP
- 1000 requests per hour per user

---

## Webhooks (Future)

Webhooks for:
- Event created
- Certificate generated
- Attendance marked
- Points awarded
- Approval status changed

---

## SDK/Client Examples

### JavaScript/TypeScript
```typescript
const response = await fetch('/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'Tech Workshop',
    // ...
  })
})
const data = await response.json()
```

### cURL
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"name":"Tech Workshop"}'
```

---

## Support

For API support, contact: api-support@cyberkavach.com
