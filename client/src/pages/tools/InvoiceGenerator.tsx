import { useState, useRef, useEffect } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FileText, Download, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import html2pdf from "html2pdf.js";
import { useToast } from "@/hooks/use-toast";
import {
  InvoiceData,
  InvoiceTemplate,
  createNewInvoice,
  saveDraft,
  loadDraft,
  getAllInvoices,
  getAllTemplates,
  saveTemplate,
  deleteInvoice,
  deleteTemplate,
  calculateInvoiceTotals,
} from "@/lib/invoiceManager";

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "د.إ"
};

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [theme, setTheme] = useState("Classic");
  const [downloading, setDownloading] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Invoice Generator Online | Create & Download PDF Instantly | Pixocraft Tools",
    description: "Generate professional invoices with tax, discount, shipping. Auto-save drafts, templates. No login, 100% offline.",
    keywords: "invoice generator, create invoice pdf, billing tool, invoice maker, free invoice template",
    canonicalUrl: "https://tools.pixocraft.in/tools/invoice-generator",
  });

  useEffect(() => {
    const savedDraft = loadDraft();
    if (savedDraft) {
      setInvoice(savedDraft);
    } else {
      setInvoice(createNewInvoice());
    }
  }, []);

  useEffect(() => {
    if (!invoice) return;
    const timer = setTimeout(() => {
      saveDraft(invoice);
    }, 3000);
    return () => clearTimeout(timer);
  }, [invoice]);

  if (!invoice) return <div>Loading...</div>;

  const totals = calculateInvoiceTotals(invoice);
  const finalTotal = totals.total + shippingCost;
  const balanceDue = finalTotal - amountPaid;

  const updateInvoice = (field: string, value: any) => {
    setInvoice({ ...invoice, [field]: value });
  };

  const addItem = () => {
    const newItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`,
      desc: "",
      qty: 1,
      rate: 0
    };
    setInvoice({ ...invoice, items: [...invoice.items, newItem] });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoice({ ...invoice, items: newItems });
  };

  const removeItem = (index: number) => {
    if (invoice.items.length > 1) {
      setInvoice({ ...invoice, items: invoice.items.filter((_, i) => i !== index) });
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAsDefault = () => {
    const template: InvoiceTemplate = {
      id: "default-template",
      name: "Default Business Template",
      businessName: invoice.businessName,
      businessEmail: invoice.businessEmail,
      businessPhone: invoice.businessPhone,
      businessAddress: invoice.businessAddress,
      currency: invoice.currency,
      taxRate: invoice.taxRate,
    };
    saveTemplate(template);
    toast({
      title: "Success",
      description: "Saved as default template",
    });
  };

  const generatePDF = async () => {
    if (!invoiceRef.current) return;
    
    if (!invoice.businessName || !invoice.clientName || !invoice.invoiceNumber) {
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
        filename: `invoice-${invoice.invoiceNumber}.pdf`,
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
    { step: 1, title: "Add Details", description: "Fill in business and client information" },
    { step: 2, title: "Add Items", description: "Add line items with quantity and rates" },
    { step: 3, title: "Calculate", description: "Apply tax, discount, and shipping automatically" },
    { step: 4, title: "Download", description: "Save as professional PDF instantly" },
  ];

  const benefits = [
    { icon: <FileText className="h-5 w-5" />, title: "Professional Templates", description: "Multiple invoice themes to choose from" },
    { icon: <Download className="h-5 w-5" />, title: "Auto-Save Drafts", description: "Your work saves automatically as you type" },
    { icon: <FileText className="h-5 w-5" />, title: "Advanced Calculations", description: "Tax, discount, shipping, and payment tracking" },
  ];

  const faqs = [
    { question: "Can I save invoice drafts?", answer: "Yes! Drafts auto-save every 3 seconds to your browser. Access them anytime." },
    { question: "How do tax and discount work?", answer: "Set any percentage for tax/GST and discount. Both are calculated automatically from the subtotal." },
    { question: "Can I track payments?", answer: "Yes! Enter the amount paid and the balance due is calculated automatically." },
    { question: "Is it really offline?", answer: "100% offline! Everything runs in your browser. No data is uploaded to servers." },
  ];

  return (
    <ToolLayout
      title="Invoice Generator"
      description="Create professional invoices with tax, discount, shipping, and payment tracking."
      icon={<FileText className="h-8 w-8" />}
      toolId="invoice-generator"
      category="generator"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Left Side - Input Form */}
          <div className="space-y-6">
            {/* Logo Upload */}
            <div 
              onClick={() => logoInputRef.current?.click()}
              className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
              data-testid="div-logo-upload"
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="h-16 mx-auto" />
              ) : (
                <p className="text-gray-400">+ Add Your Logo</p>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                data-testid="input-logo"
              />
            </div>

            {/* From Section */}
            <div className="space-y-2">
              <Input
                value={invoice.businessName}
                onChange={(e) => updateInvoice('businessName', e.target.value)}
                placeholder="Who is this from?"
                className="text-sm"
                data-testid="input-from"
              />
            </div>

            {/* Bill To & Ship To */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-600">Bill To</Label>
                <Input
                  value={invoice.clientName}
                  onChange={(e) => updateInvoice('clientName', e.target.value)}
                  placeholder="Who is this to?"
                  className="text-sm"
                  data-testid="input-bill-to"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-600">Ship To</Label>
                <Input
                  placeholder="(optional)"
                  className="text-sm"
                  data-testid="input-ship-to"
                />
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-3">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="text-left py-2 px-3">Item</th>
                    <th className="text-center py-2 px-3 w-20">Quantity</th>
                    <th className="text-right py-2 px-3 w-20">Rate</th>
                    <th className="text-right py-2 px-3 w-24">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 px-3">
                        <Input
                          value={item.desc}
                          onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                          placeholder="Description of item/service..."
                          className="border-0 p-0 text-sm"
                          data-testid={`input-item-desc-${idx}`}
                        />
                      </td>
                      <td className="py-2 px-3">
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value) || 1)}
                          className="border-0 p-0 text-center text-sm"
                          data-testid={`input-item-qty-${idx}`}
                        />
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500">$</span>
                          <Input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateItem(idx, 'rate', parseFloat(e.target.value) || 0)}
                            className="border-0 p-0 text-right text-sm"
                            data-testid={`input-item-rate-${idx}`}
                          />
                        </div>
                      </td>
                      <td className="py-2 px-3 text-right font-medium text-sm">
                        ${(item.qty * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button onClick={addItem} variant="outline" size="sm" className="text-teal-600 border-teal-600" data-testid="button-add-item">
                + Line Item
              </Button>
            </div>

            {/* Notes & Terms */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Notes</Label>
              <Textarea
                value={invoice.notes}
                onChange={(e) => updateInvoice('notes', e.target.value)}
                placeholder="Notes - any relevant information not already covered"
                className="min-h-[80px] text-sm"
                data-testid="textarea-notes"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Terms</Label>
              <Textarea
                placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                className="min-h-[80px] text-sm"
                data-testid="textarea-terms"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Controls & Invoice Preview */}
        <div className="lg:col-span-1">
          {/* Controls Card */}
          <Card className="sticky top-6 mb-6">
            <CardContent className="p-4 space-y-4">
              {/* Download Button */}
              <Button 
                onClick={generatePDF} 
                disabled={downloading}
                className="w-full bg-teal-600 hover:bg-teal-700"
                data-testid="button-download-pdf"
              >
                <Download className="mr-2 h-4 w-4" />
                {downloading ? "Generating..." : "Download"}
              </Button>

              {/* Theme */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="text-sm" data-testid="select-theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Classic">Classic</SelectItem>
                    <SelectItem value="Modern">Modern</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Currency</Label>
                <Select value={invoice.currency} onValueChange={(val) => updateInvoice('currency', val)}>
                  <SelectTrigger className="text-sm" data-testid="select-currency">
                    <SelectValue />
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

              {/* Save Default */}
              <Button onClick={saveAsDefault} variant="outline" className="w-full text-teal-600 border-teal-600 text-sm" data-testid="button-save-default">
                Save Default
              </Button>

              {/* Divider */}
              <div className="border-t pt-4"></div>

              {/* Tax */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Tax</Label>
                <div className="flex gap-1 items-center">
                  <Input
                    type="number"
                    value={invoice.taxRate}
                    onChange={(e) => updateInvoice('taxRate', parseFloat(e.target.value) || 0)}
                    className="text-sm"
                    data-testid="input-tax-rate"
                  />
                  <span className="text-xs text-gray-500">%</span>
                </div>
              </div>

              {/* Discount Button */}
              <Button variant="link" className="text-teal-600 p-0 h-auto text-sm w-full justify-start" data-testid="button-discount">
                + Discount
              </Button>

              {/* Shipping Button */}
              <Button variant="link" className="text-teal-600 p-0 h-auto text-sm w-full justify-start" data-testid="button-shipping">
                + Shipping
              </Button>

              {/* Divider */}
              <div className="border-t pt-4"></div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{CURRENCY_SYMBOLS[invoice.currency]}{totals.subtotal.toFixed(2)}</span>
                </div>

                {invoice.taxRate > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Tax ({invoice.taxRate}%)</span>
                    <span>{CURRENCY_SYMBOLS[invoice.currency]}{totals.taxAmount.toFixed(2)}</span>
                  </div>
                )}

                {invoice.discountRate > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Discount</span>
                    <span>-{CURRENCY_SYMBOLS[invoice.currency]}{totals.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {shippingCost > 0 && (
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{CURRENCY_SYMBOLS[invoice.currency]}{shippingCost.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>{CURRENCY_SYMBOLS[invoice.currency]}{finalTotal.toFixed(2)}</span>
                </div>

                <div className="border-t pt-2 space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs">Amount Paid</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{CURRENCY_SYMBOLS[invoice.currency]}</span>
                      <Input
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                        className="w-16 h-6 text-sm p-1"
                        data-testid="input-amount-paid"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <span>Balance Due</span>
                    <span>{CURRENCY_SYMBOLS[invoice.currency]}{Math.max(0, balanceDue).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Preview - Right Side */}
          <div className="hidden lg:block">
            <Card ref={invoiceRef} className="bg-white">
              <CardContent className="p-6 space-y-4 text-sm">
                <div className="text-center border-b pb-3">
                  {logoPreview && <img src={logoPreview} alt="Logo" className="h-8 mx-auto mb-2" />}
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                </div>

                <div className="space-y-1">
                  <p className="font-semibold text-gray-900">{invoice.businessName || "Your Company"}</p>
                  {invoice.businessEmail && <p className="text-xs text-gray-600">{invoice.businessEmail}</p>}
                </div>

                <div className="border-t pt-3 space-y-1">
                  <p className="font-semibold text-gray-900">{invoice.clientName || "Client"}</p>
                  {invoice.clientAddress && <p className="text-xs text-gray-600">{invoice.clientAddress}</p>}
                </div>

                <table className="w-full text-xs">
                  <thead className="bg-gray-100 border-y">
                    <tr>
                      <th className="text-left py-1 px-2">Item</th>
                      <th className="text-center py-1 px-2">Qty</th>
                      <th className="text-right py-1 px-2">Rate</th>
                      <th className="text-right py-1 px-2">Amt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.slice(0, 2).map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-1 px-2 text-xs">{item.desc || "---"}</td>
                        <td className="py-1 px-2 text-center text-xs">{item.qty}</td>
                        <td className="py-1 px-2 text-right text-xs">${item.rate.toFixed(2)}</td>
                        <td className="py-1 px-2 text-right text-xs">${(item.qty * item.rate).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="border-t pt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  {invoice.taxRate > 0 && (
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${totals.taxAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold border-t pt-1">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
