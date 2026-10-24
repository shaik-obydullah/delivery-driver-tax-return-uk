"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Calculator } from "lucide-react";
import { calculateTaxSummary } from "@/utils/taxCalculator";

export default function TaxSummaryPage() {
  // Placeholder data - will be populated from actual entries
  const [income] = useState(15000);
  const [expenses] = useState(2000);
  const [miles] = useState(8000);
  const [useMileageAllowance] = useState(true);

  const summary = calculateTaxSummary(income, expenses, miles, useMileageAllowance);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Tax Summary</h1>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-gray-600">Tax Year: <span className="font-semibold">2024/25</span></p>
          <p className="text-sm text-yellow-700 mt-2">
            * This is a demo with sample data. Add your actual income, mileage and expenses to get accurate calculations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Income & Expenses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Income</span>
                <span className="font-semibold">£{summary.totalIncome.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Expenses (excluding mileage)</span>
                <span className="font-semibold">£{summary.totalExpenses.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mileage Allowance ({miles} miles)</span>
                <span className="font-semibold text-green-600">+£{summary.mileageAllowance.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold">Total Allowable Expenses</span>
                <span className="font-semibold">£{summary.totalAllowableExpenses.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Net Profit</span>
                <span className="font-bold text-blue-600">£{summary.netProfit.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Calculation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Income Tax</span>
                <span className="font-semibold">£{summary.incomeTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">National Insurance (Class 2 & 4)</span>
                <span className="font-semibold">£{summary.nationalInsurance.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total Tax Due (estimated)</span>
                <span className="font-bold text-red-600">£{summary.totalTax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Estimated Take Home</span>
                <span className="font-bold text-green-600">£{summary.takeHome.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>HMRC Notes (2024/25)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>• Personal Allowance: £12,570 (reduces if income over £100,000)</p>
            <p>• Basic Rate (20%): £12,570 - £50,270</p>
            <p>• Higher Rate (40%): £50,270 - £125,140</p>
            <p>• Additional Rate (45%): Over £125,140</p>
            <p>• Class 2 NI: £3.45/week if profits above £6,725</p>
            <p>• Class 4 NI: 9% on profits £12,570 - £50,270, 2% above £50,270</p>
            <p>• Mileage Allowance: 45p/mile first 10,000 miles, 25p/mile thereafter</p>
          </CardContent>
        </Card>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> This is an estimate only. Your actual tax liability may differ based on 
            other income, deductions, allowances, and changes to tax rules. Always consult HMRC or a qualified accountant.
          </p>
        </div>
      </main>
    </div>
  );
}
