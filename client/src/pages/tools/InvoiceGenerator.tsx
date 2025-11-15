import { useState, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import html2pdf from "html2pdf.js";
import { useToast } from "@/hooks/use-toast";

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "د.إ"
};

export default function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [businessAddress, setBusinessAddress] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientAddress, setClientAddress] = useState<string>("");
  const [items, setItems] = useState<Array<{desc: string, qty: number, rate: number}>>([{desc: "", qty: 1, rate: 0}]);
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currency, setCurrency] = useState<string>("USD");
  const [downloading, setDownloading] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Invoice Generator Online | Create & Download PDF Instantly | Pixocraft Tools",
    description: "Generate clean, professional invoices online and download as PDF. No login and 100% offline-supported.",
    keywords: "invoice generator, create invoice pdf, billing tool online, invoice maker, free invoice",
    canonicalUrl: "https://tools.pixocraft.in/tools/invoice-generator",
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

  const generatePDF = async () => {
    if (!invoiceRef.current) return;
    
    if (!businessName || !clientName || !invoiceNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in business name, client name, and invoice number",
        variant: "destructive",
      });
      return;
    }

    setDownloading(true);
    
    try {
      const element = invoiceRef.current;
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `invoice-${invoiceNumber || 'draft'}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm' as const, format: 'a4', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: "Success!",
        description: "Invoice PDF downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const howItWorks = [
    { step: 1, title: "Enter Details", description: "Fill in business info, client details, and items" },
    { step: 2, title: "Review", description: "Check the auto-formatted invoice preview" },
    { step: 3, title: "Download PDF", description: "Print or save as PDF instantly" },
  ];

  const benefits = [
    { icon: <FileText className="h-5 w-5" />, title: "Professional", description: "Clean, business-ready invoice format" },
    { icon: <Download className="h-5 w-5" />, title: "Instant PDF", description: "Download or print directly" },
    { icon: <FileText className="h-5 w-5" />, title: "100% Offline", description: "No data stored or uploaded" },
  ];

  const faqs = [
    { question: "Do I need an account?", answer: "No login, no signup required. Use it instantly for free." },
    { question: "Does it save data?", answer: "Your invoice stays offline on your device. Nothing is uploaded or stored." },
    { question: "Can I customize the invoice?", answer: "Yes! Add your business details, items, and download a professional invoice." },
  ];

  return (
    <ToolLayout
      title="Invoice Generator"
      description="Generate clean, professional invoices online and download as PDF. No login and 100% offline-supported."
      icon={<FileText className="h-8 w-8" />}
      toolId="invoice-generator"
      category="generator"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Business Details</h3>
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Your Company Name"
                data-testid="input-business-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-address">Business Address</Label>
              <Textarea
                id="business-address"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                placeholder="Street, City, Zip"
                className="min-h-[80px]"
                data-testid="textarea-business-address"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Client Details</h3>
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name</Label>
              <Input
                id="client-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                data-testid="input-client-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-address">Client Address</Label>
              <Textarea
                id="client-address"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="Street, City, Zip"
                className="min-h-[80px]"
                data-testid="textarea-client-address"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoice-number">Invoice Number</Label>
            <Input
              id="invoice-number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="INV-001"
              data-testid="input-invoice-number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoice-date">Date</Label>
            <Input
              id="invoice-date"
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              data-testid="input-invoice-date"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" data-testid="select-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="INR">INR (₹)</SelectItem>
                <SelectItem value="AED">AED (د.إ)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  value={item.desc}
                  onChange={(e) => updateItem(index, 'desc', e.target.value)}
                  placeholder="Item description"
                  data-testid={`input-item-desc-${index}`}
                />
              </div>
              <Input
                type="number"
                value={item.qty}
                onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value) || 0)}
                placeholder="Qty"
                data-testid={`input-item-qty-${index}`}
              />
              <Input
                type="number"
                value={item.rate}
                onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                placeholder="Rate"
                data-testid={`input-item-rate-${index}`}
              />
            </div>
          ))}
          <Button onClick={addItem} variant="outline" data-testid="button-add-item">+ Add Item</Button>
        </div>

        <Card ref={invoiceRef} className="bg-white">
          <CardContent className="p-8 space-y-8">
            <div className="text-center border-b-2 pb-6">
              <h2 className="text-3xl font-bold text-gray-900">{businessName || "Your Business"}</h2>
              <p className="text-sm text-gray-600 whitespace-pre-line mt-2">{businessAddress}</p>
              <p className="text-xs text-gray-500 mt-4 uppercase tracking-wide">Invoice</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Bill To:</p>
                <p className="font-medium text-gray-800">{clientName || "Client Name"}</p>
                <p className="text-sm text-gray-600 whitespace-pre-line">{clientAddress}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Invoice #: <span className="font-semibold text-gray-900">{invoiceNumber || "---"}</span></p>
                <p className="text-sm text-gray-600 mt-1">Date: <span className="font-semibold text-gray-900">{invoiceDate}</span></p>
                <p className="text-sm text-gray-600 mt-1">Currency: <span className="font-semibold text-gray-900">{currency}</span></p>
              </div>
            </div>
            <table className="w-full">
              <thead className="bg-gray-100 border-y-2 border-gray-300">
                <tr className="text-left">
                  <th className="py-3 px-4 font-semibold text-gray-900">Description</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-900">Qty</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-900">Rate</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-800">{item.desc || "---"}</td>
                    <td className="py-3 px-4 text-center text-gray-800">{item.qty}</td>
                    <td className="py-3 px-4 text-right text-gray-800">{CURRENCY_SYMBOLS[currency]}{item.rate.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right text-gray-800">{CURRENCY_SYMBOLS[currency]}{(item.qty * item.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300 bg-gray-50">
                  <td colSpan={3} className="text-right py-4 px-4 font-bold text-gray-900 text-lg">Total:</td>
                  <td className="text-right py-4 px-4 font-bold text-gray-900 text-lg">{CURRENCY_SYMBOLS[currency]}{calculateTotal().toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={generatePDF} size="lg" disabled={downloading} data-testid="button-download-pdf">
            <Download className="mr-2 h-5 w-5" />
            {downloading ? "Generating PDF..." : "Download PDF"}
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}
