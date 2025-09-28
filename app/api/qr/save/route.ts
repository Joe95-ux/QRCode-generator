import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, type, content, qrCodeData, settings } = body;

    if (!title || !type || !content || !qrCodeData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: "", // Will be updated when user completes profile
        }
      });
    }

    // Save QR code
    const qrCode = await prisma.qRCode.create({
      data: {
        userId: user.id,
        type,
        title,
        content,
        qrCodeData,
        settings: settings || {},
      }
    });

    return NextResponse.json({
      success: true,
      qrCode: {
        id: qrCode.id,
        title: qrCode.title,
        type: qrCode.type,
        content: qrCode.content,
        downloadCount: qrCode.downloadCount,
        scanCount: qrCode.scanCount,
        createdAt: qrCode.createdAt,
      }
    });
  } catch (error) {
    console.error("Error saving QR code:", error);
    return NextResponse.json(
      { error: "Failed to save QR code" },
      { status: 500 }
    );
  }
}
