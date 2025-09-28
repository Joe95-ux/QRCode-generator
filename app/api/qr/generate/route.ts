import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, settings } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(content, {
      width: settings?.size || 256,
      color: {
        dark: settings?.color || "#000000",
        light: settings?.backgroundColor || "#ffffff",
      },
      errorCorrectionLevel: settings?.errorCorrection || "M",
      margin: 1,
    });

    return NextResponse.json({
      success: true,
      qrCodeDataURL,
      content,
      settings,
    });
  } catch (error) {
    console.error("QR code generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
