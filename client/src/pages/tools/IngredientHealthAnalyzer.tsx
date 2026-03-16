import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Heart, AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

type HealthImpact = "healthy" | "moderate" | "harmful" | "unknown";

interface IngredientAnalysis {
  name: string;
  category: string;
  healthImpact: HealthImpact;
  explanation: string;
}

interface HealthReport {
  ingredients: IngredientAnalysis[];
  warnings: string[];
  positives: string[];
  score: number;
  scoreLabel: string;
  dietWarnings: string[];
  verdict: string;
}

const INGREDIENT_DATABASE: Record<string, Omit<IngredientAnalysis, "name">> = {
  // Healthy whole foods
  "oats": { category: "whole grain", healthImpact: "healthy", explanation: "Rich in fiber, beta-glucan, and complex carbohydrates. Excellent for heart health and blood sugar control." },
  "oatmeal": { category: "whole grain", healthImpact: "healthy", explanation: "Rich in fiber and complex carbs. Supports heart health and sustained energy." },
  "rolled oats": { category: "whole grain", healthImpact: "healthy", explanation: "Minimally processed whole grain with soluble fiber for cholesterol reduction." },
  "whole wheat": { category: "whole grain", healthImpact: "healthy", explanation: "Contains fiber, vitamins, and minerals. Better than refined wheat." },
  "whole grain": { category: "whole grain", healthImpact: "healthy", explanation: "Provides fiber, B vitamins, and minerals for sustained energy." },
  "almonds": { category: "nut", healthImpact: "healthy", explanation: "High in healthy fats, vitamin E, magnesium, and protein." },
  "walnuts": { category: "nut", healthImpact: "healthy", explanation: "Rich in omega-3 fatty acids and antioxidants. Excellent for brain health." },
  "cashews": { category: "nut", healthImpact: "healthy", explanation: "Good source of magnesium, zinc, and healthy fats." },
  "flaxseed": { category: "seed", healthImpact: "healthy", explanation: "High in omega-3 fatty acids and lignans. Supports heart health." },
  "chia seeds": { category: "seed", healthImpact: "healthy", explanation: "Excellent source of omega-3s, fiber, and calcium." },
  "sunflower seeds": { category: "seed", healthImpact: "healthy", explanation: "Rich in vitamin E and healthy fats." },
  "honey": { category: "natural sweetener", healthImpact: "moderate", explanation: "Natural sweetener with antioxidants, but still high in sugar. Use in moderation." },
  "coconut oil": { category: "oil", healthImpact: "moderate", explanation: "High in saturated fat. Moderate consumption acceptable; limit if monitoring cholesterol." },
  "olive oil": { category: "oil", healthImpact: "healthy", explanation: "Rich in monounsaturated fats and polyphenols. Supports heart health." },
  "sunflower oil": { category: "oil", healthImpact: "moderate", explanation: "High in omega-6 fatty acids. Fine in moderation but may promote inflammation in excess." },
  "palm oil": { category: "oil", healthImpact: "harmful", explanation: "High in saturated fat. Associated with increased heart disease risk." },
  "cocoa": { category: "whole food", healthImpact: "healthy", explanation: "Rich in flavonoids and antioxidants. Beneficial in small amounts without added sugar." },
  "dark chocolate": { category: "whole food", healthImpact: "moderate", explanation: "Contains antioxidants but also sugar and fat. Moderate consumption is fine." },
  "milk": { category: "dairy", healthImpact: "moderate", explanation: "Good source of calcium and protein. Full-fat versions are high in saturated fat." },
  "skimmed milk": { category: "dairy", healthImpact: "healthy", explanation: "Low-fat source of protein and calcium." },
  "whey protein": { category: "protein", healthImpact: "healthy", explanation: "High-quality complete protein. Beneficial for muscle maintenance." },
  "pea protein": { category: "protein", healthImpact: "healthy", explanation: "Plant-based complete protein. Good for muscle and satiety." },
  "soy protein": { category: "protein", healthImpact: "moderate", explanation: "Complete plant protein. Moderate amounts are safe for most people." },
  // Sweeteners
  "sugar": { category: "sweetener", healthImpact: "harmful", explanation: "Refined sugar with no nutritional value. Contributes to obesity, diabetes, and tooth decay." },
  "glucose": { category: "sweetener", healthImpact: "harmful", explanation: "Simple sugar that rapidly spikes blood glucose levels." },
  "fructose": { category: "sweetener", healthImpact: "harmful", explanation: "Excess fructose is metabolized by the liver and may contribute to fatty liver disease." },
  "high fructose corn syrup": { category: "sweetener", healthImpact: "harmful", explanation: "Highly processed sweetener strongly associated with obesity and metabolic syndrome." },
  "corn syrup": { category: "sweetener", healthImpact: "harmful", explanation: "Concentrated sugar source with high glycemic impact." },
  "dextrose": { category: "sweetener", healthImpact: "harmful", explanation: "Simple sugar with high glycemic index, causes rapid blood sugar spikes." },
  "maltose": { category: "sweetener", healthImpact: "harmful", explanation: "High glycemic index sugar that rapidly raises blood sugar." },
  "sucrose": { category: "sweetener", healthImpact: "harmful", explanation: "Table sugar. High consumption linked to metabolic disorders." },
  "maltodextrin": { category: "sweetener", healthImpact: "harmful", explanation: "Ultra-processed carbohydrate with very high glycemic index, even higher than table sugar." },
  "aspartame": { category: "artificial sweetener", healthImpact: "harmful", explanation: "Controversial artificial sweetener. May affect gut microbiome and is linked to headaches in sensitive individuals." },
  "saccharin": { category: "artificial sweetener", healthImpact: "harmful", explanation: "Oldest artificial sweetener. Some studies suggest negative effects on gut bacteria." },
  "acesulfame potassium": { category: "artificial sweetener", healthImpact: "harmful", explanation: "Artificial sweetener that may interfere with metabolic processes." },
  "acesulfame k": { category: "artificial sweetener", healthImpact: "harmful", explanation: "Artificial sweetener with limited long-term safety data." },
  "sucralose": { category: "artificial sweetener", healthImpact: "moderate", explanation: "Artificial sweetener. Generally considered safe but may affect gut microbiome." },
  "stevia": { category: "natural sweetener", healthImpact: "moderate", explanation: "Plant-derived sweetener. Better alternative to refined sugar or artificial sweeteners." },
  "erythritol": { category: "sugar alcohol", healthImpact: "moderate", explanation: "Sugar alcohol with minimal blood sugar impact. Well tolerated in small amounts." },
  "xylitol": { category: "sugar alcohol", healthImpact: "moderate", explanation: "Sugar alcohol with dental benefits. May cause digestive issues in excess." },
  "sorbitol": { category: "sugar alcohol", healthImpact: "moderate", explanation: "Sugar alcohol that may cause bloating and digestive discomfort in larger amounts." },
  // Preservatives
  "sodium benzoate": { category: "preservative", healthImpact: "harmful", explanation: "Preservative that may convert to benzene (a carcinogen) when combined with vitamin C." },
  "potassium sorbate": { category: "preservative", healthImpact: "moderate", explanation: "Common preservative. Generally recognized as safe but may cause mild irritation." },
  "sodium nitrate": { category: "preservative", healthImpact: "harmful", explanation: "Preservative linked to increased cancer risk, especially colorectal cancer." },
  "sodium nitrite": { category: "preservative", healthImpact: "harmful", explanation: "Meat preservative that can form nitrosamines, which are carcinogenic." },
  "bha": { category: "preservative", healthImpact: "harmful", explanation: "Butylated hydroxyanisole — a synthetic antioxidant/preservative classified as possibly carcinogenic." },
  "bht": { category: "preservative", healthImpact: "harmful", explanation: "Butylated hydroxytoluene — synthetic preservative with potential endocrine-disrupting effects." },
  "tbhq": { category: "preservative", healthImpact: "harmful", explanation: "Synthetic preservative with potential carcinogenic concerns at high doses." },
  "calcium propionate": { category: "preservative", healthImpact: "moderate", explanation: "Common bread preservative. Generally safe but some sensitivity reports exist." },
  "sodium metabisulfite": { category: "preservative", healthImpact: "moderate", explanation: "Sulfite preservative that can trigger reactions in sulfite-sensitive individuals." },
  // Artificial colors
  "red 40": { category: "artificial color", healthImpact: "harmful", explanation: "Synthetic dye linked to hyperactivity in children. Banned in some countries." },
  "yellow 5": { category: "artificial color", healthImpact: "harmful", explanation: "Tartrazine — artificial color associated with hyperactivity and allergic reactions." },
  "yellow 6": { category: "artificial color", healthImpact: "harmful", explanation: "Sunset yellow — synthetic dye with potential links to hyperactivity." },
  "blue 1": { category: "artificial color", healthImpact: "harmful", explanation: "Brilliant Blue — artificial color with limited long-term safety data." },
  "caramel color": { category: "artificial color", healthImpact: "moderate", explanation: "Some forms (Class IV) contain 4-MEI, a potential carcinogen." },
  // Flavor additives
  "artificial flavor": { category: "artificial flavoring", healthImpact: "harmful", explanation: "Synthetic flavor compounds of largely unknown composition and health effects." },
  "artificial flavors": { category: "artificial flavoring", healthImpact: "harmful", explanation: "Synthetic flavor chemicals that may mask poor ingredient quality." },
  "natural flavor": { category: "flavoring", healthImpact: "moderate", explanation: "Can be sourced naturally but is highly processed. Composition is often proprietary." },
  "natural flavors": { category: "flavoring", healthImpact: "moderate", explanation: "Derived from natural sources but processing removes nutritional value." },
  "msg": { category: "flavoring", healthImpact: "moderate", explanation: "Monosodium glutamate — flavor enhancer. Generally safe but some people report sensitivity." },
  "monosodium glutamate": { category: "flavoring", healthImpact: "moderate", explanation: "Flavor enhancer. FDA recognizes as safe; some people report headaches or discomfort." },
  // Fats
  "hydrogenated oil": { category: "unhealthy fat", healthImpact: "harmful", explanation: "Contains trans fats that raise LDL cholesterol and lower HDL. Major heart disease risk factor." },
  "partially hydrogenated oil": { category: "unhealthy fat", healthImpact: "harmful", explanation: "Primary source of industrial trans fats. Strongly linked to cardiovascular disease." },
  "trans fat": { category: "unhealthy fat", healthImpact: "harmful", explanation: "Industrial trans fats are among the most harmful dietary fats known." },
  "shortening": { category: "fat", healthImpact: "harmful", explanation: "Often contains hydrogenated oils and trans fats." },
  "lard": { category: "fat", healthImpact: "moderate", explanation: "Animal fat high in saturated fat. Use in moderation." },
  // Additives & emulsifiers
  "soy lecithin": { category: "emulsifier", healthImpact: "moderate", explanation: "Common emulsifier derived from soybeans. Generally safe in small quantities." },
  "sunflower lecithin": { category: "emulsifier", healthImpact: "moderate", explanation: "Emulsifier considered safer than soy lecithin. Generally well tolerated." },
  "carrageenan": { category: "thickener", healthImpact: "harmful", explanation: "Seaweed extract used as thickener. Associated with gut inflammation in some studies." },
  "xanthan gum": { category: "thickener", healthImpact: "moderate", explanation: "Fermented thickener. Safe in small amounts but may cause digestive issues in excess." },
  "guar gum": { category: "thickener", healthImpact: "moderate", explanation: "Natural thickener. May cause bloating in sensitive individuals." },
  "locust bean gum": { category: "thickener", healthImpact: "moderate", explanation: "Natural thickener from carob seeds. Generally safe." },
  "modified starch": { category: "thickener", healthImpact: "moderate", explanation: "Chemically altered starch. High glycemic and highly processed." },
  "modified food starch": { category: "thickener", healthImpact: "moderate", explanation: "Processed starch used as thickener. Generally safe but highly processed." },
  "sodium phosphate": { category: "additive", healthImpact: "harmful", explanation: "High phosphate intake is linked to kidney disease and cardiovascular issues." },
  "disodium phosphate": { category: "additive", healthImpact: "harmful", explanation: "Phosphate additive linked to accelerated aging and kidney stress." },
  "calcium disodium edta": { category: "preservative", healthImpact: "moderate", explanation: "Chelating preservative. Safe at approved levels but may reduce mineral absorption." },
  // Sodium/salt
  "salt": { category: "mineral", healthImpact: "moderate", explanation: "Essential mineral but excess sodium linked to high blood pressure and cardiovascular disease." },
  "sodium": { category: "mineral", healthImpact: "moderate", explanation: "Essential but high intake raises blood pressure risk." },
  "sodium chloride": { category: "mineral", healthImpact: "moderate", explanation: "Table salt. Essential in small amounts; excess raises blood pressure." },
  // Vitamins & minerals (added)
  "vitamin c": { category: "vitamin", healthImpact: "healthy", explanation: "Essential antioxidant vitamin supporting immune function." },
  "ascorbic acid": { category: "vitamin", healthImpact: "healthy", explanation: "Vitamin C — antioxidant used as a nutrient or preservative." },
  "vitamin e": { category: "vitamin", healthImpact: "healthy", explanation: "Fat-soluble antioxidant protecting cells from oxidative damage." },
  "tocopherol": { category: "vitamin", healthImpact: "healthy", explanation: "Natural form of vitamin E used as an antioxidant." },
  "niacin": { category: "vitamin", healthImpact: "healthy", explanation: "Vitamin B3 — essential for energy metabolism." },
  "riboflavin": { category: "vitamin", healthImpact: "healthy", explanation: "Vitamin B2 — important for energy production." },
  "thiamine": { category: "vitamin", healthImpact: "healthy", explanation: "Vitamin B1 — essential for carbohydrate metabolism." },
  "iron": { category: "mineral", healthImpact: "healthy", explanation: "Essential mineral for oxygen transport in the blood." },
  "calcium": { category: "mineral", healthImpact: "healthy", explanation: "Essential mineral for bone health and muscle function." },
  "zinc": { category: "mineral", healthImpact: "healthy", explanation: "Essential trace mineral supporting immune function." },
  // Fiber
  "dietary fiber": { category: "fiber", healthImpact: "healthy", explanation: "Supports digestive health, blood sugar control, and cholesterol levels." },
  "inulin": { category: "fiber", healthImpact: "healthy", explanation: "Prebiotic fiber that feeds beneficial gut bacteria." },
  "psyllium husk": { category: "fiber", healthImpact: "healthy", explanation: "Soluble fiber excellent for digestive health and cholesterol reduction." },
  // Refined carbs
  "enriched flour": { category: "refined grain", healthImpact: "moderate", explanation: "Refined wheat with some vitamins added back. Lower fiber than whole grain." },
  "refined flour": { category: "refined grain", healthImpact: "moderate", explanation: "Stripped of fiber and most nutrients. High glycemic index." },
  "white flour": { category: "refined grain", healthImpact: "moderate", explanation: "Refined grain with minimal fiber. Raises blood sugar quickly." },
  "maida": { category: "refined grain", healthImpact: "harmful", explanation: "Highly refined wheat flour with very low nutritional value and high glycemic index." },
  "refined wheat flour": { category: "refined grain", healthImpact: "moderate", explanation: "Processed flour lacking the fiber and nutrients of whole wheat." },
  "corn starch": { category: "starch", healthImpact: "moderate", explanation: "High glycemic starch with minimal nutritional value." },
  "tapioca starch": { category: "starch", healthImpact: "moderate", explanation: "Gluten-free starch but low in nutrients." },
};

function parseIngredients(raw: string): string[] {
  return raw
    .replace(/\([^)]*%[^)]*\)/g, "")
    .replace(/\[[^\]]*\]/g, "")
    .replace(/\([^)]*\)/g, (m) => m.replace(/,/g, ";"))
    .split(/,|;|\n/)
    .map((s) => s.replace(/\s*\(.*?\)\s*/g, "").trim().toLowerCase())
    .map((s) => s.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "").trim())
    .filter((s) => s.length > 1 && s.length < 80);
}

function findIngredientMatch(name: string): Omit<IngredientAnalysis, "name"> | null {
  const lower = name.toLowerCase();
  if (INGREDIENT_DATABASE[lower]) return INGREDIENT_DATABASE[lower];
  for (const key of Object.keys(INGREDIENT_DATABASE)) {
    if (lower.includes(key) || key.includes(lower)) {
      return INGREDIENT_DATABASE[key];
    }
  }
  if (/hydrogenated|trans fat/i.test(lower)) {
    return { category: "unhealthy fat", healthImpact: "harmful", explanation: "Contains trans fats that are harmful to heart health." };
  }
  if (/artificial colou?r|fd&c|dye \d/i.test(lower)) {
    return { category: "artificial color", healthImpact: "harmful", explanation: "Synthetic food dye linked to hyperactivity and allergic reactions." };
  }
  if (/preservative|nitrate|nitrite|sorbate|benzoate/i.test(lower)) {
    return { category: "preservative", healthImpact: "moderate", explanation: "Food preservative to extend shelf life. May cause reactions in sensitive individuals." };
  }
  if (/sugar|syrup|dextrose|fructose|glucose|sucrose|maltose/i.test(lower)) {
    return { category: "sweetener", healthImpact: "harmful", explanation: "Added sugar or sugar derivative contributing to high glycemic load." };
  }
  if (/artificial flavou?r|synthetic flavou?r/i.test(lower)) {
    return { category: "artificial flavoring", healthImpact: "harmful", explanation: "Synthetic flavor with unknown long-term health effects." };
  }
  if (/oil|fat/i.test(lower)) {
    return { category: "oil/fat", healthImpact: "moderate", explanation: "Source of fat. Health impact depends on type and processing." };
  }
  if (/flour|starch/i.test(lower)) {
    return { category: "refined carb", healthImpact: "moderate", explanation: "Starchy ingredient — may be refined or whole grain depending on source." };
  }
  if (/vitamin|mineral|calcium|iron|zinc|magnesium|potassium/i.test(lower)) {
    return { category: "micronutrient", healthImpact: "healthy", explanation: "Added vitamin or mineral that supports nutritional value." };
  }
  if (/extract|powder|concentrate/i.test(lower)) {
    return { category: "natural extract", healthImpact: "moderate", explanation: "Concentrated or extracted natural ingredient. Usually safe." };
  }
  return null;
}

function analyzeIngredients(raw: string): HealthReport {
  const parsed = parseIngredients(raw);
  const analyzed: IngredientAnalysis[] = [];

  for (const name of parsed) {
    const match = findIngredientMatch(name);
    if (match) {
      analyzed.push({ name, ...match });
    } else {
      analyzed.push({
        name,
        category: "unknown",
        healthImpact: "unknown",
        explanation: "This ingredient is not in our database. Check its source or consult a nutritionist.",
      });
    }
  }

  const harmfulCount = analyzed.filter((i) => i.healthImpact === "harmful").length;
  const moderateCount = analyzed.filter((i) => i.healthImpact === "moderate").length;
  const healthyCount = analyzed.filter((i) => i.healthImpact === "healthy").length;
  const unknownCount = analyzed.filter((i) => i.healthImpact === "unknown").length;
  const total = analyzed.length || 1;

  const baseScore =
    (healthyCount * 100 + moderateCount * 55 + unknownCount * 40 + harmfulCount * 0) / total;
  const penaltyFactor = harmfulCount > 0 ? Math.min(harmfulCount * 8, 40) : 0;
  const score = Math.max(0, Math.min(100, Math.round(baseScore - penaltyFactor)));

  let scoreLabel: string;
  if (score >= 80) scoreLabel = "Excellent / Healthy";
  else if (score >= 60) scoreLabel = "Good / Mostly Healthy";
  else if (score >= 40) scoreLabel = "Moderate / Processed";
  else if (score >= 20) scoreLabel = "Unhealthy";
  else scoreLabel = "Highly Unhealthy / Avoid";

  const warnings: string[] = [];
  const hasSugar = analyzed.some((i) => i.category === "sweetener" && i.healthImpact === "harmful");
  const hasArtificialColor = analyzed.some((i) => i.category === "artificial color");
  const hasArtificialFlavor = analyzed.some((i) => i.category === "artificial flavoring");
  const hasPreservative = analyzed.some((i) => i.category === "preservative" && i.healthImpact === "harmful");
  const hasTransFat = analyzed.some((i) => i.category === "unhealthy fat" && i.healthImpact === "harmful");
  const hasHighGlycemic = analyzed.some((i) =>
    ["maltodextrin", "dextrose", "corn syrup", "high fructose corn syrup", "maida"].includes(i.name)
  );
  const hasArtificialSweetener = analyzed.some((i) => i.category === "artificial sweetener");

  if (hasSugar) warnings.push("High sugar content — may contribute to obesity, diabetes, and energy crashes.");
  if (hasArtificialColor) warnings.push("Artificial food colors detected — linked to hyperactivity in children and allergic reactions.");
  if (hasArtificialFlavor) warnings.push("Artificial flavors present — synthetic compounds of unknown composition.");
  if (hasPreservative) warnings.push("Chemical preservatives detected — may cause adverse reactions in sensitive individuals.");
  if (hasTransFat) warnings.push("Hydrogenated/trans fats detected — strongly linked to cardiovascular disease.");
  if (hasHighGlycemic) warnings.push("High glycemic ingredients found — rapid blood sugar spikes expected.");
  if (hasArtificialSweetener) warnings.push("Artificial sweeteners present — may affect gut microbiome and metabolic health.");
  if (harmfulCount >= 3) warnings.push("Multiple harmful ingredients detected — this is a highly processed product.");

  const positives = analyzed
    .filter((i) => i.healthImpact === "healthy")
    .map((i) => `${i.name.charAt(0).toUpperCase() + i.name.slice(1)} — ${i.explanation}`);

  const dietWarnings: string[] = [];
  if (hasSugar || hasHighGlycemic || hasArtificialSweetener)
    dietWarnings.push("Diabetics and pre-diabetics (high sugar / high glycemic load)");
  if (hasSugar || hasTransFat || harmfulCount >= 2)
    dietWarnings.push("People on weight-loss diets (calorie-dense and nutrient-poor)");
  if (hasArtificialColor || hasArtificialFlavor)
    dietWarnings.push("Children (artificial additives linked to behavioral issues)");
  if (hasPreservative || hasTransFat)
    dietWarnings.push("People with cardiovascular conditions (harmful fats and preservatives)");
  if (harmfulCount >= 2 || hasTransFat || hasArtificialFlavor)
    dietWarnings.push("People avoiding ultra-processed foods");

  let verdict: string;
  if (score >= 80) {
    verdict = "This product appears to be largely healthy with mostly natural, wholesome ingredients. Suitable for regular consumption as part of a balanced diet.";
  } else if (score >= 60) {
    verdict = "This product is moderately healthy. It contains mostly good ingredients with some processed elements. Suitable for occasional consumption.";
  } else if (score >= 40) {
    verdict = "This product is moderately processed and contains several ingredients of concern. Consume in moderation and consider healthier alternatives.";
  } else if (score >= 20) {
    verdict = "This product is unhealthy. It contains multiple harmful ingredients including artificial additives, excess sugars, or harmful fats. Minimize consumption.";
  } else {
    verdict = "This product is highly unhealthy. It is loaded with harmful ingredients — artificial additives, trans fats, excessive sugar, or chemical preservatives. Avoid or replace with a whole food alternative.";
  }

  return { ingredients: analyzed, warnings, positives, score, scoreLabel, dietWarnings, verdict };
}

function ScoreRing({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-lime-500";
    if (score >= 40) return "text-yellow-500";
    if (score >= 20) return "text-orange-500";
    return "text-red-500";
  };
  const getBg = () => {
    if (score >= 80) return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800";
    if (score >= 60) return "bg-lime-50 dark:bg-lime-950/30 border-lime-200 dark:border-lime-800";
    if (score >= 40) return "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800";
    if (score >= 20) return "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800";
    return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
  };

  return (
    <div className={`rounded-xl border-2 p-6 text-center ${getBg()}`}>
      <p className="text-sm font-medium text-muted-foreground mb-1">Overall Health Score</p>
      <p className={`text-6xl font-extrabold tracking-tight ${getColor()}`} data-testid="text-health-score">{score}</p>
      <p className="text-xs text-muted-foreground mt-1">out of 100</p>
      <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${score >= 80 ? "bg-green-500" : score >= 60 ? "bg-lime-500" : score >= 40 ? "bg-yellow-500" : score >= 20 ? "bg-orange-500" : "bg-red-500"}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className={`mt-2 text-sm font-semibold ${getColor()}`} data-testid="text-score-label">{score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Moderate" : score >= 20 ? "Unhealthy" : "Highly Unhealthy"}</p>
    </div>
  );
}

function ImpactBadge({ impact }: { impact: HealthImpact }) {
  const map: Record<HealthImpact, { label: string; className: string }> = {
    healthy: { label: "Healthy", className: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700" },
    moderate: { label: "Moderate", className: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700" },
    harmful: { label: "Harmful", className: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700" },
    unknown: { label: "Unknown", className: "bg-muted text-muted-foreground border-border" },
  };
  const { label, className } = map[impact];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${className}`}>
      {label}
    </span>
  );
}

export default function IngredientHealthAnalyzer() {
  const [input, setInput] = useState("");
  const [report, setReport] = useState<HealthReport | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useSEO({
    title: "Ingredient Health Analyzer | Food Label Checker | Pixocraft Tools",
    description: "Paste any food product ingredient list and instantly get a detailed health report — ingredient risk levels, health score, warnings, and diet suitability.",
    keywords: "ingredient health analyzer, food label checker, ingredient scanner, healthy food checker, food additive checker, ingredient risk analysis",
    canonicalUrl: "https://tools.pixocraft.in/tools/ingredient-health-analyzer",
  });

  const handleAnalyze = () => {
    if (!input.trim()) return;
    const result = analyzeIngredients(input);
    setReport(result);
    setExpanded({});
  };

  const toggleExpand = (i: number) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  const faqItems: FAQItem[] = [
    {
      question: "How does the Ingredient Health Analyzer work?",
      answer: "Paste the ingredient list from any food product label. The tool parses and identifies each ingredient, checks it against a health database, assigns a risk level, and calculates an overall health score from 0 to 100.",
    },
    {
      question: "What does the health score mean?",
      answer: "The score ranges from 0 to 100. 80–100 means Excellent/Healthy, 60–79 means Good/Mostly Healthy, 40–59 means Moderate/Processed, 20–39 means Unhealthy, and 0–19 means Highly Unhealthy/Avoid.",
    },
    {
      question: "Is my ingredient data stored or sent to a server?",
      answer: "No. All analysis is done directly in your browser. Your ingredient data is never sent to any server — it's completely private and offline-friendly.",
    },
    {
      question: "Which ingredients are considered harmful?",
      answer: "Harmful ingredients include trans fats (hydrogenated oils), artificial colors and flavors, chemical preservatives like sodium benzoate and BHA/BHT, high-fructose corn syrup, maltodextrin, and artificial sweeteners like aspartame and saccharin.",
    },
    {
      question: "Can I use this for packaged foods or restaurant ingredients?",
      answer: "Yes! Just copy the ingredient list exactly as it appears on the food label or menu description and paste it into the analyzer.",
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const howItWorks = [
    { step: 1, title: "Paste Ingredients", description: "Copy the ingredient list from any food label exactly as printed." },
    { step: 2, title: "Click Analyze", description: "Our smart parser identifies and evaluates each ingredient." },
    { step: 3, title: "Get Your Report", description: "Receive an instant health score, warnings, and diet suitability guide." },
  ];

  const benefits = [
    { icon: <Heart className="h-5 w-5" />, title: "Instant Analysis", description: "Get a full health report in seconds without any sign-up." },
    { icon: <Leaf className="h-5 w-5" />, title: "Ingredient-by-Ingredient", description: "Every ingredient is individually evaluated with an explanation." },
    { icon: <AlertTriangle className="h-5 w-5" />, title: "Clear Warnings", description: "Harmful additives, trans fats, and artificial ingredients are flagged." },
    { icon: <CheckCircle className="h-5 w-5" />, title: "Diet Suitability", description: "Know who should avoid the product — diabetics, children, and more." },
  ];

  const impactOrder: HealthImpact[] = ["harmful", "moderate", "unknown", "healthy"];
  const sortedIngredients = report
    ? [...report.ingredients].sort(
        (a, b) => impactOrder.indexOf(a.healthImpact) - impactOrder.indexOf(b.healthImpact)
      )
    : [];

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Ingredient Health Analyzer"
        description="Paste any food ingredient list and instantly receive a detailed health report with risk levels, warnings, and an overall health score."
        icon={<Heart className="h-8 w-8" />}
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqItems.map((f) => ({ question: f.question, answer: f.answer }))}
        toolId="ingredient-health-analyzer"
      >
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ingredient-input" className="text-sm font-semibold">
                  Paste Ingredient List
                </Label>
                <Textarea
                  id="ingredient-input"
                  data-testid="textarea-ingredients"
                  placeholder={`Paste the ingredient list from the food label here. For example:\n\nWhole wheat flour, sugar, palm oil, salt, glucose syrup, artificial flavor, sodium benzoate, red 40, xanthan gum`}
                  className="min-h-36 text-sm leading-relaxed font-mono resize-y"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Copy the ingredients exactly as shown on the food label — commas, brackets and all.
                </p>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!input.trim()}
                size="lg"
                className="w-full"
                data-testid="button-analyze"
              >
                <Heart className="mr-2 h-5 w-5" />
                Analyze Ingredients
              </Button>
            </CardContent>
          </Card>

          {report && (
            <div className="space-y-5" data-testid="section-report">
              <ScoreRing score={report.score} />

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Final Verdict
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed" data-testid="text-verdict">{report.verdict}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{report.ingredients.filter(i => i.healthImpact === "healthy").length} Healthy</Badge>
                    <Badge variant="outline">{report.ingredients.filter(i => i.healthImpact === "moderate").length} Moderate</Badge>
                    <Badge variant="outline">{report.ingredients.filter(i => i.healthImpact === "harmful").length} Harmful</Badge>
                    <Badge variant="outline">{report.ingredients.filter(i => i.healthImpact === "unknown").length} Unknown</Badge>
                  </div>
                </CardContent>
              </Card>

              {report.warnings.length > 0 && (
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                      Ingredient Warnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {report.warnings.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" data-testid={`text-warning-${i}`}>
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {report.positives.length > 0 && (
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Leaf className="h-4 w-4" />
                      Positive Ingredients
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {report.positives.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" data-testid={`text-positive-${i}`}>
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {report.dietWarnings.length > 0 && (
                <Card className="border-orange-200 dark:border-orange-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      <AlertTriangle className="h-4 w-4" />
                      Who Should Avoid This Product
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {report.dietWarnings.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" data-testid={`text-diet-warning-${i}`}>
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Detected Ingredients ({report.ingredients.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {sortedIngredients.map((ing, i) => (
                      <div key={i} className="p-4" data-testid={`ingredient-item-${i}`}>
                        <button
                          className="w-full text-left"
                          onClick={() => toggleExpand(i)}
                          data-testid={`button-toggle-ingredient-${i}`}
                        >
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium capitalize">{ing.name}</span>
                              <ImpactBadge impact={ing.healthImpact} />
                              <span className="text-xs text-muted-foreground capitalize">{ing.category}</span>
                            </div>
                            {expanded[i] ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                            )}
                          </div>
                        </button>
                        {expanded[i] && (
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed pl-0">
                            {ing.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => { setReport(null); setInput(""); setExpanded({}); }}
                  data-testid="button-analyze-another"
                >
                  Analyze Another Product
                </Button>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
