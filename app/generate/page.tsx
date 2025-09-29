"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { generateQRCode, saveQRCode } from "@/lib/qr-generator";
import QRDesignStep from "@/components/QRDesignStep";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  QrCode,
} from "lucide-react";

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
  const [qrPassword, setQrPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [qrSettings, setQrSettings] = useState({
    size: 256,
    color: "#000000",
    backgroundColor: "#ffffff",
    errorCorrection: "M" as "L" | "M" | "Q" | "H"
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQRCode, setGeneratedQRCode] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
      const qrCodeData = await generateQRCode({
        content: qrContent,
        title: qrTitle,
        type: selectedType,
        settings: qrSettings,
      });

      setGeneratedQRCode(qrCodeData);
      
      // Ensure minimum loader time
      const elapsed = Date.now() - startTime;
      if (elapsed < minLoaderTime) {
        await new Promise(resolve => setTimeout(resolve, minLoaderTime - elapsed));
      }
      
      setShowLoader(false);
      setShowSuccess(true);
      
      // Save to database if user is signed in
      if (isSignedIn) {
        try {
          await saveQRCode({
            title: qrTitle,
            type: selectedType,
            content: qrContent,
            qrCodeData: qrCodeData,
            settings: qrSettings,
          });
        } catch (error) {
          console.error("Error saving QR code:", error);
        }
      }
      
      toast.success("QR code generated successfully!");
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code");
      setShowLoader(false);
    } finally {
      setIsGenerating(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Create QR Code
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Generate custom QR codes for your content
          </p>
        </div>

        {/* Enhanced Step Indicators with Long Arrows */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-8">
              {[
                { step: 1, title: "Type of QR code", completed: currentStep > 1, active: currentStep === 1 },
                { step: 2, title: "Content", completed: currentStep > 2, active: currentStep === 2 },
                { step: 3, title: "QR design", completed: currentStep > 3, active: currentStep === 3 }
              ].map(({ step, title, completed, active }, index) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        completed
                          ? "bg-emerald-600 text-white"
                          : active
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {completed ? "✓" : step}
                    </div>
                    <span className={`ml-3 font-semibold transition-colors ${
                      completed || active
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }`}>
                      {title}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="flex items-center ml-8">
                      <div className="w-16 h-0.5 bg-gray-300 relative">
                        <div 
                          className={`h-full bg-emerald-600 transition-all duration-500 ${
                            completed ? "w-full" : "w-0"
                          }`}
                        />
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Card className="mb-8 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">
                    QR Code Created Successfully!
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Your QR code has been generated and is ready to use.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Choose Type */}
        {currentStep === 1 && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Choose QR Code Type</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Select the type of content you want to encode in your QR code
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {QR_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={type.value}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      selectedType === type.value
                        ? "ring-2 ring-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 shadow-lg"
                        : "hover:border-emerald-300 hover:shadow-lg"
                    }`}
                    onClick={() => handleTypeSelect(type.value)}
                  >
                    <CardContent className="p-6 text-center">
                      <Icon className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                      <h3 className="font-semibold text-sm mb-2">{type.label}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {type.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Add Content */}
        {currentStep === 2 && (
          <div className="grid lg:grid-cols-12 gap-8 mb-8">
            {/* Content Form - 65% width */}
            <div className="lg:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    2. Add Your Content
                  </CardTitle>
                  <CardDescription>
                    Enter the information you want to encode in your QR code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={qrTitle}
                      onChange={(e) => setQrTitle(e.target.value)}
                      placeholder="Enter a title for your QR code"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="content">Content</Label>
                    {selectedType === "SMS" ? (
                      <Textarea
                        id="content"
                        value={qrContent}
                        onChange={(e) => setQrContent(e.target.value)}
                        placeholder="Enter your message content"
                        rows={3}
                      />
                    ) : (
                      <Input
                        id="content"
                        value={qrContent}
                        onChange={(e) => setQrContent(e.target.value)}
                        placeholder="Enter your content"
                      />
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password">Password (Optional)</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={qrPassword}
                        onChange={(e) => setQrPassword(e.target.value)}
                        placeholder="Enter password to protect QR code"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview - 35% width */}
            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    See how your QR code will look
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mobile Phone Mockup */}
                  <div className="w-80 h-96 bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-2xl mx-auto">
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">9:41</div>
                      
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg">
                        {generatedQRCode ? (
                          <img 
                            src={generatedQRCode} 
                            alt="QR Code Preview" 
                            className="w-32 h-32"
                          />
                        ) : (
                          <div className="w-32 h-32 bg-slate-200 dark:bg-slate-600 rounded flex items-center justify-center">
                            <div className="text-slate-400 text-center">
                              <div className="w-16 h-16 mx-auto mb-2 bg-slate-300 dark:bg-slate-600 rounded"></div>
                              <p className="text-sm">QR Code</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {qrTitle || "Your QR Code"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {selectedType ? QR_TYPES.find(t => t.value === selectedType)?.label : "Type"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 3: Design */}
        {currentStep === 3 && (
          <div className="grid lg:grid-cols-12 gap-8 mb-8">
            {/* Design Options - 65% width */}
            <div className="lg:col-span-8">
              <QRDesignStep
                settings={qrSettings}
                onSettingsChange={setQrSettings}
                qrCodePreview={generatedQRCode}
              />
            </div>

            {/* Fixed Preview - 35% width */}
            <div className="lg:col-span-4">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    See how your QR code will look
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mobile Phone Mockup */}
                  <div className="w-80 h-96 bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-2xl mx-auto">
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">9:41</div>
                      
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg">
                        {generatedQRCode ? (
                          <img 
                            src={generatedQRCode} 
                            alt="QR Code Preview" 
                            className="w-32 h-32"
                          />
                        ) : (
                          <div className="w-32 h-32 bg-slate-200 dark:bg-slate-600 rounded flex items-center justify-center">
                            <div className="text-slate-400 text-center">
                              <div className="w-16 h-16 mx-auto mb-2 bg-slate-300 dark:bg-slate-600 rounded"></div>
                              <p className="text-sm">QR Code</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {qrTitle || "Your QR Code"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {selectedType ? QR_TYPES.find(t => t.value === selectedType)?.label : "Type"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex gap-2">
            {currentStep === 3 ? (
              <Button 
                onClick={handleCreate} 
                disabled={isGenerating} 
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4" />
                    Create QR Code
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={currentStep === 2 && !qrContent.trim()}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* QR Code Scanner Loader */}
        {showLoader && renderQRScannerLoader()}
      </div>
    </div>
  );
}