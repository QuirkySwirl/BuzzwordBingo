import { useState } from "react";
import { FaTwitter, FaLinkedin, FaCopy } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareText: string;
  cardRef: React.RefObject<HTMLDivElement>;
}

export function ShareModal({ 
  isOpen, 
  onClose, 
  shareText, 
  cardRef 
}: ShareModalProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const handleCopyText = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
    } finally {
      setIsCopying(false);
    }
  };

  const shareToTwitter = async () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareToLinkedIn = async () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const handleShareImage = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsSharing(true);
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#ffffff",
        scale: 2, // Higher resolution
      });
      
      const imgData = canvas.toDataURL("image/png");
      
      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "buzzword-bingo-card.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Image downloaded",
        description: "Your bingo card has been saved as an image",
      });
    } catch (err) {
      toast({
        title: "Failed to create image",
        description: "There was an error creating the image",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Share Your Bingo Card</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <Label className="text-sm font-medium text-secondary mb-1">Share Text</Label>
            <Textarea 
              className="w-full rounded-md p-2 text-sm"
              value={shareText}
              readOnly
              rows={3}
            />
          </div>
          
          <div className="flex gap-3 mb-6">
            <Button 
              className="flex-1 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
              onClick={shareToTwitter}
            >
              <FaTwitter className="mr-2" />
              Twitter
            </Button>
            <Button 
              className="flex-1 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
              onClick={shareToLinkedIn}
            >
              <FaLinkedin className="mr-2" />
              LinkedIn
            </Button>
            <Button 
              variant="secondary"
              className="flex-1"
              onClick={handleCopyText}
              disabled={isCopying}
            >
              <FaCopy className="mr-2" />
              {isCopying ? "Copying..." : "Copy"}
            </Button>
          </div>
          
          <Button
            className="w-full mb-4"
            variant="outline"
            onClick={handleShareImage}
            disabled={isSharing}
          >
            {isSharing ? "Creating image..." : "Save as Image"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
