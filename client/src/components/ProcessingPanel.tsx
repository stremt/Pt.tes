import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Download, X, Check, AlertCircle, Loader2 } from "lucide-react";
import { FileQueueItem } from "@/hooks/useFileQueue";

interface ProcessingPanelProps {
  items: FileQueueItem[];
  onRemove: (id: string) => void;
  onDownload?: (item: FileQueueItem) => void;
  showPreview?: boolean;
  formatFileSize?: (bytes: number) => string;
}

export function ProcessingPanel({ 
  items, 
  onRemove, 
  onDownload,
  showPreview = false,
  formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  }
}: ProcessingPanelProps) {
  if (items.length === 0) {
    return null;
  }

  const getStatusIcon = (status: FileQueueItem['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: FileQueueItem['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-600">Completed</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'processing':
        return <Badge variant="default">Processing</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-4" data-testid="processing-panel">
      {items.map((item) => (
        <Card key={item.id} data-testid={`file-item-${item.id}`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(item.status)}
                  <CardTitle className="text-base truncate">{item.file.name}</CardTitle>
                </div>
                <CardDescription className="flex items-center gap-2 flex-wrap">
                  <span>{formatFileSize(item.file.size)}</span>
                  {getStatusBadge(item.status)}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {item.status === 'completed' && item.result && onDownload && (
                  <Button
                    size="sm"
                    onClick={() => onDownload(item)}
                    data-testid={`button-download-${item.id}`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(item.id)}
                  data-testid={`button-remove-${item.id}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {item.status === 'processing' && item.progress !== undefined && (
            <CardContent className="pt-0">
              <div className="space-y-2">
                <Progress value={item.progress * 100} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {Math.round(item.progress * 100)}% complete
                </p>
              </div>
            </CardContent>
          )}

          {item.error && (
            <CardContent className="pt-0">
              <p className="text-sm text-destructive">{item.error}</p>
            </CardContent>
          )}

          {showPreview && item.preview && (
            <CardContent className="pt-0">
              <div className="rounded-md overflow-hidden bg-muted">
                <img 
                  src={item.preview} 
                  alt="Preview" 
                  className="w-full h-32 object-contain"
                  data-testid={`preview-${item.id}`}
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
