import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";

export function VersionUpdatePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has seen the "fixed" popup before
    const hasSeenPopup = localStorage.getItem("temp_mail_fixed_popup_seen");
    
    // Always show if they haven't "cleared data" (which sets this to true)
    if (hasSeenPopup !== "true") {
      setIsOpen(true);
    }
  }, []);

  const handleRefresh = () => {
    // Clear site data to ensure fresh start
    localStorage.clear();
    sessionStorage.clear();

    // Mark as seen AFTER clearing, so it persists in the fresh state
    localStorage.setItem("temp_mail_fixed_popup_seen", "true");
    
    // Unregister service workers if any
    if (window.navigator && window.navigator.serviceWorker) {
      window.navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    // Full reload
    window.location.reload();
  };

  const handleClose = () => {
    // We want it to open always until they click "Clear Data"
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Updates Available
          </DialogTitle>
          <DialogDescription className="pt-2">
            New features and fixes are here! Check out our new **Text to File** tool.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm text-muted-foreground">
          To ensure you get all the latest improvements and bug fixes, please click the refresh button below. This will update the website to the latest version.
        </div>
        <DialogFooter>
          <Button 
            onClick={handleRefresh} 
            className="w-full flex items-center gap-2"
            data-testid="button-refresh-app"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh & Clear Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
