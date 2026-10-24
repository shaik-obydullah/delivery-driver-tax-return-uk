import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PoundSterling, Car, Receipt, Calculator, Plus } from "lucide-react";

export default function Dashboard() {
  // Placeholder data - will be replaced with real data from DB
  const stats = {
    totalIncome: 0,
    totalExpenses: 0,
    totalMiles: 0,
    mileageAllowance: 0,
    netProfit: 0,
    estimatedTax: 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            UK Delivery Driver Tax Return
          </Link>
          <nav className="flex gap-4">
            <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
            <Link href="/income"><Button variant="ghost">Income</Button></Link>
            <Link href="/mileage"><Button variant="ghost">Mileage</Button></Link>
            <Link href="/expenses"><Button variant="ghost">Expenses</Button></Link>
            <Link href="/tax-summary"><Button variant="ghost">Tax Summary</Button></Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Tax Year 2024/25 Overview</p>
          </div>
          <div className="flex gap-2">
            <Link href="/income">
              <Button><Plus className="h-4 w-4 mr-2" /> Add Income</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Income"
            value={`£${stats.totalIncome.toFixed(2)}`}
            icon={<PoundSterling className="h-5 w-5 text-green-600" />}
            color="green"
          />
          <StatCard
            title="Total Expenses"
            value={`£${stats.totalExpenses.toFixed(2)}`}
            icon={<Receipt className="h-5 w-5 text-red-600" />}
            color="red"
          />
          <StatCard
            title="Business Miles"
            value={`${stats.totalMiles} mi`}
            icon={<Car className="h-5 w-5 text-blue-600" />}
            color="blue"
          />
          <StatCard
            title="Net Profit"
            value={`£${stats.netProfit.toFixed(2)}`}
            icon={<Calculator className="h-5 w-5 text-purple-600" />}
            color="purple"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/income" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <PoundSterling className="h-4 w-4 mr-2" />
                  Add Income Entry
                </Button>
              </Link>
              <Link href="/mileage" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Car className="h-4 w-4 mr-2" />
                  Log Business Miles
                </Button>
              </Link>
              <Link href="/expenses" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </Link>
              <Link href="/tax-summary" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Calculator className="h-4 w-4 mr-2" />
                  View Tax Summary
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Estimate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Profit</span>
                  <span className="font-semibold">£{stats.netProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Income Tax</span>
                  <span className="font-semibold">£{(stats.estimatedTax * 0.7).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated NI (Class 2 & 4)</span>
                  <span className="font-semibold">£{(stats.estimatedTax * 0.3).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total Estimated Tax</span>
                  <span className="font-bold text-lg">£{stats.estimatedTax.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  * Estimates based on 2024/25 rates. Add income, mileage and expenses to see accurate calculations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  const colorClasses: Record<string, string> = {
    green: "bg-green-50 border-green-200",
    red: "bg-red-50 border-red-200",
    blue: "bg-blue-50 border-blue-200",
    purple: "bg-purple-50 border-purple-200",
  };

  return (
    <Card className={colorClasses[color]}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
