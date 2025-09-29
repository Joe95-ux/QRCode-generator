"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQRCode, useUpdateQRCode } from "@/hooks/use-qr-codes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Download } from "lucide-react";
import { toast } from "sonner";
import { generateQRCode, downloadQRCode } from "@/lib/qr-generator";

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
}

const QR_TYPES = [
  { value: "WEBSITE", label: "Website" },
  { value: "TEXT", label: "Text" },
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Phone" },
  { value: "SMS", label: "SMS" },
  { value: "VCARD", label: "vCard" },
  { value: "BUSINESS", label: "Business" },
  { value: "WIFI", label: "WiFi" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "VIDEO", label: "Video" },
  { value: "IMAGE", label: "Image" },
  { value: "MP3", label: "Audio" },
  { value: "MENU", label: "Menu" },
  { value: "APP", label: "App" },
  { value: "COUPON", label: "Coupon" },
  { value: "PDF", label: "PDF" },
];

export default function EditQRCodePage() {
  const params = useParams();
  const router = useRouter();
  const [generatedQRCode, setGeneratedQRCode] = useState<string>("");
  
  const { data: qrCode, isLoading, error } = useQRCode(params.id as string);
  const updateQRCode = useUpdateQRCode();

  if (error) {
    toast.error("Failed to load QR code");
    router.push("/dashboard");
    return null;
  }

  const handleSave = async () => {
    if (!qrCode) return;

    try {
      // Generate new QR code with updated settings
      const newQRCodeData = await generateQRCode({
        content: qrCode.content,
        title: qrCode.title,
        type: qrCode.type,
        settings: qrCode.settings,
      });

      // Update QR code using React Query mutation
      await updateQRCode.mutateAsync({
        id: params.id as string,
        data: {
          title: qrCode.title,
          type: qrCode.type,
          content: qrCode.content,
          qrCodeData: newQRCodeData,
          settings: qrCode.settings,
        }
      });

      setGeneratedQRCode(newQRCodeData);
      toast.success("QR code updated successfully!");
    } catch (error) {
      console.error("Error updating QR code:", error);
      toast.error("Failed to update QR code");
    }
  };

  const handleDownload = () => {
    if (generatedQRCode) {
      const filename = `${qrCode?.title || "qr-code"}.png`;
      downloadQRCode(generatedQRCode, filename);
      toast.success("QR code downloaded!");
    }
  };

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

  if (!qrCode) {
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
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle>Edit QR Code</CardTitle>
              <CardDescription>
                Update your QR code content and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={qrCode.title}
                  onChange={(e) => setQrCode(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={qrCode.type}
                  onValueChange={(value) => setQrCode(prev => prev ? { ...prev, type: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {QR_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  value={qrCode.content}
                  onChange={(e) => setQrCode(prev => prev ? { ...prev, content: e.target.value } : null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select
                  value={qrCode.settings.size.toString()}
                  onValueChange={(value) => setQrCode(prev => prev ? { 
                    ...prev, 
                    settings: { ...prev.settings, size: parseInt(value) }
                  } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128">128x128</SelectItem>
                    <SelectItem value="256">256x256</SelectItem>
                    <SelectItem value="512">512x512</SelectItem>
                    <SelectItem value="1024">1024x1024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">QR Code Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={qrCode.settings.color}
                    onChange={(e) => setQrCode(prev => prev ? { 
                      ...prev, 
                      settings: { ...prev.settings, color: e.target.value }
                    } : null)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={qrCode.settings.color}
                    onChange={(e) => setQrCode(prev => prev ? { 
                      ...prev, 
                      settings: { ...prev.settings, color: e.target.value }
                    } : null)}
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bgColor">Background Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={qrCode.settings.backgroundColor}
                    onChange={(e) => setQrCode(prev => prev ? { 
                      ...prev, 
                      settings: { ...prev.settings, backgroundColor: e.target.value }
                    } : null)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={qrCode.settings.backgroundColor}
                    onChange={(e) => setQrCode(prev => prev ? { 
                      ...prev, 
                      settings: { ...prev.settings, backgroundColor: e.target.value }
                    } : null)}
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSave} disabled={updateQRCode.isPending} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  {updateQRCode.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Your updated QR code will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div 
                className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 flex items-center justify-center"
                style={{ width: qrCode.settings.size, height: qrCode.settings.size }}
              >
                {generatedQRCode ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-slate-800 dark:bg-slate-200 rounded grid grid-cols-8 gap-1 p-2">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`bg-slate-200 dark:bg-slate-800 ${
                            Math.random() > 0.5 ? "opacity-100" : "opacity-30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-400 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    <p className="text-sm">QR Code Preview</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
