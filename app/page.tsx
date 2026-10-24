import Link from "next/link";
import { Calculator, Car, PoundSterling, Receipt, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">UK Delivery Driver Tax Return</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simplify Your Self Assessment Tax Return
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your delivery income, mileage and expenses across all platforms. 
            Calculate your tax liability with HMRC-compliant rates.
          </p>
          <div className="mt-8">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          <FeatureCard
            icon={<PoundSterling className="h-8 w-8 text-blue-600" />}
            title="Income Tracking"
            description="Log earnings from Uber Eats, Deliveroo, Just Eat and more"
          />
          <FeatureCard
            icon={<Car className="h-8 w-8 text-blue-600" />}
            title="Mileage Calculator"
            description="HMRC mileage allowance rates - 45p first 10,000 miles, 25p after"
          />
          <FeatureCard
            icon={<Receipt className="h-8 w-8 text-blue-600" />}
            title="Expense Management"
            description="Track fuel, insurance, repairs, phone bills and other expenses"
          />
          <FeatureCard
            icon={<Calculator className="h-8 w-8 text-blue-600" />}
            title="Tax Estimator"
            description="Estimate Income Tax and National Insurance for Self Assessment"
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-blue-600" />}
            title="Reports & Analytics"
            description="View your profit/loss over time with clear charts"
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-blue-600" />}
            title="Export Ready"
            description="Export your records for your accountant or HMRC submission"
          />
        </div>

        <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This app is for record keeping and estimation purposes only. 
            It uses general HMRC guidelines but may not cover all aspects of your tax situation. 
            Always seek professional advice for your actual Self Assessment tax return.
          </p>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
