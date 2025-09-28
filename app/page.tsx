import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, Zap, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            Create QR Codes
            <br />
            <span className="text-slate-700 dark:text-slate-300">Instantly</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Generate beautiful, customizable QR codes for websites, PDFs, business cards, 
            social media, and more. Free, fast, and professional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/generate">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>

          {/* QR Code Preview */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl max-w-md mx-auto">
            <div className="w-48 h-48 mx-auto bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="h-24 w-24 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your QR code will appear here
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-200">
              Everything you need
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Powerful features for all your QR code needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                Lightning Fast
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Generate QR codes in seconds with our optimized engine
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                Secure & Private
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your data is protected with enterprise-grade security
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                Analytics
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track scans and downloads with detailed analytics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Create your first QR code in under 30 seconds
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/generate">
              Start Creating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
