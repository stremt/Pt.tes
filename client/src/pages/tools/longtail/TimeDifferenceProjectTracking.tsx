import { useSEO } from "@/lib/seo";
import TimeDifferenceCalculator from "@/pages/tools/TimeDifferenceCalculator";

export default function TimeDifferenceProjectTracking() {
  useSEO({
    title: "Time Difference Calculator for Project Tracking | Pixocraft",
    description: "Track project durations and deadlines with precision. Calculate time differences across tasks, sprints, and milestones — free online tool, no login needed.",
    canonicalUrl: "https://tools.pixocraft.in/tools/time-difference-calculator/project-tracking",
    robots: "index, follow",
  });
  return <TimeDifferenceCalculator />;
}
