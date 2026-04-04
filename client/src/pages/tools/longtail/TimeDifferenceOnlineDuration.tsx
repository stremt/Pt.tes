import { useSEO } from "@/lib/seo";
import TimeDifferenceCalculator from "@/pages/tools/TimeDifferenceCalculator";

export default function TimeDifferenceOnlineDuration() {
  useSEO({
    title: "Online Duration Calculator — Time Difference Tool | Pixocraft",
    description: "Calculate the exact duration between two times online. Get hours, minutes, and seconds instantly — free, no login, works on mobile and desktop.",
    canonicalUrl: "https://tools.pixocraft.in/tools/time-difference-calculator/online-duration",
    robots: "index, follow",
  });
  return <TimeDifferenceCalculator />;
}
