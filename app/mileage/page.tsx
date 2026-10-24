"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Car } from "lucide-react";
import { calculateMileageAllowance } from "@/utils/taxCalculator";

export default function MileagePage() {
  const [mileageEntries, setMileageEntries] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    miles: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const miles = parseFloat(formData.miles);
    const newEntry = {
      id: Date.now().toString(),
      ...formData,
      miles,
      allowance: miles <= 10000 ? miles * 0.45 : 10000 * 0.45 + (miles - 10000) * 0.25,
    };
    setMileageEntries([newEntry, ...mileageEntries]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      miles: "",
      notes: "",
    });
  };

  const totalMiles = mileageEntries.reduce((sum, entry) => sum + entry.miles, 0);
  const totalAllowance = calculateMileageAllowance(totalMiles);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Mileage Tracking</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Log Business Miles</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="miles">Business Miles</Label>
                    <Input
                      id="miles"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.miles}
                      onChange={(e) => setFormData({ ...formData, miles: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Input
                      id="notes"
                      placeholder="e.g. All day delivery"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Miles
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>HMRC Rates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">First 10,000 miles</span>
                  <span className="font-semibold">45p/mile</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Over 10,000 miles</span>
                  <span className="font-semibold">25p/mile</span>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-6 space-y-3">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Miles</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{totalMiles.toFixed(1)} mi</p>
                </div>
                <div className="border-t pt-3 text-center">
                  <p className="text-sm text-gray-600">Mileage Allowance</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">£{totalAllowance.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Mileage History</CardTitle>
              </CardHeader>
              <CardContent>
                {mileageEntries.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No mileage entries yet. Log your business miles above.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Date</th>
                          <th className="text-left py-3 px-4 font-semibold">Miles</th>
                          <th className="text-left py-3 px-4 font-semibold">Allowance</th>
                          <th className="text-left py-3 px-4 font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mileageEntries.map((entry) => (
                          <tr key={entry.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{entry.date}</td>
                            <td className="py-3 px-4">{entry.miles} mi</td>
                            <td className="py-3 px-4 font-semibold text-green-600">£{entry.allowance.toFixed(2)}</td>
                            <td className="py-3 px-4 text-gray-600">{entry.notes || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
