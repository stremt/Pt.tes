import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FolderTree, Copy, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

interface TreeNode {
  key: string;
  value: any;
  type: string;
  expanded?: boolean;
}

export default function JSONTreeViewer() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "JSON Viewer Online | Tree Format JSON Visualizer",
    description: "View JSON structure in expandable tree format offline.",
    keywords: "json viewer, json tree viewer",
    canonicalUrl: "https://tools.pixocraft.in/tools/json-tree-viewer",
  });

  const parseJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setTreeData(buildTree(parsed));
      setError("");
      toast({
        title: "Success!",
        description: "JSON parsed successfully",
      });
    } catch (e) {
      setError("Invalid JSON format");
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  const buildTree = (obj: any, parentKey = ""): TreeNode[] => {
    const nodes: TreeNode[] = [];
    
    if (typeof obj === "object" && obj !== null) {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const type = Array.isArray(value) ? "array" : typeof value;
        nodes.push({
          key,
          value,
          type,
          expanded: false,
        });
      });
    }
    
    return nodes;
  };

  const toggleNode = (index: number) => {
    const newData = [...treeData];
    newData[index].expanded = !newData[index].expanded;
    setTreeData(newData);
  };

  const renderValue = (node: TreeNode): string => {
    if (typeof node.value === "object" && node.value !== null) {
      return Array.isArray(node.value) ? `Array(${node.value.length})` : "Object";
    }
    return String(node.value);
  };

  const howItWorks = [
    { step: 1, title: "Paste JSON", description: "Enter your JSON data into the text area" },
    { step: 2, title: "Parse & View", description: "Click parse to generate the tree structure" },
    { step: 3, title: "Expand Nodes", description: "Click on nodes to expand and collapse them" },
  ];

  const benefits = [
    { icon: <FolderTree className="h-5 w-5" />, title: "Tree Structure", description: "View JSON in an expandable tree format" },
    { icon: <Copy className="h-5 w-5" />, title: "Offline", description: "Works completely offline in your browser" },
    { icon: <FolderTree className="h-5 w-5" />, title: "Visual", description: "Easy to navigate complex JSON structures" },
  ];

  const faqs = [
    {
      question: "What is a JSON tree viewer?",
      answer: "A JSON tree viewer displays JSON data in a hierarchical tree structure with expandable/collapsible nodes, making it easier to navigate complex data.",
    },
    {
      question: "Can I view large JSON files?",
      answer: "Yes, the viewer can handle large JSON files, though very large files may take longer to parse.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all processing happens in your browser. No data is sent to any server.",
    },
  ];

  return (
    <ToolLayout
      title="JSON Tree Viewer"
      description="View JSON structure in expandable tree format offline."
      icon={<FolderTree className="h-8 w-8" />}
      toolId="json-tree-viewer"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="json-input" className="text-base font-semibold">
              JSON Input
            </Label>
            <Textarea
              id="json-input"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"name": "John", "age": 30, "city": "New York"}'
              className="min-h-[200px] font-mono"
              data-testid="textarea-json-input"
            />
          </div>

          <Button
            onClick={parseJSON}
            size="lg"
            disabled={!jsonInput}
            data-testid="button-parse"
          >
            <FolderTree className="mr-2 h-5 w-5" />
            Parse & View Tree
          </Button>

          {error && (
            <p className="text-destructive text-sm" data-testid="text-error">
              {error}
            </p>
          )}
        </div>

        {treeData.length > 0 && (
          <Card className="p-6">
            <Label className="text-base font-semibold mb-4 block">Tree View</Label>
            <div className="space-y-2 font-mono text-sm" data-testid="tree-view">
              {treeData.map((node, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 hover-elevate p-2 rounded">
                    {typeof node.value === "object" && node.value !== null && (
                      <button
                        onClick={() => toggleNode(index)}
                        className="p-1"
                        data-testid={`button-toggle-${index}`}
                      >
                        {node.expanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    )}
                    <span className="text-primary font-semibold">{node.key}:</span>
                    <span className="text-muted-foreground">
                      {renderValue(node)}
                    </span>
                  </div>
                  {node.expanded && typeof node.value === "object" && node.value !== null && (
                    <div className="ml-8 pl-4 border-l-2 border-border">
                      <pre className="text-xs text-muted-foreground">
                        {JSON.stringify(node.value, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
