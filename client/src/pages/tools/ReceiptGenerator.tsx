import { useState, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Receipt, Download } from "lucide-react";
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

export default function ReceiptGenerator() {
  const [receiptNo, setReceiptNo] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [receivedFrom, setReceivedFrom] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [receivedBy, setReceivedBy] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Receipt Generator Online | Create Payment Receipts Fast | Pixocraft Tools",
    description: "Create payment receipts instantly and download as PDF. Fully offline, private and free.",
    keywords: "receipt generator, payment receipt pdf, token receipt tool, receipt maker",
    canonicalUrl: "https://tools.pixocraft.in/tools/receipt-generator",
  });

  const generatePDF = async () => {
    if (!receiptRef.current) return;
    
    if (!receiptNo || !receivedFrom || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in receipt number, received from, and amount",
        variant: "destructive",
      });
      return;
    }

    setDownloading(true);
    
    try {
      const element = receiptRef.current;
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `receipt-${receiptNo || 'draft'}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm' as const, format: 'a4', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: "Success!",
        description: "Receipt PDF downloaded successfully",
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
    { step: 1, title: "Fill Details", description: "Enter receipt information" },
    { step: 2, title: "Preview", description: "Check the formatted receipt" },
    { step: 3, title: "Download", description: "Save or print as PDF" },
  ];

  const benefits = [
    { icon: <Receipt className="h-5 w-5" />, title: "Professional", description: "Clean receipt format" },
    { icon: <Download className="h-5 w-5" />, title: "No Watermark", description: "100% clean PDF output" },
    { icon: <Receipt className="h-5 w-5" />, title: "Private", description: "All data stays offline" },
  ];

  const faqs = [
    { question: "Can I use this for business?", answer: "Yes! Perfect for rent, property token, services, and business transactions." },
    { question: "Does it save my data?", answer: "No, all data stays in your browser. Nothing is uploaded." },
    { question: "Is there a watermark?", answer: "No watermarks. You get a clean, professional receipt." },
  ];

  return (
    <ToolLayout
      title="Receipt Generator"
      description="Create payment receipts instantly and download as PDF. Fully offline, private and free."
      icon={<Receipt className="h-8 w-8" />}
      toolId="receipt-generator"
      category="PDF Tools"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="receipt-no">Receipt Number</Label>
            <Input
              id="receipt-no"
              value={receiptNo}
              onChange={(e) => setReceiptNo(e.target.value)}
              placeholder="RCP-001"
              data-testid="input-receipt-no"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              data-testid="input-date"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="received-from">Received From</Label>
          <Input
            id="received-from"
            value={receivedFrom}
            onChange={(e) => setReceivedFrom(e.target.value)}
            placeholder="Client/Customer Name"
            data-testid="input-received-from"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
            data-testid="input-amount"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose</Label>
          <Textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Payment for..."
            className="min-h-[80px]"
            data-testid="textarea-purpose"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="received-by">Received By</Label>
          <Input
            id="received-by"
            value={receivedBy}
            onChange={(e) => setReceivedBy(e.target.value)}
            placeholder="Your Name/Business"
            data-testid="input-received-by"
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

        <Card ref={receiptRef} className="print:shadow-none bg-white">
          <CardContent className="p-8 space-y-6">
            <div className="text-center border-b-2 border-gray-300 pb-4">
              <h2 className="text-3xl font-bold text-gray-900">RECEIPT</h2>
              <p className="text-sm text-gray-600 mt-2">Receipt #{receiptNo || "---"}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Date:</span>
                <span className="text-gray-800">{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Received From:</span>
                <span className="text-gray-800">{receivedFrom || "---"}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-y-2">
                <span className="font-semibold text-lg text-gray-900">Amount:</span>
                <span className="text-2xl font-bold text-gray-900">{CURRENCY_SYMBOLS[currency]}{amount || "0.00"}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Purpose:</p>
                <p className="text-gray-600">{purpose || "---"}</p>
              </div>
              <div className="pt-8 mt-8 border-t border-gray-300">
                <p className="font-semibold text-gray-900">Received By:</p>
                <p className="mt-4 text-gray-800">{receivedBy || "---"}</p>
                <p className="text-sm text-gray-600 mt-6">Signature: _______________</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center print:hidden">
          <Button onClick={generatePDF} size="lg" disabled={downloading} data-testid="button-download-pdf">
            <Download className="mr-2 h-5 w-5" />
            {downloading ? "Generating PDF..." : "Download PDF"}
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}
