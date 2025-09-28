import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Unlimited QR codes",
      "Basic customization",
      "PNG download",
      "Community support",
    ],
    limitations: [
      "No analytics",
      "No bulk operations",
      "No API access",
    ],
    cta: "Get Started",
    href: "/generate",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For professionals and small businesses",
    features: [
      "Everything in Free",
      "Advanced analytics",
      "Bulk operations",
      "API access",
      "Priority support",
      "Custom branding",
      "High-resolution downloads",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    href: "/sign-up?plan=pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "White-label solution",
      "Custom integrations",
      "Dedicated support",
      "Advanced security",
      "Custom domains",
      "Team management",
    ],
    limitations: [],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            Simple Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose the perfect plan for your QR code needs. Start free and upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? "ring-2 ring-emerald-500 shadow-xl scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-emerald-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-slate-600 dark:text-slate-400">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="flex items-center gap-2">
                        <X className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our Pro plan comes with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
