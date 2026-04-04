import { useSEO } from "@/lib/seo";
import TimeDifferenceCalculator from "@/pages/tools/TimeDifferenceCalculator";

export default function TimeDifferencePayrollBilling() {
  useSEO({
    title: "Time Difference Calculator for Payroll & Billing | Pixocraft",
    description: "Calculate exact time differences for payroll processing and client billing. Track billable hours, overtime, and pay periods instantly — free, no login required.",
    canonicalUrl: "https://tools.pixocraft.in/tools/time-difference-calculator/payroll-billing",
    robots: "index, follow",
  });
  return <TimeDifferenceCalculator />;
}
