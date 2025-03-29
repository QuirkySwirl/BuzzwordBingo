import { useState } from "react";
import { FaTwitter, FaLinkedin, FaCopy, FaDownload, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeTab, setActiveTab] = useState<'social' | 'image'>('social');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const { toast } = useToast();

  const handleCopyText = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(shareText);
      
      // Show success animation
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 2000);
      
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
  
  const shareToWhatsapp = async () => {
    const text = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };
  
  const shareToTelegram = async () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(shareText);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
  };
  
  const shareByEmail = async () => {
    const subject = encodeURIComponent("Check out my Corporate Buzzword Bingo card!");
    const body = encodeURIComponent(shareText);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleShareImage = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsSharing(true);
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "rgba(15, 23, 42, 1)", // Dark background
        scale: 2, // Higher resolution
      });
      
      const imgData = canvas.toDataURL("image/png");
      
      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "corporate-buzzword-bingo.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success animation
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 2000);
      
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
      <DialogContent 
        className="sm:max-w-md glass border-indigo-500/20 text-indigo-100 p-0 overflow-hidden"
        aria-describedby="share-modal-description"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-indigo-900/80 opacity-80" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        </div>
        
        <DialogHeader className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 p-6 border-b border-indigo-500/20">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-indigo-100 to-purple-100 text-transparent bg-clip-text">
            Share Your Bingo Card
          </DialogTitle>
          <p id="share-modal-description" className="sr-only">Share your bingo card via text or as an image to social media or download it.</p>
        </DialogHeader>
        
        <div className="p-6">
          <div className="flex gap-2 mb-6">
            <button 
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'social' ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white shadow-lg' : 'text-indigo-300 hover:text-white'}`}
              onClick={() => setActiveTab('social')}
            >
              Share to Social
            </button>
            <button 
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'image' ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white shadow-lg' : 'text-indigo-300 hover:text-white'}`}
              onClick={() => setActiveTab('image')}
            >
              Save as Image
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'social' && (
              <motion.div
                key="social-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4">
                  <Label className="text-sm font-medium text-indigo-200 mb-2 block">Share Text</Label>
                  <div className="relative">
                    <Textarea 
                      className="w-full rounded-lg p-3 text-sm bg-indigo-900/30 border-indigo-500/30 text-indigo-100 placeholder:text-indigo-400/50"
                      value={shareText}
                      readOnly
                      rows={3}
                    />
                    
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8 p-0 text-indigo-300 hover:text-white hover:bg-indigo-700/50"
                      onClick={handleCopyText}
                    >
                      <FaCopy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    
                    <AnimatePresence>
                      {showSuccessAnimation && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 flex items-center justify-center bg-indigo-900/80 rounded-lg"
                        >
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: [0.8, 1.2, 1] }}
                            transition={{ duration: 0.4 }}
                            className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <Button 
                    className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white flex flex-col items-center py-5 h-auto"
                    onClick={shareToTwitter}
                    aria-label="Share to Twitter"
                  >
                    <FaTwitter className="text-xl mb-1" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button 
                    className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white flex flex-col items-center py-5 h-auto"
                    onClick={shareToLinkedIn}
                    aria-label="Share to LinkedIn"
                  >
                    <FaLinkedin className="text-xl mb-1" />
                    <span className="text-xs">LinkedIn</span>
                  </Button>
                  <Button 
                    className="bg-[#25D366] hover:bg-[#25D366]/90 text-white flex flex-col items-center py-5 h-auto"
                    onClick={shareToWhatsapp}
                    aria-label="Share to WhatsApp"
                  >
                    <FaWhatsapp className="text-xl mb-1" />
                    <span className="text-xs">WhatsApp</span>
                  </Button>
                  <Button 
                    className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white flex flex-col items-center py-5 h-auto"
                    onClick={shareToTelegram}
                    aria-label="Share to Telegram"
                  >
                    <FaTelegramPlane className="text-xl mb-1" />
                    <span className="text-xs">Telegram</span>
                  </Button>
                  <Button 
                    className="bg-[#EA4335] hover:bg-[#EA4335]/90 text-white flex flex-col items-center py-5 h-auto"
                    onClick={shareByEmail}
                    aria-label="Share via Email"
                  >
                    <MdEmail className="text-xl mb-1" />
                    <span className="text-xs">Email</span>
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white flex flex-col items-center py-5 h-auto"
                    onClick={handleCopyText}
                    disabled={isCopying}
                    aria-label="Copy text to clipboard"
                  >
                    <FaCopy className="text-xl mb-1" />
                    <span className="text-xs">{isCopying ? "Copying..." : "Copy Text"}</span>
                  </Button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'image' && (
              <motion.div
                key="image-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6 bg-indigo-900/30 rounded-lg p-4 border border-indigo-500/30">
                  <p className="text-indigo-200 text-sm mb-4">
                    Save your bingo card as an image to share on Slack, Discord, or anywhere else!
                  </p>
                  
                  <div className="relative">
                    <Button 
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-6"
                      onClick={handleShareImage}
                      disabled={isSharing}
                      aria-label="Download bingo card as image"
                      aria-busy={isSharing}
                    >
                      <div className="flex items-center justify-center">
                        <FaDownload className="mr-2 text-lg" aria-hidden="true" />
                        <span>{isSharing ? "Creating image..." : "Download Bingo Card as Image"}</span>
                      </div>
                    </Button>
                    
                    <AnimatePresence>
                      {showSuccessAnimation && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 flex items-center justify-center bg-indigo-900/80 rounded-lg"
                        >
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: [0.8, 1.2, 1] }}
                            transition={{ duration: 0.4 }}
                            className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="text-indigo-300 text-xs">
                  <p>The image will download automatically to your device.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
