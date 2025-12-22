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

const THEMES = ["Classic", "Modern", "Professional", "Minimal"];
const FONTS = ["Inter", "JetBrains Mono", "Serif", "Sans-serif"];

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [allInvoices, setAllInvoices] = useState<InvoiceData[]>([]);
  const [allTemplates, setAllTemplates] = useState<InvoiceTemplate[]>([]);
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
    title: "Free Invoice Generator Online | Professional GST & Tax Billing Tool",
    description: "Create professional invoices instantly with our free online generator. Features GST/Tax calculation, auto-save drafts, custom themes, and PDF download. 100% private and offline-capable.",
    keywords: "invoice generator, free invoice maker, gst billing software online, professional invoice template, create pdf invoice, online billing tool india, free billing generator",
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

  const updateInvoice = (field: string, value: any) => {
    setInvoice({ ...invoice, [field]: value });
  };

  const addItem = () => {
    const newItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}-${Math.random()}`,
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
      theme: invoice.theme,
      primaryColor: invoice.primaryColor,
      fontFamily: invoice.fontFamily,
      backgroundColor: invoice.backgroundColor,
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
      theme: template.theme || invoice.theme,
      primaryColor: template.primaryColor || invoice.primaryColor,
      fontFamily: template.fontFamily || invoice.fontFamily,
      backgroundColor: template.backgroundColor || invoice.backgroundColor,
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
    { question: "Is this invoice generator free to use?", answer: "Yes, this is a completely free online invoice generator. You can create, customize, and download unlimited invoices as PDFs without any hidden costs or subscriptions." },
    { question: "Do I need to sign up or create an account?", answer: "No registration is required. You can start generating invoices immediately. We value your time and privacy, so we've kept the tool accessible without any login barriers." },
    { question: "Is my business data safe and private?", answer: "Absolutely. This tool runs entirely in your web browser. None of your business or client data is ever uploaded to our servers. Everything stays on your device." },
    { question: "Can I save my invoices for later editing?", answer: "Yes! The tool automatically saves your work as a draft in your browser's local storage. You can come back later and pick up exactly where you left off." },
    { question: "Can I customize the invoice with my company logo?", answer: "Yes, you can easily upload your company logo. You can also customize the theme, fonts, and primary colors to match your brand identity." },
    { question: "Does it support different currencies?", answer: "Yes, we support a wide range of global currencies. You can search and select your preferred currency from the picker at the top of the generator." },
    { question: "Can I calculate taxes and discounts automatically?", answer: "Yes, the generator includes built-in fields for tax (GST/VAT) and discounts. It automatically calculates the subtotal and grand total for you." },
    { question: "Does this tool work offline?", answer: "Yes, once the page is loaded, the entire generation process happens locally. You don't need an active internet connection to fill out or download your invoice." },
  ];

  const relatedTools = [
    { name: "GST Calculator", url: "/tools/gst-calculator" },
    { name: "QR Code Generator", url: "/tools/qr-code-generator" },
    { name: "Text Summarizer", url: "/tools/text-summarizer" },
    { name: "Image Compressor", url: "/tools/image-compressor" },
    { name: "PDF Merger", url: "/tools/pdf-merger" },
  ];

  return (
    <ToolLayout
      title="Free Online Invoice Generator"
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
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-stretch sm:items-center">
          <div className="flex flex-wrap gap-2">
            <Dialog open={showDrafts} onOpenChange={setShowDrafts}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none" data-testid="button-view-drafts">
                  <History className="mr-2 h-4 w-4" />
                  Drafts ({allInvoices.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" data-testid="dialog-drafts">
                <DialogHeader>
                  <DialogTitle>Invoice Drafts</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                  {allInvoices.length === 0 ? (
                    <p className="text-sm text-gray-500">No drafts saved yet</p>
                  ) : (
                    allInvoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-3 border rounded-md gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{inv.invoiceNumber}</p>
                          <p className="text-sm text-gray-500 truncate">{inv.clientName}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
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
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none" data-testid="button-view-templates">
                  <FileText className="mr-2 h-4 w-4" />
                  Templates ({allTemplates.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" data-testid="dialog-templates">
                <DialogHeader>
                  <DialogTitle>Invoice Templates</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                  {allTemplates.length === 0 ? (
                    <p className="text-sm text-gray-500">No templates saved yet</p>
                  ) : (
                    allTemplates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-3 border rounded-md gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{template.name}</p>
                          <p className="text-sm text-gray-500 truncate">{template.businessName}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
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
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={createNewInv} variant="outline" size="sm" className="flex-1 sm:flex-none" data-testid="button-new-invoice">
              + New Invoice
            </Button>

            <Button onClick={saveAsTemplate} variant="outline" size="sm" className="flex-1 sm:flex-none" data-testid="button-save-template">
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 sm:pt-0 sm:ml-auto items-end">
            <div className="flex flex-col gap-1 flex-1 min-w-[70px]">
              <Label className="text-[10px] uppercase text-muted-foreground ml-1">Theme</Label>
              <Select value={invoice.theme} onValueChange={(v) => updateInvoice('theme', v)}>
                <SelectTrigger className="h-8 w-full" data-testid="select-theme">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[90px]">
              <Label className="text-[10px] uppercase text-muted-foreground ml-1">Font</Label>
              <Select value={invoice.fontFamily} onValueChange={(v) => updateInvoice('fontFamily', v)}>
                <SelectTrigger className="h-8 w-full" data-testid="select-font">
                  <SelectValue placeholder="Font" />
                </SelectTrigger>
                <SelectContent>
                  {FONTS.map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-[10px] uppercase text-muted-foreground ml-1">Color</Label>
              <Input
                type="color"
                value={invoice.primaryColor}
                onChange={(e) => updateInvoice('primaryColor', e.target.value)}
                className="w-10 h-8 p-1 cursor-pointer"
                data-testid="input-primary-color"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-[10px] uppercase text-muted-foreground ml-1">BG</Label>
              <Input
                type="color"
                value={invoice.backgroundColor}
                onChange={(e) => updateInvoice('backgroundColor', e.target.value)}
                className="w-10 h-8 p-1 cursor-pointer"
                data-testid="input-bg-color"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[60px]">
              <Label className="text-[10px] uppercase text-muted-foreground ml-1">Radius</Label>
              <Input
                type="number"
                min="0"
                max="50"
                value={invoice.logoRadius || 0}
                onChange={(e) => updateInvoice('logoRadius', parseInt(e.target.value) || 0)}
                className="h-8 w-full"
                data-testid="input-logo-radius"
              />
            </div>

            <Popover open={showCurrencyPicker} onOpenChange={setShowCurrencyPicker}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-8 px-2 text-xs" data-testid="button-currency-picker">
                  {getCurrencyById(invoice.currency)?.symbol} {invoice.currency}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[90vw] sm:w-80 p-2" align="end" data-testid="popover-currency">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Search className="h-4 w-4 text-gray-500 mt-2.5" />
                    <Input
                      placeholder="Search currency..."
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      className="h-9"
                      data-testid="input-currency-search"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-[50vh] overflow-y-auto space-y-1">
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
                            <span className="font-semibold text-lg shrink-0 w-8">{curr.symbol}</span>
                            <span className="flex-1 truncate">
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
            <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => logoInputRef.current?.click()}
              data-testid="div-logo-upload">
              {logoPreview ? (
                <img 
                  src={logoPreview} 
                  alt="Logo" 
                  className="h-16 mx-auto object-contain" 
                  style={{ borderRadius: `${invoice.logoRadius || 0}px` }}
                />
              ) : (
                <p className="text-gray-400 dark:text-gray-500">+ Add Your Logo</p>
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
            <div className="space-y-3 bg-gray-50 dark:bg-muted/20 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="tax-rate">Tax/GST (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    value={invoice.taxRate}
                    onChange={(e) => updateInvoice('taxRate', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="h-9"
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
                    className="h-9"
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
          
          {/* Mobile Items View */}
          <div className="md:hidden space-y-4">
            {invoice.items.map((item, idx) => (
              <Card key={item.id} className="p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => removeItem(idx)}
                  data-testid={`button-remove-item-mobile-${idx}`}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase text-muted-foreground">Description</Label>
                    <Input
                      value={item.desc}
                      onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                      placeholder="Item description..."
                      data-testid={`input-item-desc-mobile-${idx}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase text-muted-foreground">Quantity</Label>
                      <Input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value) || 1)}
                        data-testid={`input-item-qty-mobile-${idx}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase text-muted-foreground">Rate</Label>
                      <div className="flex items-center gap-1 border rounded-md px-2 bg-background">
                        <span className="text-gray-500 text-sm">{getCurrencyById(invoice.currency)?.symbol}</span>
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(idx, 'rate', parseFloat(e.target.value) || 0)}
                          className="border-0 p-0 h-9"
                          data-testid={`input-item-rate-mobile-${idx}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium">Amount:</span>
                    <span className="font-bold">
                      {getCurrencyById(invoice.currency)?.symbol}{(item.qty * item.rate).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto border rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left py-2 px-3">Description</th>
                  <th className="text-center py-2 px-3 w-20">Qty</th>
                  <th className="text-right py-2 px-3 w-32">Rate</th>
                  <th className="text-right py-2 px-3 w-32">Amount</th>
                  <th className="text-center py-2 px-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-2 px-3">
                      <Input
                        value={item.desc}
                        onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                        placeholder="Description..."
                        className="border-0 focus-visible:ring-0 bg-transparent px-0"
                        data-testid={`input-item-desc-${idx}`}
                      />
                    </td>
                    <td className="py-2 px-3">
                      <Input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value) || 1)}
                        className="border-0 focus-visible:ring-0 bg-transparent text-center px-0"
                        data-testid={`input-item-qty-${idx}`}
                      />
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-gray-500">{getCurrencyById(invoice.currency)?.symbol}</span>
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(idx, 'rate', parseFloat(e.target.value) || 0)}
                          className="border-0 focus-visible:ring-0 bg-transparent text-right px-0 w-24"
                          data-testid={`input-item-rate-${idx}`}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-3 text-right font-medium">
                      {getCurrencyById(invoice.currency)?.symbol}{(item.qty * item.rate).toFixed(2)}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-red-500"
                        onClick={() => removeItem(idx)}
                        data-testid={`button-remove-item-${idx}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button onClick={addItem} variant="outline" size="sm" className="w-full sm:w-auto" data-testid="button-add-item">
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
                  value={invoice.terms}
                  onChange={(e) => updateInvoice('terms', e.target.value)}
                  placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                  className="min-h-[100px]"
                  data-testid="textarea-terms"
                />
              </div>
        </div>

        {/* Invoice Preview */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 pb-4">
          <div className="min-w-[700px] p-4 sm:p-0">
            <Card 
              ref={invoiceRef} 
              style={{ 
                backgroundColor: invoice.backgroundColor,
                fontFamily: invoice.fontFamily === 'Serif' ? 'serif' : 
                            invoice.fontFamily === 'Sans-serif' ? 'sans-serif' : 
                            invoice.fontFamily === 'JetBrains Mono' ? '"JetBrains Mono", monospace' : 
                            '"Inter", sans-serif'
              }}
              className="bg-white border-0 shadow-lg"
            >
          <CardContent className={`p-8 space-y-6 ${invoice.theme === 'Minimal' ? 'px-12' : ''}`}>
            {/* Header */}
            <div className={`flex justify-between items-start border-b pb-6 ${
              invoice.theme === 'Modern' ? 'flex-row-reverse border-primary' : 
              invoice.theme === 'Professional' ? 'bg-muted/30 -mx-8 px-8 py-6 border-b-0 mb-6' : ''
            }`} style={{ borderColor: invoice.primaryColor }}>
              <div>
                {logoPreview && (
                  <img 
                    src={logoPreview} 
                    alt="Logo" 
                    className="h-16 object-contain mb-4" 
                    style={{ borderRadius: `${invoice.logoRadius || 0}px` }}
                  />
                )}
                <h1 className="text-3xl font-bold" style={{ color: invoice.primaryColor }}>INVOICE</h1>
                {invoice.theme === 'Minimal' && (
                  <p className="text-sm text-muted-foreground mt-1">#{invoice.invoiceNumber}</p>
                )}
              </div>
              <div className="text-right">
                {invoice.theme !== 'Minimal' && (
                  <>
                    <p className="text-sm text-gray-600">Invoice #: <span className="font-semibold">{invoice.invoiceNumber}</span></p>
                    <p className="text-sm text-gray-600 mt-1">Date: <span className="font-semibold">{invoice.invoiceDate}</span></p>
                    <p className="text-sm text-gray-600 mt-1">Due Date: <span className="font-semibold">{invoice.dueDate}</span></p>
                  </>
                )}
                {invoice.theme === 'Minimal' && (
                  <p className="text-sm text-muted-foreground">{invoice.invoiceDate}</p>
                )}
              </div>
            </div>

            {/* Business Info */}
            <div className={`${invoice.theme === 'Modern' ? 'text-right' : ''}`}>
              <h3 className="font-semibold text-gray-900" style={{ color: invoice.theme === 'Professional' ? invoice.primaryColor : undefined }}>
                {invoice.businessName || "Your Company"}
              </h3>
              {invoice.businessEmail && <p className="text-sm text-gray-600">{invoice.businessEmail}</p>}
              {invoice.businessPhone && <p className="text-sm text-gray-600">{invoice.businessPhone}</p>}
              {invoice.businessAddress && <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.businessAddress}</p>}
            </div>

            {/* Bill To */}
            <div className={`grid grid-cols-2 gap-6 ${invoice.theme === 'Minimal' ? 'border-y py-6' : ''}`}>
              <div>
                <p className="font-semibold text-gray-900 mb-2" style={{ color: invoice.primaryColor }}>Bill To:</p>
                <p className="text-gray-800">{invoice.clientName || "Client Name"}</p>
                {invoice.clientEmail && <p className="text-sm text-gray-600">{invoice.clientEmail}</p>}
                {invoice.clientPhone && <p className="text-sm text-gray-600">{invoice.clientPhone}</p>}
                {invoice.clientAddress && <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.clientAddress}</p>}
              </div>
              {invoice.theme === 'Minimal' && (
                <div className="text-right flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground">Amount Due</p>
                  <p className="text-2xl font-bold" style={{ color: invoice.primaryColor }}>
                    {getCurrencyById(invoice.currency)?.symbol}{totals.total.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {/* Line Items Table */}
            <div className="overflow-hidden rounded-sm">
              <table className="w-full">
                <thead className={`${
                  invoice.theme === 'Modern' ? 'bg-primary text-white' : 
                  invoice.theme === 'Professional' ? 'bg-gray-800 text-white' : 
                  'bg-gray-100 border-y'
                }`} style={{ backgroundColor: (invoice.theme === 'Modern' || invoice.theme === 'Professional') ? invoice.primaryColor : undefined }}>
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                    <th className="text-center py-3 px-4 font-semibold">Qty</th>
                    <th className="text-right py-3 px-4 font-semibold">Rate</th>
                    <th className="text-right py-3 px-4 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={item.id} className={`border-b border-gray-100 ${idx % 2 === 0 && invoice.theme === 'Professional' ? 'bg-muted/10' : ''}`}>
                      <td className="py-3 px-4 text-gray-800">{item.desc || "---"}</td>
                      <td className="py-3 px-4 text-center text-gray-800">{item.qty}</td>
                      <td className="py-3 px-4 text-right text-gray-800">{getCurrencyById(invoice.currency)?.symbol}{item.rate.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right text-gray-800 font-medium">{getCurrencyById(invoice.currency)?.symbol}{(item.qty * item.rate).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end pt-4">
              <div className="w-80 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">{getCurrencyById(invoice.currency)?.symbol}{totals.subtotal.toFixed(2)}</span>
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
                <div className="flex justify-between text-xl font-bold border-t-2 pt-2" style={{ borderColor: invoice.primaryColor, color: invoice.primaryColor }}>
                  <span>Total:</span>
                  <span>{getCurrencyById(invoice.currency)?.symbol}{totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            {(invoice.notes || invoice.terms) && (
              <div className="border-t pt-4 space-y-4">
                {invoice.notes && (
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Notes:</p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
                  </div>
                )}
                {invoice.terms && (
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Terms & Conditions:</p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.terms}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Download Button */}
    <div className="flex justify-center">
          <Button onClick={generatePDF} size="lg" disabled={downloading} data-testid="button-download-pdf">
            <Download className="mr-2 h-5 w-5" />
            {downloading ? "Generating PDF..." : "Download PDF"}
          </Button>
        </div>

        {/* Features of Our Tool */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t">
          <div className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Professional Branding
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize your invoices with professional themes, custom fonts, and brand colors. Add your company logo with adjustable corner radius for a polished look.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Instant PDF Generation
            </h3>
            <p className="text-sm text-muted-foreground">
              Generate high-quality PDF invoices instantly in your browser. Our tool ensures perfect layout and typography for professional printing or digital sharing.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Smart Calculations
            </h3>
            <p className="text-sm text-muted-foreground">
              Built-in support for GST/Tax, discounts, and shipping. Our generator handles all the math automatically, ensuring 100% accuracy in your totals.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="border-t pt-8 mt-12">
          <h3 className="text-xl font-bold mb-4">Related Tools</h3>
          <div className="flex flex-wrap gap-3">
            {relatedTools.map((tool) => (
              <Button key={tool.url} variant="outline" size="sm" asChild>
                <a href={tool.url}>{tool.name}</a>
              </Button>
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="prose prose-sm dark:prose-invert max-w-none pt-8 border-t">
          <p>
            In today's fast-paced business environment, creating professional invoices quickly and accurately is essential. 
            Our <strong>Free Online Invoice Generator</strong> is designed to solve the common headache of manual billing. 
            Whether you are a freelancer, a small business owner, or a student working on a project, this tool provides a 
            seamless way to generate high-quality invoices without the need for expensive software or complex spreadsheets.
          </p>
          <p>
            This tool is built for a wide range of users. Professionals can use it to bill clients for consulting services, 
            developers can generate invoices for software projects, and small businesses can manage their daily transactions. 
            The intuitive interface allows you to add business details, client information, and line items with just a few clicks. 
            Automatic calculations for taxes, discounts, and subtotals ensure that your final document is error-free.
          </p>
          <p>
            One of the standout features of Pixocraft's Invoice Generator is its <strong>Privacy-First</strong> approach. 
            We understand that financial data is sensitive. That's why our tool runs entirely client-side. 
            This means that none of the information you enter—your business name, client details, or pricing—is ever sent 
            to or stored on our servers. It stays completely within your browser. Additionally, the tool supports 
            offline usage; once the page is loaded, you can continue working even without an internet connection.
          </p>
          <p>
            Real-life use cases include generating monthly service bills, creating one-time receipts for sales, or 
            drafting proforma invoices for project proposals. With the ability to save drafts locally and manage templates, 
            you can streamline your entire billing process and focus more on your core work.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
