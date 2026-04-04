import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Heart, AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp, Leaf, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  INGREDIENTS,
  COMBINATION_WARNINGS,
  lookupIngredient,
  inputLooksLikeFood,
  getPositionWeight,
  type HealthImpact,
} from "@/lib/ingredientDatabase";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface IngredientAnalysis {
  originalName: string;
  canonicalName: string;
  category: string;
  impact: HealthImpact | "unknown";
  explanation: string;
}

interface HealthReport {
  ingredients: IngredientAnalysis[];
  warnings: string[];
  combinationWarnings: string[];
  positives: string[];
  score: number;
  dietWarnings: string[];
  verdict: string;
  healthyCount: number;
  moderateCount: number;
  harmfulCount: number;
  unknownCount: number;
  unknownIngredients: string[];
}

// ─── INGREDIENT LIST PARSER ───────────────────────────────────────────────────
// Step 1: text cleaning + ingredient split

function parseIngredientList(raw: string): string[] {
  // Step 1: Normalize line endings and whitespace
  let text = raw.replace(/\r\n/g, "\n").replace(/\t/g, " ");

  // Step 2: Split on commas/semicolons/newlines, flatten sub-ingredient lists (parentheses content)
  const chunks: string[] = [];
  let depth = 0;
  let current = "";

  for (const ch of text) {
    if (ch === "(" || ch === "[") {
      depth++;
      if (depth === 1) {
        // Flush current token, then continue capturing sub-ingredients as extra tokens
        if (current.trim()) chunks.push(current.trim());
        current = "";
        continue;
      }
    }
    if (ch === ")" || ch === "]") {
      depth--;
      if (depth === 0) {
        if (current.trim()) chunks.push(current.trim());
        current = "";
        continue;
      }
    }

    if (depth > 0) {
      // Inside parentheses — sub-ingredients separated by commas
      if (ch === ",") {
        if (current.trim()) chunks.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    } else {
      if (ch === "," || ch === "\n" || ch === ";" || ch === "|") {
        chunks.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  if (current.trim()) chunks.push(current.trim());

  // Step 3: Clean each token
  const seen = new Set<string>();
  return chunks
    // Remove percentages
    .map((s) => s.replace(/%\s*\d+(\.\d+)?/g, "").replace(/\d+(\.\d+)?%/g, "").trim())
    // Remove leading/trailing non-alpha chars
    .map((s) => s.replace(/^[\s\W]+|[\s\W]+$/g, "").trim().toLowerCase())
    // Filter short/invalid tokens
    .filter((s) => s.length >= 2 && s.length <= 100 && !/^\d+(\.\d+)?$/.test(s))
    // Deduplicate
    .filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
}

// ─── ANALYSIS ENGINE ──────────────────────────────────────────────────────────

function analyzeIngredients(rawInput: string): { report: HealthReport } | { error: string } {
  // Step 1: Parse and clean
  const rawTokens = parseIngredientList(rawInput);

  if (rawTokens.length < 2) {
    return { error: "No valid ingredient list detected. Please paste ingredients exactly as written on a food label." };
  }

  // Step 2: Validate that the input looks like a food ingredient list
  if (!inputLooksLikeFood(rawTokens)) {
    return { error: "No valid ingredient list detected. Please paste ingredients exactly as written on a food label." };
  }

  // Step 3: Alias matching → canonical mapping → database lookup
  const analyzed: IngredientAnalysis[] = [];
  const unknownList: string[] = [];

  for (const raw of rawTokens) {
    const entry = lookupIngredient(raw);
    if (entry) {
      analyzed.push({
        originalName: raw,
        canonicalName: entry.name,
        category: entry.category,
        impact: entry.impact,
        explanation: entry.description,
      });
    } else {
      unknownList.push(raw);
    }
  }

  // Step 4: Unknown ingredient handling — show max 5, ignore the rest
  const cappedUnknowns: IngredientAnalysis[] = unknownList.slice(0, 5).map((name) => ({
    originalName: name,
    canonicalName: name,
    category: "unknown",
    impact: "unknown" as const,
    explanation: "Not found in our database. Verify on a nutrition resource or consult a nutritionist.",
  }));

  const allIngredients = [...analyzed, ...cappedUnknowns];

  // Step 5: Scoring — base score 60, add position-weighted adjustments
  let score = 60;
  analyzed.forEach((ing, idx) => {
    const entry = lookupIngredient(ing.originalName);
    if (!entry) return;
    const weight = getPositionWeight(idx);
    score += entry.base_score * weight;
  });

  // Cap score
  score = Math.min(100, Math.max(0, Math.round(score)));

  // If any harmful ingredients found, cap at 95
  const hasAnyHarmfulOrModerate = analyzed.some((i) => i.impact === "harmful" || i.impact === "moderate");
  if (hasAnyHarmfulOrModerate && score > 95) score = 95;

  // ── Ingredient flags for warnings ──
  const canonicals = analyzed.map((i) => i.canonicalName);

  const hasSugar          = analyzed.some((i) => ["sugar","high fructose corn syrup","glucose","fructose","maltodextrin","invert sugar","brown sugar"].includes(i.canonicalName));
  const hasPalmOil        = analyzed.some((i) => i.canonicalName === "palm oil" || i.canonicalName === "palm kernel oil");
  const hasTransFat       = analyzed.some((i) => i.canonicalName === "hydrogenated oil" || i.canonicalName === "trans fat" || i.canonicalName === "shortening" || i.impact === "harmful" && i.category === "trans fat");
  const hasArtificialColor = analyzed.some((i) => i.category === "artificial color");
  const hasArtificialFlavor = analyzed.some((i) => i.category === "artificial flavoring");
  const hasMaltodextrin   = analyzed.some((i) => i.canonicalName === "maltodextrin");
  const hasArtificialSweetener = analyzed.some((i) => i.category === "artificial sweetener");
  const hasRefinedGrain   = analyzed.some((i) => i.category === "refined grain");
  const hasPreservative   = analyzed.some((i) => i.impact === "harmful" && i.category === "preservative");
  const hasMaida          = analyzed.some((i) => i.canonicalName === "maida");
  const hasSodiumBenzoate = analyzed.some((i) => i.canonicalName === "sodium benzoate");
  const hasVitaminC       = analyzed.some((i) => i.canonicalName === "ascorbic acid" || i.category === "vitamin");
  const hasWholegrains    = analyzed.some((i) => i.category === "whole grain");
  const hasLegumes        = analyzed.some((i) => i.category === "legume");
  const hasSeeds          = analyzed.some((i) => i.category === "seed");
  const hasNuts           = analyzed.some((i) => i.category === "nut");
  const hasFiber          = analyzed.some((i) => i.category === "fiber");
  const hasHealthyFat     = analyzed.some((i) => i.category === "healthy oil");
  const hasProbiotics     = analyzed.some((i) => i.category === "probiotic");

  // ── Specific Ingredient Warnings ──
  const warnings: string[] = [];
  if (hasSugar)           warnings.push("Contains refined sugars or high-glycemic sweeteners.");
  if (hasPalmOil)         warnings.push("Contains palm oil — high in saturated fat and linked to cardiovascular risk.");
  if (hasTransFat)        warnings.push("Contains trans fats or hydrogenated oils — strongly linked to heart disease.");
  if (hasArtificialColor) warnings.push("Contains artificial food colors — linked to hyperactivity in children.");
  if (hasArtificialFlavor) warnings.push("Contains artificial flavors — synthetic chemicals with unknown long-term effects.");
  if (hasMaltodextrin)    warnings.push("Contains maltodextrin — a processed carbohydrate with an extremely high glycemic index.");
  if (hasArtificialSweetener) warnings.push("Contains artificial sweeteners — may disrupt gut microbiome.");
  if (hasPreservative)    warnings.push("Contains chemical preservatives — may cause reactions in sensitive individuals.");
  if (hasMaida)           warnings.push("Contains maida (refined wheat flour) — stripped of fiber and nutrients, high glycemic.");
  if (hasSodiumBenzoate && hasVitaminC) warnings.push("Sodium benzoate + Vitamin C detected — may form benzene, a known carcinogen.");

  // ── Combination Warnings ──
  const combinationWarnings: string[] = [];

  for (const cw of COMBINATION_WARNINGS) {
    // Match combination against canonical names and categories
    const allPresent = cw.combo.every((comboItem) => {
      const lower = comboItem.toLowerCase();
      return (
        canonicals.some((c) => c.includes(lower) || lower.includes(c)) ||
        analyzed.some((a) => a.category.includes(lower))
      );
    });
    if (allPresent) {
      combinationWarnings.push(cw.warning);
    }
  }

  // ── Positives / Highlights ──
  const positives: string[] = [];
  if (hasWholegrains)  positives.push("Contains whole grains — excellent source of fiber and slow-release energy.");
  if (hasLegumes)      positives.push("Contains legumes — high in plant protein, fiber, and essential minerals.");
  if (hasNuts)         positives.push("Contains nuts — rich in healthy fats, antioxidants, and micronutrients.");
  if (hasSeeds)        positives.push("Contains seeds — excellent source of omega-3 fatty acids and minerals.");
  if (hasFiber)        positives.push("Contains added dietary fiber — supports digestive and cardiovascular health.");
  if (hasHealthyFat)   positives.push("Contains healthy oils — rich in monounsaturated fats and polyphenols.");
  if (hasProbiotics)   positives.push("Contains probiotics — supports gut microbiome and immune function.");

  // ── Diet Warnings ──
  const dietWarnings: string[] = [];
  if (hasSugar || hasMaltodextrin || hasArtificialSweetener || hasRefinedGrain)
    dietWarnings.push("Diabetics and pre-diabetics (high sugar / high glycemic load)");
  if (hasSugar || hasTransFat || hasPalmOil)
    dietWarnings.push("People on weight-loss diets (calorie-dense and nutrient-poor)");
  if (hasArtificialColor || hasArtificialFlavor)
    dietWarnings.push("Children (artificial additives linked to behavioural issues)");
  if (hasTransFat || hasPreservative)
    dietWarnings.push("People with cardiovascular conditions (trans fats and chemical preservatives)");
  if (hasTransFat || hasArtificialFlavor || hasArtificialColor || hasMaltodextrin)
    dietWarnings.push("People avoiding ultra-processed foods");

  // ── Final Verdict ──
  let verdict: string;
  if (score >= 80) verdict = "This product is excellent and very healthy. It is made up of natural, wholesome ingredients with minimal processing. Excellent for regular daily consumption as part of a balanced diet.";
  else if (score >= 60) verdict = "This product is healthy overall. It contains mostly good ingredients with some processed or moderate elements. Suitable for regular consumption.";
  else if (score >= 40) verdict = "This product is moderately processed. It contains a mix of acceptable and concerning ingredients. Consume occasionally and consider healthier alternatives.";
  else if (score >= 20) verdict = "This product is unhealthy. It contains multiple harmful ingredients such as artificial additives, excessive sugars, or harmful fats. Minimize consumption.";
  else verdict = "This product is highly unhealthy. It is loaded with harmful ingredients — trans fats, artificial additives, excessive sugar, or chemical preservatives. Avoid and replace with a whole food alternative.";

  const healthyCount  = analyzed.filter((i) => i.impact === "healthy").length;
  const moderateCount = analyzed.filter((i) => i.impact === "moderate").length;
  const harmfulCount  = analyzed.filter((i) => i.impact === "harmful").length;
  const unknownCount  = cappedUnknowns.length;

  return {
    report: {
      ingredients: allIngredients,
      warnings,
      combinationWarnings,
      positives,
      score,
      dietWarnings,
      verdict,
      healthyCount,
      moderateCount,
      harmfulCount,
      unknownCount,
      unknownIngredients: unknownList.slice(0, 5),
    },
  };
}

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────

function ScoreDisplay({ score }: { score: number }) {
  const color = score >= 80 ? "text-green-600 dark:text-green-400"
    : score >= 60 ? "text-lime-600 dark:text-lime-400"
    : score >= 40 ? "text-yellow-600 dark:text-yellow-400"
    : score >= 20 ? "text-orange-600 dark:text-orange-400"
    : "text-red-600 dark:text-red-400";
  const bg = score >= 80 ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
    : score >= 60 ? "bg-lime-50 dark:bg-lime-950/30 border-lime-200 dark:border-lime-800"
    : score >= 40 ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800"
    : score >= 20 ? "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800"
    : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
  const bar = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-lime-500" : score >= 40 ? "bg-yellow-500" : score >= 20 ? "bg-orange-500" : "bg-red-500";
  const label = score >= 80 ? "Excellent / Very Healthy" : score >= 60 ? "Healthy" : score >= 40 ? "Moderate / Processed" : score >= 20 ? "Unhealthy" : "Highly Unhealthy / Avoid";

  return (
    <div className={`rounded-xl border-2 p-6 text-center ${bg}`}>
      <p className="text-sm font-medium text-muted-foreground mb-1">Overall Health Score</p>
      <p className={`text-6xl font-extrabold tracking-tight ${color}`} data-testid="text-health-score">{score}</p>
      <p className="text-xs text-muted-foreground mt-1">out of 100</p>
      <div className="mt-3 h-2.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${bar}`} style={{ width: `${score}%` }} />
      </div>
      <p className={`mt-2 text-sm font-semibold ${color}`} data-testid="text-score-label">{label}</p>
    </div>
  );
}

function ImpactBadge({ impact }: { impact: HealthImpact | "unknown" }) {
  const map: Record<string, { label: string; cls: string }> = {
    healthy:  { label: "Healthy",  cls: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700" },
    moderate: { label: "Moderate", cls: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700" },
    harmful:  { label: "Harmful",  cls: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700" },
    unknown:  { label: "Unknown",  cls: "bg-muted text-muted-foreground border border-border" },
  };
  const { label, cls } = map[impact] ?? map["unknown"];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${cls}`}>{label}</span>;
}

// ─── DATABASE STATS (shown in UI) ─────────────────────────────────────────────
const totalAliases = INGREDIENTS.reduce((sum, e) => sum + e.aliases.length + 1, 0);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function IngredientHealthAnalyzer() {
  const [input, setInput]     = useState("");
  const [report, setReport]   = useState<HealthReport | null>(null);
  const [error, setError]     = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useSEO({
    title: "Ingredient Health Analyzer | Food Label Checker | Pixocraft Tools",
    description: "Paste any food product ingredient list and instantly get a detailed health report — ingredient risk levels, weighted health score, warnings, and diet suitability. 100% private & offline.",
    keywords: "ingredient health analyzer, food label checker, ingredient scanner, healthy food checker, food additive checker, ingredient risk analysis",
    canonicalUrl: "https://tools.pixocraft.in/tools/ingredient-health-analyzer",
  });

  const handleAnalyze = () => {
    const result = analyzeIngredients(input);
    if ("error" in result) {
      setError(result.error);
      setReport(null);
    } else {
      setError(null);
      setReport(result.report);
      setExpanded({});
    }
  };

  const handleReset = () => {
    setInput("");
    setReport(null);
    setError(null);
    setExpanded({});
  };

  const toggleExpand = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  const faqItems: FAQItem[] = [
    { question: "How does the Ingredient Health Analyzer work?", answer: "Paste the ingredient list from any food product label. The tool parses and identifies each ingredient, matches it against a structured health database using alias normalization, and generates an overall health score from 0 to 100 using position-weighted scoring." },
    { question: "What does the health score mean?", answer: "80–100 = Excellent/Very Healthy, 60–79 = Healthy, 40–59 = Moderate/Processed, 20–39 = Unhealthy, 0–19 = Highly Unhealthy. Ingredients listed first on food labels are present in larger quantities and affect the score more." },
    { question: "Is my data sent to a server?", answer: "No. All analysis is done entirely in your browser. Your ingredient data is never sent to any server — completely private and offline-friendly." },
    { question: "What ingredients are considered harmful?", answer: "Trans fats (hydrogenated oils), artificial colors and flavors, chemical preservatives like sodium benzoate and BHA/BHT, high-fructose corn syrup, maltodextrin, and artificial sweeteners like aspartame and saccharin." },
    { question: "Why does the score weigh first ingredients more?", answer: "Food labels list ingredients in descending order by quantity. So the first ingredient is present in the largest amount, and should have the highest influence on the overall health score." },
    { question: "What if some ingredients are not found?", answer: "Unknown ingredients (not in our database) are shown separately at the bottom. We show a maximum of 5 unknown ingredients. They don't contribute to the health score but are flagged for your awareness." },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const howItWorks = [
    { step: 1, title: "Paste Ingredients", description: "Copy the ingredient list from any food label exactly as printed." },
    { step: 2, title: "Click Analyze", description: "The tool normalizes, deduplicates, and evaluates each ingredient using alias matching and position-based weighting." },
    { step: 3, title: "Get Your Report", description: "Receive an instant health score, warnings, combination alerts, and diet suitability guide." },
  ];
  const benefits = [
    { icon: <Heart className="h-5 w-5" />, title: "Weighted Scoring", description: "Ingredients listed first carry more weight — just like real food labels." },
    { icon: <Leaf className="h-5 w-5" />, title: "Ingredient-by-Ingredient", description: "Every ingredient individually evaluated with a plain-English explanation." },
    { icon: <AlertTriangle className="h-5 w-5" />, title: "Combination Warnings", description: "Detects risky ingredient combinations like sugar + palm oil or sodium benzoate + vitamin C." },
    { icon: <CheckCircle className="h-5 w-5" />, title: "Diet Suitability", description: "Know who should avoid the product — diabetics, children, and more." },
  ];

  const impactOrder = ["harmful", "moderate", "unknown", "healthy"];
  const sortedIngredients = report
    ? [...report.ingredients].sort((a, b) => impactOrder.indexOf(a.impact) - impactOrder.indexOf(b.impact))
    : [];

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Ingredient Health Analyzer"
        description="Paste any food ingredient list and instantly receive a detailed health report with weighted risk scores, combination warnings, and diet suitability."
        icon={<Heart className="h-8 w-8" />}
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqItems.map((f) => ({ question: f.question, answer: f.answer }))}
        toolId="ingredient-health-analyzer"
        badge={<Badge className="bg-yellow-500 text-white hover:bg-yellow-500 text-sm px-3 py-1 align-middle no-default-active-elevate">BETA</Badge>}
      >
        <div className="space-y-6">
          {/* Beta notice */}
          <div className="flex items-start gap-3 rounded-md border border-yellow-400/40 bg-yellow-400/10 dark:bg-yellow-400/5 p-4">
            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 font-semibold text-yellow-700 dark:text-yellow-400">
                <Badge className="bg-yellow-500 text-white hover:bg-yellow-500 text-xs px-2 py-0 no-default-active-elevate">BETA</Badge>
                This tool is currently in testing
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Results may be incomplete or inaccurate. The ingredient database is still growing and some ingredients may be unrecognized or incorrectly rated. Do not use this tool as a substitute for professional nutritional advice.
              </p>
            </div>
          </div>

          {/* Input card */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ingredient-input" className="text-sm font-semibold">Paste Ingredient List</Label>
                <Textarea
                  id="ingredient-input"
                  data-testid="textarea-ingredients"
                  placeholder={`Paste the ingredient list from the food label here. For example:\n\nSugar, Palm Oil, Cocoa Powder, Flavor Enhancer (MSG), Salt, Artificial Flavor, Red 40`}
                  className="min-h-36 text-sm leading-relaxed font-mono resize-y"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setError(null); }}
                />
                <p className="text-xs text-muted-foreground">
                  Copy the ingredients exactly as shown on the food label — commas, brackets and all. The tool handles different formats automatically.
                </p>
              </div>
              <Button onClick={handleAnalyze} disabled={!input.trim()} size="lg" className="w-full" data-testid="button-analyze">
                <Heart className="mr-2 h-5 w-5" />
                Analyze Ingredients
              </Button>
            </CardContent>
          </Card>

          {/* Database stats */}
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground px-1">
            <span className="bg-muted rounded px-2 py-1">{INGREDIENTS.length}+ canonical ingredients</span>
            <span className="bg-muted rounded px-2 py-1">{totalAliases}+ ingredient name variations</span>
            <span className="bg-muted rounded px-2 py-1">17 food categories</span>
            <span className="bg-muted rounded px-2 py-1">100% offline — no data sent</span>
          </div>

          {/* Error */}
          {error && (
            <Card className="border-yellow-300 dark:border-yellow-700">
              <CardContent className="p-5 flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                <p className="text-sm" data-testid="text-error">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Report */}
          {report && (
            <div className="space-y-5" data-testid="section-report">
              <ScoreDisplay score={report.score} />

              {/* Summary counts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Detected",  value: report.ingredients.length, cls: "text-foreground" },
                  { label: "Healthy",   value: report.healthyCount,  cls: "text-green-600 dark:text-green-400" },
                  { label: "Moderate",  value: report.moderateCount, cls: "text-yellow-600 dark:text-yellow-400" },
                  { label: "Harmful",   value: report.harmfulCount,  cls: "text-red-600 dark:text-red-400" },
                ].map(({ label, value, cls }) => (
                  <div key={label} className="rounded-lg bg-muted/60 p-3 text-center">
                    <p className={`text-2xl font-bold ${cls}`}>{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Verdict */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />Final Verdict
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed" data-testid="text-verdict">{report.verdict}</p>
                </CardContent>
              </Card>

              {/* Warnings */}
              {(report.warnings.length > 0 || report.combinationWarnings.length > 0) && (
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertTriangle className="h-4 w-4" />Ingredient Warnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {report.warnings.map((w, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" data-testid={`text-warning-${i}`}>
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        <span>{w}</span>
                      </div>
                    ))}
                    {report.combinationWarnings.map((w, i) => (
                      <div key={`c${i}`} className="flex items-start gap-2 text-sm mt-1" data-testid={`text-combo-warning-${i}`}>
                        <ShieldAlert className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                        <span className="font-medium text-orange-700 dark:text-orange-300">{w}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Positives */}
              {report.positives.length > 0 && (
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Leaf className="h-4 w-4" />Positive Ingredients
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {report.positives.map((p, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" data-testid={`text-positive-${i}`}>
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Diet warnings */}
              {report.dietWarnings.length > 0 && (
                <Card className="border-orange-200 dark:border-orange-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      <AlertTriangle className="h-4 w-4" />Who Should Avoid This Product
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {report.dietWarnings.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" data-testid={`text-diet-warning-${i}`}>
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Unknown ingredients notice */}
              {report.unknownIngredients.length > 0 && (
                <Card className="border-muted">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-muted-foreground">
                      <Info className="h-4 w-4" />Unknown Ingredients Detected
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <p className="text-xs text-muted-foreground mb-2">These ingredients were not found in our database. They do not affect your health score.</p>
                    {report.unknownIngredients.map((name, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                        <span className="capitalize text-muted-foreground">{name}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Full ingredient list */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />Detected Ingredients ({report.ingredients.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {sortedIngredients.map((ing, i) => (
                      <div key={i} className="p-4" data-testid={`ingredient-item-${i}`}>
                        <button className="w-full text-left" onClick={() => toggleExpand(i)} data-testid={`button-toggle-ingredient-${i}`}>
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium capitalize">{ing.originalName}</span>
                              <ImpactBadge impact={ing.impact} />
                              <span className="text-xs text-muted-foreground capitalize">{ing.category}</span>
                            </div>
                            {expanded[i] ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                          </div>
                        </button>
                        {expanded[i] && (
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ing.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button variant="outline" onClick={handleReset} data-testid="button-analyze-another">Analyze Another Product</Button>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
