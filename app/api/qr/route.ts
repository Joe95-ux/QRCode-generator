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
        qrCodes: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ qrCodes: [] });
    }

    return NextResponse.json({
      qrCodes: user.qrCodes.map(qr => ({
        id: qr.id,
        title: qr.title,
        type: qr.type,
        content: qr.content,
        downloadCount: qr.downloadCount,
        scanCount: qr.scanCount,
        createdAt: qr.createdAt,
      }))
    });
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    return NextResponse.json(
      { error: "Failed to fetch QR codes" },
      { status: 500 }
    );
  }
}
