import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        qrCodes: true
      }
    });

    if (!user) {
      return NextResponse.json({
        totalQRCodes: 0,
        totalDownloads: 0,
        totalScans: 0,
        thisMonth: 0
      });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const thisMonthQRCodes = await prisma.qRCode.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: startOfMonth
        }
      }
    });

    const totalDownloads = user.qrCodes.reduce((sum, qr) => sum + qr.downloadCount, 0);
    const totalScans = user.qrCodes.reduce((sum, qr) => sum + qr.scanCount, 0);

    return NextResponse.json({
      totalQRCodes: user.qrCodes.length,
      totalDownloads,
      totalScans,
      thisMonth: thisMonthQRCodes
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 }
    );
  }
}
