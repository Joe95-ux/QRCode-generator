"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { generateQRCode, downloadQRCode, saveQRCode } from "@/lib/qr-generator";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Removed unused Tabs imports
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  FileText, 
  User, 
  Building, 
  Video, 
  Image, 
  Facebook, 
  Instagram, 
  MessageSquare, 
  Music, 
  Menu, 
  Smartphone, 
  Tag, 
  Wifi,
  Type,
  Mail,
  Phone,
  CheckCircle,
  Palette,
  Download,
  BarChart3
} from "lucide-react";
import Link from "next/link";

const QR_TYPES = [
  { value: "WEBSITE", label: "Website", icon: Globe, description: "Link to a website" },
  { value: "TEXT", label: "Text", icon: Type, description: "Plain text message" },
  { value: "EMAIL", label: "Email", icon: Mail, description: "Email address" },
  { value: "PHONE", label: "Phone", icon: Phone, description: "Phone number" },
  { value: "SMS", label: "SMS", icon: MessageSquare, description: "Text message" },
  { value: "VCARD", label: "vCard", icon: User, description: "Contact information" },
  { value: "BUSINESS", label: "Business", icon: Building, description: "Business information" },
  { value: "WIFI", label: "WiFi", icon: Wifi, description: "WiFi network details" },
  { value: "FACEBOOK", label: "Facebook", icon: Facebook, description: "Facebook profile/page" },
  { value: "INSTAGRAM", label: "Instagram", icon: Instagram, description: "Instagram profile" },
  { value: "WHATSAPP", label: "WhatsApp", icon: MessageSquare, description: "WhatsApp message" },
  { value: "VIDEO", label: "Video", icon: Video, description: "Video URL" },
  { value: "IMAGE", label: "Image", icon: Image, description: "Image URL" },
  { value: "MP3", label: "Audio", icon: Music, description: "Audio file URL" },
  { value: "MENU", label: "Menu", icon: Menu, description: "Restaurant menu" },
  { value: "APP", label: "App", icon: Smartphone, description: "App store link" },
  { value: "COUPON", label: "Coupon", icon: Tag, description: "Discount coupon" },
  { value: "PDF", label: "PDF", icon: FileText, description: "PDF document" },
];

export default function GeneratePage() {
  const { isSignedIn } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [qrContent, setQrContent] = useState("");
  const [qrTitle, setQrTitle] = useState("");
  const [qrSettings, setQrSettings] = useState({
    size: 256,
    color: "#000000",
    backgroundColor: "#ffffff",
    errorCorrection: "M" as "L" | "M" | "Q" | "H"
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQRCode, setGeneratedQRCode] = useState<string>("");
  // Removed unused qrCodeSaved state
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setCurrentStep(2);
  };

  const handleContentSubmit = () => {
    if (qrContent.trim()) {
      setCurrentStep(3);
    }
  };

  const handleCreate = async () => {
    if (!qrContent.trim()) {
      toast.error("Please enter content for your QR code");
      return;
    }

    setIsGenerating(true);
    setShowLoader(true);
    
    // Add a minimum loader time to prevent flash
    const minLoaderTime = 1500; // 1.5 seconds minimum
    const startTime = Date.now();
    
    try {
      const qrCodeDataURL = await generateQRCode({
        content: qrContent,
        title: qrTitle || "My QR Code",
        type: selectedType,
        settings: qrSettings,
      });

      setGeneratedQRCode(qrCodeDataURL);
      
      // Save QR code to database (if user is authenticated)
      if (isSignedIn) {
        try {
          await saveQRCode({
            content: qrContent,
            title: qrTitle || "My QR Code",
            type: selectedType,
            settings: qrSettings,
            qrCodeData: qrCodeDataURL,
          });
          // QR code saved successfully
          toast.success("QR code saved to your account!");
        } catch (saveError) {
          console.log("QR code not saved:", saveError);
          toast.error("Failed to save QR code");
        }
      }
      
      // Ensure minimum loader time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoaderTime - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      setShowLoader(false);
      
      // Download the QR code
      const filename = `${qrTitle || "qr-code"}.png`;
      downloadQRCode(qrCodeDataURL, filename);
      setIsDownloaded(true);
      
      toast.success("QR code generated and downloaded!");
      setShowSuccess(true);
      
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code. Please try again.");
      setShowLoader(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-500"
              }`}
            >
              {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-16 h-1 ${
                  currentStep > step ? "bg-emerald-600" : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose QR Code Type</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Select the type of content you want to encode in your QR code
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {QR_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.value}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedType === type.value
                  ? "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "hover:border-emerald-300"
              }`}
              onClick={() => handleTypeSelect(type.value)}
            >
              <CardContent className="p-4 text-center">
                <Icon className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                <h3 className="font-semibold text-sm mb-1">{type.label}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {type.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => {
    const selectedTypeData = QR_TYPES.find(t => t.value === selectedType);
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Add Your Content</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Enter the content for your {selectedTypeData?.label.toLowerCase()} QR code
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="title">QR Code Title (Optional)</Label>
                <Input
                  id="title"
                  placeholder="My QR Code"
                  value={qrTitle}
                  onChange={(e) => setQrTitle(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="content">
                  {selectedType === "WEBSITE" && "Website URL"}
                  {selectedType === "TEXT" && "Text Content"}
                  {selectedType === "EMAIL" && "Email Address"}
                  {selectedType === "PHONE" && "Phone Number"}
                  {selectedType === "SMS" && "Phone Number"}
                  {selectedType === "VCARD" && "Contact Information"}
                  {selectedType === "BUSINESS" && "Business Information"}
                  {selectedType === "WIFI" && "WiFi Details"}
                  {selectedType === "FACEBOOK" && "Facebook URL"}
                  {selectedType === "INSTAGRAM" && "Instagram URL"}
                  {selectedType === "WHATSAPP" && "WhatsApp Number"}
                  {selectedType === "VIDEO" && "Video URL"}
                  {selectedType === "IMAGE" && "Image URL"}
                  {selectedType === "MP3" && "Audio URL"}
                  {selectedType === "MENU" && "Menu URL"}
                  {selectedType === "APP" && "App Store URL"}
                  {selectedType === "COUPON" && "Coupon Code"}
                  {selectedType === "PDF" && "PDF URL"}
                </Label>
                {selectedType === "SMS" ? (
                  <div className="space-y-3">
                    <div className="space-y-3">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Phone number"
                        value={qrContent}
                        onChange={(e) => setQrContent(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="message">Message Content</Label>
                      <Textarea
                        id="message"
                        placeholder="Message content"
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <Input
                    placeholder={
                      selectedType === "WEBSITE" ? "https://example.com" :
                      selectedType === "EMAIL" ? "user@example.com" :
                      selectedType === "PHONE" ? "+1234567890" :
                      selectedType === "TEXT" ? "Your text here" :
                      "Enter your content"
                    }
                    value={qrContent}
                    onChange={(e) => setQrContent(e.target.value)}
                  />
                )}
              </div>

              <Button 
                onClick={handleContentSubmit}
                disabled={!qrContent.trim()}
                className="w-full"
              >
                Continue to Design
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderQRScannerLoader = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md mx-auto shadow-2xl">
        <div className="text-center">
          <div className="relative w-64 h-64 mx-auto mb-6">
            {/* Scanner frame */}
            <div className="absolute inset-0 border-4 border-emerald-500 rounded-lg animate-pulse"></div>
            
            {/* Scanning lines animation */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line"></div>
              <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line-delayed"></div>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line-delayed-2"></div>
              <div className="absolute top-3/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line-delayed-3"></div>
            </div>
            
            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-emerald-500"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-emerald-500"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-emerald-500"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-emerald-500"></div>
            
            {/* QR code pattern simulation */}
            <div className="absolute inset-4 grid grid-cols-8 gap-1 opacity-20">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-slate-800 dark:bg-slate-200 ${
                    Math.random() > 0.5 ? "opacity-100" : "opacity-30"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
            Generating QR Code
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Creating your custom QR code...
          </p>
          
          {/* Progress dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Customize Your QR Code</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Design your QR code with custom colors and settings
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Design Settings
            </CardTitle>
            <CardDescription>
              Customize the appearance of your QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="size">Size</Label>
              <Select
                value={qrSettings.size.toString()}
                onValueChange={(value) => setQrSettings(prev => ({ ...prev, size: parseInt(value) }))}
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

            <div className="space-y-3">
              <Label htmlFor="color">QR Code Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={qrSettings.color}
                  onChange={(e) => setQrSettings(prev => ({ ...prev, color: e.target.value }))}
                  className="w-16 h-10"
                />
                <Input
                  value={qrSettings.color}
                  onChange={(e) => setQrSettings(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="bgColor">Background Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={qrSettings.backgroundColor}
                  onChange={(e) => setQrSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  className="w-16 h-10"
                />
                <Input
                  value={qrSettings.backgroundColor}
                  onChange={(e) => setQrSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="errorCorrection">Error Correction</Label>
              <Select
                value={qrSettings.errorCorrection}
                onValueChange={(value: "L" | "M" | "Q" | "H") => setQrSettings(prev => ({ ...prev, errorCorrection: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              Your QR code will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div 
              className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 flex items-center justify-center"
              style={{ width: qrSettings.size, height: qrSettings.size }}
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
            
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                {qrTitle || "Untitled QR Code"}
              </p>
              <Badge variant="secondary">
                {QR_TYPES.find(t => t.value === selectedType)?.label}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {!isDownloaded ? (
          <Button 
            onClick={handleCreate} 
            size="lg" 
            className="px-8"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Create QR Code
              </>
            )}
          </Button>
        ) : (
          <Button 
            onClick={() => {
              if (generatedQRCode) {
                const filename = `${qrTitle || "qr-code"}.png`;
                downloadQRCode(generatedQRCode, filename);
                toast.success("QR code downloaded again!");
              }
            }}
            size="lg" 
            className="px-8"
            disabled={true}
          >
            <Download className="mr-2 h-4 w-4" />
            QR Code Downloaded
          </Button>
        )}
        
        {isDownloaded && isSignedIn && (
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="px-8"
          >
            <Link href="/dashboard">
              <BarChart3 className="mr-2 h-4 w-4" />
              Manage QR Codes
            </Link>
          </Button>
        )}
        
        {isDownloaded && !isSignedIn && (
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="px-8"
          >
            <Link href="/sign-up">
              <User className="mr-2 h-4 w-4" />
              Create Account
            </Link>
          </Button>
        )}
      </div>

      {showSuccess && (
        <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">
                QR Code Created Successfully!
              </h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Your QR code has been generated and downloaded. 
                {isSignedIn ? " It's also been saved to your account." : " Create an account to save and manage your QR codes."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {renderStepIndicator()}
        
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>
      
      {showLoader && renderQRScannerLoader()}
    </div>
  );
}
