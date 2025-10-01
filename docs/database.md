# Database Schema Documentation

This document provides comprehensive information about the database schema, data models, and relationships in the QR Code Generator application.

## 🗄️ Database Overview

**Database Type**: MongoDB
**ORM**: Prisma
**Connection**: MongoDB Atlas (Production) / Local MongoDB (Development)

## 📊 Data Models

### User Model

**Purpose**: Stores user account information and authentication data.

```prisma
model User {
  id             String        @id @default(auto()) @map("_id") @db.ObjectId
  clerkUserId    String        @unique
  email          String?
  plan           String        @default("free")
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  subscriptions  Subscription[]
  qrCodes        QRCode[]
  activities     Activity[]
}
```

**Fields**:
- `id`: Unique identifier (MongoDB ObjectId)
- `clerkUserId`: Clerk authentication user ID
- `email`: User's email address (optional)
- `plan`: User's subscription plan (free, pro, enterprise)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

**Relationships**:
- One-to-many with `Subscription[]`
- One-to-many with `QRCode[]`
- One-to-many with `Activity[]`

**Indexes**:
- Primary key on `id`
- Unique index on `clerkUserId`

---

### Subscription Model

**Purpose**: Manages user subscription plans and billing.

```prisma
model Subscription {
  id             String     @id @default(auto()) @map("_id") @db.ObjectId
  userId         String     @db.ObjectId
  user           User       @relation(fields: [userId], references: [id])

  plan           String     // e.g. "free", "pro", "enterprise"
  status         String     // "active", "canceled", "expired"
  startDate      DateTime   @default(now())
  endDate        DateTime?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}
```

**Fields**:
- `id`: Unique identifier
- `userId`: Reference to User
- `plan`: Subscription plan name
- `status`: Current subscription status
- `startDate`: Subscription start date
- `endDate`: Subscription end date (null for active)
- `createdAt`: Record creation timestamp
- `updatedAt`: Last update timestamp

**Relationships**:
- Many-to-one with `User`

**Indexes**:
- Primary key on `id`
- Foreign key on `userId`

---

### QRCode Model

**Purpose**: Stores QR code data and metadata.

```prisma
model QRCode {
  id             String        @id @default(auto()) @map("_id") @db.ObjectId
  userId         String        @db.ObjectId
  user           User          @relation(fields: [userId], references: [id])

  type           QRType
  data           Json
  design         Json?
  slug           String        @unique
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  scans          Scan[]
  downloads      QRDownload[]
  activities     Activity[]
}
```

**Fields**:
- `id`: Unique identifier
- `userId`: Reference to User
- `type`: QR code type (enum)
- `data`: QR code content data (JSON)
- `design`: Design settings (JSON, optional)
- `slug`: Unique URL slug
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Relationships**:
- Many-to-one with `User`
- One-to-many with `Scan[]`
- One-to-many with `QRDownload[]`
- One-to-many with `Activity[]`

**Indexes**:
- Primary key on `id`
- Foreign key on `userId`
- Unique index on `slug`

**JSON Data Structure**:
```json
{
  "title": "My Website QR",
  "content": "https://example.com",
  "settings": {
    "size": 256,
    "color": "#000000",
    "backgroundColor": "#ffffff",
    "errorCorrection": "M"
  }
}
```

---

### Scan Model

**Purpose**: Tracks QR code scan events for analytics.

```prisma
model Scan {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  qrCodeId       String    @db.ObjectId
  qrCode         QRCode    @relation(fields: [qrCodeId], references: [id])

  createdAt      DateTime  @default(now())
  ip             String
  userAgent      String
  location       Json?     // { city, country, lat, lng }

  activities     Activity[]
}
```

**Fields**:
- `id`: Unique identifier
- `qrCodeId`: Reference to QRCode
- `createdAt`: Scan timestamp
- `ip`: Scanner's IP address
- `userAgent`: Scanner's user agent string
- `location`: Geographic location data (optional)

**Relationships**:
- Many-to-one with `QRCode`
- One-to-many with `Activity[]`

**Indexes**:
- Primary key on `id`
- Foreign key on `qrCodeId`
- Index on `createdAt` for time-based queries

**Location JSON Structure**:
```json
{
  "city": "San Francisco",
  "country": "United States",
  "lat": 37.7749,
  "lng": -122.4194
}
```

---

### QRDownload Model

**Purpose**: Tracks QR code download events.

```prisma
model QRDownload {
  id             String       @id @default(auto()) @map("_id") @db.ObjectId
  qrCodeId       String       @db.ObjectId
  qrCode         QRCode       @relation(fields: [qrCodeId], references: [id])

  fileFormat     FileFormat
  createdAt      DateTime     @default(now())

  activities     Activity[]
}
```

**Fields**:
- `id`: Unique identifier
- `qrCodeId`: Reference to QRCode
- `fileFormat`: Downloaded file format
- `createdAt`: Download timestamp

**Relationships**:
- Many-to-one with `QRCode`
- One-to-many with `Activity[]`

**Indexes**:
- Primary key on `id`
- Foreign key on `qrCodeId`
- Index on `createdAt`

---

### Activity Model

**Purpose**: Audit trail for user actions and system events.

```prisma
model Activity {
  id             String        @id @default(auto()) @map("_id") @db.ObjectId
  userId         String        @db.ObjectId
  user           User          @relation(fields: [userId], references: [id])

  type           ActivityType
  description    String?       // e.g. "User scanned QR code", "QR updated"
  createdAt      DateTime      @default(now())

  // optional links (not all will be populated depending on activity type)
  qrCodeId       String?       @db.ObjectId
  qrCode         QRCode?       @relation(fields: [qrCodeId], references: [id])

  scanId         String?       @db.ObjectId
  scan           Scan?         @relation(fields: [scanId], references: [id])

  downloadId     String?       @db.ObjectId
  download       QRDownload?   @relation(fields: [downloadId], references: [id])
}
```

**Fields**:
- `id`: Unique identifier
- `userId`: Reference to User
- `type`: Activity type (enum)
- `description`: Human-readable description
- `createdAt`: Activity timestamp
- `qrCodeId`: Optional QR code reference
- `scanId`: Optional scan reference
- `downloadId`: Optional download reference

**Relationships**:
- Many-to-one with `User`
- Many-to-one with `QRCode` (optional)
- Many-to-one with `Scan` (optional)
- Many-to-one with `QRDownload` (optional)

**Indexes**:
- Primary key on `id`
- Foreign key on `userId`
- Index on `createdAt`
- Index on `type`

---

## 🔢 Enums

### QRType Enum

**Purpose**: Defines supported QR code types.

```prisma
enum QRType {
  WEBSITE
  PDF
  VCARD
  BUSINESS
  VIDEO
  IMAGE
  FACEBOOK
  INSTAGRAM
  SOCIAL_MEDIA
  LIST_OF_LINKS
  WHATSAPP
  MP3
  MENU
  APP
  COUPON
  WIFI
  TEXT
  EMAIL
  SMS
  PHONE
}
```

**Usage Examples**:
- `WEBSITE`: URLs and web links
- `VCARD`: Contact information
- `WIFI`: WiFi network credentials
- `TEXT`: Plain text content
- `EMAIL`: Email addresses
- `PHONE`: Phone numbers
- `SMS`: Text messages

---

### FileFormat Enum

**Purpose**: Defines supported file formats for downloads.

```prisma
enum FileFormat {
  PNG
  JPG
  JPEG
  SVG
  PDF
}
```

**Usage**:
- `PNG`: Most common format for QR codes
- `JPG/JPEG`: Alternative image format
- `SVG`: Vector format for scalability
- `PDF`: Document format

---

### ActivityType Enum

**Purpose**: Defines types of user activities for audit trail.

```prisma
enum ActivityType {
  CREATE
  UPDATE
  DELETE
  DOWNLOAD
  SCAN
}
```

**Usage**:
- `CREATE`: QR code creation
- `UPDATE`: QR code modification
- `DELETE`: QR code deletion
- `DOWNLOAD`: QR code download
- `SCAN`: QR code scan

---

## 🔗 Relationships

### Entity Relationship Diagram

```
User (1) ──────── (N) QRCode
  │                    │
  │                    │
  │                    ├── (N) Scan
  │                    │
  │                    ├── (N) QRDownload
  │                    │
  │                    └── (N) Activity
  │
  ├── (N) Subscription
  │
  └── (N) Activity
```

### Relationship Details

#### User → QRCode (1:N)
- One user can have many QR codes
- Each QR code belongs to one user
- Cascade delete: When user is deleted, all QR codes are deleted

#### User → Subscription (1:N)
- One user can have many subscriptions (historical)
- Each subscription belongs to one user
- Cascade delete: When user is deleted, all subscriptions are deleted

#### QRCode → Scan (1:N)
- One QR code can have many scans
- Each scan belongs to one QR code
- Cascade delete: When QR code is deleted, all scans are deleted

#### QRCode → QRDownload (1:N)
- One QR code can have many downloads
- Each download belongs to one QR code
- Cascade delete: When QR code is deleted, all downloads are deleted

#### User → Activity (1:N)
- One user can have many activities
- Each activity belongs to one user
- Cascade delete: When user is deleted, all activities are deleted

---

## 📊 Indexes and Performance

### Primary Indexes
- All models have primary key on `id` field
- MongoDB automatically creates unique index on `_id`

### Foreign Key Indexes
- `User.clerkUserId`: Unique index for authentication
- `QRCode.userId`: Index for user queries
- `QRCode.slug`: Unique index for URL routing
- `Scan.qrCodeId`: Index for QR code queries
- `QRDownload.qrCodeId`: Index for download queries
- `Activity.userId`: Index for user activity queries

### Performance Indexes
- `Scan.createdAt`: Index for time-based queries
- `QRDownload.createdAt`: Index for download analytics
- `Activity.createdAt`: Index for activity timeline
- `Activity.type`: Index for activity filtering

### Compound Indexes
```javascript
// User activity queries
{ userId: 1, createdAt: -1 }

// QR code analytics
{ qrCodeId: 1, createdAt: -1 }

// Activity filtering
{ userId: 1, type: 1, createdAt: -1 }
```

---

## 🔄 Data Migration

### Schema Changes

When modifying the schema:

1. **Update Prisma Schema**: Modify `schema.prisma`
2. **Generate Client**: Run `npx prisma generate`
3. **Push Changes**: Run `npx prisma db push`
4. **Update Application**: Update TypeScript types

### Data Migration Scripts

```typescript
// Example: Add new field to existing records
const migrateUserPlans = async () => {
  await prisma.user.updateMany({
    where: { plan: null },
    data: { plan: 'free' }
  });
};
```

---

## 🔒 Data Security

### Access Control

- **User Data**: Users can only access their own data
- **Authentication**: All database operations require valid user session
- **Authorization**: Middleware validates user permissions

### Data Validation

- **Required Fields**: Enforced at database level
- **Type Safety**: Prisma provides compile-time type checking
- **Format Validation**: JSON fields validated on application level

### Privacy Considerations

- **IP Addresses**: Stored for analytics, consider anonymization
- **User Agents**: Stored for analytics, consider truncation
- **Location Data**: Optional, user consent required
- **Email Addresses**: Optional, not required for functionality

---

## 📈 Analytics Queries

### Common Analytics Queries

#### User Statistics
```typescript
// Get user's QR code count
const qrCodeCount = await prisma.qrCode.count({
  where: { userId: user.id }
});

// Get total downloads
const totalDownloads = await prisma.qRDownload.count({
  where: { qrCode: { userId: user.id } }
});

// Get total scans
const totalScans = await prisma.scan.count({
  where: { qrCode: { userId: user.id } }
});
```

#### QR Code Analytics
```typescript
// Get QR code with analytics
const qrCodeWithStats = await prisma.qrCode.findUnique({
  where: { id: qrCodeId },
  include: {
    _count: {
      select: {
        scans: true,
        downloads: true
      }
    }
  }
});
```

#### Time-based Analytics
```typescript
// Get scans in last 30 days
const recentScans = await prisma.scan.count({
  where: {
    qrCode: { userId: user.id },
    createdAt: {
      gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  }
});
```

---

## 🧪 Database Testing

### Test Data Setup

```typescript
// Create test user
const testUser = await prisma.user.create({
  data: {
    clerkUserId: 'test_user_123',
    email: 'test@example.com',
    plan: 'free'
  }
});

// Create test QR code
const testQRCode = await prisma.qrCode.create({
  data: {
    userId: testUser.id,
    type: 'WEBSITE',
    data: { content: 'https://example.com' },
    slug: 'test-qr-code'
  }
});
```

### Test Cleanup

```typescript
// Clean up test data
await prisma.activity.deleteMany({
  where: { user: { clerkUserId: 'test_user_123' } }
});

await prisma.qrCode.deleteMany({
  where: { user: { clerkUserId: 'test_user_123' } }
});

await prisma.user.deleteMany({
  where: { clerkUserId: 'test_user_123' }
});
```

---

## 🔧 Database Maintenance

### Regular Maintenance Tasks

1. **Index Optimization**: Monitor query performance
2. **Data Cleanup**: Remove old activity logs
3. **Backup Verification**: Ensure backups are working
4. **Performance Monitoring**: Track query execution times

### Monitoring Queries

```typescript
// Check database health
const dbStats = await prisma.$runCommandRaw({ dbStats: 1 });

// Check index usage
const indexStats = await prisma.$runCommandRaw({ collStats: 'User' });
```

---

*This database documentation is maintained alongside the schema. For the most up-to-date information, refer to the Prisma schema file.*
