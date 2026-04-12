import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, ArrowLeftRight, Zap, Lock, Globe } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

type Category = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed' | 'time' | 'energy';

const conversionRates: Record<Category, Record<string, number>> = {
  length: {
    'Meter': 1,
    'Kilometer': 0.001,
    'Centimeter': 100,
    'Millimeter': 1000,
    'Mile': 0.000621371,
    'Yard': 1.09361,
    'Foot': 3.28084,
    'Inch': 39.3701,
  },
  weight: {
    'Kilogram': 1,
    'Gram': 1000,
    'Milligram': 1000000,
    'Pound': 2.20462,
    'Ounce': 35.274,
    'Ton': 0.001,
  },
  temperature: {
    'Celsius': 1,
    'Fahrenheit': 1,
    'Kelvin': 1,
  },
  area: {
    'Square Meter': 1,
    'Square Kilometer': 0.000001,
    'Square Mile': 0.000000386102,
    'Square Yard': 1.19599,
    'Square Foot': 10.7639,
    'Square Inch': 1550,
    'Hectare': 0.0001,
    'Acre': 0.000247105,
  },
  volume: {
    'Liter': 1,
    'Milliliter': 1000,
    'Cubic Meter': 0.001,
    'Gallon (US)': 0.264172,
    'Quart (US)': 1.05669,
    'Pint (US)': 2.11338,
    'Cup': 4.22675,
    'Fluid Ounce': 33.814,
  },
  speed: {
    'Meter/Second': 1,
    'Kilometer/Hour': 3.6,
    'Mile/Hour': 2.23694,
    'Foot/Second': 3.28084,
    'Knot': 1.94384,
  },
  time: {
    'Second': 1,
    'Minute': 0.0166667,
    'Hour': 0.000277778,
    'Day': 0.0000115741,
    'Week': 0.00000165344,
    'Month': 0.000000380517,
    'Year': 0.0000000316887,
  },
  energy: {
    'Joule': 1,
    'Kilojoule': 0.001,
    'Calorie': 0.239006,
    'Kilocalorie': 0.000239006,
    'Watt Hour': 0.000277778,
    'Kilowatt Hour': 0.000000277778,
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [fromValue, setFromValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Meter');
  const [toUnit, setToUnit] = useState('Kilometer');
  const [result, setResult] = useState('');

  useSEO({
    title: "Unit Converter Online | Length, Weight, Temperature, Area & More | Pixocraft Tools",
    description: "Convert 100+ units including kg, lbs, meters, inches, Celsius, Fahrenheit, acres, liters, joules & more.",
    keywords: "unit converter online, length converter, temperature converter, area converter, weight converter, volume converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/unit-converter",
  });

  const convert = () => {
    if (!fromValue || isNaN(parseFloat(fromValue))) {
      setResult('');
      return;
    }

    const value = parseFloat(fromValue);

    if (category === 'temperature') {
      let celsius: number;
      if (fromUnit === 'Celsius') celsius = value;
      else if (fromUnit === 'Fahrenheit') celsius = (value - 32) * 5 / 9;
      else celsius = value - 273.15;

      let result: number;
      if (toUnit === 'Celsius') result = celsius;
      else if (toUnit === 'Fahrenheit') result = celsius * 9 / 5 + 32;
      else result = celsius + 273.15;

      setResult(result.toFixed(4));
    } else {
      const rates = conversionRates[category];
      const baseValue = value / rates[fromUnit];
      const convertedValue = baseValue * rates[toUnit];
      setResult(convertedValue.toFixed(6));
    }
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(result);
    setResult(fromValue);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory as Category);
    const units = Object.keys(conversionRates[newCategory as Category] || {});
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setFromValue('');
    setResult('');
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many categories supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "8+ categories like length, weight, volume, temperature, area, speed, time, and energy."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <Link href="/tools/math" className="hover:text-foreground" data-testid="link-math">Math Tools</Link>
            {" / "}
            <span className="text-foreground">Unit Converter</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Unit Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert any unit instantly. Length, weight, volume, temperature, area, speed, time & energy
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">100+ Units</Badge>
              <Badge variant="secondary">Instant</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Convert Units</CardTitle>
                <CardDescription>
                  Select a category and enter values to convert between units
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={category} onValueChange={handleCategoryChange}>
                  <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-1">
                    <TabsTrigger value="length" data-testid="tab-length">Length</TabsTrigger>
                    <TabsTrigger value="weight" data-testid="tab-weight">Weight</TabsTrigger>
                    <TabsTrigger value="temperature" data-testid="tab-temperature">Temp</TabsTrigger>
                    <TabsTrigger value="area" data-testid="tab-area">Area</TabsTrigger>
                    <TabsTrigger value="volume" data-testid="tab-volume">Volume</TabsTrigger>
                    <TabsTrigger value="speed" data-testid="tab-speed">Speed</TabsTrigger>
                    <TabsTrigger value="time" data-testid="tab-time">Time</TabsTrigger>
                    <TabsTrigger value="energy" data-testid="tab-energy">Energy</TabsTrigger>
                  </TabsList>

                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>From</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={fromValue}
                            onChange={(e) => {
                              setFromValue(e.target.value);
                              convert();
                            }}
                            placeholder="Enter value"
                            className="flex-1"
                            data-testid="input-from-value"
                          />
                          <Select value={fromUnit} onValueChange={(val) => {
                            setFromUnit(val);
                            convert();
                          }}>
                            <SelectTrigger className="w-40" data-testid="select-from-unit">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(conversionRates[category] || {}).map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>To</Label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={result}
                            readOnly
                            placeholder="Result"
                            className="flex-1"
                            data-testid="input-result"
                          />
                          <Select value={toUnit} onValueChange={(val) => {
                            setToUnit(val);
                            convert();
                          }}>
                            <SelectTrigger className="w-40" data-testid="select-to-unit">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(conversionRates[category] || {}).map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button onClick={swap} variant="outline" data-testid="button-swap">
                        <ArrowLeftRight className="h-4 w-4 mr-2" />
                        Swap Units
                      </Button>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Perfect for</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Convert any unit instantly with offline support
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Students & Engineers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Perfect for solving physics, chemistry, and engineering problems
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Lock className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Property Dealers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Convert land measurements between square feet, acres, and more
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Daily Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Convert cooking measurements, temperatures, and everyday units
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
