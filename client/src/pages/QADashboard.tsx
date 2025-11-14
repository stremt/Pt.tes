import { useState, useEffect } from "react";
import { useSEO } from "@/lib/seo";
import { tools } from "@/lib/tools";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, AlertTriangle, Clock, FileCheck, Bug, Sparkles, Search, Download } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";

type TestStatus = "pending" | "in-progress" | "passed" | "failed" | "needs-improvement";
type IssueSeverity = "critical" | "high" | "medium" | "low";

interface ToolTest {
  toolId: string;
  status: TestStatus;
  testedAt?: number;
  issues: ToolIssue[];
  notes: string;
}

interface ToolIssue {
  id: string;
  severity: IssueSeverity;
  description: string;
  stepsToReproduce: string;
  fixedAt?: number;
}

const TEST_CHECKLISTS = {
  text: [
    "Input accepts text, special characters, emojis, long text",
    "Output is correct and formatted properly",
    "Copy-to-clipboard button works",
    "Clear/Reset button functions",
    "Error handling for empty input",
    "Mobile responsive layout",
    "Loading states (if applicable)",
  ],
  image: [
    "Upload multiple image formats (JPG, PNG, WebP)",
    "File size limits handled gracefully",
    "Preview displays correctly",
    "Download functionality works",
    "Processing is fast and accurate",
    "Error messages for invalid files",
    "Mobile upload functionality",
  ],
  pdf: [
    "Upload PDF files successfully",
    "Multi-page PDFs handled",
    "Download output works",
    "Error handling for encrypted/corrupted PDFs",
    "Processing speed is acceptable",
    "Mobile compatibility",
  ],
  calculator: [
    "Test with edge cases (0, negative, decimals, huge numbers)",
    "Validation for required inputs",
    "Results are mathematically accurate",
    "Clear/Reset functionality",
    "Mobile number input works",
    "Error messages for invalid inputs",
  ],
  generator: [
    "Generate button works instantly",
    "Output is random/unique on each click",
    "Copy-to-clipboard works",
    "Regenerate functionality",
    "No console errors",
    "Mobile responsive",
  ],
  converter: [
    "Bidirectional conversion works",
    "Accurate conversion results",
    "Handles edge cases",
    "Input validation",
    "Clear error messages",
    "Mobile friendly",
  ],
};

export default function QADashboard() {
  useSEO({
    title: "QA Testing Dashboard - Pixocraft Tools",
    description: "Comprehensive QA testing dashboard for all 207+ tools",
  });

  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();
  
  const [testData, setTestData] = useState<Record<string, ToolTest>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<TestStatus | "all">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({ severity: "medium" as IssueSeverity, description: "", stepsToReproduce: "" });

  useEffect(() => {
    const saved = localStorage.getItem("qa-test-data");
    if (saved) {
      setTestData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("qa-test-data", JSON.stringify(testData));
  }, [testData]);

  const updateToolStatus = (toolId: string, status: TestStatus) => {
    setTestData(prev => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        toolId,
        status,
        testedAt: Date.now(),
        issues: prev[toolId]?.issues || [],
        notes: prev[toolId]?.notes || "",
      }
    }));
  };

  const addIssue = (toolId: string) => {
    if (!newIssue.description.trim()) {
      toast({ title: "Error", description: "Please provide issue description", variant: "destructive" });
      return;
    }

    const issue: ToolIssue = {
      id: Date.now().toString(),
      ...newIssue,
    };

    setTestData(prev => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        toolId,
        status: "failed",
        issues: [...(prev[toolId]?.issues || []), issue],
        notes: prev[toolId]?.notes || "",
      }
    }));

    setNewIssue({ severity: "medium", description: "", stepsToReproduce: "" });
    setIssueDialogOpen(false);
    toast({ title: "Issue Added", description: "Bug has been logged for this tool" });
  };

  const markIssueFixed = (toolId: string, issueId: string) => {
    setTestData(prev => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        issues: prev[toolId].issues.map(issue =>
          issue.id === issueId ? { ...issue, fixedAt: Date.now() } : issue
        ),
      }
    }));
  };

  const updateNotes = (toolId: string, notes: string) => {
    setTestData(prev => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        toolId,
        status: prev[toolId]?.status || "pending",
        issues: prev[toolId]?.issues || [],
        notes,
      }
    }));
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || testData[tool.id]?.status === filterStatus || (!testData[tool.id] && filterStatus === "pending");
    const matchesCategory = filterCategory === "all" || tool.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: tools.length,
    pending: tools.filter(t => !testData[t.id] || testData[t.id].status === "pending").length,
    inProgress: tools.filter(t => testData[t.id]?.status === "in-progress").length,
    passed: tools.filter(t => testData[t.id]?.status === "passed").length,
    failed: tools.filter(t => testData[t.id]?.status === "failed").length,
    needsImprovement: tools.filter(t => testData[t.id]?.status === "needs-improvement").length,
    totalIssues: Object.values(testData).reduce((sum, t) => sum + t.issues.length, 0),
    criticalIssues: Object.values(testData).reduce((sum, t) => sum + t.issues.filter(i => i.severity === "critical" && !i.fixedAt).length, 0),
  };

  const progress = ((stats.passed + stats.failed + stats.needsImprovement) / stats.total) * 100;

  const categories = Array.from(new Set(tools.map(t => t.category)));

  const getStatusBadge = (status?: TestStatus) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", className: "" },
      "in-progress": { variant: "default" as const, icon: FileCheck, text: "Testing", className: "" },
      passed: { variant: "default" as const, icon: CheckCircle, text: "Passed", className: "bg-green-600 hover:bg-green-700" },
      failed: { variant: "destructive" as const, icon: XCircle, text: "Failed", className: "" },
      "needs-improvement": { variant: "default" as const, icon: Sparkles, text: "Needs Polish", className: "bg-yellow-600 hover:bg-yellow-700" },
    };
    const config = variants[status || "pending"];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      stats,
      tools: tools.map(tool => ({
        id: tool.id,
        name: tool.name,
        category: tool.category,
        status: testData[tool.id]?.status || "pending",
        issues: testData[tool.id]?.issues || [],
        notes: testData[tool.id]?.notes || "",
      })),
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qa-report-${Date.now()}.json`;
    a.click();
    toast({ title: "Report Exported", description: "QA testing report downloaded successfully" });
  };

  const selectedToolData = selectedTool ? tools.find(t => t.id === selectedTool) : null;
  const selectedTestData = selectedTool ? testData[selectedTool] : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">QA Testing Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive testing system for all 207+ Pixocraft Tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Overall Progress</CardDescription>
            <CardTitle className="text-3xl">{Math.round(progress)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">{stats.passed + stats.failed + stats.needsImprovement} / {stats.total} tested</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Status Breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <div className="flex justify-between"><span>✅ Passed:</span> <strong>{stats.passed}</strong></div>
            <div className="flex justify-between"><span>❌ Failed:</span> <strong>{stats.failed}</strong></div>
            <div className="flex justify-between"><span>🔧 Needs Work:</span> <strong>{stats.needsImprovement}</strong></div>
            <div className="flex justify-between"><span>⏳ Testing:</span> <strong>{stats.inProgress}</strong></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Issues Tracker</CardDescription>
            <CardTitle className="text-3xl">{stats.totalIssues}</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.criticalIssues > 0 && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {stats.criticalIssues} critical issues
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Total bugs logged</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Actions</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button onClick={exportReport} variant="outline" size="sm" data-testid="button-export-report">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={() => setTestData({})} variant="outline" size="sm" data-testid="button-reset-data">
              Reset All Data
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as TestStatus | "all")}>
              <SelectTrigger data-testid="select-status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger data-testid="select-category-filter">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {filteredTools.map((tool) => {
          const test = testData[tool.id];
          const openIssues = test?.issues.filter(i => !i.fixedAt) || [];
          
          return (
            <Card key={tool.id} className="hover-elevate">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      {getStatusBadge(test?.status)}
                      {openIssues.length > 0 && (
                        <Badge variant="destructive">
                          <Bug className="w-3 h-3 mr-1" />
                          {openIssues.length}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-muted rounded">{tool.category}</span>
                      <span className="text-xs">{tool.path}</span>
                    </CardDescription>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(tool.path, "_blank")}
                    data-testid={`button-open-${tool.id}`}
                  >
                    Open Tool
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={test?.status === "in-progress" ? "default" : "outline"}
                    onClick={() => updateToolStatus(tool.id, "in-progress")}
                    data-testid={`button-testing-${tool.id}`}
                  >
                    Start Testing
                  </Button>
                  <Button
                    size="sm"
                    variant={test?.status === "passed" ? "default" : "outline"}
                    onClick={() => updateToolStatus(tool.id, "passed")}
                    data-testid={`button-pass-${tool.id}`}
                  >
                    Mark as Passed
                  </Button>
                  <Button
                    size="sm"
                    variant={test?.status === "needs-improvement" ? "default" : "outline"}
                    onClick={() => updateToolStatus(tool.id, "needs-improvement")}
                    data-testid={`button-improve-${tool.id}`}
                  >
                    Needs Improvement
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedTool(tool.id);
                      setIssueDialogOpen(true);
                    }}
                    data-testid={`button-log-issue-${tool.id}`}
                  >
                    <Bug className="w-4 h-4 mr-1" />
                    Log Issue
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
                    data-testid={`button-details-${tool.id}`}
                  >
                    {selectedTool === tool.id ? "Hide" : "Show"} Details
                  </Button>
                </div>

                {selectedTool === tool.id && (
                  <div className="space-y-4 border-t pt-4">
                    <Tabs defaultValue="checklist">
                      <TabsList>
                        <TabsTrigger value="checklist">Test Checklist</TabsTrigger>
                        <TabsTrigger value="issues">Issues ({openIssues.length})</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="checklist" className="space-y-2">
                        {(TEST_CHECKLISTS[tool.category as keyof typeof TEST_CHECKLISTS] || TEST_CHECKLISTS.text).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <Checkbox id={`check-${tool.id}-${idx}`} />
                            <label htmlFor={`check-${tool.id}-${idx}`} className="cursor-pointer">{item}</label>
                          </div>
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="issues" className="space-y-3">
                        {openIssues.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No open issues</p>
                        ) : (
                          openIssues.map(issue => (
                            <Card key={issue.id} className="bg-muted/50">
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <Badge variant={issue.severity === "critical" ? "destructive" : "secondary"}>
                                      {issue.severity.toUpperCase()}
                                    </Badge>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => markIssueFixed(tool.id, issue.id)}
                                  >
                                    Mark Fixed
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                <div>
                                  <strong>Description:</strong>
                                  <p className="text-muted-foreground mt-1">{issue.description}</p>
                                </div>
                                {issue.stepsToReproduce && (
                                  <div>
                                    <strong>Steps to Reproduce:</strong>
                                    <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{issue.stepsToReproduce}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </TabsContent>
                      
                      <TabsContent value="notes">
                        <Textarea
                          placeholder="Add testing notes, observations, or recommendations..."
                          value={test?.notes || ""}
                          onChange={(e) => updateNotes(tool.id, e.target.value)}
                          rows={4}
                          data-testid={`textarea-notes-${tool.id}`}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No tools match your filters. Try adjusting your search or filters.
          </CardContent>
        </Card>
      )}

      <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log New Issue</DialogTitle>
            <DialogDescription>
              Document a bug or problem found in {selectedToolData?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Severity</label>
              <Select value={newIssue.severity} onValueChange={(v) => setNewIssue({...newIssue, severity: v as IssueSeverity})}>
                <SelectTrigger data-testid="select-issue-severity">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">🔴 Critical - App Breaking</SelectItem>
                  <SelectItem value="high">🟠 High - Major Feature Broken</SelectItem>
                  <SelectItem value="medium">🟡 Medium - Minor Bug</SelectItem>
                  <SelectItem value="low">🟢 Low - Polish/UX Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe the issue..."
                value={newIssue.description}
                onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                rows={3}
                data-testid="textarea-issue-description"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Steps to Reproduce</label>
              <Textarea
                placeholder="1. Go to...\n2. Click on...\n3. Expected vs Actual..."
                value={newIssue.stepsToReproduce}
                onChange={(e) => setNewIssue({...newIssue, stepsToReproduce: e.target.value})}
                rows={4}
                data-testid="textarea-issue-steps"
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIssueDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => selectedTool && addIssue(selectedTool)} data-testid="button-save-issue">
                Save Issue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
