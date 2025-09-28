# Prisma Client Singleton

This project uses a Prisma client singleton pattern to prevent multiple database connections in development and ensure proper connection management.

## Usage

Instead of creating new PrismaClient instances throughout the application, always import and use the singleton:

```typescript
// ✅ Correct - Use the singleton
import prisma from "@/lib/prisma";

// ❌ Incorrect - Don't create new instances
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

## Implementation

The singleton is implemented in `/lib/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
```

## Benefits

1. **Prevents connection issues** in development with hot reloading
2. **Ensures single connection** across the application
3. **Proper cleanup** and connection management
4. **Type safety** with TypeScript

## API Routes Using Prisma

All API routes in this project use the singleton:

- `/api/qr/save/route.ts` - Save QR codes
- `/api/qr/route.ts` - Fetch user's QR codes
- `/api/qr/[id]/route.ts` - Get/delete specific QR code
- `/api/qr/[id]/download/route.ts` - Update download count
- `/api/user/stats/route.ts` - Get user statistics

## Best Practices

1. Always import from `@/lib/prisma`
2. Never create new PrismaClient instances
3. Use the singleton in API routes, server components, and server actions
4. The singleton handles connection pooling automatically
