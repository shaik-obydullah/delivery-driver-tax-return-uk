// UK Tax Calculator for Self-Employed Delivery Drivers (2024/25 tax year rates)

export const TAX_YEAR_2024_25 = {
  personalAllowance: 12570,
  basicRateBand: 37700, // 50270 - 12570
  higherRateBand: 125140 - 50270,
  additionalRateStart: 125140,
  
  // Income Tax rates
  basicRate: 0.20,
  higherRate: 0.40,
  additionalRate: 0.45,
  
  // National Insurance (Class 4)
  niClass4LowerLimit: 12570,
  niClass4UpperLimit: 50270,
  niClass4Rate: 0.09,
  niClass4AdditionalRate: 0.02,
  
  // National Insurance (Class 2) - if profits above small profits threshold
  niClass2Weekly: 3.45,
  niClass2SmallProfitsThreshold: 6725,
};

// Mileage allowance rates (HMRC Approved Mileage Allowance Payments)
export const MILEAGE_RATES = {
  first10000: 0.45, // 45p per mile for first 10,000 business miles
  after10000: 0.25, // 25p per mile after 10,000 business miles
};

export function calculateMileageAllowance(totalMiles: number): number {
  if (totalMiles <= 0) return 0;
  
  if (totalMiles <= 10000) {
    return totalMiles * MILEAGE_RATES.first10000;
  }
  
  const first10000Miles = 10000 * MILEAGE_RATES.first10000;
  const remainingMiles = totalMiles - 10000;
  const remainingAllowance = remainingMiles * MILEAGE_RATES.after10000;
  
  return first10000Miles + remainingAllowance;
}

export function calculateIncomeTax(taxableProfit: number): number {
  if (taxableProfit <= TAX_YEAR_2024_25.personalAllowance) {
    return 0;
  }
  
  let tax = 0;
  const taxableAfterAllowance = taxableProfit - TAX_YEAR_2024_25.personalAllowance;
  
  if (taxableAfterAllowance <= TAX_YEAR_2024_25.basicRateBand) {
    tax = taxableAfterAllowance * TAX_YEAR_2024_25.basicRate;
  } else if (taxableAfterAllowance <= TAX_YEAR_2024_25.basicRateBand + TAX_YEAR_2024_25.higherRateBand) {
    tax = TAX_YEAR_2024_25.basicRateBand * TAX_YEAR_2024_25.basicRate;
    const higherAmount = taxableAfterAllowance - TAX_YEAR_2024_25.basicRateBand;
    tax += higherAmount * TAX_YEAR_2024_25.higherRate;
  } else {
    tax = TAX_YEAR_2024_25.basicRateBand * TAX_YEAR_2024_25.basicRate;
    tax += TAX_YEAR_2024_25.higherRateBand * TAX_YEAR_2024_25.higherRate;
    const additionalAmount = taxableAfterAllowance - (TAX_YEAR_2024_25.basicRateBand + TAX_YEAR_2024_25.higherRateBand);
    tax += additionalAmount * TAX_YEAR_2024_25.additionalRate;
  }
  
  return Math.max(0, tax);
}

export function calculateNationalInsurance(profit: number): number {
  let ni = 0;
  
  // Class 2 NI
  if (profit >= TAX_YEAR_2024_25.niClass2SmallProfitsThreshold) {
    ni += 52 * TAX_YEAR_2024_25.niClass2Weekly; // 52 weeks
  }
  
  // Class 4 NI
  if (profit > TAX_YEAR_2024_25.niClass4LowerLimit) {
    if (profit <= TAX_YEAR_2024_25.niClass4UpperLimit) {
      ni += (profit - TAX_YEAR_2024_25.niClass4LowerLimit) * TAX_YEAR_2024_25.niClass4Rate;
    } else {
      ni += (TAX_YEAR_2024_25.niClass4UpperLimit - TAX_YEAR_2024_25.niClass4LowerLimit) * TAX_YEAR_2024_25.niClass4Rate;
      ni += (profit - TAX_YEAR_2024_25.niClass4UpperLimit) * TAX_YEAR_2024_25.niClass4AdditionalRate;
    }
  }
  
  return Math.max(0, ni);
}

export function calculateTaxSummary(income: number, expenses: number, miles: number, useMileageAllowance: boolean = true) {
  let allowableExpenses = expenses;
  
  if (useMileageAllowance) {
    const mileageAllowance = calculateMileageAllowance(miles);
    allowableExpenses = expenses + mileageAllowance;
  }
  
  const profit = Math.max(0, income - allowableExpenses);
  const incomeTax = calculateIncomeTax(profit);
  const nationalInsurance = calculateNationalInsurance(profit);
  const totalTax = incomeTax + nationalInsurance;
  
  return {
    totalIncome: income,
    totalExpenses: expenses,
    mileageAllowance: useMileageAllowance ? calculateMileageAllowance(miles) : 0,
    totalAllowableExpenses: allowableExpenses,
    netProfit: profit,
    incomeTax,
    nationalInsurance,
    totalTax,
    takeHome: profit - totalTax,
  };
}
