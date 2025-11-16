import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface FeedbackButtonProps {
  toolName?: string;
}

export function FeedbackButton({ toolName }: FeedbackButtonProps) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState(
    toolName ? `Feedback for ${toolName}` : "Feedback for Pixocraft Tools"
  );
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(message);
    const mailtoLink = `mailto:support@pixocraft.in?subject=${emailSubject}&body=${emailBody}`;
    
    window.location.href = mailtoLink;
    setOpen(false);
    
    // Reset form
    setTimeout(() => {
      setSubject(toolName ? `Feedback for ${toolName}` : "Feedback for Pixocraft Tools");
      setMessage("");
    }, 300);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
            data-testid="button-feedback-floating"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]" data-testid="dialog-feedback">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Send Feedback
            </DialogTitle>
            <DialogDescription>
              Found an issue or have a suggestion? We'd love to hear from you!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="feedback-subject">Subject</Label>
              <Input
                id="feedback-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What's this about?"
                data-testid="input-feedback-subject"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback-message">Message</Label>
              <Textarea
                id="feedback-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us your feedback, report a bug, or share your ideas..."
                rows={6}
                data-testid="textarea-feedback-message"
              />
              <p className="text-xs text-muted-foreground">
                Your default email app will open to send this message to{" "}
                <span className="font-semibold text-foreground">support@pixocraft.in</span>
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="text-sm font-semibold">💡 Quick Tips:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Be specific about the tool or feature</li>
                <li>• Include screenshots if reporting a bug</li>
                <li>• Suggestions are always welcome!</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              data-testid="button-feedback-cancel"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={!message.trim()}
              className="flex-1"
              data-testid="button-feedback-send"
            >
              <Send className="h-4 w-4 mr-2" />
              Send via Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
