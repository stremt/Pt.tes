import { useSEO } from "@/lib/seo";
import TimeDifferenceCalculator from "@/pages/tools/TimeDifferenceCalculator";

export default function TimeDifferenceWorkHours() {
  useSEO({
    title: "Work Hours Time Difference Calculator | Pixocraft",
    description: "Calculate total work hours between any two times. Perfect for timesheets, shift planning, and attendance tracking — instant results, free, no signup required.",
    canonicalUrl: "https://tools.pixocraft.in/tools/time-difference-calculator/work-hours",
    robots: "index, follow",
  });
  return <TimeDifferenceCalculator />;
}
