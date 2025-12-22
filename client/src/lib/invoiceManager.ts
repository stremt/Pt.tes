/**
 * Invoice Manager - Handles drafts, templates, and data persistence
 */

export interface InvoiceItem {
  id: string;
  desc: string;
  qty: number;
  rate: number;
}

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  items: InvoiceItem[];
  invoiceDate: string;
  dueDate: string;
  currency: string;
  taxRate: number;
  discountRate: number;
  notes: string;
  terms: string;
  createdAt: number;
  updatedAt: number;
  theme: string;
  primaryColor: string;
  fontFamily: string;
  backgroundColor: string;
  logoRadius: number;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  currency: string;
  taxRate: number;
  theme?: string;
  primaryColor?: string;
  fontFamily?: string;
  backgroundColor?: string;
  terms?: string;
}

const STORAGE_KEY = 'pixocraft_invoices';
const TEMPLATES_KEY = 'pixocraft_invoice_templates';
const CURRENT_DRAFT_KEY = 'pixocraft_current_invoice_draft';

/**
 * Get all saved invoices
 */
export function getAllInvoices(): InvoiceData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Save invoice draft (auto-save)
 */
export function saveDraft(invoice: InvoiceData): void {
  try {
    const invoices = getAllInvoices();
    const existingIndex = invoices.findIndex(inv => inv.id === invoice.id);
    
    if (existingIndex >= 0) {
      invoices[existingIndex] = { ...invoice, updatedAt: Date.now() };
    } else {
      invoices.push({ ...invoice, createdAt: Date.now(), updatedAt: Date.now() });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    localStorage.setItem(CURRENT_DRAFT_KEY, JSON.stringify(invoice));
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
}

/**
 * Load current draft
 */
export function loadDraft(): InvoiceData | null {
  try {
    const data = localStorage.getItem(CURRENT_DRAFT_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Get specific invoice
 */
export function getInvoice(id: string): InvoiceData | null {
  const invoices = getAllInvoices();
  return invoices.find(inv => inv.id === id) || null;
}

/**
 * Delete invoice
 */
export function deleteInvoice(id: string): void {
  try {
    const invoices = getAllInvoices();
    const filtered = invoices.filter(inv => inv.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete invoice:', error);
  }
}

/**
 * Get all templates
 */
export function getAllTemplates(): InvoiceTemplate[] {
  try {
    const data = localStorage.getItem(TEMPLATES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Save template
 */
export function saveTemplate(template: InvoiceTemplate): void {
  try {
    const templates = getAllTemplates();
    const existingIndex = templates.findIndex(t => t.id === template.id);
    
    if (existingIndex >= 0) {
      templates[existingIndex] = template;
    } else {
      templates.push(template);
    }
    
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error('Failed to save template:', error);
  }
}

/**
 * Delete template
 */
export function deleteTemplate(id: string): void {
  try {
    const templates = getAllTemplates();
    const filtered = templates.filter(t => t.id !== id);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete template:', error);
  }
}

/**
 * Create new invoice with UUID
 */
export function createNewInvoice(): InvoiceData {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `inv-${Date.now()}-${Math.random()}`,
    invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    items: [{ id: crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`, desc: '', qty: 1, rate: 0 }],
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'USD',
    taxRate: 0,
    discountRate: 0,
    notes: '',
    terms: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    theme: 'Classic',
    primaryColor: '#2563eb',
    fontFamily: 'Inter',
    backgroundColor: '#ffffff',
    logoRadius: 0,
  };
}

/**
 * Calculate invoice totals
 */
export function calculateInvoiceTotals(invoice: InvoiceData) {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const discountAmount = subtotal * (invoice.discountRate / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (invoice.taxRate / 100);
  const total = taxableAmount + taxAmount;
  
  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxAmount,
    total,
  };
}
