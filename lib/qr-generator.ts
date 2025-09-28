export interface QRSettings {
  size: number;
  color: string;
  backgroundColor: string;
  errorCorrection: "L" | "M" | "Q" | "H";
}

export interface QRCodeData {
  content: string;
  title: string;
  type: string;
  settings: QRSettings;
}

export const generateQRCode = async (data: QRCodeData): Promise<string> => {
  try {
    const response = await fetch("/api/qr/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data.content,
        settings: data.settings,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate QR code");
    }

    const result = await response.json();
    return result.qrCodeDataURL;
  } catch (error) {
    console.error("QR code generation error:", error);
    throw error;
  }
};

export const saveQRCode = async (data: QRCodeData & { qrCodeData: string }): Promise<{ id: string; title: string; type: string; content: string; downloadCount: number; scanCount: number; createdAt: string }> => {
  try {
    const response = await fetch("/api/qr/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        type: data.type,
        content: data.content,
        qrCodeData: data.qrCodeData,
        settings: data.settings,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save QR code");
    }

    const result = await response.json();
    return result.qrCode;
  } catch (error) {
    console.error("QR code save error:", error);
    throw error;
  }
};

export const downloadQRCode = (dataURL: string, filename: string) => {
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
