import { useState, useRef, useEffect } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FileText, Download, Plus, Trash2, Save, History, Copy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
import { CURRENCIES, searchCurrencies, getCurrencyById } from "@/lib/currencies";

const THEMES = ["Classic", "Modern", "Professional"];

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [allInvoices, setAllInvoices] = useState<InvoiceData[]>([]);
  const [allTemplates, setAllTemplates] = useState<InvoiceTemplate[]>([]);
  const [theme, setTheme] = useState("Classic");
  const [downloading, setDownloading] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [currencySearch, setCurrencySearch] = useState("");
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const searchResults = currencySearch ? searchCurrencies(currencySearch) : CURRENCIES;

  useSEO({
    title: "Free Invoice Generator Online | Create & Download PDF Instantly | Pixocraft Tools",
    description: "Generate professional invoices with tax, discount, shipping calculations. Auto-save drafts, manage templates. No login, 100% offline.",
    keywords: "invoice generator, create invoice pdf, billing tool, invoice maker, free invoice template, gst calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/invoice-generator",
  });

  // Initialize invoice on mount
  useEffect(() => {
    const savedDraft = loadDraft();
    if (savedDraft) {
      setInvoice(savedDraft);
    } else {
      setInvoice(createNewInvoice());
    }
    setAllInvoices(getAllInvoices());
    setAllTemplates(getAllTemplates());
  }, []);

  // Auto-save draft every 3 seconds
  useEffect(() => {
    if (!invoice) return;
    const timer = setTimeout(() => {
      saveDraft(invoice);
    }, 3000);
    return () => clearTimeout(timer);
  }, [invoice]);

  if (!invoice) return <div>Loading...</div>;

  const totals = calculateInvoiceTotals(invoice);
  const balanceDue = totals.total - (parseFloat(invoice.items[0]?.id || "0") as any);

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
    setInvoice({
      ...invoice,
      items: [...invoice.items, newItem]
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoice({ ...invoice, items: newItems });
  };

  const removeItem = (index: number) => {
    if (invoice.items.length > 1) {
      setInvoice({
        ...invoice,
        items: invoice.items.filter((_, i) => i !== index)
      });
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

  const saveAsTemplate = () => {
    const template: InvoiceTemplate = {
      id: crypto.randomUUID ? crypto.randomUUID() : `tmpl-${Date.now()}`,
      name: `Template - ${invoice.businessName || "Untitled"}`,
      businessName: invoice.businessName,
      businessEmail: invoice.businessEmail,
      businessPhone: invoice.businessPhone,
      businessAddress: invoice.businessAddress,
      currency: invoice.currency,
      taxRate: invoice.taxRate,
    };
    saveTemplate(template);
    setAllTemplates([...allTemplates, template]);
    toast({
      title: "Success",
      description: "Template saved successfully",
    });
  };

  const loadTemplate = (template: InvoiceTemplate) => {
    setInvoice({
      ...invoice,
      businessName: template.businessName,
      businessEmail: template.businessEmail,
      businessPhone: template.businessPhone,
      businessAddress: template.businessAddress,
      currency: template.currency,
      taxRate: template.taxRate,
    });
    setShowTemplates(false);
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

  const createNewInv = () => {
    setInvoice(createNewInvoice());
    toast({
      title: "New Invoice",
      description: "Started with a fresh invoice",
    });
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
    { question: "Can I save invoice drafts?", answer: "Yes! Drafts auto-save every 3 seconds to your browser's local storage. Access them anytime." },
    { question: "How do I manage multiple invoices?", answer: "View all your invoice drafts in the History section. Create new invoices and manage templates." },
    { question: "Can I add tax and discount?", answer: "Absolutely! Set tax percentage, discount percentage, and shipping costs. All calculated automatically." },
    { question: "Is it really offline?", answer: "100% offline! Everything runs in your browser. No data is uploaded or stored on servers." },
  ];

  return (
    <ToolLayout
      title="Invoice Generator"
      description="Create professional invoices with tax, discount, and payment tracking. Auto-save drafts, manage templates, download as PDF."
      icon={<FileText className="h-8 w-8" />}
      toolId="invoice-generator"
      category="generator"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        {/* Top Controls */}
        <div className="flex flex-wrap gap-2">
          <Dialog open={showDrafts} onOpenChange={setShowDrafts}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" data-testid="button-view-drafts">
                <History className="mr-2 h-4 w-4" />
                Drafts ({allInvoices.length})
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="dialog-drafts">
              <DialogHeader>
                <DialogTitle>Invoice Drafts</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allInvoices.length === 0 ? (
                  <p className="text-sm text-gray-500">No drafts saved yet</p>
                ) : (
                  allInvoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex-1">
                        <p className="font-medium">{inv.invoiceNumber}</p>
                        <p className="text-sm text-gray-500">{inv.clientName}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setInvoice(inv);
                          setShowDrafts(false);
                        }}
                        data-testid={`button-load-draft-${inv.id}`}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          deleteInvoice(inv.id);
                          setAllInvoices(getAllInvoices());
                        }}
                        data-testid={`button-delete-draft-${inv.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" data-testid="button-view-templates">
                <FileText className="mr-2 h-4 w-4" />
                Templates ({allTemplates.length})
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="dialog-templates">
              <DialogHeader>
                <DialogTitle>Invoice Templates</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allTemplates.length === 0 ? (
                  <p className="text-sm text-gray-500">No templates saved yet</p>
                ) : (
                  allTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex-1">
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-gray-500">{template.businessName}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => loadTemplate(template)}
                        data-testid={`button-load-template-${template.id}`}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          deleteTemplate(template.id);
                          setAllTemplates(getAllTemplates());
                        }}
                        data-testid={`button-delete-template-${template.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={createNewInv} variant="outline" size="sm" data-testid="button-new-invoice">
            + New Invoice
          </Button>

          <Button onClick={saveAsTemplate} variant="outline" size="sm" data-testid="button-save-template">
            <Save className="mr-2 h-4 w-4" />
            Save as Template
          </Button>

          <div className="ml-auto flex gap-2">
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-32" data-testid="select-theme">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {THEMES.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover open={showCurrencyPicker} onOpenChange={setShowCurrencyPicker}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-48" data-testid="button-currency-picker">
                  {getCurrencyById(invoice.currency)?.symbol} {invoice.currency}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-2" align="end" data-testid="popover-currency">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Search className="h-4 w-4 text-gray-500 mt-2.5" />
                    <Input
                      placeholder="Search country, currency, or symbol..."
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      className="h-9"
                      data-testid="input-currency-search"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-1">
                    {searchResults.length === 0 ? (
                      <p className="text-sm text-gray-500 p-2">No currencies found</p>
                    ) : (
                      searchResults.map((curr) => (
                        <button
                          key={curr.id}
                          onClick={() => {
                            updateInvoice('currency', curr.id);
                            setShowCurrencyPicker(false);
                            setCurrencySearch("");
                          }}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm transition-colors"
                          data-testid={`button-currency-${curr.id}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">{curr.symbol}</span>
                            <span className="flex-1">
                              {curr.country}
                              <span className="block text-xs text-gray-500">{curr.currency}</span>
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
              onClick={() => logoInputRef.current?.click()}
              data-testid="div-logo-upload">
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

            {/* Business Details */}
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                value={invoice.businessName}
                onChange={(e) => updateInvoice('businessName', e.target.value)}
                placeholder="Your Company Name"
                data-testid="input-business-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="business-email">Email</Label>
                <Input
                  id="business-email"
                  type="email"
                  value={invoice.businessEmail}
                  onChange={(e) => updateInvoice('businessEmail', e.target.value)}
                  placeholder="email@company.com"
                  data-testid="input-business-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-phone">Phone</Label>
                <Input
                  id="business-phone"
                  value={invoice.businessPhone}
                  onChange={(e) => updateInvoice('businessPhone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  data-testid="input-business-phone"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-address">Address</Label>
              <Textarea
                id="business-address"
                value={invoice.businessAddress}
                onChange={(e) => updateInvoice('businessAddress', e.target.value)}
                placeholder="Street, City, Zip"
                className="min-h-[80px]"
                data-testid="textarea-business-address"
              />
            </div>

            {/* Bill To */}
            <div className="border-t pt-4 mt-4">
              <h4 className="font-semibold mb-3">Bill To</h4>
              <div className="space-y-2">
                <Input
                  value={invoice.clientName}
                  onChange={(e) => updateInvoice('clientName', e.target.value)}
                  placeholder="Who is this to?"
                  data-testid="input-client-name"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input
                  type="email"
                  value={invoice.clientEmail}
                  onChange={(e) => updateInvoice('clientEmail', e.target.value)}
                  placeholder="Client email"
                  data-testid="input-client-email"
                />
                <Input
                  value={invoice.clientPhone}
                  onChange={(e) => updateInvoice('clientPhone', e.target.value)}
                  placeholder="Client phone"
                  data-testid="input-client-phone"
                />
              </div>

              <Textarea
                value={invoice.clientAddress}
                onChange={(e) => updateInvoice('clientAddress', e.target.value)}
                placeholder="Client address"
                className="min-h-[60px] mt-2"
                data-testid="textarea-client-address"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-number">Invoice #</Label>
                <Input
                  id="invoice-number"
                  value={invoice.invoiceNumber}
                  onChange={(e) => updateInvoice('invoiceNumber', e.target.value)}
                  placeholder="INV-001"
                  data-testid="input-invoice-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="po-number">PO Number</Label>
                <Input
                  id="po-number"
                  placeholder="Optional"
                  data-testid="input-po-number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-date">Date</Label>
                <Input
                  id="invoice-date"
                  type="date"
                  value={invoice.invoiceDate}
                  onChange={(e) => updateInvoice('invoiceDate', e.target.value)}
                  data-testid="input-invoice-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => updateInvoice('dueDate', e.target.value)}
                  data-testid="input-due-date"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-terms">Payment Terms</Label>
              <Input
                id="payment-terms"
                placeholder="e.g., Net 30, Due on receipt"
                data-testid="input-payment-terms"
              />
            </div>

            {/* Tax & Shipping */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="tax-rate">Tax/GST (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    value={invoice.taxRate}
                    onChange={(e) => updateInvoice('taxRate', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    data-testid="input-tax-rate"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="discount-rate">Discount (%)</Label>
                  <Input
                    id="discount-rate"
                    type="number"
                    value={invoice.discountRate}
                    onChange={(e) => updateInvoice('discountRate', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    data-testid="input-discount-rate"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Line Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="text-left py-2 px-3">Description</th>
                  <th className="text-center py-2 px-3 w-20">Quantity</th>
                  <th className="text-right py-2 px-3 w-24">Rate</th>
                  <th className="text-right py-2 px-3 w-24">Amount</th>
                  <th className="text-center py-2 px-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3">
                      <Input
                        value={item.desc}
                        onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                        placeholder="Description of item/service..."
                        className="border-0"
                        data-testid={`input-item-desc-${idx}`}
                      />
                    </td>
                    <td className="py-3 px-3">
                      <Input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value) || 1)}
                        className="border-0 text-center"
                        data-testid={`input-item-qty-${idx}`}
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex">
                        <span className="text-gray-500">{getCurrencyById(invoice.currency)?.symbol}</span>
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(idx, 'rate', parseFloat(e.target.value) || 0)}
                          className="border-0 text-right"
                          data-testid={`input-item-rate-${idx}`}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-medium">
                      {getCurrencyById(invoice.currency)?.symbol}{(item.qty * item.rate).toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(idx)}
                        data-testid={`button-remove-item-${idx}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button onClick={addItem} variant="outline" size="sm" data-testid="button-add-item">
            <Plus className="mr-2 h-4 w-4" />
            Add Line Item
          </Button>
        </div>

        {/* Notes & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={invoice.notes}
              onChange={(e) => updateInvoice('notes', e.target.value)}
              placeholder="Notes - any relevant information not already covered"
              className="min-h-[100px]"
              data-testid="textarea-notes"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="terms">Terms</Label>
            <Textarea
              id="terms"
              placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
              className="min-h-[100px]"
              data-testid="textarea-terms"
            />
          </div>
        </div>

        {/* Invoice Preview */}
        <Card ref={invoiceRef} className="bg-white">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start border-b pb-6">
              <div>
                {logoPreview && <img src={logoPreview} alt="Logo" className="h-12 mb-2" />}
                <h1 className="text-3xl font-bold">INVOICE</h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Invoice #: <span className="font-semibold">{invoice.invoiceNumber}</span></p>
                <p className="text-sm text-gray-600 mt-1">Date: <span className="font-semibold">{invoice.invoiceDate}</span></p>
                <p className="text-sm text-gray-600 mt-1">Due Date: <span className="font-semibold">{invoice.dueDate}</span></p>
              </div>
            </div>

            {/* Business Info */}
            <div>
              <h3 className="font-semibold text-gray-900">{invoice.businessName || "Your Company"}</h3>
              {invoice.businessEmail && <p className="text-sm text-gray-600">{invoice.businessEmail}</p>}
              {invoice.businessPhone && <p className="text-sm text-gray-600">{invoice.businessPhone}</p>}
              {invoice.businessAddress && <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.businessAddress}</p>}
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Bill To:</p>
                <p className="text-gray-800">{invoice.clientName || "Client Name"}</p>
                {invoice.clientEmail && <p className="text-sm text-gray-600">{invoice.clientEmail}</p>}
                {invoice.clientPhone && <p className="text-sm text-gray-600">{invoice.clientPhone}</p>}
                {invoice.clientAddress && <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.clientAddress}</p>}
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full">
              <thead className="bg-gray-100 border-y">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Qty</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Rate</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-800">{item.desc || "---"}</td>
                    <td className="py-3 px-4 text-center text-gray-800">{item.qty}</td>
                    <td className="py-3 px-4 text-right text-gray-800">{getCurrencyById(invoice.currency)?.symbol}{item.rate.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right text-gray-800">{getCurrencyById(invoice.currency)?.symbol}{(item.qty * item.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-80 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{getCurrencyById(invoice.currency)?.symbol}{totals.subtotal.toFixed(2)}</span>
                </div>
                {invoice.discountRate > 0 && (
                  <div className="flex justify-between text-sm text-orange-600">
                    <span>Discount ({invoice.discountRate}%):</span>
                    <span>-{getCurrencyById(invoice.currency)?.symbol}{totals.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {invoice.taxRate > 0 && (
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Tax ({invoice.taxRate}%):</span>
                    <span>{getCurrencyById(invoice.currency)?.symbol}{totals.taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t-2 pt-2">
                  <span>Total:</span>
                  <span>{getCurrencyById(invoice.currency)?.symbol}{totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900 mb-2">Notes:</p>
                <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Download Button */}
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
