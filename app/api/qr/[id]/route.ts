import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const qrCode = await prisma.qRCode.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    });

    if (!qrCode) {
      return NextResponse.json(
        { error: "QR code not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: qrCode.id,
      title: qrCode.title,
      type: qrCode.type,
      content: qrCode.content,
      qrCodeData: qrCode.qrCodeData,
      settings: qrCode.settings,
      downloadCount: qrCode.downloadCount,
      scanCount: qrCode.scanCount,
      createdAt: qrCode.createdAt,
      updatedAt: qrCode.updatedAt
    });
  } catch (error) {
    console.error("Error fetching QR code:", error);
    return NextResponse.json(
      { error: "Failed to fetch QR code" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const qrCode = await prisma.qRCode.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    });

    if (!qrCode) {
      return NextResponse.json(
        { error: "QR code not found" },
        { status: 404 }
      );
    }

    const updatedQRCode = await prisma.qRCode.update({
      where: { id: id },
      data: {
        title: body.title,
        type: body.type,
        content: body.content,
        qrCodeData: body.qrCodeData,
        settings: body.settings
      }
    });

    return NextResponse.json({
      id: updatedQRCode.id,
      title: updatedQRCode.title,
      type: updatedQRCode.type,
      content: updatedQRCode.content,
      qrCodeData: updatedQRCode.qrCodeData,
      settings: updatedQRCode.settings,
      downloadCount: updatedQRCode.downloadCount,
      scanCount: updatedQRCode.scanCount,
      createdAt: updatedQRCode.createdAt,
      updatedAt: updatedQRCode.updatedAt
    });
  } catch (error) {
    console.error("Error updating QR code:", error);
    return NextResponse.json(
      { error: "Failed to update QR code" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const qrCode = await prisma.qRCode.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    });

    if (!qrCode) {
      return NextResponse.json(
        { error: "QR code not found" },
        { status: 404 }
      );
    }

    await prisma.qRCode.delete({
      where: { id: id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting QR code:", error);
    return NextResponse.json(
      { error: "Failed to delete QR code" },
      { status: 500 }
    );
  }
}