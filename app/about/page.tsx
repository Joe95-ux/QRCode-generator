import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Code,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            About Simple QR
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            We're on a mission to make QR codes accessible, beautiful, and powerful for everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              QR codes have become an essential part of our digital world, but creating them 
              shouldn't be complicated. We believe in simplicity, power, and accessibility.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Whether you're a small business owner, a developer, or just someone who needs 
              to share information quickly, we've got you covered.
            </p>
            <Button asChild size="lg">
              <Link href="/generate">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold mb-2">Fast</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Generate QR codes in seconds
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold mb-2">Secure</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your data is always protected
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold mb-2">Accessible</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Easy to use for everyone
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold mb-2">Global</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Used by millions worldwide
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Simple QR?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>Developer Friendly</CardTitle>
                <CardDescription>
                  Built with modern technologies and designed for developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• RESTful API</li>
                  <li>• SDKs for popular languages</li>
                  <li>• Comprehensive documentation</li>
                  <li>• Webhook support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>User Centered</CardTitle>
                <CardDescription>
                  Designed with the end user in mind for maximum usability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Intuitive interface</li>
                  <li>• Mobile-first design</li>
                  <li>• Accessibility features</li>
                  <li>• Multi-language support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>Enterprise Ready</CardTitle>
                <CardDescription>
                  Built to scale with enterprise-grade security and reliability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• 99.9% uptime SLA</li>
                  <li>• SOC 2 compliance</li>
                  <li>• Advanced analytics</li>
                  <li>• White-label options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Trusted by Millions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                10M+
              </div>
              <div className="text-slate-600 dark:text-slate-400">QR Codes Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                1M+
              </div>
              <div className="text-slate-600 dark:text-slate-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                99.9%
              </div>
              <div className="text-slate-600 dark:text-slate-400">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                150+
              </div>
              <div className="text-slate-600 dark:text-slate-400">Countries</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join millions of users who trust Simple QR for their QR code needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/generate">
                Create Your First QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-emerald-600">
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
