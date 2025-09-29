"use client";

import { useParams, useRouter } from "next/navigation";
import { useQRCode } from "@/hooks/use-qr-codes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Copy, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { downloadQRCode } from "@/lib/qr-generator";

interface QRCodeData {
  id: string;
  title: string;
  type: string;
  content: string;
  qrCodeData: string;
  settings: {
    size: number;
    color: string;
    backgroundColor: string;
    errorCorrection: "L" | "M" | "Q" | "H";
  };
  downloadCount: number;
  scanCount: number;
  createdAt: string;
}

const getTypeLabel = (type: string) => {
  const typeMap: { [key: string]: string } = {
    WEBSITE: "Website",
    VCARD: "vCard", 
    WIFI: "WiFi",
    TEXT: "Text",
    EMAIL: "Email",
    PHONE: "Phone",
    SMS: "SMS",
    BUSINESS: "Business",
    FACEBOOK: "Facebook",
    INSTAGRAM: "Instagram",
    WHATSAPP: "WhatsApp",
    VIDEO: "Video",
    IMAGE: "Image",
    MP3: "Audio",
    MENU: "Menu",
    APP: "App",
    COUPON: "Coupon",
    PDF: "PDF"
  };
  return typeMap[type] || type;
};

const getTypeColor = (type: string) => {
  const colorMap: { [key: string]: string } = {
    WEBSITE: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    VCARD: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    WIFI: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    TEXT: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    EMAIL: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    PHONE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    SMS: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    BUSINESS: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    FACEBOOK: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    INSTAGRAM: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    WHATSAPP: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    VIDEO: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    IMAGE: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    MP3: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    MENU: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    APP: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    COUPON: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    PDF: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };
  return colorMap[type] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
};

export default function ViewQRCodePage() {
  const params = useParams();
  const router = useRouter();
  
  const { data: qrCode, isLoading, error } = useQRCode(params.id as string);

  if (error) {
    toast.error("Failed to load QR code");
    router.push("/dashboard");
    return null;
  }

  // Type cast the QR code data
  const typedQRCode = qrCode as QRCodeData;

  const handleDownload = () => {
    if (typedQRCode?.qrCodeData) {
      const filename = `${typedQRCode.title}.png`;
      downloadQRCode(typedQRCode.qrCodeData, filename);
      toast.success("QR code downloaded!");
    } else {
      toast.error("QR code data not available. Please try refreshing the page.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  // const handleShare = async () => {
  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: typedQRCode?.title || "QR Code",
  //         text: `Check out this QR code: ${typedQRCode?.title}`,
  //         url: window.location.href,
  //       });
  //     } catch (error) {
  //       console.log("Error sharing:", error);
  //       handleCopyLink();
  //     }
  //   } else {
  //     handleCopyLink();
  //   }
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading QR code...</p>
        </div>
      </div>
    );
  }

  if (!typedQRCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            QR Code Not Found
          </h1>
          <Button asChild>
            <a href="/dashboard">Back to Dashboard</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="ghost">
            <a href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </a>
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge className={getTypeColor(typedQRCode.type)}>
              {getTypeLabel(typedQRCode.type)}
            </Badge>
            <Badge variant="outline">
              {typedQRCode.settings.size}x{typedQRCode.settings.size}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Code Display */}
          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
              <CardDescription>
                Scan this QR code with any smartphone camera
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
              <div 
                className="flex items-center justify-center"
                style={{ width: Math.min(typedQRCode.settings.size, 400), height: Math.min(typedQRCode.settings.size, 400) }}
              >
                {typedQRCode.qrCodeData ? (
                  <Image 
                    src={typedQRCode.qrCodeData} 
                    alt={`QR Code for ${typedQRCode.title}`}
                    className="max-w-full max-h-full"
                  />
                ) : (
                    <div className="w-32 h-32 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center">
                      <div className="text-slate-400 text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-slate-300 dark:bg-slate-600 rounded"></div>
                        <p className="text-sm">QR Code</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <Button onClick={handleDownload} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </Button>
                {/* <Button variant="outline" onClick={handleShare} className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button> */}
                <Button variant="outline" onClick={handleCopyLink} className="w-full">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Title
                  </label>
                  <p className="text-slate-900 dark:text-slate-100">{typedQRCode.title}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Content
                  </label>
                  <p className="text-slate-900 dark:text-slate-100 break-all">
                    {typedQRCode.content}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Type
                  </label>
                  <p className="text-slate-900 dark:text-slate-100">{getTypeLabel(typedQRCode.type)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Size
                  </label>
                  <p className="text-slate-900 dark:text-slate-100">
                    {typedQRCode.settings.size}x{typedQRCode.settings.size} pixels
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Created
                  </label>
                  <p className="text-slate-900 dark:text-slate-100">
                    {new Date(typedQRCode.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </CardTitle>
                <CardDescription>
                  Track your QR code performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {typedQRCode.scanCount}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Scans
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {typedQRCode.downloadCount}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Downloads
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
