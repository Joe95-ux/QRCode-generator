"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  Copy, 
  CheckCircle, 
  ArrowLeft,
  QrCode,
  Eye,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";

export default function PreviewPage() {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);

  const handleDownload = () => {
    // Simulate download
    setIsDownloaded(true);
    toast.success("QR code downloaded successfully!");
    
    // Show account creation prompt after a short delay
    setTimeout(() => {
      setShowAccountPrompt(true);
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My QR Code",
          text: "Check out this QR code I created!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      handleCopyLink();
    }
  };

  if (showAccountPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-2xl">Great job!</CardTitle>
            <CardDescription>
              Your QR code has been downloaded. Want to create and manage more QR codes?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Create an account to:</h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Save and manage all your QR codes</li>
                <li>• Track scans and downloads</li>
                <li>• Access advanced customization</li>
                <li>• Create unlimited QR codes</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/sign-up">Create Free Account</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/generate">Continue without account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="ghost">
            <Link href="/generate">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Generator
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Website QR Code</Badge>
            <Badge variant="outline">256x256</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Code Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Your QR Code
              </CardTitle>
              <CardDescription>
                Scan this QR code with any smartphone camera
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              {/* QR Code Placeholder */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
                <div className="w-64 h-64 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-slate-300 dark:bg-slate-600 rounded grid grid-cols-8 gap-1 p-2">
                      {/* Simulated QR code pattern */}
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`bg-slate-800 dark:bg-slate-200 ${
                            Math.random() > 0.5 ? "opacity-100" : "opacity-20"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      QR Code Preview
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button onClick={handleDownload} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </Button>
                <Button variant="outline" onClick={handleShare} className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" onClick={handleCopyLink} className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </div>

              {isDownloaded && (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Downloaded successfully!</span>
                </div>
              )}
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
                  <p className="text-slate-900 dark:text-slate-100">My Website QR Code</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Content
                  </label>
                  <p className="text-slate-900 dark:text-slate-100 break-all">
                    https://example.com
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Type
                  </label>
                  <p className="text-slate-900 dark:text-slate-100">Website URL</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Size
                  </label>
                  <p className="text-slate-900 dark:text-slate-100">256x256 pixels</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Created
                  </label>
                  <p className="text-slate-900 dark:text-slate-100">
                    {new Date().toLocaleDateString()}
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
                      0
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Scans
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {isDownloaded ? "1" : "0"}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Downloads
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">Create an account to track scans</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Test your QR code</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Scan it with your phone to make sure it works
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Create an account</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Save and manage all your QR codes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Track performance</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Monitor scans and downloads
                    </p>
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
