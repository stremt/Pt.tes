import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Heart, AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp, Leaf, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

type HealthImpact = "healthy" | "moderate" | "harmful" | "unknown";

interface IngredientEntry {
  category: string;
  healthImpact: HealthImpact;
  explanation: string;
  scoreAdjust: number;
}

interface IngredientAnalysis {
  originalName: string;
  normalizedName: string;
  category: string;
  healthImpact: HealthImpact;
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
}

const DB: Record<string, IngredientEntry> = {
  // ── Whole grains ──
  "oats":                  { category: "whole grain",       healthImpact: "healthy",  scoreAdjust: 15, explanation: "Rich in beta-glucan fiber. Excellent for heart health and blood sugar control." },
  "oatmeal":               { category: "whole grain",       healthImpact: "healthy",  scoreAdjust: 15, explanation: "Minimally processed whole grain. Provides sustained energy and fiber." },
  "rolled oats":           { category: "whole grain",       healthImpact: "healthy",  scoreAdjust: 15, explanation: "Minimally processed oats with soluble fiber for cholesterol reduction." },
  "whole wheat":           { category: "whole grain",       healthImpact: "healthy",  scoreAdjust: 15, explanation: "Contains fiber, vitamins, and minerals. Better than refined wheat." },
  "whole grain":           { category: "whole grain",       healthImpact: "healthy",  scoreAdjust: 15, explanation: "Provides fiber, B vitamins, and minerals for sustained energy." },
  "whole wheat flour":     { category: "whole grain",       healthImpact: "healthy",  scoreAdjust: 12, explanation: "Retains fiber and nutrients compared to refined flour." },
  "brown rice":            { category: "whole grain",       healthImpact: "healthy",  scoreAdjust: 12, explanation: "Whole grain with fiber, magnesium, and B vitamins." },
  "quinoa":                { category: "whole grain",       healthImpact: "healthy",  scoreAdjust: 15, explanation: "Complete plant protein with all essential amino acids and high fiber." },
  "barley":                { category: "whole grain",       healthImpact: "healthy",  scoreAdjust: 12, explanation: "High in soluble fiber. Supports cholesterol and blood sugar." },
  // ── Nuts ──
  "almonds":               { category: "nut",               healthImpact: "healthy",  scoreAdjust: 12, explanation: "High in healthy fats, vitamin E, magnesium, and protein." },
  "walnuts":               { category: "nut",               healthImpact: "healthy",  scoreAdjust: 12, explanation: "Rich in omega-3 fatty acids and antioxidants. Excellent for brain health." },
  "cashews":               { category: "nut",               healthImpact: "healthy",  scoreAdjust: 12, explanation: "Good source of magnesium, zinc, and healthy fats." },
  "peanuts":               { category: "nut",               healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in protein and healthy monounsaturated fats." },
  "pistachios":            { category: "nut",               healthImpact: "healthy",  scoreAdjust: 12, explanation: "Rich in antioxidants, fiber, and healthy fats." },
  "hazelnuts":             { category: "nut",               healthImpact: "healthy",  scoreAdjust: 12, explanation: "High in vitamin E and healthy monounsaturated fats." },
  // ── Seeds ──
  "flaxseed":              { category: "seed",              healthImpact: "healthy",  scoreAdjust: 12, explanation: "High in omega-3 fatty acids and lignans. Supports heart health." },
  "chia seeds":            { category: "seed",              healthImpact: "healthy",  scoreAdjust: 12, explanation: "Excellent source of omega-3s, fiber, and calcium." },
  "sunflower seeds":       { category: "seed",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in vitamin E and healthy fats." },
  "pumpkin seeds":         { category: "seed",              healthImpact: "healthy",  scoreAdjust: 12, explanation: "High in zinc, magnesium, and healthy fats." },
  "sesame seeds":          { category: "seed",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Good source of calcium, copper, and healthy fats." },
  // ── Legumes ──
  "lentils":               { category: "legume",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in plant protein, fiber, and iron. Excellent for blood sugar and gut health." },
  "chickpeas":             { category: "legume",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in protein, fiber, and micronutrients. Supports heart and digestive health." },
  "kidney beans":          { category: "legume",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in fiber, protein, and antioxidants." },
  "black beans":           { category: "legume",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Excellent source of fiber, folate, and plant protein." },
  "soybeans":              { category: "legume",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Complete plant protein with all essential amino acids." },
  "peas":                  { category: "legume",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Good source of plant protein, fiber, and vitamins A and C." },
  "green peas":            { category: "legume",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in plant protein, fiber, and vitamins." },
  "split peas":            { category: "legume",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Excellent source of fiber and plant protein." },
  // ── Natural plant ingredients ──
  "cocoa":                 { category: "natural ingredient", healthImpact: "healthy",  scoreAdjust:  8, explanation: "Rich in flavonoids and antioxidants. Beneficial in small amounts." },
  "cocoa powder":          { category: "natural ingredient", healthImpact: "healthy",  scoreAdjust:  8, explanation: "Pure cocoa is rich in antioxidants and minerals." },
  "dark chocolate":        { category: "natural ingredient", healthImpact: "moderate", scoreAdjust: -3, explanation: "Contains antioxidants but also sugar and fat. Moderate use is fine." },
  "olive oil":             { category: "healthy oil",        healthImpact: "healthy",  scoreAdjust:  8, explanation: "Rich in monounsaturated fats and polyphenols. Supports heart health." },
  "honey":                 { category: "natural sweetener",  healthImpact: "moderate", scoreAdjust: -5, explanation: "Natural sweetener with antioxidants, but still high in sugar. Use in moderation." },
  "maple syrup":           { category: "natural sweetener",  healthImpact: "moderate", scoreAdjust: -5, explanation: "Natural sweetener with trace minerals but high in sugar." },
  "stevia":                { category: "natural sweetener",  healthImpact: "moderate", scoreAdjust: -2, explanation: "Plant-derived sweetener. Better alternative to refined sugar." },
  // ── Fruit concentrates ──
  "apple juice concentrate":  { category: "fruit concentrate", healthImpact: "moderate", scoreAdjust: -6, explanation: "Concentrated fruit sugar — high glycemic despite natural origin." },
  "grape juice concentrate":  { category: "fruit concentrate", healthImpact: "moderate", scoreAdjust: -6, explanation: "High in fructose. More processed than whole fruit." },
  "fruit concentrate":        { category: "fruit concentrate", healthImpact: "moderate", scoreAdjust: -6, explanation: "Concentrated fruit sugars add glycemic load without fiber." },
  "fruit juice concentrate":  { category: "fruit concentrate", healthImpact: "moderate", scoreAdjust: -6, explanation: "Processed fruit sugar lacking the fiber of whole fruit." },
  "date syrup":               { category: "fruit concentrate", healthImpact: "moderate", scoreAdjust: -4, explanation: "Natural sweetener from dates. Contains minerals but still high in sugar." },
  "erythritol":            { category: "sugar alcohol",      healthImpact: "moderate", scoreAdjust: -2, explanation: "Sugar alcohol with minimal blood sugar impact. Well tolerated in small amounts." },
  "xylitol":               { category: "sugar alcohol",      healthImpact: "moderate", scoreAdjust: -3, explanation: "Sugar alcohol with dental benefits. May cause digestive issues in excess." },
  "sorbitol":              { category: "sugar alcohol",      healthImpact: "moderate", scoreAdjust: -5, explanation: "Sugar alcohol that may cause bloating in larger amounts." },
  // ── Dairy ──
  "milk":                  { category: "dairy",              healthImpact: "moderate", scoreAdjust: -2, explanation: "Good source of calcium and protein. Full-fat versions are high in saturated fat." },
  "skimmed milk":          { category: "dairy",              healthImpact: "healthy",  scoreAdjust:  5, explanation: "Low-fat source of protein and calcium." },
  "skim milk":             { category: "dairy",              healthImpact: "healthy",  scoreAdjust:  5, explanation: "Low-fat dairy with protein and calcium." },
  "butter":                { category: "dairy fat",          healthImpact: "moderate", scoreAdjust: -5, explanation: "High in saturated fat. Fine in moderation but can raise LDL cholesterol." },
  "cream":                 { category: "dairy fat",          healthImpact: "moderate", scoreAdjust: -5, explanation: "High in saturated fat. Use sparingly." },
  "cheese":                { category: "dairy",              healthImpact: "moderate", scoreAdjust: -3, explanation: "Good source of calcium and protein, but high in saturated fat and sodium." },
  "yogurt":                { category: "dairy",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Contains probiotics, protein, and calcium. Supports gut health." },
  "whey protein":          { category: "protein",            healthImpact: "healthy",  scoreAdjust:  8, explanation: "High-quality complete protein. Beneficial for muscle maintenance." },
  "pea protein":           { category: "protein",            healthImpact: "healthy",  scoreAdjust:  8, explanation: "Plant-based complete protein. Good for muscle and satiety." },
  "soy protein":           { category: "protein",            healthImpact: "moderate", scoreAdjust: -2, explanation: "Complete plant protein. Moderate amounts are safe for most people." },
  // ── Oils ──
  "sunflower oil":         { category: "vegetable oil",      healthImpact: "moderate", scoreAdjust: -6, explanation: "High in omega-6. Fine in moderation; excess may promote inflammation." },
  "canola oil":            { category: "vegetable oil",      healthImpact: "moderate", scoreAdjust: -6, explanation: "Low in saturated fat. Acceptable in moderation." },
  "vegetable oil":         { category: "vegetable oil",      healthImpact: "moderate", scoreAdjust: -6, explanation: "Generic vegetable oil — composition varies. Moderate use acceptable." },
  "soybean oil":           { category: "vegetable oil",      healthImpact: "moderate", scoreAdjust: -6, explanation: "High in omega-6 fatty acids. Use in moderation." },
  "coconut oil":           { category: "oil",                healthImpact: "moderate", scoreAdjust: -5, explanation: "High in saturated fat. Moderate consumption acceptable." },
  "palm oil":              { category: "oil",                healthImpact: "harmful",  scoreAdjust:-15, explanation: "High in saturated fat. Linked to increased heart disease risk." },
  "palm kernel oil":       { category: "oil",                healthImpact: "harmful",  scoreAdjust:-15, explanation: "Very high in saturated fat. Linked to cardiovascular disease." },
  // ── Harmful fats ──
  "hydrogenated oil":      { category: "trans fat",          healthImpact: "harmful",  scoreAdjust:-25, explanation: "Contains trans fats that raise LDL and lower HDL cholesterol." },
  "partially hydrogenated oil": { category: "trans fat",     healthImpact: "harmful",  scoreAdjust:-25, explanation: "Primary source of industrial trans fats. Strongly linked to heart disease." },
  "trans fat":             { category: "trans fat",          healthImpact: "harmful",  scoreAdjust:-30, explanation: "Industrial trans fats are among the most harmful dietary fats." },
  "shortening":            { category: "trans fat",          healthImpact: "harmful",  scoreAdjust:-20, explanation: "Often contains hydrogenated oils and trans fats." },
  "lard":                  { category: "animal fat",         healthImpact: "moderate", scoreAdjust: -8, explanation: "Animal fat high in saturated fat. Use sparingly." },
  // ── Sweeteners / Sugars ──
  "sugar":                 { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-20, explanation: "Refined sugar with no nutritional value. Contributes to obesity, diabetes, and tooth decay." },
  "glucose":               { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-18, explanation: "Simple sugar that rapidly spikes blood glucose levels." },
  "fructose":              { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-18, explanation: "Excess fructose may contribute to fatty liver disease." },
  "high fructose corn syrup": { category: "sweetener",       healthImpact: "harmful",  scoreAdjust:-25, explanation: "Highly processed sweetener strongly associated with obesity and metabolic syndrome." },
  "corn syrup":            { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-20, explanation: "Concentrated sugar source with high glycemic impact." },
  "dextrose":              { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-18, explanation: "Simple sugar with very high glycemic index." },
  "maltose":               { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-18, explanation: "High glycemic index sugar that rapidly raises blood sugar." },
  "sucrose":               { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-20, explanation: "Table sugar linked to metabolic disorders." },
  "maltodextrin":          { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-15, explanation: "Ultra-processed carbohydrate with glycemic index even higher than table sugar." },
  "invert sugar":          { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-18, explanation: "Mixture of glucose and fructose. Raises blood sugar rapidly." },
  "brown sugar":           { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-15, explanation: "Slightly less processed than white sugar but still high in empty calories." },
  "cane sugar":            { category: "sweetener",          healthImpact: "harmful",  scoreAdjust:-18, explanation: "Refined sugar — same metabolic effects as white sugar." },
  // ── Artificial sweeteners ──
  "aspartame":             { category: "artificial sweetener", healthImpact: "harmful", scoreAdjust:-10, explanation: "Controversial artificial sweetener. May affect gut microbiome." },
  "saccharin":             { category: "artificial sweetener", healthImpact: "harmful", scoreAdjust:-10, explanation: "Oldest artificial sweetener. May negatively affect gut bacteria." },
  "acesulfame potassium":  { category: "artificial sweetener", healthImpact: "harmful", scoreAdjust:-10, explanation: "Artificial sweetener that may interfere with metabolic processes." },
  "acesulfame k":          { category: "artificial sweetener", healthImpact: "harmful", scoreAdjust:-10, explanation: "Artificial sweetener with limited long-term safety data." },
  "sucralose":             { category: "artificial sweetener", healthImpact: "moderate", scoreAdjust: -5, explanation: "Generally considered safe but may affect gut microbiome." },
  // ── Artificial colors ──
  "red 40":                { category: "artificial color",   healthImpact: "harmful",  scoreAdjust:-15, explanation: "Synthetic dye linked to hyperactivity in children. Banned in some countries." },
  "yellow 5":              { category: "artificial color",   healthImpact: "harmful",  scoreAdjust:-15, explanation: "Tartrazine — associated with hyperactivity and allergic reactions." },
  "yellow 6":              { category: "artificial color",   healthImpact: "harmful",  scoreAdjust:-15, explanation: "Sunset yellow — synthetic dye with potential links to hyperactivity." },
  "blue 1":                { category: "artificial color",   healthImpact: "harmful",  scoreAdjust:-15, explanation: "Brilliant Blue — artificial color with limited long-term safety data." },
  "blue 2":                { category: "artificial color",   healthImpact: "harmful",  scoreAdjust:-15, explanation: "Synthetic food dye with potential health concerns." },
  "red 3":                 { category: "artificial color",   healthImpact: "harmful",  scoreAdjust:-15, explanation: "Erythrosine — banned for cosmetics in the US due to cancer risk." },
  "caramel color":         { category: "artificial color",   healthImpact: "moderate", scoreAdjust:-10, explanation: "Some forms contain 4-MEI, a potential carcinogen." },
  // ── Artificial flavors ──
  "artificial flavor":     { category: "artificial flavoring", healthImpact: "harmful", scoreAdjust:-10, explanation: "Synthetic flavor compounds of largely unknown composition and health effects." },
  "artificial flavors":    { category: "artificial flavoring", healthImpact: "harmful", scoreAdjust:-10, explanation: "Synthetic flavor chemicals that may mask poor ingredient quality." },
  "artificial flavoring":  { category: "artificial flavoring", healthImpact: "harmful", scoreAdjust:-10, explanation: "Synthetic flavoring agent with unknown long-term effects." },
  "natural flavor":        { category: "flavoring",          healthImpact: "moderate", scoreAdjust: -3, explanation: "Derived naturally but highly processed. Composition is often undisclosed." },
  "natural flavors":       { category: "flavoring",          healthImpact: "moderate", scoreAdjust: -3, explanation: "Natural-source but processed flavor agents." },
  "natural flavoring":     { category: "flavoring",          healthImpact: "moderate", scoreAdjust: -3, explanation: "Processed flavor ingredient from natural sources." },
  "msg":                   { category: "flavor enhancer",    healthImpact: "moderate", scoreAdjust:-10, explanation: "Monosodium glutamate — flavor enhancer. Safe for most but sensitive individuals report headaches." },
  "monosodium glutamate":  { category: "flavor enhancer",    healthImpact: "moderate", scoreAdjust:-10, explanation: "Flavor enhancer. FDA recognizes as safe; some report sensitivity." },
  // ── Preservatives ──
  "sodium benzoate":       { category: "preservative",       healthImpact: "harmful",  scoreAdjust:-12, explanation: "May convert to benzene (a carcinogen) when combined with vitamin C." },
  "potassium sorbate":     { category: "preservative",       healthImpact: "moderate", scoreAdjust: -5, explanation: "Common preservative. Generally safe but may cause mild reactions." },
  "sodium nitrate":        { category: "preservative",       healthImpact: "harmful",  scoreAdjust:-15, explanation: "Linked to increased cancer risk, especially colorectal cancer." },
  "sodium nitrite":        { category: "preservative",       healthImpact: "harmful",  scoreAdjust:-15, explanation: "Meat preservative that can form carcinogenic nitrosamines." },
  "bha":                   { category: "preservative",       healthImpact: "harmful",  scoreAdjust:-12, explanation: "Butylated hydroxyanisole — possibly carcinogenic synthetic antioxidant." },
  "bht":                   { category: "preservative",       healthImpact: "harmful",  scoreAdjust:-12, explanation: "Butylated hydroxytoluene — synthetic preservative with potential endocrine-disrupting effects." },
  "tbhq":                  { category: "preservative",       healthImpact: "harmful",  scoreAdjust:-12, explanation: "Synthetic preservative with potential carcinogenic concerns at high doses." },
  "calcium propionate":    { category: "preservative",       healthImpact: "moderate", scoreAdjust: -3, explanation: "Common bread preservative. Generally safe." },
  "sodium metabisulfite":  { category: "preservative",       healthImpact: "moderate", scoreAdjust: -5, explanation: "Sulfite that can trigger reactions in sulfite-sensitive individuals." },
  // ── Thickeners / Emulsifiers ──
  "soy lecithin":          { category: "emulsifier",         healthImpact: "moderate", scoreAdjust: -3, explanation: "Common emulsifier from soybeans. Generally safe in small quantities." },
  "sunflower lecithin":    { category: "emulsifier",         healthImpact: "moderate", scoreAdjust: -2, explanation: "Emulsifier considered safer than soy lecithin. Generally well tolerated." },
  "carrageenan":           { category: "thickener",          healthImpact: "harmful",  scoreAdjust:-10, explanation: "Associated with gut inflammation in animal studies." },
  "xanthan gum":           { category: "thickener",          healthImpact: "moderate", scoreAdjust: -3, explanation: "Safe in small amounts but may cause digestive issues in excess." },
  "guar gum":              { category: "thickener",          healthImpact: "moderate", scoreAdjust: -3, explanation: "Natural thickener. May cause bloating in sensitive individuals." },
  "locust bean gum":       { category: "thickener",          healthImpact: "moderate", scoreAdjust: -2, explanation: "Natural thickener from carob seeds. Generally safe." },
  "modified starch":       { category: "thickener",          healthImpact: "moderate", scoreAdjust: -5, explanation: "Chemically altered starch. Highly processed." },
  "modified food starch":  { category: "thickener",          healthImpact: "moderate", scoreAdjust: -5, explanation: "Processed starch thickener. Generally safe but highly processed." },
  // ── Additives ──
  "sodium phosphate":      { category: "additive",           healthImpact: "harmful",  scoreAdjust:-10, explanation: "High phosphate intake is linked to kidney disease and cardiovascular issues." },
  "disodium phosphate":    { category: "additive",           healthImpact: "harmful",  scoreAdjust:-10, explanation: "Phosphate additive linked to kidney stress." },
  "calcium disodium edta": { category: "preservative",       healthImpact: "moderate", scoreAdjust: -5, explanation: "Safe at approved levels but may reduce mineral absorption." },
  // ── Salt / Sodium ──
  "salt":                  { category: "mineral",            healthImpact: "moderate", scoreAdjust: -5, explanation: "Essential but excess sodium raises blood pressure." },
  "sodium chloride":       { category: "mineral",            healthImpact: "moderate", scoreAdjust: -5, explanation: "Table salt. Essential in small amounts; excess raises blood pressure." },
  // ── Vitamins & Minerals ──
  "vitamin c":             { category: "vitamin",            healthImpact: "healthy",  scoreAdjust:  5, explanation: "Essential antioxidant vitamin supporting immune function." },
  "ascorbic acid":         { category: "vitamin",            healthImpact: "healthy",  scoreAdjust:  5, explanation: "Vitamin C — antioxidant used as nutrient or preservative." },
  "vitamin e":             { category: "vitamin",            healthImpact: "healthy",  scoreAdjust:  5, explanation: "Fat-soluble antioxidant protecting cells from oxidative damage." },
  "tocopherol":            { category: "vitamin",            healthImpact: "healthy",  scoreAdjust:  5, explanation: "Natural form of vitamin E — antioxidant." },
  "niacin":                { category: "vitamin",            healthImpact: "healthy",  scoreAdjust:  3, explanation: "Vitamin B3 — essential for energy metabolism." },
  "riboflavin":            { category: "vitamin",            healthImpact: "healthy",  scoreAdjust:  3, explanation: "Vitamin B2 — important for energy production." },
  "thiamine":              { category: "vitamin",            healthImpact: "healthy",  scoreAdjust:  3, explanation: "Vitamin B1 — essential for carbohydrate metabolism." },
  "folic acid":            { category: "vitamin",            healthImpact: "healthy",  scoreAdjust:  3, explanation: "Vitamin B9 — essential for cell growth and DNA synthesis." },
  "iron":                  { category: "mineral",            healthImpact: "healthy",  scoreAdjust:  3, explanation: "Essential mineral for oxygen transport in the blood." },
  "calcium carbonate":     { category: "mineral",            healthImpact: "healthy",  scoreAdjust:  3, explanation: "Calcium supplement. Supports bone health." },
  "zinc":                  { category: "mineral",            healthImpact: "healthy",  scoreAdjust:  3, explanation: "Essential trace mineral supporting immune function." },
  // ── Fiber ──
  "dietary fiber":         { category: "fiber",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Supports digestive health, blood sugar control, and cholesterol levels." },
  "inulin":                { category: "fiber",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Prebiotic fiber that feeds beneficial gut bacteria." },
  "psyllium husk":         { category: "fiber",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Soluble fiber excellent for digestive health and cholesterol reduction." },
  "oat fiber":             { category: "fiber",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "High-fiber ingredient supporting gut and heart health." },
  // ── Refined carbs ──
  "enriched flour":        { category: "refined grain",      healthImpact: "moderate", scoreAdjust:-10, explanation: "Refined wheat with some vitamins added back. Lower fiber than whole grain." },
  "refined flour":         { category: "refined grain",      healthImpact: "harmful",  scoreAdjust:-15, explanation: "Stripped of fiber and most nutrients. High glycemic index." },
  "white flour":           { category: "refined grain",      healthImpact: "moderate", scoreAdjust:-10, explanation: "Refined grain with minimal fiber. Raises blood sugar quickly." },
  "maida":                 { category: "refined grain",      healthImpact: "harmful",  scoreAdjust:-15, explanation: "Highly refined wheat flour with very low nutritional value and high glycemic index." },
  "refined wheat flour":   { category: "refined grain",      healthImpact: "harmful",  scoreAdjust:-15, explanation: "Processed flour lacking the fiber and nutrients of whole wheat." },
  "corn starch":           { category: "starch",             healthImpact: "moderate", scoreAdjust: -5, explanation: "High glycemic starch with minimal nutritional value." },
  "tapioca starch":        { category: "starch",             healthImpact: "moderate", scoreAdjust: -3, explanation: "Gluten-free starch but low in nutrients." },
  "wheat flour":           { category: "refined grain",      healthImpact: "moderate", scoreAdjust: -8, explanation: "May be refined or whole wheat — refined versions are lower in fiber and nutrients." },
  // ── Vegetables ──
  "spinach":               { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 12, explanation: "Loaded with iron, magnesium, vitamin K, and antioxidants." },
  "broccoli":              { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 12, explanation: "Rich in sulforaphane, vitamin C, and cancer-protective compounds." },
  "carrot":                { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "Excellent source of beta-carotene and vitamin A." },
  "carrots":               { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in beta-carotene and fiber. Good for vision and immune health." },
  "tomato":                { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in lycopene, vitamin C, and potassium." },
  "tomatoes":              { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in lycopene and antioxidants. Supports heart health." },
  "onion":                 { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Contains quercetin and allicin — natural anti-inflammatory compounds." },
  "onions":                { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Natural prebiotic with anti-inflammatory quercetin." },
  "garlic":                { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "Allicin in garlic has powerful antibacterial and cardiovascular benefits." },
  "garlic powder":         { category: "spice",              healthImpact: "healthy",  scoreAdjust:  6, explanation: "Retains most beneficial compounds from fresh garlic." },
  "kale":                  { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 12, explanation: "One of the most nutrient-dense foods — high in vitamins K, A, and C." },
  "sweet potato":          { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in beta-carotene, fiber, and potassium. Low glycemic than regular potato." },
  "potato":                { category: "vegetable",          healthImpact: "moderate", scoreAdjust:  2, explanation: "Nutritious but high-starch vegetable. Healthier when boiled vs. fried." },
  "potatoes":              { category: "vegetable",          healthImpact: "moderate", scoreAdjust:  2, explanation: "Good source of potassium and vitamin C but high in starch." },
  "bell pepper":           { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "Extremely high in vitamin C. Rich in antioxidants." },
  "capsicum":              { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "Excellent source of vitamin C and antioxidants." },
  "cabbage":               { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Rich in vitamin K and C. Contains cancer-protective glucosinolates." },
  "cauliflower":           { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Low-carb vegetable high in vitamin C and fiber." },
  "cucumber":              { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Hydrating, low-calorie vegetable with antioxidants." },
  "celery":                { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Very low calorie with anti-inflammatory compounds." },
  "beetroot":              { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in nitrates which improve blood flow and exercise performance." },
  "beet":                  { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in folate and nitrates. Supports cardiovascular health." },
  "lettuce":               { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Low-calorie leafy green with vitamins K and A." },
  "zucchini":              { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Low-carb vegetable with vitamin C and potassium." },
  "mushroom":              { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "One of the few plant sources of vitamin D. Contains beta-glucans." },
  "mushrooms":             { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Immune-supporting beta-glucans and natural umami." },
  "asparagus":             { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in folate, vitamin K, and prebiotic inulin." },
  "corn":                  { category: "vegetable",          healthImpact: "moderate", scoreAdjust: -2, explanation: "Whole corn provides fiber and nutrients, but often processed into refined starch." },
  "sweet corn":            { category: "vegetable",          healthImpact: "moderate", scoreAdjust:  3, explanation: "Natural whole grain with fiber and antioxidants like lutein." },
  "pumpkin":               { category: "vegetable",          healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in beta-carotene, vitamin A, and fiber." },
  "eggplant":              { category: "vegetable",          healthImpact: "healthy",  scoreAdjust:  8, explanation: "Contains nasunin, a powerful antioxidant that protects brain cells." },
  // ── Fruits ──
  "apple":                 { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in quercetin, pectin fiber, and vitamin C. Supports gut and heart health." },
  "apples":                { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in pectin fiber and antioxidants." },
  "banana":                { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Good source of potassium and vitamin B6. Quick natural energy." },
  "bananas":               { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Natural source of potassium, fiber, and resistant starch." },
  "mango":                 { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "High in vitamin C, A, and digestive enzymes. Natural sugar is moderated by fiber." },
  "strawberry":            { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in vitamin C, folate, and anthocyanin antioxidants." },
  "strawberries":          { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Low-sugar berry high in vitamin C and antioxidants." },
  "blueberry":             { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 12, explanation: "One of the highest antioxidant foods. Excellent for brain and heart health." },
  "blueberries":           { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 12, explanation: "Among the highest antioxidant foods. Supports memory and cardiovascular health." },
  "raspberry":             { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Very high in fiber and antioxidants with low sugar content." },
  "raspberries":           { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "High-fiber, low-sugar berry with anti-inflammatory compounds." },
  "blackberry":            { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in anthocyanins, vitamin C, and fiber." },
  "blackberries":          { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Excellent source of vitamins C and K with high antioxidant content." },
  "orange":                { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Excellent source of vitamin C and flavonoids." },
  "lemon":                 { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "High in vitamin C and citric acid. Supports digestion." },
  "lime":                  { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Rich in vitamin C and limonene. Aids digestion and immunity." },
  "pineapple":             { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Contains bromelain enzyme with anti-inflammatory properties." },
  "watermelon":            { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "High in lycopene and citrulline. Hydrating and heart-healthy." },
  "grape":                 { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Resveratrol in grapes has cardiovascular and anti-aging benefits." },
  "grapes":                { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Contains resveratrol and polyphenols beneficial for heart health." },
  "peach":                 { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Rich in vitamins A and C and dietary fiber." },
  "cherry":                { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "High in anthocyanins with powerful anti-inflammatory effects." },
  "cherries":              { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in anthocyanins and melatonin. Reduces inflammation." },
  "avocado":               { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 12, explanation: "Rich in heart-healthy monounsaturated fats, potassium, and folate." },
  "pomegranate":           { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 12, explanation: "Exceptionally high in punicalagins and anthocyanins. Anti-inflammatory." },
  "cranberry":             { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in proanthocyanidins that prevent urinary tract infections." },
  "cranberries":           { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Contains compounds that prevent bacterial adhesion in the urinary tract." },
  "papaya":                { category: "fruit",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Contains papain enzyme aiding digestion. High in vitamins A and C." },
  "guava":                 { category: "fruit",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "One of the richest sources of vitamin C among fruits. High in fiber." },
  "dates":                 { category: "fruit",              healthImpact: "moderate", scoreAdjust: -2, explanation: "Nutrient-dense natural fruit but very high in concentrated sugar." },
  "raisins":               { category: "fruit",              healthImpact: "moderate", scoreAdjust: -3, explanation: "Concentrated sugar from drying grapes. Use in small amounts." },
  "dried cranberries":     { category: "fruit",              healthImpact: "moderate", scoreAdjust: -5, explanation: "Often contain added sugar. Look for unsweetened versions." },
  "coconut":               { category: "fruit",              healthImpact: "moderate", scoreAdjust: -3, explanation: "Contains MCT fats. Fine in moderation but high in saturated fat." },
  "coconut milk":          { category: "dairy alternative",  healthImpact: "moderate", scoreAdjust: -4, explanation: "High in saturated fat but contains MCTs. Use in moderation." },
  "coconut cream":         { category: "dairy alternative",  healthImpact: "moderate", scoreAdjust: -5, explanation: "Very rich in saturated fat. Use sparingly." },
  // ── Spices & Herbs ──
  "cinnamon":              { category: "spice",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Potent antioxidant and anti-inflammatory. Helps regulate blood sugar." },
  "turmeric":              { category: "spice",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Curcumin is one of the strongest natural anti-inflammatory compounds known." },
  "ginger":                { category: "spice",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Gingerol has powerful anti-nausea and anti-inflammatory effects." },
  "cumin":                 { category: "spice",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Rich in iron and antioxidants. Supports digestion." },
  "coriander":             { category: "spice",              healthImpact: "healthy",  scoreAdjust:  6, explanation: "Natural anti-inflammatory herb with antioxidant compounds." },
  "black pepper":          { category: "spice",              healthImpact: "healthy",  scoreAdjust:  6, explanation: "Piperine enhances nutrient absorption and has antioxidant properties." },
  "cardamom":              { category: "spice",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Anti-inflammatory spice that supports digestive health." },
  "cloves":                { category: "spice",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Extremely high in antioxidants. Natural antimicrobial." },
  "nutmeg":                { category: "spice",              healthImpact: "healthy",  scoreAdjust:  5, explanation: "Contains myristicin with antioxidant and anti-inflammatory properties." },
  "oregano":               { category: "herb",               healthImpact: "healthy",  scoreAdjust:  8, explanation: "One of the highest antioxidant herbs. Contains carvacrol and thymol." },
  "basil":                 { category: "herb",               healthImpact: "healthy",  scoreAdjust:  8, explanation: "Rich in eugenol and antioxidants. Anti-inflammatory." },
  "rosemary":              { category: "herb",               healthImpact: "healthy",  scoreAdjust:  8, explanation: "Contains carnosic acid with powerful antioxidant and neuroprotective effects." },
  "thyme":                 { category: "herb",               healthImpact: "healthy",  scoreAdjust:  8, explanation: "Thymol has strong antimicrobial and antioxidant properties." },
  "parsley":               { category: "herb",               healthImpact: "healthy",  scoreAdjust:  6, explanation: "Rich in vitamins K and C. Natural diuretic." },
  "mint":                  { category: "herb",               healthImpact: "healthy",  scoreAdjust:  6, explanation: "Menthol aids digestion and soothes the digestive tract." },
  "chili":                 { category: "spice",              healthImpact: "healthy",  scoreAdjust:  6, explanation: "Capsaicin boosts metabolism and has anti-inflammatory effects." },
  "chilli":                { category: "spice",              healthImpact: "healthy",  scoreAdjust:  6, explanation: "Capsaicin in chilli has metabolism-boosting and anti-inflammatory properties." },
  "paprika":               { category: "spice",              healthImpact: "healthy",  scoreAdjust:  6, explanation: "Rich in antioxidants including capsanthin and beta-carotene." },
  "fenugreek":             { category: "spice",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Contains compounds that lower blood sugar and boost testosterone." },
  "mustard":               { category: "spice",              healthImpact: "healthy",  scoreAdjust:  5, explanation: "Contains glucosinolates with cancer-protective properties." },
  "mustard seeds":         { category: "spice",              healthImpact: "healthy",  scoreAdjust:  6, explanation: "Rich in selenium and omega-3 fatty acids." },
  "fennel":                { category: "spice",              healthImpact: "healthy",  scoreAdjust:  6, explanation: "Supports digestion and contains anethole, an anti-inflammatory compound." },
  "bay leaves":            { category: "herb",               healthImpact: "healthy",  scoreAdjust:  5, explanation: "Contains compounds that support digestion and blood sugar management." },
  "star anise":            { category: "spice",              healthImpact: "healthy",  scoreAdjust:  5, explanation: "Contains shikimic acid used in flu medications. Strong antioxidant." },
  "vanilla":               { category: "flavoring",          healthImpact: "moderate", scoreAdjust:  0, explanation: "Natural vanilla extract is safe; provides flavor without significant nutrition." },
  "vanilla extract":       { category: "flavoring",          healthImpact: "moderate", scoreAdjust:  0, explanation: "Natural flavoring with trace antioxidants. Minimal health impact." },
  // ── Animal proteins ──
  "egg":                   { category: "protein",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Complete protein with all essential amino acids. Rich in choline and B12." },
  "eggs":                  { category: "protein",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Complete protein source with vitamins D, B12, and choline." },
  "egg white":             { category: "protein",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Pure, high-quality protein with very low fat content." },
  "egg yolk":              { category: "protein",            healthImpact: "moderate", scoreAdjust:  3, explanation: "Rich in vitamins and choline but also high in cholesterol." },
  "chicken":               { category: "protein",            healthImpact: "healthy",  scoreAdjust:  8, explanation: "Lean animal protein rich in B vitamins and selenium." },
  "fish":                  { category: "protein",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Excellent source of omega-3 fatty acids and lean protein." },
  "salmon":                { category: "protein",            healthImpact: "healthy",  scoreAdjust: 12, explanation: "One of the best sources of omega-3 DHA and EPA. Supports heart and brain health." },
  "tuna":                  { category: "protein",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Lean protein high in omega-3 and vitamin D." },
  "turkey":                { category: "protein",            healthImpact: "healthy",  scoreAdjust:  8, explanation: "Very lean protein source rich in tryptophan and B vitamins." },
  "beef":                  { category: "protein",            healthImpact: "moderate", scoreAdjust:  2, explanation: "Complete protein with iron and B12. Choose lean cuts and limit red meat intake." },
  "tofu":                  { category: "protein",            healthImpact: "healthy",  scoreAdjust:  8, explanation: "Complete plant protein from soybeans. Rich in iron and calcium." },
  "tempeh":                { category: "protein",            healthImpact: "healthy",  scoreAdjust: 10, explanation: "Fermented soy product with probiotics. Complete protein with excellent digestibility." },
  // ── Additional grains / cereals ──
  "millet":                { category: "whole grain",        healthImpact: "healthy",  scoreAdjust: 12, explanation: "Gluten-free whole grain high in magnesium, fiber, and antioxidants." },
  "sorghum":               { category: "whole grain",        healthImpact: "healthy",  scoreAdjust: 12, explanation: "Gluten-free grain rich in antioxidants, B vitamins, and iron." },
  "ragi":                  { category: "whole grain",        healthImpact: "healthy",  scoreAdjust: 12, explanation: "Finger millet — exceptionally high in calcium and amino acids." },
  "bajra":                 { category: "whole grain",        healthImpact: "healthy",  scoreAdjust: 12, explanation: "Pearl millet — rich in iron, magnesium, and fiber. Traditional Indian grain." },
  "jowar":                 { category: "whole grain",        healthImpact: "healthy",  scoreAdjust: 12, explanation: "Sorghum flour — gluten-free with high fiber and antioxidants." },
  "amaranth":              { category: "whole grain",        healthImpact: "healthy",  scoreAdjust: 12, explanation: "Complete protein pseudo-cereal rich in calcium and magnesium." },
  "buckwheat":             { category: "whole grain",        healthImpact: "healthy",  scoreAdjust: 12, explanation: "Gluten-free pseudo-grain with rutin, a flavonoid beneficial for blood vessels." },
  "spelt":                 { category: "whole grain",        healthImpact: "healthy",  scoreAdjust: 10, explanation: "Ancient grain richer in protein and fiber than modern wheat." },
  "wheat bran":            { category: "fiber",              healthImpact: "healthy",  scoreAdjust: 10, explanation: "Very high in insoluble fiber, supporting digestive health." },
  "oat bran":              { category: "fiber",              healthImpact: "healthy",  scoreAdjust: 12, explanation: "High in beta-glucan soluble fiber. Effectively lowers LDL cholesterol." },
  "rice bran":             { category: "fiber",              healthImpact: "healthy",  scoreAdjust:  8, explanation: "Contains oryzanol and tocotrienols with antioxidant and cholesterol-lowering properties." },
  // ── Nut butters / healthy spreads ──
  "peanut butter":         { category: "nut butter",         healthImpact: "healthy",  scoreAdjust:  8, explanation: "High in healthy monounsaturated fats and protein. Choose natural with no added sugar." },
  "almond butter":         { category: "nut butter",         healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in vitamin E, magnesium, and healthy fats." },
  "tahini":                { category: "seed butter",        healthImpact: "healthy",  scoreAdjust:  8, explanation: "Sesame seed paste rich in calcium, copper, and healthy fats." },
  "ghee":                  { category: "dairy fat",          healthImpact: "moderate", scoreAdjust: -4, explanation: "Clarified butter. Contains butyrate and fat-soluble vitamins. Use in moderation." },
  // ── Dairy alternatives ──
  "oat milk":              { category: "dairy alternative",  healthImpact: "moderate", scoreAdjust: -2, explanation: "Plant-based milk alternative. Often fortified but may contain added sugars." },
  "almond milk":           { category: "dairy alternative",  healthImpact: "moderate", scoreAdjust: -1, explanation: "Low-calorie plant milk. Low in protein. Check for added sugars." },
  "soy milk":              { category: "dairy alternative",  healthImpact: "moderate", scoreAdjust: -1, explanation: "Complete plant protein milk alternative. Often fortified with calcium." },
  "rice milk":             { category: "dairy alternative",  healthImpact: "moderate", scoreAdjust: -3, explanation: "High glycemic dairy alternative. Low in protein." },
  // ── More harmful additives ──
  "potassium bromate":     { category: "additive",           healthImpact: "harmful",  scoreAdjust:-20, explanation: "Possible carcinogen used as a dough improver. Banned in many countries including India." },
  "azodicarbonamide":      { category: "additive",           healthImpact: "harmful",  scoreAdjust:-15, explanation: "Dough conditioner that breaks down into urethane, a potential carcinogen. Banned in EU." },
  "titanium dioxide":      { category: "additive",           healthImpact: "harmful",  scoreAdjust:-15, explanation: "Whitening agent recently classified as a possible carcinogen by EFSA." },
  "polysorbate 80":        { category: "emulsifier",         healthImpact: "harmful",  scoreAdjust:-10, explanation: "Synthetic emulsifier that may disrupt gut microbiota and promote inflammation." },
  "polysorbate 60":        { category: "emulsifier",         healthImpact: "harmful",  scoreAdjust:-10, explanation: "Synthetic emulsifier linked to gut microbiome disruption." },
  "carboxymethyl cellulose": { category: "emulsifier",       healthImpact: "moderate", scoreAdjust: -8, explanation: "Processed emulsifier that may alter gut microbiota composition." },
  "sodium lauryl sulfate": { category: "additive",           healthImpact: "harmful",  scoreAdjust:-12, explanation: "Detergent-like additive with irritant effects. Rarely found in food." },
  "brominated vegetable oil": { category: "additive",        healthImpact: "harmful",  scoreAdjust:-15, explanation: "Builds up in body tissue. Banned in EU and Japan. Being phased out in US." },
  "sodium stearoyl lactylate": { category: "emulsifier",     healthImpact: "moderate", scoreAdjust: -3, explanation: "Dough conditioner from natural sources. Generally considered safe." },
  "datem":                 { category: "emulsifier",         healthImpact: "moderate", scoreAdjust: -5, explanation: "Diacetyl tartaric acid ester of mono and diglycerides. Highly processed dough conditioner." },
  "mono and diglycerides": { category: "emulsifier",         healthImpact: "moderate", scoreAdjust: -5, explanation: "Common emulsifiers that may contain small amounts of trans fats." },
  "interesterified fat":   { category: "processed fat",      healthImpact: "harmful",  scoreAdjust:-15, explanation: "Chemically restructured fat — an alternative to trans fats but still metabolically harmful." },
  // ── Water & neutral ingredients ──
  "water":                 { category: "neutral",            healthImpact: "healthy",  scoreAdjust:  0, explanation: "No nutritional concern." },
  "drinking water":        { category: "neutral",            healthImpact: "healthy",  scoreAdjust:  0, explanation: "No nutritional concern." },
  // ── Vinegars & ferments ──
  "apple cider vinegar":   { category: "fermented food",     healthImpact: "healthy",  scoreAdjust:  6, explanation: "Contains acetic acid with blood sugar and digestive health benefits." },
  "vinegar":               { category: "fermented food",     healthImpact: "moderate", scoreAdjust:  2, explanation: "Generally safe. May help control blood sugar." },
  "white vinegar":         { category: "fermented food",     healthImpact: "moderate", scoreAdjust:  0, explanation: "Processed vinegar with minimal nutritional impact." },
  // ── Indian-specific healthy ingredients ──
  "dalia":                 { category: "whole grain",        healthImpact: "healthy",  scoreAdjust: 12, explanation: "Broken wheat — rich in fiber, B vitamins, and slow-digesting carbohydrates." },
  "poha":                  { category: "grain",              healthImpact: "moderate", scoreAdjust:  3, explanation: "Flattened rice. Moderate glycemic but often used with vegetables." },
  "suji":                  { category: "refined grain",      healthImpact: "moderate", scoreAdjust: -5, explanation: "Semolina — refined durum wheat. Moderate glycemic index." },
  "semolina":              { category: "refined grain",      healthImpact: "moderate", scoreAdjust: -5, explanation: "Refined durum wheat flour. Moderate in fiber and nutrients." },
  "besan":                 { category: "legume flour",       healthImpact: "healthy",  scoreAdjust: 10, explanation: "Chickpea flour — high in protein, fiber, and iron." },
  "gram flour":            { category: "legume flour",       healthImpact: "healthy",  scoreAdjust: 10, explanation: "Chickpea-based flour. High in protein and low glycemic." },
  "moong dal":             { category: "legume",             healthImpact: "healthy",  scoreAdjust: 10, explanation: "Split mung bean — easily digestible, high in protein and fiber." },
  "urad dal":              { category: "legume",             healthImpact: "healthy",  scoreAdjust: 10, explanation: "Black gram — high in protein and contains B vitamins." },
  "toor dal":              { category: "legume",             healthImpact: "healthy",  scoreAdjust: 10, explanation: "Split pigeon peas — high in plant protein and folate." },
  "groundnut":             { category: "nut",                healthImpact: "healthy",  scoreAdjust: 10, explanation: "Rich in protein, healthy fats, and niacin. Same as peanut." },
  "groundnut oil":         { category: "vegetable oil",      healthImpact: "moderate", scoreAdjust: -4, explanation: "Relatively stable cooking oil with a good fat profile." },
  "mustard oil":           { category: "healthy oil",        healthImpact: "healthy",  scoreAdjust:  6, explanation: "Rich in erucic acid and omega-3 ALA. Traditional Indian cooking oil." },
  "rice bran oil":         { category: "healthy oil",        healthImpact: "healthy",  scoreAdjust:  5, explanation: "Contains oryzanol which helps lower LDL cholesterol." },
  "sesame oil":            { category: "healthy oil",        healthImpact: "healthy",  scoreAdjust:  6, explanation: "Rich in sesamin and sesamolin with antioxidant and anti-inflammatory properties." },
};

const NORMALIZATION_MAP: Record<string, string> = {
  "flavor enhancer": "msg",
  "flavour enhancer": "msg",
  "e621": "msg",
  "e 621": "msg",
  "monosodium glutamate": "msg",
  "refined wheat flour": "refined wheat flour",
  "maida": "maida",
  "atta": "whole wheat flour",
  "whole grain oats": "oats",
  "whole grain wheat": "whole wheat",
  "whole oat flour": "oats",
  "rolled wheat": "whole wheat",
  "apple concentrate": "apple juice concentrate",
  "fruit juice": "fruit juice concentrate",
  "date paste": "date syrup",
  "chickpea flour": "besan",
  "lentil flour": "lentils",
  "pea flour": "peas",
  "soy flour": "soybeans",
  "palm olein": "palm oil",
  "palm stearin": "palm oil",
  "whole grain oat flour": "oats",
  "wholegrain oats": "oats",
  "black gram": "urad dal",
  "pigeon peas": "toor dal",
  "split mung beans": "moong dal",
  "mung beans": "moong dal",
  "green gram": "moong dal",
  "finger millet": "ragi",
  "pearl millet": "bajra",
  "broken wheat": "dalia",
  "flattened rice": "poha",
  "beaten rice": "poha",
  "durum semolina": "semolina",
  "durum wheat semolina": "semolina",
  "gram flour": "besan",
  "oat bran flour": "oat bran",
  "wheat bran flour": "wheat bran",
  "brown rice flour": "brown rice",
  "pumpkin puree": "pumpkin",
  "tomato puree": "tomato",
  "tomato paste": "tomato",
  "spinach powder": "spinach",
  "carrot powder": "carrot",
  "beetroot powder": "beetroot",
  "avocado oil": "olive oil",
  "extra virgin olive oil": "olive oil",
  "light olive oil": "olive oil",
  "cold pressed mustard oil": "mustard oil",
  "egg white powder": "egg white",
  "whole egg powder": "egg",
  "dried whole egg": "egg",
  "skimmed milk powder": "skimmed milk",
  "skim milk powder": "skim milk",
  "nonfat dry milk": "skim milk",
  "whole milk powder": "milk",
  "dried milk": "milk",
  "pasteurized milk": "milk",
  "toned milk": "skimmed milk",
  "double toned milk": "skim milk",
  "partially hydrogenated vegetable oil": "partially hydrogenated oil",
  "hydrogenated vegetable oil": "hydrogenated oil",
  "hydrogenated fat": "hydrogenated oil",
  "trans fatty acid": "trans fat",
  "high fructose corn syrup": "high fructose corn syrup",
  "hfcs": "high fructose corn syrup",
  "fd&c red no. 40": "red 40",
  "fd&c red 40": "red 40",
  "fd&c yellow no. 5": "yellow 5",
  "fd&c yellow no. 6": "yellow 6",
  "tartrazine": "yellow 5",
  "sunset yellow": "yellow 6",
  "brilliant blue": "blue 1",
  "acesulfame-k": "acesulfame k",
  "ace-k": "acesulfame k",
  "potassium acesulfame": "acesulfame k",
  "natural and artificial flavor": "artificial flavors",
  "natural and artificial flavors": "artificial flavors",
  "artificial colour": "artificial flavors",
  "artificial color": "artificial flavors",
  "sodium benzoate preservative": "sodium benzoate",
  "e211": "sodium benzoate",
  "e202": "potassium sorbate",
  "e330": "citric acid",
  "e471": "soy lecithin",
  "e322": "soy lecithin",
  "soya lecithin": "soy lecithin",
  "lecithin": "soy lecithin",
  "corn flour": "corn starch",
  "maize starch": "corn starch",
  "starch": "modified starch",
  "food starch": "modified food starch",
  "vegetable shortening": "shortening",
  "cane juice": "cane sugar",
  "evaporated cane juice": "cane sugar",
  "raw sugar": "sugar",
  "beet sugar": "sugar",
  "glucose syrup": "corn syrup",
  "glucose-fructose syrup": "high fructose corn syrup",
  "citric acid": "citric acid",
};

const CITRIC_ACID_ENTRY: IngredientEntry = {
  category: "preservative",
  healthImpact: "moderate",
  scoreAdjust: -2,
  explanation: "Naturally derived acid used as a preservative and flavor enhancer. Generally safe.",
};

function normalizeIngredientName(raw: string): string {
  const lower = raw.toLowerCase().trim();
  if (NORMALIZATION_MAP[lower]) return NORMALIZATION_MAP[lower];
  for (const [pattern, replacement] of Object.entries(NORMALIZATION_MAP)) {
    if (lower.includes(pattern)) return replacement;
  }
  return lower;
}

function parseIngredientList(raw: string): string[] {
  let text = raw
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ");

  const chunks: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if (ch === "(" || ch === "[") { depth++; if (depth === 1) { current += " "; continue; } }
    if (ch === ")" || ch === "]") { depth--; continue; }
    if (depth > 0) {
      if (ch === ",") current += " ";
      else current += ch;
    } else {
      if (ch === "," || ch === "\n" || ch === ";") {
        chunks.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  if (current.trim()) chunks.push(current.trim());

  const seen = new Set<string>();
  return chunks
    .map((s) => s.replace(/%\s*\d+(\.\d+)?/g, "").replace(/\d+(\.\d+)?%/g, "").trim())
    .map((s) => s.replace(/^[\s\W]+|[\s\W]+$/g, "").trim().toLowerCase())
    .filter((s) => s.length >= 2 && s.length <= 80 && !/^\d+$/.test(s))
    .filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
}

function matchIngredient(normalized: string): IngredientEntry | null {
  if (normalized === "citric acid") return CITRIC_ACID_ENTRY;
  if (DB[normalized]) return DB[normalized];
  for (const key of Object.keys(DB)) {
    if (normalized === key) return DB[key];
    if (normalized.includes(key) && key.length >= 4) return DB[key];
    if (key.includes(normalized) && normalized.length >= 4) return DB[key];
  }
  if (/hydrogenated/i.test(normalized)) return DB["hydrogenated oil"];
  if (/trans fat/i.test(normalized)) return DB["trans fat"];
  if (/artificial colou?r|fd&c|colour \d|color \d/i.test(normalized)) return { category: "artificial color", healthImpact: "harmful", scoreAdjust: -15, explanation: "Synthetic food dye linked to hyperactivity and allergic reactions." };
  if (/artificial flavou?r|synthetic flavou?r/i.test(normalized)) return DB["artificial flavors"];
  if (/high.?fructose|hfcs/i.test(normalized)) return DB["high fructose corn syrup"];
  if (/sugar|syrup|dextrose|fructose|sucrose|maltose/i.test(normalized)) return { category: "sweetener", healthImpact: "harmful", scoreAdjust: -18, explanation: "Added sugar or sugar derivative contributing to high glycemic load." };
  if (/sodium benzoate|benzoate/i.test(normalized)) return DB["sodium benzoate"];
  if (/sorbate|propionate|nitrate|nitrite|sulphite|sulfite/i.test(normalized)) return { category: "preservative", healthImpact: "moderate", scoreAdjust: -5, explanation: "Food preservative used to extend shelf life. May cause reactions in sensitive individuals." };
  if (/palm/i.test(normalized)) return DB["palm oil"];
  if (/shortening/i.test(normalized)) return DB["shortening"];
  if (/vegetable oil|canola|sunflower oil/i.test(normalized)) return DB["vegetable oil"];
  if (/olive oil/i.test(normalized)) return DB["olive oil"];
  if (/\bbean|lentil|chickpea|legume|\bpea\b/i.test(normalized)) return { category: "legume", healthImpact: "healthy", scoreAdjust: 10, explanation: "Legume rich in plant protein, fiber, and minerals." };
  if (/fruit.{0,10}concentrate|juice concentrate/i.test(normalized)) return DB["fruit concentrate"];
  if (/flour|starch/i.test(normalized)) return { category: "refined carb", healthImpact: "moderate", scoreAdjust: -8, explanation: "Starchy ingredient — may be refined or whole grain depending on source." };
  if (/vitamin|vit\.|niacin|riboflavin|thiamine|folic|pyridoxine|cyanocobalamin/i.test(normalized)) return { category: "vitamin", healthImpact: "healthy", scoreAdjust: 3, explanation: "Added vitamin that supports nutritional value." };
  if (/magnesium|potassium|calcium|zinc|iron|selenium|phosphorus/i.test(normalized)) return { category: "mineral", healthImpact: "healthy", scoreAdjust: 3, explanation: "Added mineral supporting nutritional value." };
  if (/whey|protein concentrate|protein isolate/i.test(normalized)) return DB["whey protein"];
  if (/lecithin/i.test(normalized)) return DB["soy lecithin"];
  if (/gum/i.test(normalized)) return DB["xanthan gum"];
  if (/extract|powder|concentrate/i.test(normalized)) return { category: "natural extract", healthImpact: "moderate", scoreAdjust: -2, explanation: "Concentrated or extracted natural ingredient. Usually safe." };
  if (/msg|glutamate/i.test(normalized)) return DB["msg"];
  return null;
}

const POSITION_WEIGHTS = [1.5, 1.3, 1.1, 1.0, 0.8];
function getPositionWeight(index: number): number {
  return index < POSITION_WEIGHTS.length ? POSITION_WEIGHTS[index] : 0.6;
}

const KNOWN_FOOD_WORDS = new Set([
  "sugar","flour","oil","salt","milk","water","butter","cream","egg","eggs","fat",
  "starch","syrup","cocoa","chocolate","wheat","grain","oat","oats","rice","corn",
  "soy","soya","palm","honey","vinegar","spice","spices","flavor","flavour","colour",
  "color","preservative","additive","emulsifier","thickener","stabilizer","acid",
  "protein","fiber","fibre","yeast","malt","barley","extract","powder","concentrate",
  "glucose","fructose","sucrose","dextrose","maltose","lactose","sodium","potassium",
  "calcium","iron","zinc","niacin","riboflavin","thiamine","lecithin","gum","citric",
  "vanilla","cinnamon","pepper","turmeric","cardamom","ginger","garlic","onion",
  "tomato","cheese","whey","casein","gelatin","pectin","carrageenan","inulin",
  "sorbitol","xylitol","erythritol","stevia","aspartame","sucralose","saccharin",
  "maida","atta","ragi","bajra","jowar","dalda","ghee","groundnut","sesame","mustard",
  "almonds","walnuts","cashews","peanuts","pistachios","seeds","flaxseed","chia",
  // vegetables
  "spinach","broccoli","carrot","tomato","onion","garlic","kale","potato","capsicum",
  "cabbage","cauliflower","cucumber","celery","beetroot","lettuce","zucchini",
  "mushroom","asparagus","pumpkin","eggplant","brinjal","okra","radish","turnip",
  // fruits
  "apple","banana","mango","strawberry","blueberry","raspberry","blackberry",
  "orange","lemon","lime","pineapple","watermelon","grape","peach","cherry",
  "avocado","pomegranate","cranberry","papaya","guava","dates","raisin","coconut",
  // spices & herbs
  "cumin","coriander","oregano","basil","rosemary","thyme","parsley","mint",
  "fennel","fenugreek","paprika","cloves","nutmeg","saffron","star anise","chili",
  // proteins
  "chicken","fish","salmon","tuna","turkey","beef","tofu","tempeh","lentil",
  "chickpea","bean","lentils","chickpeas","pea","legume",
  // grains
  "millet","sorghum","amaranth","buckwheat","spelt","quinoa","dalia","semolina",
  "poha","suji","besan","moong","urad","toor",
  // dairy alternatives
  "almond milk","oat milk","soy milk","coconut milk",
  // Indian
  "groundnut","sesame","mustard","ghee","dalda","bajra","ragi","jowar","suji","besan",
]);

function hasEnoughFoodWords(tokens: string[]): boolean {
  let matches = 0;
  for (const token of tokens) {
    const t = token.toLowerCase();
    for (const fw of KNOWN_FOOD_WORDS) {
      if (t.includes(fw)) { matches++; break; }
    }
    if (matches >= 2) return true;
  }
  return false;
}

function analyzeIngredients(rawInput: string): { report: HealthReport } | { error: string } {
  const rawTokens = parseIngredientList(rawInput);

  if (rawTokens.length < 2) {
    return { error: "No valid ingredient list detected. Please paste ingredients exactly as written on a food label." };
  }

  const recognizedCount = rawTokens.filter((t) => {
    const norm = normalizeIngredientName(t);
    return matchIngredient(norm) !== null || hasEnoughFoodWords([t]);
  }).length;

  if (recognizedCount < 2) {
    return { error: "No valid ingredient list detected. Please paste ingredients exactly as written on a food label." };
  }

  const analyzed: IngredientAnalysis[] = [];
  const unknownList: IngredientAnalysis[] = [];

  for (const raw of rawTokens) {
    const normalized = normalizeIngredientName(raw);
    const entry = matchIngredient(normalized);
    if (entry) {
      analyzed.push({
        originalName: raw,
        normalizedName: normalized,
        category: entry.category,
        healthImpact: entry.healthImpact,
        explanation: entry.explanation,
      });
    } else {
      unknownList.push({
        originalName: raw,
        normalizedName: normalized,
        category: "unknown",
        healthImpact: "unknown",
        explanation: "Not in our database. Verify on a nutrition resource or consult a nutritionist.",
      });
    }
  }

  const cappedUnknowns = unknownList.slice(0, 5);
  const allIngredients = [...analyzed, ...cappedUnknowns];

  let score = 60;
  analyzed.forEach((ing, idx) => {
    const entry = matchIngredient(ing.normalizedName) ?? matchIngredient(ing.originalName);
    if (!entry) return;
    const w = getPositionWeight(idx);
    score += entry.scoreAdjust * w;
  });
  const hasAnyHarmfulOrModerate = analyzed.some((i) => i.healthImpact === "harmful" || i.healthImpact === "moderate");
  const maxScore = hasAnyHarmfulOrModerate ? 95 : 100;
  score = Math.max(0, Math.min(maxScore, Math.round(score)));

  const normalizedNames = analyzed.map((i) => i.normalizedName);
  const hasSugar = normalizedNames.some((n) => ["sugar", "cane sugar", "brown sugar", "invert sugar", "high fructose corn syrup", "corn syrup", "glucose", "dextrose", "sucrose", "fructose", "maltose"].includes(n));
  const hasPalmOil = normalizedNames.some((n) => n.includes("palm"));
  const hasMaltodextrin = normalizedNames.includes("maltodextrin");
  const hasArtificialColor = analyzed.some((i) => i.category === "artificial color");
  const hasArtificialFlavor = analyzed.some((i) => i.category === "artificial flavoring");
  const hasTransFat = analyzed.some((i) => i.category === "trans fat");
  const hasPreservative = analyzed.some((i) => i.category === "preservative" && i.healthImpact === "harmful");
  const hasArtificialSweetener = analyzed.some((i) => i.category === "artificial sweetener");
  const hasRefinedGrain = analyzed.some((i) => i.category === "refined grain" && i.healthImpact === "harmful");

  const warnings: string[] = [];
  if (hasSugar) warnings.push("High sugar content — contributes to obesity, diabetes, and energy crashes.");
  if (hasTransFat) warnings.push("Hydrogenated / trans fats detected — strongly linked to cardiovascular disease.");
  if (hasArtificialColor) warnings.push("Artificial food colors found — linked to hyperactivity in children and allergic reactions.");
  if (hasArtificialFlavor) warnings.push("Artificial flavors present — synthetic compounds of unknown long-term effects.");
  if (hasPreservative) warnings.push("Harmful chemical preservatives detected — may cause adverse reactions in sensitive individuals.");
  if (hasArtificialSweetener) warnings.push("Artificial sweeteners present — may affect gut microbiome and metabolic health.");
  if (hasRefinedGrain) warnings.push("Refined / highly processed flour detected — very low fiber and high glycemic index.");
  if (hasMaltodextrin) warnings.push("Maltodextrin found — ultra-processed carb with glycemic index higher than table sugar.");

  const combinationWarnings: string[] = [];
  if (hasSugar && hasPalmOil) combinationWarnings.push("Sugar + Palm Oil combination: classic ultra-processed food signature — empty calories with harmful saturated fat.");
  if (hasSugar && hasMaltodextrin) combinationWarnings.push("Sugar + Maltodextrin combination: extremely high glycemic load — dangerous for diabetics and people managing weight.");
  if (hasArtificialFlavor && hasArtificialColor) combinationWarnings.push("Artificial flavor + Artificial color combination: heavily additive-laden product — not suitable for children.");

  const positives = analyzed
    .filter((i) => i.healthImpact === "healthy")
    .map((i) => {
      const name = i.originalName.charAt(0).toUpperCase() + i.originalName.slice(1);
      return `${name} — ${i.explanation}`;
    });

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

  let verdict: string;
  if (score >= 80) verdict = "This product is excellent and very healthy. It is made up of natural, wholesome ingredients with minimal processing. Excellent for regular daily consumption as part of a balanced diet.";
  else if (score >= 60) verdict = "This product is healthy overall. It contains mostly good ingredients with some processed or moderate elements. Suitable for regular consumption.";
  else if (score >= 40) verdict = "This product is moderately processed. It contains a mix of acceptable and concerning ingredients. Consume occasionally and consider healthier alternatives.";
  else if (score >= 20) verdict = "This product is unhealthy. It contains multiple harmful ingredients such as artificial additives, excessive sugars, or harmful fats. Minimize consumption.";
  else verdict = "This product is highly unhealthy. It is loaded with harmful ingredients — trans fats, artificial additives, excessive sugar, or chemical preservatives. Avoid and replace with a whole food alternative.";

  const healthyCount = analyzed.filter((i) => i.healthImpact === "healthy").length;
  const moderateCount = analyzed.filter((i) => i.healthImpact === "moderate").length;
  const harmfulCount = analyzed.filter((i) => i.healthImpact === "harmful").length;
  const unknownCount = cappedUnknowns.length;

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
    },
  };
}

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

function ImpactBadge({ impact }: { impact: HealthImpact }) {
  const map: Record<HealthImpact, { label: string; cls: string }> = {
    healthy:  { label: "Healthy",  cls: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700" },
    moderate: { label: "Moderate", cls: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700" },
    harmful:  { label: "Harmful",  cls: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700" },
    unknown:  { label: "Unknown",  cls: "bg-muted text-muted-foreground border border-border" },
  };
  const { label, cls } = map[impact];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${cls}`}>{label}</span>;
}

export default function IngredientHealthAnalyzer() {
  const [input, setInput] = useState("");
  const [report, setReport] = useState<HealthReport | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    { question: "How does the Ingredient Health Analyzer work?", answer: "Paste the ingredient list from any food product label. The tool parses and identifies each ingredient, checks it against a health database with position-weighted scoring, and generates an overall health score from 0 to 100." },
    { question: "What does the health score mean?", answer: "80–100 = Excellent/Very Healthy, 60–79 = Healthy, 40–59 = Moderate/Processed, 20–39 = Unhealthy, 0–19 = Highly Unhealthy. Ingredients listed first on food labels are present in larger quantities and affect the score more." },
    { question: "Is my data sent to a server?", answer: "No. All analysis is done entirely in your browser. Your ingredient data is never sent to any server — completely private and offline-friendly." },
    { question: "What ingredients are considered harmful?", answer: "Trans fats (hydrogenated oils), artificial colors and flavors, chemical preservatives like sodium benzoate and BHA/BHT, high-fructose corn syrup, maltodextrin, and artificial sweeteners like aspartame and saccharin." },
    { question: "Why does the score weigh first ingredients more?", answer: "Food labels list ingredients in descending order by quantity. So the first ingredient is present in the largest amount, and should have the highest influence on the overall health score." },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const howItWorks = [
    { step: 1, title: "Paste Ingredients", description: "Copy the ingredient list from any food label exactly as printed." },
    { step: 2, title: "Click Analyze", description: "The smart parser normalizes, deduplicates, and evaluates each ingredient with position-based weighting." },
    { step: 3, title: "Get Your Report", description: "Receive an instant health score, warnings, combination alerts, and diet suitability guide." },
  ];
  const benefits = [
    { icon: <Heart className="h-5 w-5" />, title: "Weighted Scoring", description: "Ingredients listed first carry more weight — just like real food labels." },
    { icon: <Leaf className="h-5 w-5" />, title: "Ingredient-by-Ingredient", description: "Every ingredient individually evaluated with a plain-English explanation." },
    { icon: <AlertTriangle className="h-5 w-5" />, title: "Combination Warnings", description: "Detects risky ingredient combinations like sugar + palm oil or sugar + maltodextrin." },
    { icon: <CheckCircle className="h-5 w-5" />, title: "Diet Suitability", description: "Know who should avoid the product — diabetics, children, and more." },
  ];

  const impactOrder: HealthImpact[] = ["harmful", "moderate", "unknown", "healthy"];
  const sortedIngredients = report
    ? [...report.ingredients].sort((a, b) => impactOrder.indexOf(a.healthImpact) - impactOrder.indexOf(b.healthImpact))
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
      >
        <div className="space-y-6">
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
                <p className="text-xs text-muted-foreground">Copy the ingredients exactly as shown on the food label — commas, brackets and all. The tool handles different formats automatically.</p>
              </div>
              <Button onClick={handleAnalyze} disabled={!input.trim()} size="lg" className="w-full" data-testid="button-analyze">
                <Heart className="mr-2 h-5 w-5" />
                Analyze Ingredients
              </Button>
            </CardContent>
          </Card>

          {error && (
            <Card className="border-yellow-300 dark:border-yellow-700">
              <CardContent className="p-5 flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                <p className="text-sm" data-testid="text-error">{error}</p>
              </CardContent>
            </Card>
          )}

          {report && (
            <div className="space-y-5" data-testid="section-report">
              <ScoreDisplay score={report.score} />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Detected", value: report.ingredients.length, cls: "text-foreground" },
                  { label: "Healthy", value: report.healthyCount, cls: "text-green-600 dark:text-green-400" },
                  { label: "Moderate", value: report.moderateCount, cls: "text-yellow-600 dark:text-yellow-400" },
                  { label: "Harmful", value: report.harmfulCount, cls: "text-red-600 dark:text-red-400" },
                ].map(({ label, value, cls }) => (
                  <div key={label} className="rounded-lg bg-muted/60 p-3 text-center">
                    <p className={`text-2xl font-bold ${cls}`}>{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2"><Info className="h-4 w-4 text-primary" />Final Verdict</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed" data-testid="text-verdict">{report.verdict}</p>
                </CardContent>
              </Card>

              {(report.warnings.length > 0 || report.combinationWarnings.length > 0) && (
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-red-600 dark:text-red-400"><AlertTriangle className="h-4 w-4" />Ingredient Warnings</CardTitle>
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

              {report.positives.length > 0 && (
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-green-600 dark:text-green-400"><Leaf className="h-4 w-4" />Positive Ingredients</CardTitle>
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

              {report.dietWarnings.length > 0 && (
                <Card className="border-orange-200 dark:border-orange-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-orange-600 dark:text-orange-400"><AlertTriangle className="h-4 w-4" />Who Should Avoid This Product</CardTitle>
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

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2"><Info className="h-4 w-4 text-primary" />Detected Ingredients ({report.ingredients.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {sortedIngredients.map((ing, i) => (
                      <div key={i} className="p-4" data-testid={`ingredient-item-${i}`}>
                        <button className="w-full text-left" onClick={() => toggleExpand(i)} data-testid={`button-toggle-ingredient-${i}`}>
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium capitalize">{ing.originalName}</span>
                              <ImpactBadge impact={ing.healthImpact} />
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
