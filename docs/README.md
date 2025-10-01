# QR Code Generator - Knowledge Base

Welcome to the comprehensive knowledge base for the QR Code Generator application. This documentation covers all aspects of the application, from architecture to user guides.

## 📚 Table of Contents

1. [Application Overview](#application-overview)
2. [Architecture & Components](#architecture--components)
3. [API Documentation](#api-documentation)
4. [Database Schema](#database-schema)
5. [User Guides](#user-guides)
6. [Development Guide](#development-guide)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

## 🚀 Application Overview

The QR Code Generator is a modern, full-stack web application built with Next.js 15, React 19, and TypeScript. It provides users with the ability to create, customize, and manage QR codes for various content types.

### Key Features

- **Multi-type QR Code Generation**: Support for 17+ different QR code types
- **Custom Design Options**: Color, size, and error correction customization
- **User Authentication**: Secure user management with Clerk
- **Analytics & Tracking**: Scan and download tracking
- **Responsive Design**: Mobile-first, modern UI
- **Real-time Updates**: Live preview and instant generation

### Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI components
- **Authentication**: Clerk
- **Database**: MongoDB with Prisma ORM
- **State Management**: TanStack Query (React Query)
- **QR Generation**: qrcode library
- **Deployment**: Vercel-ready

## 🏗️ Architecture & Components

### Project Structure

```
qrcode-generator/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API endpoints
│   ├── dashboard/         # User dashboard
│   ├── generate/          # QR code generation
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── providers/        # Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── prisma/               # Database schema
└── public/               # Static assets
```

### Core Components

#### 1. QR Code Generation Flow
- **Type Selection**: Choose from 17+ QR code types
- **Content Input**: Enter data to encode
- **Design Customization**: Customize appearance
- **Preview & Generation**: Real-time preview

#### 2. Dashboard Management
- **QR Code List**: View all user's QR codes
- **Analytics**: Track scans and downloads
- **Actions**: Edit, delete, download QR codes
- **Search & Filter**: Find specific QR codes

#### 3. User Interface
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Full dark/light theme support
- **Accessibility**: WCAG compliant components
- **Modern UX**: Smooth animations and transitions

## 🔌 API Documentation

### Authentication Endpoints

All API routes require user authentication via Clerk middleware.

### QR Code Endpoints

#### `GET /api/qr`
Retrieve all QR codes for the authenticated user.

**Response:**
```json
{
  "qrCodes": [
    {
      "id": "string",
      "title": "string",
      "type": "WEBSITE",
      "content": "string",
      "qrCodeData": "string",
      "downloadCount": 0,
      "scanCount": 0,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### `POST /api/qr/generate`
Generate a new QR code.

**Request Body:**
```json
{
  "content": "string",
  "settings": {
    "size": 256,
    "color": "#000000",
    "backgroundColor": "#ffffff",
    "errorCorrection": "M"
  }
}
```

**Response:**
```json
{
  "qrCodeDataURL": "data:image/png;base64,..."
}
```

#### `POST /api/qr/save`
Save a generated QR code to the database.

**Request Body:**
```json
{
  "title": "string",
  "type": "WEBSITE",
  "content": "string",
  "qrCodeData": "string",
  "settings": {
    "size": 256,
    "color": "#000000",
    "backgroundColor": "#ffffff",
    "errorCorrection": "M"
  }
}
```

#### `GET /api/qr/[id]`
Retrieve a specific QR code by ID.

#### `PUT /api/qr/[id]`
Update an existing QR code.

#### `DELETE /api/qr/[id]`
Delete a QR code.

#### `POST /api/qr/[id]/download`
Track a download event for a QR code.

### User Statistics

#### `GET /api/user/stats`
Get user statistics and analytics.

**Response:**
```json
{
  "totalQRCodes": 0,
  "totalDownloads": 0,
  "totalScans": 0,
  "thisMonth": 0
}
```

## 🗄️ Database Schema

### Models

#### User
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

#### QRCode
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

#### Scan
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

#### QRDownload
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

### Enums

#### QRType
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

## 👥 User Guides

### Creating Your First QR Code

1. **Navigate to Generate**: Click "Create QR Code" from the dashboard
2. **Choose Type**: Select from 17+ QR code types
3. **Enter Content**: Add your data (URL, text, contact info, etc.)
4. **Customize Design**: Adjust colors, size, and error correction
5. **Generate**: Click "Create QR Code" to generate
6. **Save**: QR code is automatically saved to your dashboard

### Managing QR Codes

#### Dashboard Features
- **View All QR Codes**: See all your generated QR codes
- **Search & Filter**: Find specific QR codes by title, content, or type
- **Analytics**: Track downloads and scans
- **Bulk Actions**: Download, edit, or delete multiple QR codes

#### QR Code Actions
- **View**: See full QR code details and analytics
- **Edit**: Modify content and design
- **Download**: Save as PNG file
- **Delete**: Remove from your account

### QR Code Types

#### Website QR Codes
- **Purpose**: Direct users to websites
- **Content**: Full URL (e.g., https://example.com)
- **Use Cases**: Marketing, business cards, social media

#### Contact QR Codes (vCard)
- **Purpose**: Share contact information
- **Content**: Name, phone, email, address
- **Use Cases**: Business cards, networking

#### WiFi QR Codes
- **Purpose**: Share WiFi credentials
- **Content**: Network name, password, security type
- **Use Cases**: Restaurants, offices, events

#### Text QR Codes
- **Purpose**: Share plain text messages
- **Content**: Any text content
- **Use Cases**: Instructions, messages, notes

#### Social Media QR Codes
- **Purpose**: Link to social media profiles
- **Content**: Profile URLs
- **Use Cases**: Marketing, personal branding

## 🛠️ Development Guide

### Getting Started

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd qrcode-generator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Configure your environment variables
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

### Environment Variables

```env
# Database
DATABASE_URL="mongodb://localhost:27017/qrcode-generator"

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Code Structure

#### Custom Hooks
- `use-qr-codes.ts`: QR code management hooks
- `useUserStats`: User analytics hooks

#### Components
- `QRDesignStep`: QR code customization component
- `Navbar`: Navigation component
- `ThemeModeToggle`: Dark/light mode toggle

#### Utilities
- `qr-generator.ts`: QR code generation utilities
- `utils.ts`: General utility functions

### Adding New QR Code Types

1. **Update Enum**: Add new type to `QRType` enum in schema
2. **Update Types**: Add to `QR_TYPES` array in components
3. **Add Icon**: Import and add icon from Lucide React
4. **Update Validation**: Add validation rules if needed

### Styling Guidelines

- **Tailwind CSS**: Use utility classes for styling
- **Dark Mode**: Always provide dark mode variants
- **Responsive**: Mobile-first design approach
- **Accessibility**: Use semantic HTML and ARIA labels

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment**: Set environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on push to main branch

### Environment Variables for Production

```env
DATABASE_URL="mongodb+srv://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Database Migration

```bash
npx prisma db push
npx prisma generate
```

## 🔧 Troubleshooting

### Common Issues

#### QR Code Generation Fails
- **Check Content**: Ensure content is valid for the selected type
- **Size Limits**: Large content may require higher error correction
- **Network**: Check API endpoint connectivity

#### Authentication Issues
- **Clerk Configuration**: Verify Clerk keys are correct
- **Middleware**: Check middleware configuration
- **Session**: Clear browser cache and cookies

#### Database Connection
- **MongoDB URL**: Verify connection string
- **Prisma**: Run `npx prisma generate` after schema changes
- **Network**: Check MongoDB Atlas firewall settings

#### Performance Issues
- **Image Size**: Large QR codes may impact performance
- **Caching**: Check React Query cache configuration
- **Bundle Size**: Monitor bundle size with Next.js analyzer

### Debug Mode

Enable debug logging:
```env
DEBUG=true
NODE_ENV=development
```

### Support

For additional support:
- Check application logs in Vercel dashboard
- Review Prisma logs for database issues
- Use React Query DevTools for state debugging

---

## 📝 Changelog

### Version 1.0.0
- Initial release
- 17+ QR code types
- User authentication
- Analytics tracking
- Responsive design

---

*This knowledge base is maintained and updated regularly. For the latest information, always refer to the current documentation.*
