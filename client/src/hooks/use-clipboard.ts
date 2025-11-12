import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useClipboard() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, successMessage?: string) => {
    // Check if clipboard API is available
    if (!navigator.clipboard) {
      // Fallback for non-HTTPS or unsupported browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textArea);
        
        if (success) {
          setCopied(true);
          toast({
            title: "Copied!",
            description: successMessage || "Content copied to clipboard",
          });
          setTimeout(() => setCopied(false), 2000);
          return true;
        } else {
          throw new Error("Copy command failed");
        }
      } catch (error) {
        toast({
          title: "Failed to copy",
          description: "Please copy manually",
          variant: "destructive",
        });
        return false;
      }
    }

    // Modern clipboard API
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: successMessage || "Content copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
      return false;
    }
  };

  return { copyToClipboard, copied };
}
