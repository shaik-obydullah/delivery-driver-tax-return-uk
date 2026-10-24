# UK Delivery Driver Tax Return App

A web application to help UK delivery drivers (Uber Eats, Deliveroo, Just Eat, Stuart, etc.) track income, expenses, mileage and calculate their tax liability for Self Assessment.

## Features

- **Dashboard** - Overview of income, expenses, profit and estimated tax
- **Income Tracking** - Log earnings per platform with dates
- **Mileage Tracking** - Track business miles with HMRC mileage allowance rates (45p for first 10,000 miles, 25p after)
- **Expense Management** - Categorise expenses (fuel, phone, insurance, repairs, equipment, etc.)
- **Tax Calculator** - Estimate Income Tax and National Insurance for Self Assessment
- **Reports & Export** - Generate reports for tax returns, export to CSV/PDF
- **Multi-platform Support** - Track across multiple delivery platforms

## Tech Stack

- **Frontend**: Next.js 15 (TypeScript), Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Database**: SQLite with Prisma ORM
- **Charts**: Recharts
- **Date handling**: date-fns
- **PDF Export**: jsPDF, html2canvas

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or navigate to this directory
2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## HMRC Guidelines

This app uses current HMRC rates (for guidance only):
- **Mileage Allowance**: 45p per mile for first 10,000 business miles, 25p per mile thereafter
- **Capital Allowances**: Simplified method available
- **Allowable Expenses**: Vehicle costs (if not using mileage allowance), phone, insurance, repairs, cleaning, etc.
- **National Insurance**: Class 2 and Class 4 (for self-employed)

*Note: This tool is for record keeping and estimation only. Always consult a qualified accountant or HMRC for your actual tax return.*

## Project Structure

```
delivery-driver-tax-return-uk/
├── app/                    # Next.js app router
├── components/             # React components
├── lib/                    # Utilities and helpers
├── prisma/                 # Database schema and migrations
├── types/                  # TypeScript type definitions
└── utils/                  # Tax calculation utilities
```

## License

MIT
