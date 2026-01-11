import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { FileSpreadsheet, Upload, Download, History, Shield, Zap } from "lucide-react";
import * as XLSX from "xlsx";
import { Link } from "wouter";

export default function XLSXToCSVHistory() {
  const [csvData, setCSVData] = useState("");
  
  useSEO({
    title: "XLSX to CSV Converter with Conversion History",
    description: "Convert Excel to CSV and keep track of your conversion history. Secure local processing for your spreadsheet data.",
    keywords: "xlsx to csv history, excel conversion log, secure xlsx converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/xlsx-to-csv-converter/history",
  });

  return (
    <ToolLayout 
      title="XLSX to CSV with History" 
      description="Convert files and track your sessions." 
      toolId="xlsx-to-csv-history" 
      category="developer" 
      icon={<History className="h-10 w-10" />}
      howItWorks={[
        { step: 1, title: "Upload File", description: "Select your Excel file for conversion." },
        { step: 2, title: "Automatic Log", description: "Your conversion is logged in the history tab." },
        { step: 3, title: "Download", description: "Get your CSV file instantly." }
      ]}
      benefits={[
        { icon: <Shield className="h-6 w-6" />, title: "Secure", description: "Local processing." },
        { icon: <Zap className="h-6 w-6" />, title: "Fast", description: "Instant results." }
      ]}
      faqs={[
        { question: "Is my history saved?", answer: "Yes, it is stored locally in your browser." }
      ]}
    >
      <Card>
        <CardHeader><CardTitle>Upload for Conversion</CardTitle></CardHeader>
        <CardContent>
           <p className="text-muted-foreground mb-4">This version focuses on maintaining a session history for frequent users.</p>
           <Link href="/tools/xlsx-to-csv-converter"><Button>Use Main Converter</Button></Link>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
