import { useState, useEffect } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Wallet, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState<string>("food");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useSEO({
    title: "Daily Expense Tracker | Offline Money Log (No Signup) | Pixocraft Tools",
    description: "Track expenses daily with a clean, offline tool. No signup, no cloud — your data stays private.",
    keywords: "expense tracker, daily expense app, offline budget tool, money tracker",
    canonicalUrl: "https://tools.pixocraft.in/tools/expense-tracker",
  });

  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  const addExpense = () => {
    if (!description || !amount) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      date,
      category,
      description,
      amount: parseFloat(amount),
    };

    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    localStorage.setItem('expenses', JSON.stringify(updated));

    setDescription("");
    setAmount("");
  };

  const deleteExpense = (id: string) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    localStorage.setItem('expenses', JSON.stringify(updated));
  };

  const getTotalByCategory = (cat: string) => {
    return expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0);
  };

  const getTotal = () => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  };

  const howItWorks = [
    { step: 1, title: "Add Expense", description: "Enter category, description, and amount" },
    { step: 2, title: "Track Daily", description: "All data saved locally in your browser" },
    { step: 3, title: "View Summary", description: "See totals by category and overall" },
  ];

  const benefits = [
    { icon: <Wallet className="h-5 w-5" />, title: "100% Offline", description: "Data never leaves your device" },
    { icon: <Wallet className="h-5 w-5" />, title: "No Signup", description: "Start tracking instantly" },
    { icon: <Wallet className="h-5 w-5" />, title: "Private", description: "No cloud, no tracking" },
  ];

  const faqs = [
    { question: "Is my data safe?", answer: "Yes! All data is stored locally in your browser. Nothing is uploaded to any server." },
    { question: "Can I use this across devices?", answer: "No, since data is stored locally, it stays on the device you're using." },
    { question: "Can I export my data?", answer: "Currently, data is viewable in the app. Export feature may be added in future updates." },
  ];

  return (
    <ToolLayout
      title="Daily Expense Tracker"
      description="Track expenses daily with a clean, offline tool. No signup, no cloud — your data stays private."
      icon={<Wallet className="h-8 w-8" />}
      toolId="expense-tracker"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Add New Expense</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} data-testid="input-date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" data-testid="select-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="bills">Bills</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Lunch" data-testid="input-description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="50" data-testid="input-amount" />
              </div>
            </div>
            <Button onClick={addExpense} className="w-full" data-testid="button-add-expense">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Food</p>
                <p className="text-xl font-bold">${getTotalByCategory('food').toFixed(2)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Transport</p>
                <p className="text-xl font-bold">${getTotalByCategory('transport').toFixed(2)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Shopping</p>
                <p className="text-xl font-bold">${getTotalByCategory('shopping').toFixed(2)}</p>
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
              <p className="text-3xl font-bold text-primary" data-testid="text-total">${getTotal().toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Expenses</h3>
            <div className="space-y-2">
              {expenses.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No expenses yet. Add your first expense above!</p>
              ) : (
                expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-muted rounded-lg" data-testid={`expense-${expense.id}`}>
                    <div className="flex-1">
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">{expense.date} • {expense.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold">${expense.amount.toFixed(2)}</p>
                      <Button variant="ghost" size="sm" onClick={() => deleteExpense(expense.id)} data-testid={`button-delete-${expense.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
