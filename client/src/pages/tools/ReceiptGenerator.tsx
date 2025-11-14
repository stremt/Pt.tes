import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Receipt, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ReceiptGenerator() {
  const [receiptNo, setReceiptNo] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [receivedFrom, setReceivedFrom] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [receivedBy, setReceivedBy] = useState<string>("");

  useSEO({
    title: "Receipt Generator Online | Create Payment Receipts Fast | Pixocraft Tools",
    description: "Create payment receipts instantly and download as PDF. Fully offline, private and free.",
    keywords: "receipt generator, payment receipt pdf, token receipt tool, receipt maker",
    canonicalUrl: "https://tools.pixocraft.in/tools/receipt-generator",
  });

  const generatePDF = () => {
    window.print();
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
      category="generator"
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

        <Card className="print:shadow-none">
          <CardContent className="p-8 space-y-6">
            <div className="text-center border-b-2 pb-4">
              <h2 className="text-3xl font-bold">RECEIPT</h2>
              <p className="text-sm text-muted-foreground mt-2">Receipt #{receiptNo || "---"}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Date:</span>
                <span>{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Received From:</span>
                <span>{receivedFrom || "---"}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-y-2">
                <span className="font-semibold text-lg">Amount:</span>
                <span className="text-2xl font-bold">${amount || "0.00"}</span>
              </div>
              <div>
                <p className="font-semibold mb-2">Purpose:</p>
                <p className="text-muted-foreground">{purpose || "---"}</p>
              </div>
              <div className="pt-8 mt-8 border-t">
                <p className="font-semibold">Received By:</p>
                <p className="mt-4">{receivedBy || "---"}</p>
                <p className="text-sm text-muted-foreground mt-6">Signature: _______________</p>
              </div>
            </div>
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
