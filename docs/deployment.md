# Deployment and Configuration Guide

This document provides comprehensive information about deploying and configuring the QR Code Generator application.

## 🚀 Deployment Overview

The application is designed for deployment on Vercel with MongoDB Atlas as the database. This guide covers both development and production deployment scenarios.

## 📋 Prerequisites

### Required Accounts
- **Vercel Account**: For hosting and deployment
- **MongoDB Atlas Account**: For database hosting
- **Clerk Account**: For authentication
- **GitHub Account**: For version control (optional but recommended)

### Required Tools
- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **Git**: For version control
- **Vercel CLI**: For deployment management

## 🔧 Environment Configuration

### Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Database Configuration
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/qrcode-generator?retryWrites=true&w=majority"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Application Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Optional: Error Tracking
SENTRY_DSN="https://..."
```

### Production Environment Variables

For production deployment, configure these variables in your Vercel dashboard:

```env
# Database (Production)
DATABASE_URL="mongodb+srv://prod-username:prod-password@prod-cluster.mongodb.net/qrcode-generator-prod?retryWrites=true&w=majority"

# Authentication (Production)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."

# Application (Production)
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
```

## 🗄️ Database Setup

### MongoDB Atlas Configuration

1. **Create MongoDB Atlas Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster

2. **Configure Database Access**
   ```javascript
   // Create database user
   Username: qrcode-app
   Password: [generate secure password]
   Database User Privileges: Read and write to any database
   ```

3. **Configure Network Access**
   ```
   IP Whitelist: 0.0.0.0/0 (for Vercel deployment)
   Or specific Vercel IP ranges
   ```

4. **Get Connection String**
   ```
   mongodb+srv://qrcode-app:<password>@cluster.mongodb.net/qrcode-generator?retryWrites=true&w=majority
   ```

### Database Schema Setup

1. **Install Prisma CLI**
   ```bash
   npm install -g prisma
   ```

2. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

3. **Push Schema to Database**
   ```bash
   npx prisma db push
   ```

4. **Verify Database Connection**
   ```bash
   npx prisma studio
   ```

## 🔐 Authentication Setup

### Clerk Configuration

1. **Create Clerk Account**
   - Visit [Clerk](https://clerk.com)
   - Sign up for a free account
   - Create a new application

2. **Configure Application Settings**
   ```
   Application Name: QR Code Generator
   Environment: Development/Production
   ```

3. **Get API Keys**
   - Copy the Publishable Key
   - Copy the Secret Key
   - Add to environment variables

4. **Configure Authentication Methods**
   ```
   Email/Password: Enabled
   Social Logins: Optional (Google, GitHub, etc.)
   ```

5. **Configure Redirect URLs**
   ```
   Development: http://localhost:3000
   Production: https://your-domain.com
   ```

## 🚀 Vercel Deployment

### Automatic Deployment (Recommended)

1. **Connect GitHub Repository**
   - Push your code to GitHub
   - Connect repository to Vercel
   - Enable automatic deployments

2. **Configure Vercel Project**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Set Environment Variables**
   - Add all production environment variables
   - Ensure all secrets are properly configured

4. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Monitor deployment logs for any issues

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Project**
   ```bash
   vercel
   ```

4. **Configure Production Settings**
   ```bash
   vercel env add DATABASE_URL
   vercel env add CLERK_SECRET_KEY
   # Add all other environment variables
   ```

## 🔧 Development Setup

### Local Development

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd qrcode-generator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Setup Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access Application**
   ```
   http://localhost:3000
   ```

### Development Tools

**Prisma Studio**
```bash
npx prisma studio
# Access at http://localhost:5555
```

**React Query DevTools**
```bash
# Automatically available in development
# Access via browser extension or built-in devtools
```

**ESLint**
```bash
npm run lint
```

**TypeScript Check**
```bash
npx tsc --noEmit
```

## 📊 Monitoring and Analytics

### Application Monitoring

**Vercel Analytics**
- Built-in analytics for Vercel deployments
- Monitor performance and usage
- Track Core Web Vitals

**Error Tracking**
```typescript
// Optional: Sentry integration
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

**Performance Monitoring**
```typescript
// Optional: Custom analytics
const trackEvent = (event: string, data: any) => {
  // Implement your analytics tracking
};
```

### Database Monitoring

**MongoDB Atlas Monitoring**
- Monitor database performance
- Track query execution times
- Monitor connection usage

**Prisma Metrics**
```typescript
// Monitor Prisma queries
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

## 🔒 Security Configuration

### Environment Security

**Secrets Management**
- Use Vercel's environment variables for secrets
- Never commit secrets to version control
- Rotate secrets regularly

**Database Security**
- Use strong passwords for database users
- Enable IP whitelisting
- Use SSL/TLS connections

**Authentication Security**
- Configure proper redirect URLs
- Use HTTPS in production
- Implement rate limiting

### Security Headers

**Next.js Security Headers**
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

## 📈 Performance Optimization

### Build Optimization

**Next.js Configuration**
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ['example.com'],
  },
  compress: true,
};
```

**Bundle Analysis**
```bash
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

### Database Optimization

**Connection Pooling**
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

**Query Optimization**
- Use database indexes
- Optimize Prisma queries
- Implement query caching

## 🔄 CI/CD Pipeline

### GitHub Actions

**Automated Testing**
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
```

**Automated Deployment**
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🧪 Testing

### Unit Testing

**Setup Jest and Testing Library**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Test Configuration**
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
```

**Example Test**
```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

### Integration Testing

**API Testing**
```typescript
// __tests__/api/qr.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/qr/route';

test('GET /api/qr returns user QR codes', async () => {
  const { req, res } = createMocks({
    method: 'GET',
  });

  await handler(req, res);
  expect(res._getStatusCode()).toBe(200);
});
```

## 🚨 Troubleshooting

### Common Deployment Issues

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for TypeScript errors
- Review build logs

**Database Connection Issues**
- Verify DATABASE_URL format
- Check MongoDB Atlas network access
- Ensure database user permissions
- Test connection string

**Authentication Issues**
- Verify Clerk configuration
- Check redirect URLs
- Ensure environment variables are set
- Test authentication flow

### Performance Issues

**Slow Database Queries**
- Check database indexes
- Optimize Prisma queries
- Monitor connection pool usage
- Review query execution plans

**Slow Build Times**
- Optimize bundle size
- Use build caching
- Review dependencies
- Consider build optimization

### Monitoring and Debugging

**Application Logs**
```bash
# Vercel logs
vercel logs

# Local development
npm run dev
```

**Database Debugging**
```bash
# Prisma Studio
npx prisma studio

# Database connection test
npx prisma db pull
```

## 📚 Maintenance

### Regular Maintenance Tasks

**Weekly**
- Monitor application performance
- Check error logs
- Review user feedback
- Update dependencies

**Monthly**
- Security updates
- Database optimization
- Performance analysis
- Backup verification

**Quarterly**
- Major dependency updates
- Security audit
- Performance review
- Feature planning

### Backup Strategy

**Database Backups**
- MongoDB Atlas automatic backups
- Regular backup verification
- Point-in-time recovery testing

**Code Backups**
- GitHub repository
- Regular commits
- Branch protection
- Release tagging

---

*This deployment guide is maintained alongside the application. For the most up-to-date information, refer to the current configuration files.*
