import { useSEO, StructuredData } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Calculator, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Math Tools", "item": "https://tools.pixocraft.in/tools/math" }
  ]
});

const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Math Tools – Free, Private & Offline",
  "description": "Essential math tools for calculations, conversions, and problem-solving. Calculators for percentages, loans, interest, statistics, and more—all offline and private.",
  "url": "https://tools.pixocraft.in/tools/math",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "SoftwareApplication", "name": "Percentage Calculator", "url": "https://tools.pixocraft.in/tools/percentage-calculator" },
      { "@type": "SoftwareApplication", "name": "Age Calculator", "url": "https://tools.pixocraft.in/tools/age-calculator" },
      { "@type": "SoftwareApplication", "name": "Loan Calculator", "url": "https://tools.pixocraft.in/tools/loan-calculator" },
      { "@type": "SoftwareApplication", "name": "Mortgage Calculator", "url": "https://tools.pixocraft.in/tools/mortgage-calculator" },
      { "@type": "SoftwareApplication", "name": "EMI Calculator", "url": "https://tools.pixocraft.in/tools/emi-calculator" },
      { "@type": "SoftwareApplication", "name": "Unit Converter", "url": "https://tools.pixocraft.in/tools/unit-converter" }
    ]
  }
});

const mathTools = [
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, percentage changes, and percentage of totals instantly.",
    path: "/tools/percentage-calculator",
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days from your birth date.",
    path: "/tools/age-calculator",
  },
  {
    id: "percentage-change-calculator",
    name: "Percentage Change Calculator",
    description: "Calculate the percentage change between two values with detailed analysis.",
    path: "/tools/percentage-change-calculator",
  },
  {
    id: "area-converter",
    name: "Area Converter",
    description: "Convert between different area units including square meters, feet, acres, and more.",
    path: "/tools/area-converter",
  },
  {
    id: "time-difference-calculator",
    name: "Time Difference Calculator",
    description: "Calculate the exact time difference between two dates and times.",
    path: "/tools/time-difference-calculator",
  },
  {
    id: "commission-calculator",
    name: "Commission Calculator",
    description: "Calculate commissions and sales earnings with custom commission rates.",
    path: "/tools/commission-calculator",
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    description: "Calculate monthly loan EMI, interest amount, and total repayment instantly.",
    path: "/tools/emi-calculator",
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between various units of length, weight, temperature, and volume.",
    path: "/tools/unit-converter",
  },
  {
    id: "average-calculator",
    name: "Average Calculator",
    description: "Calculate the average, mean, and sum of a list of numbers instantly.",
    path: "/tools/average-calculator",
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate tips and split bills easily for restaurants and services.",
    path: "/tools/tip-calculator",
  },
  {
    id: "currency-formatter",
    name: "Currency Formatter",
    description: "Format numbers as currency with proper symbols and decimal places.",
    path: "/tools/currency-formatter",
  },
  {
    id: "days-calculator",
    name: "Days Calculator",
    description: "Calculate the number of days between two dates with breakdown by years, months, and days.",
    path: "/tools/days-calculator",
  },
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate loan payments, interest rates, and amortization schedules.",
    path: "/tools/loan-calculator",
  },
  {
    id: "mortgage-calculator",
    name: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments with principal, interest, and total cost.",
    path: "/tools/mortgage-calculator",
  },
  {
    id: "fraction-calculator",
    name: "Fraction Calculator",
    description: "Add, subtract, multiply, and divide fractions with simplified results.",
    path: "/tools/fraction-calculator",
  },
  {
    id: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    description: "Convert between Arabic numerals and Roman numerals instantly.",
    path: "/tools/roman-numeral-converter",
  },
  {
    id: "number-sorter",
    name: "Number Sorter",
    description: "Sort numbers in ascending or descending order with advanced sorting options.",
    path: "/tools/number-sorter",
  },
  {
    id: "matrix-calculator",
    name: "Matrix Calculator",
    description: "Perform matrix operations including addition, multiplication, and transposition.",
    path: "/tools/matrix-calculator",
  },
  {
    id: "pay-split-calculator",
    name: "Pay Split Calculator",
    description: "Split payments and expenses fairly among multiple people.",
    path: "/tools/pay-split-calculator",
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and get health category information instantly.",
    path: "/tools/bmi-calculator",
  },
  {
    id: "calorie-calculator",
    name: "Calorie Calculator",
    description: "Calculate daily calorie needs based on your personal data and activity level.",
    path: "/tools/calorie-calculator",
  },
  {
    id: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers within specified ranges with custom parameters.",
    path: "/tools/random-number-generator",
  },
  {
    id: "prime-number-checker",
    name: "Prime Number Checker",
    description: "Check if a number is prime or composite with detailed analysis.",
    path: "/tools/prime-number-checker",
  },
  {
    id: "prime-number-generator",
    name: "Prime Number Generator",
    description: "Generate all prime numbers within a specified range instantly.",
    path: "/tools/prime-number-generator",
  },
  {
    id: "prime-factorization",
    name: "Prime Factorization",
    description: "Find the prime factors of any number and display the factorization.",
    path: "/tools/prime-factorization",
  },
  {
    id: "lcm-hcf-calculator",
    name: "LCM & HCF Calculator",
    description: "Calculate Least Common Multiple and Highest Common Factor for multiple numbers.",
    path: "/tools/lcm-hcf-calculator",
  },
  {
    id: "ratio-simplifier",
    name: "Ratio Simplifier",
    description: "Simplify ratios to their lowest terms instantly.",
    path: "/tools/ratio-simplifier",
  },
  {
    id: "mean-median-mode-calculator",
    name: "Mean, Median & Mode Calculator",
    description: "Calculate statistical measures including mean, median, mode, and standard deviation.",
    path: "/tools/mean-median-mode-calculator",
  },
  {
    id: "triangle-area-calculator",
    name: "Triangle Area Calculator",
    description: "Calculate triangle area using base and height, or Heron's formula.",
    path: "/tools/triangle-area-calculator",
  },
  {
    id: "circle-calculator",
    name: "Circle Calculator",
    description: "Calculate circle area, circumference, radius, and diameter from any known value.",
    path: "/tools/circle-calculator",
  },
  {
    id: "fibonacci-generator",
    name: "Fibonacci Generator",
    description: "Generate Fibonacci sequences up to a specified number of terms.",
    path: "/tools/fibonacci-generator",
  },
  {
    id: "quadratic-solver",
    name: "Quadratic Equation Solver",
    description: "Solve quadratic equations and find the roots with detailed steps.",
    path: "/tools/quadratic-solver",
  },
  {
    id: "modulo-calculator",
    name: "Modulo Calculator",
    description: "Calculate the remainder of division operations quickly.",
    path: "/tools/modulo-calculator",
  },
  {
    id: "exponent-calculator",
    name: "Exponent Calculator",
    description: "Calculate powers and exponents with support for fractional exponents.",
    path: "/tools/exponent-calculator",
  },
  {
    id: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    description: "Calculate simple interest on principal amount with custom rates and periods.",
    path: "/tools/simple-interest-calculator",
  },
  {
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest with flexible compounding periods and rates.",
    path: "/tools/compound-interest-calculator",
  },
];

export default function MathCategory() {
  useSEO({
    title: "Math Tools - Free Online Calculators & Converters | Pixocraft",
    description: "Master math instantly with free calculators, converters, and problem solvers. Calculate percentages, loans, interest, statistics, geometry, and more—all offline and private.",
    keywords: "math tools, calculators, percentage calculator, loan calculator, math converter, unit converter, mortgage calculator, free math tools, online calculators, calculation tools",
    canonicalUrl: "https://tools.pixocraft.in/tools/math",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Math Tools", url: "/tools/math" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-math-category">
              Math Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Master Math <span className="text-primary">Calculations Instantly</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Free, offline math calculators and converters for percentages, loans, interest, geometry, statistics, and more
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Solve Math Problems Without Complex Software</h2>
            <p className="text-muted-foreground leading-relaxed">
              Math tools help you perform calculations quickly and accurately for everyday needs. Whether you need to calculate percentages for discounts, determine loan payments, compute interest rates, or work with statistics and geometry, math tools eliminate manual calculation errors. From simple arithmetic operations to complex financial calculations, these tools handle everything in seconds.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Modern math tools provide calculators for financial planning, unit conversions, statistical analysis, geometry problems, and number theory—all accessible directly in your browser without downloads or installations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Benefits from Math Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Students use math calculators for homework, exams, and learning various mathematical concepts from basic arithmetic to advanced statistics. Professionals rely on financial calculators for loan payments, mortgage calculations, and investment planning. Business owners use commission calculators and expense splitters for fair payment distribution. Shoppers calculate discounts and percentage savings. Engineers and scientists solve complex equations and perform unit conversions. Healthcare professionals use BMI and calorie calculators.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Privacy-conscious users appreciate offline processing that keeps financial data on their device. Anyone needing quick, accurate calculations benefits from instant results without network delays or data sharing concerns.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Common Math Calculations</h2>
            <p className="text-muted-foreground leading-relaxed">
              Percentage calculations find discounts, calculate interest, and determine growth rates. Financial calculators compute loan payments, mortgage amounts, EMI, and compound interest. Statistical tools calculate averages, medians, modes, and standard deviations. Geometry calculators find areas, perimeters, and volumes. Unit converters transform between metric and imperial systems. Number theory tools find prime factors, LCM, and HCF.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Age and date calculators compute time differences and durations. Physics calculations include velocity, acceleration, and force. Split calculators divide expenses fairly. Matrix operations handle array calculations. Each tool addresses specific mathematical needs with precision and speed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Private & Offline Math Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              All math tools run entirely in your browser—no uploads to external servers. This offline-first approach ensures complete privacy for financial calculations, personal health data, and sensitive mathematical operations. No tracking, no logging, no third-party analysis. Your calculations stay on your device throughout the entire process.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Local math processing means instant results without network delays, offline functionality after initial load, and zero security risks. Whether calculating mortgages, medical metrics, or business expenses, browser-based processing guarantees genuine privacy and security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Using Math Tools Effectively</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with percentage calculations for everyday discounts and interest rates. Use financial calculators to plan loans and investments. Leverage statistical tools for data analysis and interpretation. Apply geometry calculators to construction and design problems. Convert units when working with different measurement systems. Calculate prime factors for number theory problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Use BMI and calorie calculators for health tracking and fitness planning. Split expenses fairly with payment division tools. Most importantly, integrate math tools into your regular workflow—whether managing finances, completing schoolwork, planning projects, or solving technical problems. Accurate calculations lead to better decisions.
            </p>
          </section>
        </article>

        {/* All Math Tools Section */}
        <section className="space-y-6 border-t pt-12">
          <h2 className="text-2xl font-bold">All Math Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mathTools.map((tool) => (
              <Card key={tool.id} className="hover-elevate flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="mb-4 flex-1">{tool.description}</CardDescription>
                  <a href={tool.path}>
                    <Button variant="outline" className="w-full" data-testid={`button-math-tool-${tool.id}`}>
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateOrganizationSchema()} />
    </div>
  );
}
