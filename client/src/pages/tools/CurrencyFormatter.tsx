import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Copy } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

const currencies = {
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  INR: { symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', locale: 'zh-CN' },
  AUD: { symbol: '$', name: 'Australian Dollar', locale: 'en-AU' },
  CAD: { symbol: '$', name: 'Canadian Dollar', locale: 'en-CA' },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', locale: 'ar-AE' },
  SAR: { symbol: 'ر.س', name: 'Saudi Riyal', locale: 'ar-SA' },
};

export default function CurrencyFormatter() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();

  useSEO({
    title: "Currency Formatter Online | Format Numbers in Any Currency | Pixocraft Tools",
    description: "Convert plain numbers into currency format like INR, USD, EUR, GBP, AED etc. Offline & instant.",
    keywords: "currency formatter, format number to currency, number to rupees converter, money formatter",
    canonicalUrl: "https://tools.pixocraft.in/tools/currency-formatter",
  });

  const formatCurrency = () => {
    const num = parseFloat(amount);
    if (isNaN(num)) return "";

    const config = currencies[currency as keyof typeof currencies];
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currency,
    }).format(num);
  };

  const formattedAmount = formatCurrency();

  const copyFormatted = () => {
    if (formattedAmount) {
      navigator.clipboard.writeText(formattedAmount);
      toast({
        title: "Copied!",
        description: "Formatted currency copied to clipboard",
      });
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does it need internet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Works offline using JS."
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
            <span className="text-foreground">Currency Formatter</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Currency Formatter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Format numbers in any currency format instantly. Perfect for business & finance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">10+ Currencies</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Format Currency</CardTitle>
                <CardDescription>
                  Enter a number and choose your currency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      step="0.01"
                      data-testid="input-amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger data-testid="select-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(currencies).map(([code, config]) => (
                          <SelectItem key={code} value={code}>
                            {config.symbol} {code} - {config.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formattedAmount && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Formatted Currency</Label>
                      <Button
                        onClick={copyFormatted}
                        variant="outline"
                        size="sm"
                        data-testid="button-copy"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg border">
                      <p className="text-3xl font-bold text-center" data-testid="result-formatted">
                        {formattedAmount}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does it need internet?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No! This tool works completely offline using JavaScript's built-in Intl.NumberFormat API.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Which currencies are supported?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We support USD, EUR, GBP, INR, JPY, CNY, AUD, CAD, AED, SAR, and more. Each currency uses its proper symbol and formatting rules.
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
