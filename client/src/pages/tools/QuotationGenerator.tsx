import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FileEdit, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function QuotationGenerator() {
  const [quoteNo, setQuoteNo] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [items, setItems] = useState<Array<{desc: string, qty: number, rate: number}>>([{desc: "", qty: 1, rate: 0}]);
  const [validUntil, setValidUntil] = useState<string>("");
  const [terms, setTerms] = useState<string>("");

  useSEO({
    title: "Quotation Generator | Create Business Estimates Instantly | Pixocraft Tools",
    description: "Generate business quotes & estimates quickly. Free, professional and offline-ready.",
    keywords: "quotation generator, estimate creator, business quote maker, quote tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/quotation-generator",
  });

  const addItem = () => {
    setItems([...items, {desc: "", qty: 1, rate: 0}]);
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {...newItems[index], [field]: value};
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  };

  const generatePDF = () => {
    window.print();
  };

  const howItWorks = [
    { step: 1, title: "Add Details", description: "Enter business and client information" },
    { step: 2, title: "List Items", description: "Add services or products with pricing" },
    { step: 3, title: "Download", description: "Save professional quotation as PDF" },
  ];

  const benefits = [
    { icon: <FileEdit className="h-5 w-5" />, title: "Professional", description: "Business-ready quotation format" },
    { icon: <Download className="h-5 w-5" />, title: "Quick", description: "Create estimates in minutes" },
    { icon: <FileEdit className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqs = [
    { question: "What's the difference between quotation and invoice?", answer: "A quotation is an estimate/proposal before work begins. An invoice is a bill after work is completed." },
    { question: "Can I customize the items?", answer: "Yes! Add unlimited items with descriptions, quantities, and rates." },
    { question: "Is it suitable for freelancers?", answer: "Absolutely! Perfect for freelancers, agencies, and businesses of all sizes." },
  ];

  return (
    <ToolLayout
      title="Quotation Generator"
      description="Generate business quotes & estimates quickly. Free, professional and offline-ready."
      icon={<FileEdit className="h-8 w-8" />}
      toolId="quotation-generator"
      category="generator"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quote-no">Quotation Number</Label>
            <Input id="quote-no" value={quoteNo} onChange={(e) => setQuoteNo(e.target.value)} placeholder="QT-001" data-testid="input-quote-no" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="valid-until">Valid Until</Label>
            <Input id="valid-until" type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} data-testid="input-valid-until" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">Your Business</Label>
            <Input id="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Business Name" data-testid="input-business-name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-name">Client Name</Label>
            <Input id="client-name" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" data-testid="input-client-name" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Items/Services</h3>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input value={item.desc} onChange={(e) => updateItem(index, 'desc', e.target.value)} placeholder="Description" data-testid={`input-item-desc-${index}`} />
              </div>
              <Input type="number" value={item.qty} onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value) || 0)} placeholder="Qty" data-testid={`input-item-qty-${index}`} />
              <Input type="number" value={item.rate} onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)} placeholder="Rate" data-testid={`input-item-rate-${index}`} />
            </div>
          ))}
          <Button onClick={addItem} variant="outline" data-testid="button-add-item">+ Add Item</Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="terms">Terms & Conditions (Optional)</Label>
          <Textarea id="terms" value={terms} onChange={(e) => setTerms(e.target.value)} placeholder="Payment terms, delivery time, etc." className="min-h-[80px]" data-testid="textarea-terms" />
        </div>

        <Card className="print:shadow-none">
          <CardContent className="p-6 space-y-6">
            <div className="text-center border-b pb-4">
              <h2 className="text-3xl font-bold">QUOTATION</h2>
              <p className="text-sm text-muted-foreground mt-2">{quoteNo || "---"}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">From: {businessName || "---"}</p>
                <p className="font-semibold mt-4">To: {clientName || "---"}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Valid Until: {validUntil || "---"}</p>
              </div>
            </div>
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="py-2">Description</th>
                  <th className="text-center">Qty</th>
                  <th className="text-right">Rate</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{item.desc || "---"}</td>
                    <td className="text-center">{item.qty}</td>
                    <td className="text-right">${item.rate.toFixed(2)}</td>
                    <td className="text-right">${(item.qty * item.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td colSpan={3} className="text-right py-4">Total:</td>
                  <td className="text-right py-4">${calculateTotal().toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            {terms && (
              <div className="border-t pt-4">
                <p className="font-semibold mb-2">Terms & Conditions:</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{terms}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center print:hidden">
          <Button onClick={generatePDF} size="lg" data-testid="button-download-pdf">
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}
