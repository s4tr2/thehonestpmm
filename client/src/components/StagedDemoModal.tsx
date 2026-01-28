import { AnimatePresence, motion } from "framer-motion";
import { X, Play, Loader2, Maximize, Volume2, SkipForward } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import posthog from "posthog-js";

export const StagedDemoModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    let bufferTimer: NodeJS.Timeout;
    
    if (open) {
      setIsPlaying(true);
      setBuffering(true);
      setShowPaywall(false);
      setProgress(0);
      posthog.capture('demo_modal_opened');

      // Fake buffering
      bufferTimer = setTimeout(() => {
        setBuffering(false);
      }, 2000);
    }

    return () => {
      clearTimeout(bufferTimer);
    };
  }, [open]);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (open && !buffering && isPlaying) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 42) { // Stops at 42% (Meaning of life / arbitrary stop)
            setShowPaywall(true);
            setIsPlaying(false);
            return 42;
          }
          return prev + 0.5;
        });
      }, 100);
    }

    return () => {
      clearInterval(progressInterval);
    };
  }, [open, buffering, isPlaying]);

  const handleUnlock = () => {
    posthog.capture('demo_paywall_clicked');
    window.open("https://getoden.com?utm_source=staged_demo_paywall", "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl relative aspect-video border border-zinc-800"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
              <div className="text-white font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Staged_Demo_Final_v12_REAL.mp4
              </div>
              <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Content Area */}
            <div className="w-full h-full flex items-center justify-center bg-zinc-900 relative">
              {buffering ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                  <p className="text-zinc-400 font-mono text-sm">Rendering fake data...</p>
                </div>
              ) : showPaywall ? (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center z-30">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md"
                  >
                    <h3 className="text-3xl font-bold text-white mb-4">Trial Ended</h3>
                    <p className="text-zinc-400 mb-8">
                      You have reached the limit of the free demo. To see the part where the product actually works, you need to upgrade.
                    </p>
                    <Button 
                      onClick={handleUnlock}
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 text-lg"
                    >
                      Unlock Full Demo (Book Call)
                    </Button>
                    <button 
                      onClick={onClose}
                      className="block mx-auto mt-4 text-sm text-zinc-500 hover:text-white underline"
                    >
                      I prefer imagining it works
                    </button>
                  </motion.div>
                </div>
              ) : (
                <div className="w-full h-full relative overflow-hidden">
                  {/* Fake "Perfect" UI Animation would go here - for now just a placeholder animation */}
                  <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                     <div className="w-[80%] h-[80%] bg-zinc-800 rounded-lg overflow-hidden relative shadow-2xl transform scale-95 border border-zinc-700">
                        {/* Fake Header */}
                        <div className="h-12 bg-zinc-900 border-b border-zinc-700 flex items-center px-4 gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        {/* Fake Content - Moving Parts */}
                        <div className="p-8">
                           <div className="h-32 bg-zinc-700/50 rounded-lg mb-4 animate-pulse w-full"></div>
                           <div className="grid grid-cols-3 gap-4">
                              <div className="h-24 bg-zinc-700/30 rounded-lg animate-pulse delay-75"></div>
                              <div className="h-24 bg-zinc-700/30 rounded-lg animate-pulse delay-150"></div>
                              <div className="h-24 bg-zinc-700/30 rounded-lg animate-pulse delay-200"></div>
                           </div>
                        </div>
                        {/* Cursor moving around */}
                        <motion.div 
                           animate={{ x: [0, 200, 100, 300], y: [0, 100, 200, 50] }}
                           transition={{ duration: 4, repeat: Infinity }}
                           className="absolute top-20 left-20 pointer-events-none"
                        >
                           <svg className="w-6 h-6 text-white drop-shadow-md fill-black" viewBox="0 0 24 24"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-5.4 3.42 7.76c.14.33.56.48.88.33l2.67-1.18c.32-.14.47-.56.33-.88l-3.42-7.76h6.77c.45 0 .67-.54.35-.85L5.5 3.21z"/></svg>
                        </motion.div>
                     </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent flex items-end p-4 z-20">
              <div className="w-full flex items-center gap-4 text-white">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-primary transition-colors">
                  <Play className={`w-5 h-5 ${isPlaying ? 'fill-current' : ''}`} />
                </button>
                <div className="text-xs font-mono text-zinc-400">00:0{Math.floor(progress/10)} / 99:99</div>
                
                {/* Progress Bar */}
                <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden relative group cursor-pointer">
                  <div 
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center gap-3 text-zinc-400">
                   <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
                   <Maximize className="w-4 h-4 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};