import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileSpreadsheet, Upload, Download, X, Search, Filter, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { readExcelFile, type SheetData } from "@/lib/spreadsheet-utils";
import { Link } from "wouter";

export default function ExcelViewerNoSoftware() {
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Open Excel Files Online Without Software - Free XLSX Viewer",
    description: "Open and view Excel XLSX files in your browser without Microsoft Office or any software installation. Quick, free, and secure XLSX viewer.",
    keywords: "open excel without office, view xlsx online no software, free excel opener, browser based excel viewer",
    canonicalUrl: "https://tools.pixocraft.in/tools/excel-viewer/no-software",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await readExcelFile(file);
      setSheets(data);
      setFileName(file.name);
    } catch (err) {
      toast({ title: "Error", description: "Failed to open file", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">View Excel Without Software</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Open XLSX File</CardTitle>
            <CardDescription>No Microsoft Office required. Works in any modern browser.</CardDescription>
          </CardHeader>
          <CardContent>
            {!sheets.length ? (
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <input type="file" onChange={handleFileUpload} className="block w-full text-sm mt-4" accept=".xlsx,.xls" />
              </div>
            ) : (
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-bold">File: {fileName}</p>
                <p>{sheets.length} sheets detected. <Link href="/tools/excel-viewer" className="text-primary underline">Open in Full Editor</Link> to view data.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
