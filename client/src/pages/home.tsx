import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Play, Zap, Shield, TrendingUp, Target, Globe, Users, Layers, Menu, X, ChevronRight, ChevronLeft, BarChart3, Lock, Search, Bell, LayoutDashboard, PieChart, Folder, FileText, Settings, Flag, MousePointer2, MessageSquare, Star, MessageCircle, AlertTriangle, Workflow, ExternalLink, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StagedDemoModal } from "@/components/StagedDemoModal";
import posthog from "posthog-js";

// --- Components ---

const Navbar = ({ onLoginClick, onScheduleClick, onDontClick }: { onLoginClick: () => void, onScheduleClick: () => void, onDontClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    posthog.capture('login_attempt_broken');
    onLoginClick();
  };

  const handleScheduleDemo = () => {
    posthog.capture('schedule_demo_navbar');
    onScheduleClick();
  };

  const handleDontClick = () => {
    posthog.capture('dont_click_navbar');
    onDontClick();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 border-b ${scrolled ? 'bg-white/80 backdrop-blur-xl border-border/60 shadow-sm' : 'bg-transparent border-transparent'}`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display text-xl font-bold tracking-tight flex items-center gap-2 text-primary cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-foreground">NameIsLogo</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground" asChild>
              <a href="#vaporware">Product</a>
            </Button>
            <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground" asChild>
              <a href="#extortion">Pricing</a>
            </Button>
            <div className="h-4 w-px bg-border mx-2" />
            <Link href="/careers">
              <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Jobs
              </Button>
            </Link>
            <div className="flex items-center gap-1 bg-secondary/30 rounded-lg p-0.5 border border-border/50">
              <Link href="/launch-simulator">
                <Button variant="ghost" size="sm" className="h-7 text-xs font-medium text-green-600 hover:text-green-700 hover:bg-white shadow-sm">
                   Sim
                </Button>
              </Link>
              <Link href="/buzzword-blaster">
                <Button variant="ghost" size="sm" className="h-7 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-white shadow-sm">
                   Blaster
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" onClick={handleLoginClick} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Login
          </Button>
          <Button onClick={handleScheduleDemo} className="h-9 px-4 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 transition-all hover:scale-[1.02]">
            Schedule a Demo
          </Button>
        </div>

        <button className="md:hidden p-2 text-muted-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-border shadow-xl p-6 flex flex-col gap-4"
          >
             <a href="#vaporware" className="text-base font-medium text-foreground py-2 border-b border-border/50" onClick={() => setMobileMenuOpen(false)}>Product</a>
             <a href="#extortion" className="text-base font-medium text-foreground py-2 border-b border-border/50" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
             <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-foreground py-2 border-b border-border/50">Jobs</Link>
             
             <div className="grid grid-cols-2 gap-3 py-2">
               <Link href="/launch-simulator" onClick={() => setMobileMenuOpen(false)}>
                 <div className="flex flex-col items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 text-center cursor-pointer active:scale-95 transition-transform">
                   <Zap className="w-5 h-5 text-green-600" />
                   <span className="text-xs font-bold text-green-700">Launch Sim</span>
                 </div>
               </Link>
               <Link href="/buzzword-blaster" onClick={() => setMobileMenuOpen(false)}>
                 <div className="flex flex-col items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-center cursor-pointer active:scale-95 transition-transform">
                   <Target className="w-5 h-5 text-blue-600" />
                   <span className="text-xs font-bold text-blue-700">Buzzword Blaster</span>
                 </div>
               </Link>
             </div>

            <div className="flex flex-col gap-3 mt-2">
              <Button variant="outline" onClick={() => { handleLoginClick(); setMobileMenuOpen(false); }} className="w-full justify-center">Login</Button>
              <Button onClick={() => { handleScheduleDemo(); setMobileMenuOpen(false); }} className="w-full justify-center">Schedule a Demo</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Annotation = ({ text, className = "" }: { text: string, className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setDisplayedText("");
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayedText("");
    }
  }, [isHovered, text]);

  return (
    <div 
      className={`hidden lg:flex absolute z-40 items-center gap-2 group cursor-help ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm animate-pulse" />
        <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping opacity-20" />
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95 backdrop-blur shadow-lg border border-border/50 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground max-w-[200px]"
          >
            <span className="font-bold text-red-500 mr-1">CEO:</span> 
            {displayedText}
            <span className="animate-pulse">|</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BentoCard = ({ title, description, icon: Icon, className = "", children, colSpan = "col-span-1" }: any) => (
  <div className={`${colSpan} group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
      {description}
    </p>
    <div className="relative z-10">
      {children}
    </div>
    
    {/* Subtle gradient background effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </div>
);

// --- Easter Egg Components ---

const useKonamiCode = () => {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let index = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) {
          posthog.capture('konami_code_triggered');
          setTriggered(true);
          index = 0;
        }
      } else {
        index = 0; // Reset if miss
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return [triggered, setTriggered] as const;
};

const AcquisitionModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const handleAccept = () => {
    posthog.capture('acquisition_accepted');
    onClose();
  };

  const handleHoldOut = () => {
    posthog.capture('acquisition_hold_out');
    onClose();
  };

  return (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center border-4 border-green-500 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600" />
          <h2 className="text-3xl font-black mb-4 tracking-tight text-foreground">🎉 ACQUISITION OFFER!</h2>
          <p className="text-lg mb-6 text-muted-foreground">
            <span className="font-bold text-foreground">Big Tech Corp™</span> wants to acquire NameIsLogo for <span className="font-black text-green-600 text-2xl block mt-2">$1,000,000,000</span> <span className="text-xs text-muted-foreground">(in non-voting shares)</span>
          </p>
          <div className="flex flex-col gap-3 justify-center">
            <Button onClick={handleAccept} size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full text-lg font-bold shadow-lg shadow-green-500/20">
              Accept Offer
            </Button>
            <Button variant="ghost" onClick={handleHoldOut} className="text-muted-foreground text-xs hover:text-foreground">
              Hold out for $2B (Greedy)
            </Button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  );
};

const LoginErrorModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const handleAction = (action: string) => {
    posthog.capture('login_error_action', { action });
    onClose();
  };

  return (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black max-w-sm w-full overflow-hidden"
        >
          {/* Header Bar */}
          <div className="bg-red-500 p-3 border-b-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide uppercase">
              <AlertTriangle className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>System Failure</span>
            </div>
            <button onClick={onClose} className="hover:bg-red-600 rounded p-1 transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="p-6">
            <h2 className="text-xl font-black mb-3 font-display">Login unavailable</h2>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              We are currently pivoting to a PLG motion (Product-Led Growth), which means we deleted the login page to reduce friction.
            </p>
            
            <div className="space-y-3">
               <Button onClick={() => handleAction('pay_first')} className="w-full bg-black hover:bg-gray-800 text-white font-bold border-2 border-transparent">
                Understood, I'll pay first
              </Button>
              <Button onClick={() => handleAction('investor')} variant="outline" className="w-full border-2 border-black font-bold hover:bg-gray-100">
                Wait, I'm an investor
              </Button>
               <div className="flex gap-2">
                 <Button 
                  onClick={() => {
                    posthog.capture('login_error_share_twitter');
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I'm trying to login to @thehonestpmm but they deleted the login page to 'reduce friction'. Genius. #PLG #Growth")}&url=${encodeURIComponent("https://thehonestpmm.com")}`, '_blank');
                  }}
                  variant="ghost" 
                  className="flex-1 text-xs text-muted-foreground hover:text-blue-500 border border-border/50"
                >
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X
                  </span>
                </Button>
                 <Button 
                  onClick={() => {
                    posthog.capture('login_error_share_linkedin');
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://thehonestpmm.com")}`, '_blank');
                  }}
                  variant="ghost" 
                  className="flex-1 text-xs text-muted-foreground hover:text-blue-700 border border-border/50"
                >
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </span>
                </Button>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  );
};

const DemoCalendarModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const handleNextAvailable = () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 47);
    setCurrentMonth(future);
    posthog.capture('calendar_jump_future');
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-border"
          >
            <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/20">
              <h3 className="font-bold text-lg">Schedule a Demo</h3>
              <button onClick={onClose} className="p-1 hover:bg-secondary rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                 <button className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50" disabled>
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <div className="font-bold text-lg">
                   {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                 </div>
                 <button onClick={handleNextMonth} className="p-1 text-foreground hover:bg-secondary rounded">
                   <ChevronRight className="w-5 h-5" />
                 </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold text-muted-foreground uppercase">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-6">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="aspect-square flex items-center justify-center relative group">
                    <button 
                      disabled 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-secondary/50 text-muted-foreground/40 cursor-not-allowed group-hover:bg-red-50 group-hover:text-red-300 transition-colors"
                    >
                      {i + 1}
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 hidden md:block">
                      {['Booked by VC', 'Golf with Board', 'Pivot Strategy', 'Nap Time', 'Thinking about AI'][i % 5]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 text-red-800 text-xs rounded-lg border border-red-100">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    <strong>High Demand:</strong> Due to an unexpected viral tweet, our sales team is currently booked until 2073.
                  </p>
                </div>
                
                <Button onClick={handleNextAvailable} className="w-full" variant="outline">
                   Jump to next available slot (2073)
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      posthog.capture('calendar_share_twitter');
                       window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Just tried to book a demo with @thehonestpmm and their sales team is fully booked until 2073. Bullish. #SaaS")}&url=${encodeURIComponent("https://thehonestpmm.com")}`, '_blank');
                    }}
                    variant="ghost" 
                    className="flex-1 text-xs text-muted-foreground hover:text-blue-500 border border-border/50"
                  >
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      Shame on X
                    </span>
                  </Button>
                  <Button 
                    onClick={() => {
                      posthog.capture('calendar_share_linkedin');
                       window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://thehonestpmm.com")}`, '_blank');
                    }}
                    variant="ghost" 
                    className="flex-1 text-xs text-muted-foreground hover:text-blue-700 border border-border/50"
                  >
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      Post on LinkedIn
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DontClickModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) {
      setStep(0);
      posthog.capture('dont_click_triggered');
    }
  }, [open]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const content = [
    {
      title: "I told you not to click.",
      body: "This button was clearly labeled. It wasn't reverse psychology. It was a direct instruction.",
      btn: "I'm sorry, I'll stop"
    },
    {
      title: "You're still clicking?",
      body: "You have a serious problem with authority. Is this how you manage your product roadmap too? Just ignoring clear warning signs?",
      btn: "Ouch. Continue."
    },
    {
      title: "Okay, fine. You win.",
      body: "Since you have so much free time to click forbidden buttons, you obviously need better tools to manage your actual work.",
      btn: "Show me the goods"
    }
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
            className="bg-zinc-900 border-2 border-red-500 text-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden relative"
          >
             {/* Hazard Stripes */}
            <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#facc15_10px,#facc15_20px)]" />
            
            <button onClick={onClose} className="absolute top-6 right-4 text-zinc-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 pt-10 text-center">
              {step < 3 ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6 border-2 border-red-500 text-red-500">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black mb-4 font-display uppercase tracking-wide text-red-500">{content[step].title}</h2>
                  <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                    {content[step].body}
                  </p>
                  <Button onClick={handleNext} className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-12 text-base">
                    {content[step].btn}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center mx-auto mb-6 border-2 border-yellow-400 text-yellow-400">
                    <Zap className="w-8 h-8 fill-current" />
                  </div>
                  <h2 className="text-2xl font-black mb-4 font-display uppercase tracking-wide text-yellow-400">While you are here...</h2>
                  <p className="text-zinc-300 mb-8 text-lg leading-relaxed">
                    Check out <span className="text-yellow-400 font-bold">Oden</span>. It's the tool for PMMs who actually want to ship work instead of clicking random buttons on satire websites.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a 
                      href="https://getoden.com?utm_source=dontclick_button" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold h-12 text-base rounded-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      onClick={() => posthog.capture('dont_click_converted')}
                    >
                      Visit Oden <ExternalLink className="w-4 h-4" />
                    </a>
                    <Button onClick={onClose} variant="ghost" className="text-zinc-500 hover:text-white">
                      Close (I learned nothing)
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => {
                          posthog.capture('dont_click_share_twitter');
                          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I clicked the 'DO NOT CLICK' button on @thehonestpmm and I regret nothing. Or maybe everything. 🚨")}&url=${encodeURIComponent("https://thehonestpmm.com")}`, '_blank');
                        }}
                        variant="ghost" 
                        className="flex-1 text-xs text-zinc-500 hover:text-blue-400 border border-zinc-700 hover:border-blue-400"
                      >
                         <span className="flex items-center gap-1.5">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          Warn others on X
                        </span>
                      </Button>
                      <Button 
                        onClick={() => {
                          posthog.capture('dont_click_share_linkedin');
                          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://thehonestpmm.com")}`, '_blank');
                        }}
                        variant="ghost" 
                        className="flex-1 text-xs text-zinc-500 hover:text-blue-500 border border-zinc-700 hover:border-blue-500"
                      >
                         <span className="flex items-center gap-1.5">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          Warn others
                        </span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
const RageClickDetector = () => {
  const [clickCount, setClickCount] = useState(0);
  const [rageModalOpen, setRageModalOpen] = useState(false);
  
  useEffect(() => {
    const resetTimer = setTimeout(() => setClickCount(0), 1000);
    return () => clearTimeout(resetTimer);
  }, [clickCount]);

  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 6) {
          posthog.capture('rage_click_triggered');
          setRageModalOpen(true);
          return 0;
        }
        return newCount;
      });
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <AnimatePresence>
      {rageModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-red-900/40 backdrop-blur-sm" onClick={() => setRageModalOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full border-4 border-red-500 relative overflow-hidden text-center"
          >
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-red-600 animate-bounce">
              <Zap className="w-8 h-8 fill-current" />
            </div>
            <h2 className="text-2xl font-black mb-2 text-foreground uppercase">Whoa, Easy There!</h2>
            <p className="text-muted-foreground mb-6">
              You're clicking harder than a founder trying to find Product-Market Fit. Take a deep breath.
            </p>
            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => {
                  posthog.capture('rage_share_twitter');
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just rage-clicked 6 times on @thehonestpmm and honestly, it felt good. 😡 #Therapy")}&url=${encodeURIComponent("https://thehonestpmm.com")}`, '_blank');
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                Vent on X instead
              </Button>
              <Button onClick={() => setRageModalOpen(false)} variant="ghost" className="w-full">
                I'm calm now (Lying)
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FloatingShareButton = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-[90] flex flex-col items-start gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-2 mb-2"
          >
             <Button
              onClick={() => {
                posthog.capture('floating_share_linkedin');
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://thehonestpmm.com")}`, '_blank');
              }}
              size="sm"
              className="bg-[#0077b5] hover:bg-[#006097] text-white shadow-lg font-bold flex items-center gap-2"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </Button>
            <Button
              onClick={() => {
                posthog.capture('floating_share_twitter');
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Found the most accurate SaaS roadmap at @thehonestpmm. It's empty. 📉")}&url=${encodeURIComponent("https://thehonestpmm.com")}`, '_blank');
              }}
              size="sm"
              className="bg-black hover:bg-zinc-800 text-white shadow-lg font-bold flex items-center gap-2"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Post on X
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-12 h-12 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        <ExternalLink className={`w-5 h-5 transition-transform ${expanded ? 'rotate-45' : 'group-hover:rotate-12'}`} />
      </button>
    </div>
  );
};

const ComicAvatar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [forcedMessage, setForcedMessage] = useState<string | null>(null);

  // Preload images for instant switching
  useEffect(() => {
    const images = [
      "/avatar-smug.png",
      "/avatar-nervous.png",
      "/avatar-money.png"
    ];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'vaporware', 'integrations', 'victims', 'faq', 'extortion'];
      
      let current = 'hero';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Trigger when the section is largely visible
          if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
      // Clear forced message on scroll to show relevant context
      setForcedMessage(null);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const config: Record<string, { text: string, img: string }> = {
    hero: { 
      text: "Welcome to the vaporware revolution.", 
      img: "/avatar-smug.png" 
    },
    vaporware: { 
      text: "It's not a bug, it's a feature... we haven't built yet.", 
      img: "/avatar-nervous.png" 
    },
    integrations: { 
      text: "We integrate with your nightmares.", 
      img: "/avatar-smug.png" 
    },
    victims: { 
      text: "These people definitely exist. Trust me.", 
      img: "/avatar-nervous.png" 
    },
    faq: { 
      text: "If you have to ask, you can't afford it.", 
      img: "/avatar-smug.png" 
    },
    extortion: { 
      text: "Just give us your money.", 
      img: "/avatar-money.png" 
    },
    default: { 
      text: "I'm just here to look busy.", 
      img: "/avatar-smug.png" 
    }
  };

  const handleCloseAttempt = (e: React.MouseEvent) => {
    e.stopPropagation();
    posthog.capture('avatar_close_attempt');
    const refusals = [
      "Nice try. I have founder equity.",
      "I'm sticky, just like our churn rate.",
      "You can't close me. I'm 'Mission Critical'.",
      "I'm like a meeting that could've been an email—inevitable.",
      "Error: 405 Method Not Allowed (To Fire Me)",
      "I don't leave until the IPO."
    ];
    const randomRefusal = refusals[Math.floor(Math.random() * refusals.length)];
    setForcedMessage(randomRefusal);
  };

  const handleShare = () => {
    let message = "";
    const url = "https://thehonestpmm.com";

    if (forcedMessage) {
      message = `I tried to fire the @thehonestpmm avatar and it said: "${forcedMessage}" 💀`;
      posthog.capture('avatar_refusal_shared', { refusal: forcedMessage });
    } else {
      const messages = [
        "I feel personally attacked by @thehonestpmm and I can't look away. 💀",
        "Finally, a startup that admits what we're all thinking. @thehonestpmm is pure gold. ✨",
        "Sending this to my CEO immediately. @thehonestpmm gets it. 📉",
        "The accuracy of @thehonestpmm hurts my soul. 10/10 would recommend. 😭",
        "My entire career summarized in one landing page. Thanks @thehonestpmm.",
        "I laughed, I cried, I checked my stock options. @thehonestpmm 💸",
        "This is the only roadmap I trust anymore. @thehonestpmm"
      ];
      message = messages[Math.floor(Math.random() * messages.length)];
      posthog.capture('pain_shared', { message: message });
    }
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
    
    // Default to Twitter for the quick share button in avatar
    window.open(twitterUrl, '_blank');
  };

  const currentConfig = config[activeSection] || config.default;
  const displayText = forcedMessage || currentConfig.text;
  const displayImg = forcedMessage ? "/avatar-smug.png" : currentConfig.img;

  return (
    <div className="flex fixed bottom-0 right-2 md:right-8 z-[100] flex-col items-end pointer-events-none transition-all duration-300">
      {/* Speech Bubble */}
      <div 
          className="mb-2 md:mb-4 mr-4 md:mr-12 bg-white border-2 border-black p-3 md:p-4 rounded-2xl rounded-br-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-[160px] md:max-w-[220px] relative z-20 pointer-events-auto origin-bottom-right group transition-all"
      >
        <button 
          onClick={handleCloseAttempt}
          className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-red-500 text-white border-2 border-black rounded-full p-0.5 md:p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:scale-95 transition-transform"
          aria-label="Close avatar"
        >
          <X className="w-3 h-3" />
        </button>
        
        {(activeSection === 'extortion' || forcedMessage) ? (
           <div className="flex flex-col gap-2">
             <p className="font-display font-bold text-xs md:text-sm leading-snug">
               {displayText}
             </p>
             <div className="flex gap-2 justify-end pt-1 border-t border-gray-100 mt-1">
                <button 
                  onClick={handleShare} 
                  className="flex items-center gap-1.5 px-2 py-1 bg-black text-white rounded text-[10px] font-bold hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  {forcedMessage ? "Expose This" : "Share Pain"}
                </button>
             </div>
           </div>
        ) : (
           <p className="font-display font-bold text-xs md:text-sm leading-snug">
            {displayText}
          </p>
        )}
      </div>
      
      {/* Avatar Image */}
      <img 
        src={displayImg} 
        alt="Founder Avatar" 
        className="w-24 md:w-56 h-auto -mb-1 pointer-events-auto cursor-pointer hover:scale-105 transition-transform origin-bottom drop-shadow-xl"
        onClick={(e) => {
          if (!forcedMessage) {
            posthog.capture('avatar_clicked');
             const speech = e.currentTarget.parentElement?.querySelector('p');
             if (speech) speech.textContent = "Hey! Do I look like a button to you?";
          }
        }}
      />
    </div>
  );
};


// --- Main Page ---

export default function Home() {
  const [acquisitionOpen, setAcquisitionOpen] = useKonamiCode();
  const [loginErrorOpen, setLoginErrorOpen] = useState(false);
  const [demoCalendarOpen, setDemoCalendarOpen] = useState(false);
  const [dontClickOpen, setDontClickOpen] = useState(false);
  const [stagedDemoOpen, setStagedDemoOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    // Easter Egg: Console Logs
    console.log("%c STOP!", "color: red; font-size: 30px; font-weight: bold;");
    console.log("%c If you are an investor looking at this, please ignore the errors below.", "font-size: 14px;");
    console.warn("Warning: Runway is dangerously low (approx. 45 minutes remaining)");
    console.error("Error: Product-Market Fit not found in /src/reality/market.ts");
    console.info("Info: CEO is currently pivoting to 'AI for Pets'");
  }, []);

  const handleBillingToggle = () => {
    const newCycle = billingCycle === 'monthly' ? 'yearly' : 'monthly';
    setBillingCycle(newCycle);
    posthog.capture('billing_cycle_toggled', { cycle: newCycle });
  };

  const handlePricingClick = (plan: string) => {
    posthog.capture('pricing_plan_clicked', { plan });
  };

  const handleWatchDemo = () => {
    posthog.capture('watch_staged_demo_clicked');
    setStagedDemoOpen(true);
  };

  const handleScheduleDemoMain = () => {
    posthog.capture('schedule_demo_main_clicked');
    setDemoCalendarOpen(true);
  };

  const handleOdenClick = () => {
    posthog.capture('oden_footer_link_clicked');
  };

  const handleInvestorPortalClick = () => {
    posthog.capture('investor_portal_clicked');
    setAcquisitionOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-hidden">
      <Navbar 
        onLoginClick={() => setLoginErrorOpen(true)} 
        onScheduleClick={() => setDemoCalendarOpen(true)} 
        onDontClick={() => setDontClickOpen(true)}
      />
      <RageClickDetector />
      <FloatingShareButton />
      <ComicAvatar />
      <AcquisitionModal open={acquisitionOpen} onClose={() => setAcquisitionOpen(false)} />
      <LoginErrorModal open={loginErrorOpen} onClose={() => setLoginErrorOpen(false)} />
      <DemoCalendarModal open={demoCalendarOpen} onClose={() => setDemoCalendarOpen(false)} />
      <DontClickModal open={dontClickOpen} onClose={() => setDontClickOpen(false)} />
      <StagedDemoModal open={stagedDemoOpen} onClose={() => setStagedDemoOpen(false)} />
      
      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden mesh-light">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* PMM Honest Memo */}
            <motion.div
               initial={{ opacity: 0, y: -20, rotate: -2 }}
               animate={{ opacity: 1, y: 0, rotate: -1 }}
               transition={{ delay: 0.5, duration: 0.5 }}
               className="mx-auto max-w-xl mb-12 relative"
            >
               <motion.button 
                  animate={{ scale: [1, 1.05, 1] }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [-3, 3, -3],
                    transition: { duration: 0.2, repeat: Infinity } 
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  onClick={() => {
                     posthog.capture('leak_memo_clicked');
                     const text = encodeURIComponent("Found this internal memo from @thehonestpmm. The honesty is alarming. #Vaporware");
                     const url = encodeURIComponent("https://thehonestpmm.com");
                     window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                  }}
                  className="absolute -top-3 -left-3 -rotate-6 bg-yellow-200 text-yellow-800 px-3 py-1 text-[10px] font-bold shadow-sm z-20 border border-yellow-300 transform tracking-wider transition-all cursor-pointer flex items-center gap-1 group/leak"
               >
                  CONFIDENTIAL: DO NOT PUBLISH
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover/leak:opacity-100" />
               </motion.button>
               
               {/* Fake Social Proof Counter */}
               <motion.div 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 1 }}
                 className="absolute -top-8 left-20 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm z-30 pointer-events-none"
               >
                 <span className="animate-pulse">●</span> 142 Leaks Today
               </motion.div>

               <div className="bg-white rounded-sm border border-border p-5 shadow-xl relative overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-50" />
                  <div className="flex items-start gap-4 text-left">
                     <div className="w-10 h-10 rounded-full bg-slate-100 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                       <img src="/avatar-nervous.png" className="w-full h-full object-cover opacity-80" alt="Stressed PMM" />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                           <div>
                              <h3 className="text-xs font-bold text-foreground">From: The Honest PMM</h3>
                              <p className="text-[10px] text-muted-foreground">To: Anyone who will listen</p>
                           </div>
                           <span className="text-[10px] text-muted-foreground font-mono">Sent: 3:00 AM</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed italic font-serif">
                          "Look, I was tasked to create 'game-changing' positioning for this. But let's be real—we're still figuring out what this thing actually does. So I decided to just write the honest truth. If I get fired, please check my <a href="https://www.linkedin.com/company/getoden/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">LinkedIn</a>."
                        </p>
                     </div>
                  </div>
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] opacity-10 pointer-events-none mix-blend-multiply" />
               </div>
            </motion.div>

            <motion.a 
              href="https://getoden.com?utm_source=thehonestpmm&utm_medium=referral&utm_content=pre_revenue_badge"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary/20 shadow-sm mb-8 hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => posthog.capture('pre_revenue_pill_clicked')}
            >
              <span className="flex h-2 w-2 rounded-full bg-primary relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              </span>
              <span className="text-sm font-medium text-primary">Pre-Revenue but Highly Valued</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.a>

            <div className="relative w-full">
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                We built this just to <br className="hidden md:block"/>
                <span className="text-gradient">Get Acquired</span>
              </h1>
              <Annotation text="Can we squeeze 'Generative AI' in this title? Investors love that." className="-right-12 top-10" />
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Our entire roadmap is "figure it out after the Series A". Please sign the contract so our stock options actually become worth something.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Button onClick={handleScheduleDemoMain} size="lg" className="h-12 px-8 text-base rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]">
                Schedule a Demo
              </Button>
              <Button onClick={handleWatchDemo} size="lg" variant="outline" className="h-12 px-8 text-base rounded-lg border-border hover:bg-secondary/50 hover:text-foreground bg-white/50 backdrop-blur-sm">
                <Play className="w-4 h-4 mr-2" /> Watch Staged Demo
              </Button>
            </div>

            {/* Hero Visual / Mockup */}
            <div className="mt-20 relative w-full max-w-5xl mx-auto px-2 md:px-0">
              <div className="relative rounded-xl border border-border/60 bg-white/50 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[500px] md:min-h-0 md:aspect-[16/9] group">
                <div className="absolute inset-0 bg-white" />
                
                {/* Mockup UI - Dashboard */}
                <div className="absolute inset-2 md:inset-4 bg-white rounded-xl border border-border/40 shadow-2xl flex flex-col overflow-hidden text-left ring-1 ring-black/5 group-hover:blur-[2px] transition-all duration-300">
                  {/* Window Controls / Header */}
                  <div className="h-10 md:h-12 border-b border-border/40 flex items-center justify-between px-3 md:px-4 bg-gray-50/50 backdrop-blur-sm shrink-0">
                     <div className="flex items-center gap-1.5 md:gap-2">
                       <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400/80 border border-red-500/20 shadow-inner"></div>
                       <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400/80 border border-yellow-500/20 shadow-inner"></div>
                       <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400/80 border border-green-500/20 shadow-inner"></div>
                     </div>
                     <div className="flex-1 text-center overflow-hidden px-2">
                        <div className="inline-flex items-center gap-2 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-white border border-border/50 shadow-sm text-[10px] md:text-xs font-medium text-muted-foreground truncate max-w-full">
                          <Lock className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
                          <span className="truncate">app.nameislogo.com</span>
                        </div>
                     </div>
                     <div className="w-12 md:w-16 flex justify-end gap-2 text-muted-foreground/40 hidden md:flex">
                        <div className="w-4 h-4 rounded bg-current/20"></div>
                     </div>
                  </div>
                  
                  {/* App Bar */}
                  <div className="h-12 md:h-14 border-b border-border/40 flex items-center justify-between px-3 md:px-4 bg-white shrink-0">
                     <div className="flex items-center gap-3 md:gap-4">
                       <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/20 shrink-0">
                         <Layers className="w-3.5 h-3.5 md:w-4 md:h-4" />
                       </div>
                       <div className="h-4 w-[1px] bg-border mx-1 hidden md:block"></div>
                       <div className="hidden md:flex items-center gap-1">
                         <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-foreground bg-secondary/50">Dashboard</Button>
                         <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground">Analytics</Button>
                         <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground">Settings</Button>
                       </div>
                     </div>
                     <div className="flex items-center gap-2 md:gap-3">
                       <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                         <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />
                       </div>
                       <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground relative hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                         <Bell className="w-3.5 h-3.5 md:w-4 md:h-4" />
                         <div className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white shadow-sm"></div>
                       </div>
                       <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-primary to-accent border border-white/50 shadow-sm cursor-pointer hover:ring-2 ring-primary/20 transition-all shrink-0" />
                     </div>
                  </div>
                  
                  {/* Mockup Body */}
                  <div className="flex-1 flex overflow-hidden bg-slate-50/50">
                    {/* Sidebar */}
                    <div className="w-56 border-r border-border/40 hidden md:flex flex-col p-3 gap-1 bg-white shrink-0">
                       <div className="mb-4 px-3 py-2">
                         <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Main</div>
                         {[
                           { name: 'Overview', icon: LayoutDashboard, active: true },
                           { name: 'Performance', icon: PieChart, active: false },
                           { name: 'Team', icon: Users, active: false },
                         ].map((item) => (
                           <div key={item.name} className={`h-9 rounded-md flex items-center gap-3 px-3 text-sm font-medium transition-all cursor-default mb-1 ${item.active ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}>
                             <item.icon className="w-4 h-4 opacity-70" />
                             {item.name}
                             {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                           </div>
                         ))}
                       </div>
                       <div className="px-3 py-2">
                         <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Workspace</div>
                          {[
                           { name: 'Projects', icon: Folder, active: false },
                           { name: 'Documents', icon: FileText, active: false },
                           { name: 'Reports', icon: Flag, active: false },
                         ].map((item) => (
                           <div key={item.name} className={`h-9 rounded-md flex items-center gap-3 px-3 text-sm font-medium transition-all cursor-default mb-1 ${item.active ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}>
                             <item.icon className="w-4 h-4 opacity-70" />
                             {item.name}
                           </div>
                         ))}
                       </div>
                       
                       <div className="mt-auto m-2 p-3 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg overflow-hidden relative">
                         <div className="relative z-10">
                           <div className="text-xs font-semibold mb-1">Pro Plan</div>
                           <div className="text-[10px] text-slate-400 mb-3">Your trial ends in 3 days.</div>
                           <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                             <div className="h-full w-[80%] bg-primary rounded-full" />
                           </div>
                         </div>
                         <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                       </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-3 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 overflow-hidden overflow-y-auto">
                      <div className="col-span-1 md:col-span-2 space-y-4 md:space-y-6">
                        {/* Revenue Chart */}
                        <div className="h-56 md:h-64 rounded-xl bg-white border border-border/40 p-4 md:p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-center mb-8">
                            <div>
                              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                Revenue (Projected)
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-600 border border-green-100">
                                  Live
                                </span>
                              </div>
                              <div className="text-3xl font-display font-bold text-foreground mt-1 flex items-baseline gap-2">
                                $4.2M 
                                <span className="text-sm font-medium text-green-500">↑ 12%</span>
                              </div>
                            </div>
                            <div className="flex bg-secondary/50 p-1 rounded-lg border border-border/50">
                              {['1D', '1W', '1M', '1Y'].map((t, i) => (
                                <div key={t} className={`text-[10px] font-bold px-3 py-1.5 rounded-md cursor-pointer transition-all ${i === 2 ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{t}</div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Enhanced Bar Chart */}
                          <div className="absolute bottom-5 left-5 right-5 h-24 md:h-32 flex items-end justify-between gap-1 md:gap-2">
                            {[40, 65, 45, 80, 55, 90, 95, 100, 110, 120].map((h, i) => (
                              <div key={i} className="group/bar relative w-full h-full flex items-end">
                                <div className="w-full bg-gradient-to-t from-primary/60 to-primary rounded-t-sm opacity-80 group-hover/bar:opacity-100 transition-all duration-300 relative overflow-hidden" style={{ height: `${h}%` }}>
                                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                                </div>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover/bar:opacity-100 transition-all transform translate-y-2 group-hover/bar:translate-y-0 z-10 whitespace-nowrap">
                                  ${h}k
                                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                          <div className="h-28 md:h-32 rounded-xl bg-white border border-border/40 p-4 md:p-5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex justify-between items-start">
                              <div className="p-2 rounded-lg bg-red-50 text-red-500 border border-red-100">
                                <Zap className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-100">+24%</span>
                            </div>
                            <div className="relative z-10">
                              <div className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">Burn Rate</div>
                              <div className="text-2xl font-bold text-foreground">High</div>
                              <div className="mt-2 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full w-[85%] bg-red-500 rounded-full" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="h-28 md:h-32 rounded-xl bg-white border border-border/40 p-4 md:p-5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                             <div className="relative z-10 flex justify-between items-start">
                              <div className="p-2 rounded-lg bg-orange-50 text-orange-500 border border-orange-100">
                                <TrendingUp className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full border border-orange-100">Critical</span>
                            </div>
                             <div className="relative z-10">
                               <div className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">Runway</div>
                               <div className="text-2xl font-bold text-foreground">4 Weeks</div>
                               <div className="mt-2 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                 <div className="h-full w-[15%] bg-orange-500 rounded-full" />
                               </div>
                             </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-3 md:col-span-1 space-y-6">
                        <div className="h-full rounded-xl bg-white border border-border/40 p-0 shadow-sm flex flex-col overflow-hidden">
                           <div className="p-4 border-b border-border/40 bg-gray-50/50 flex items-center justify-between">
                             <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Recent Activity</div>
                             <div className="text-primary hover:bg-primary/10 p-1.5 rounded-md cursor-pointer transition-colors">
                               <ArrowRight className="w-3.5 h-3.5" />
                             </div>
                           </div>
                           <div className="p-2 space-y-1 flex-1 overflow-hidden">
                             {[
                               { text: "System optimized for speed", time: "Just now", status: "success" },
                               { text: "API latency reduced by 40%", time: "2m ago", status: "success" },
                               { text: "Database backup completed", time: "1h ago", status: "neutral" },
                               { text: "Design system updated", time: "3h ago", status: "neutral" },
                               { text: "Index refresh scheduled", time: "5h ago", status: "pending" }
                             ].map((item, i) => (
                               <div key={i} className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors cursor-default">
                                 <div className={`mt-0.5 shrink-0 rounded-full p-1 ${
                                   item.status === 'success' ? 'bg-green-100 text-green-600' : 
                                   item.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                 }`}>
                                   {item.status === 'success' ? <Check className="w-3 h-3" /> : 
                                    item.status === 'pending' ? <Zap className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                                 </div>
                                 <div className="flex-1 min-w-0">
                                   <div className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">{item.text}</div>
                                   <div className="text-[10px] text-muted-foreground mt-0.5">{item.time}</div>
                                 </div>
                               </div>
                             ))}
                           </div>
                           <div className="p-3 border-t border-border/40 bg-gray-50/30 flex items-center justify-between text-xs text-muted-foreground">
                             <span className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                               Systems Normal
                             </span>
                             <span>v2.4.0</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Annotation on Mockup */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  (This is just a CSS drawing, actual product may vary)
                </div>
              </div>
              
              {/* Decorative elements behind mockup */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-border/40 bg-white/50">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
            Trusted by companies who ignored our red flags
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             {['Scripe', 'Airbnble', 'Verchell', 'Curved', 'Raycrash'].map((name) => (
               <span key={name} className="text-xl font-display font-bold text-foreground cursor-default">{name}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Features Grid (Bento) */}
      <section id="vaporware" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features we promised investors</h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools designed for modern teams who need to look busy while the AI does the work.
            </p>
            <Annotation text="We have none of these features yet." className="-right-16 top-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <BentoCard 
              colSpan="md:col-span-2"
              title="Zero Latency" 
              description="Our dashboard loads instantly because there is absolutely zero data processing happening. It's just HTML."
              icon={Zap}
            >
              <div className="h-48 mt-4 rounded-lg border border-border bg-white p-4 shadow-inner flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%,rgba(0,0,0,0.02)_100%)] bg-[length:24px_24px]" />
                 <div className="text-center relative z-10">
                   <div className="flex items-center justify-center gap-2 mb-2">
                     <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-sm font-mono text-muted-foreground">latency_check.sh</span>
                   </div>
                   <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse tracking-tighter">
                     0ms
                   </div>
                   <div className="mt-2 text-xs text-muted-foreground font-mono bg-secondary/50 px-2 py-1 rounded inline-block">
                     Ping: 0.000001ms
                   </div>
                 </div>
              </div>
            </BentoCard>

            <BentoCard 
              title="Security Theater" 
              description="We put a lock icon next to the URL bar. That means we're SOC-2 compliant, right? (Don't check)."
              icon={Lock}
            >
              <div className="mt-4 flex flex-col items-center justify-center relative h-48">
                 <div className="relative">
                   <Shield className="w-28 h-28 text-primary/5" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <Lock className="w-8 h-8 text-white" />
                     </div>
                   </div>
                   <div className="absolute -bottom-2 -right-4 bg-white border border-border shadow-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-green-600 flex items-center gap-1.5 transform -rotate-6">
                     <Check className="w-3 h-3" /> VERIFIED
                   </div>
                 </div>
              </div>
            </BentoCard>

            <BentoCard 
              title="Rigged Analysis" 
              description="We hired an independent analyst (our intern) to objectively plot us against the competition."
              icon={BarChart3}
            >
              <div className="mt-4 h-48 relative flex items-center justify-center rounded-lg border border-border/50 bg-white p-4 overflow-hidden">
                 {/* Chart Grid */}
                 <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                   <div className="border-r border-b border-dashed border-gray-200 bg-red-50/30 flex items-center justify-center">
                     <span className="text-[10px] text-red-300 font-bold -rotate-12 opacity-50">Losers</span>
                   </div>
                   <div className="border-b border-dashed border-gray-200 bg-yellow-50/30"></div>
                   <div className="border-r border-dashed border-gray-200 bg-yellow-50/30"></div>
                   <div className="bg-green-50/30 flex items-center justify-center">
                     <span className="text-[10px] text-green-300 font-bold -rotate-12 opacity-50">Visionaries</span>
                   </div>
                 </div>
                 
                 {/* Axes Labels */}
                 <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                   Ability to Pivot
                 </div>
                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                   Buzzword Density
                 </div>

                 {/* Competitor Dots */}
                 {[...Array(8)].map((_, i) => (
                   <div 
                     key={i}
                     className="absolute w-2 h-2 rounded-full bg-gray-400 opacity-50"
                     style={{ 
                       bottom: `${15 + Math.random() * 30}%`, 
                       left: `${15 + Math.random() * 30}%` 
                     }}
                   />
                 ))}

                 {/* Our Logo */}
                 <div className="absolute top-4 right-4 z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-lg bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-white animate-bounce">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded mt-1 shadow-sm whitespace-nowrap">
                      Us (Leaders)
                    </div>
                 </div>
              </div>
            </BentoCard>

            <BentoCard 
              colSpan="md:col-span-2"
              title="Multi-User Chaos" 
              description="Overwrite each other's work in real-time with our buggy WebSocket implementation. Last save wins!"
              icon={Users}
            >
               <div className="mt-4 h-48 relative rounded-lg border border-border bg-white shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                  
                  {/* Fake UI Elements being edited */}
                  <div className="absolute top-8 left-8 right-8 space-y-3 opacity-60">
                    <div className="h-4 bg-secondary rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-secondary rounded w-1/2" />
                    <div className="h-32 bg-secondary/50 rounded border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm">
                      Drag & Drop Here
                    </div>
                  </div>

                  {/* Cursors */}
                  {[
                    { color: '#ef4444', label: 'Dave', x: '20%', y: '30%', delay: 0 },
                    { color: '#3b82f6', label: 'Sarah', x: '60%', y: '60%', delay: 1 },
                    { color: '#10b981', label: 'Mike', x: '40%', y: '20%', delay: 2 },
                    { color: '#f59e0b', label: 'You', x: '80%', y: '40%', delay: 0.5 },
                  ].map((cursor, i) => (
                    <motion.div
                      key={i}
                      className="absolute z-20"
                      initial={{ left: cursor.x, top: cursor.y }}
                      animate={{ 
                        left: [`${parseInt(cursor.x)}%`, `${parseInt(cursor.x) + (Math.random() * 20 - 10)}%`, `${parseInt(cursor.x)}%`],
                        top: [`${parseInt(cursor.y)}%`, `${parseInt(cursor.y) + (Math.random() * 20 - 10)}%`, `${parseInt(cursor.y)}%`],
                      }}
                      transition={{ 
                        duration: 3 + Math.random() * 2, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: cursor.delay
                      }}
                    >
                      <MousePointer2 className="w-5 h-5 fill-current" style={{ color: cursor.color }} />
                      <div className="absolute left-4 top-2 px-1.5 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap" style={{ backgroundColor: cursor.color }}>
                        {cursor.label}
                      </div>
                    </motion.div>
                  ))}
               </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Enterprise Integration - Ecosystem */}
      <section id="integrations" className="py-24 border-t border-border/40 bg-white/30">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamlessly Interrupt Your Workflow</h2>
            <p className="text-lg text-muted-foreground">
              We connect with the tools you already hate to maximize your daily distractions.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {[
              { name: "Slack", desc: "For urgent interruptions", color: "bg-purple-100 text-purple-600" },
              { name: "Jira", desc: "To complicate simple tasks", color: "bg-blue-100 text-blue-600" },
              { name: "Notion", desc: "To lose documentation", color: "bg-gray-100 text-gray-800" },
              { name: "Teams", desc: "To freeze your computer", color: "bg-indigo-100 text-indigo-600" },
              { name: "Zoom", desc: "For meetings that could be emails", color: "bg-blue-50 text-blue-500" },
              { name: "Figma", desc: "To argue about pixels", color: "bg-red-50 text-red-500" },
            ].map((tool) => (
               <div key={tool.name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white shadow-sm hover:shadow-md hover:border-primary/20 transition-all w-full md:w-[calc(33.333%-16px)] cursor-default group">
                 <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform`}>
                   <Workflow className="w-6 h-6" />
                 </div>
                 <div>
                   <div className="font-semibold text-foreground">{tool.name}</div>
                   <div className="text-xs text-muted-foreground">{tool.desc}</div>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Regret (Testimonials) */}
      <section id="victims" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wall of Regret</h2>
            <p className="text-lg text-muted-foreground">
              Real feedback from customers who forgot to cancel their trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                q: "I can't find the cancel button anywhere. Please help me.", 
                a: "Incredible retention! You're with us forever now. ❤️",
                user: "Trapped User",
                role: "Involuntary Subscriber"
              },
              { 
                q: "The dashboard says I made $1M but my bank account is empty??", 
                a: "That's 'Projected Revenue'. You have to manifest it first.",
                user: "Confused Founder",
                role: "Delusional CEO"
              },
              { 
                q: "Why is the support number just a recording of someone laughing?", 
                a: "We believe in authentic human connection.",
                user: "Angry Enterprise Client",
                role: "Former Fan"
              }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s === 1 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium italic mb-4">"{item.q}"</p>
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 mb-6">
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" /> Official Response
                    </div>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl">
                     {["😭", "🤡", "😡"][i]}
                   </div>
                   <div>
                     <div className="text-sm font-bold">{item.user}</div>
                     <div className="text-xs text-muted-foreground">{item.role}</div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Avoided Questions */}
      <section id="faq" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Avoided Questions</h2>
            <p className="text-lg text-muted-foreground">
              We answer the questions nobody is asking to avoid the ones you are.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
               { q: "Is my data encrypted?", a: "We believe in radical transparency. Encryption feels like we're hiding something from you, and that's not our vibe." },
               { q: "Can I export my data?", a: "Why would you want to leave? We've designed the platform to be a 'sticky' experience (we disabled the export button)." },
               { q: "Is this GDPR compliant?", a: "We have a pop-up that asks for cookies. That's basically the same thing, right?" },
               { q: "What is your uptime SLA?", a: "We aim for 100% uptime during business hours (when our dev team is awake). Weekends are for recharging." }
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="p-5 flex justify-between items-center cursor-help">
                  <h3 className="font-semibold text-foreground pr-8">{faq.q}</h3>
                  <div className="text-muted-foreground/50 group-hover:text-primary transition-colors">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <div className="px-5 pb-5 text-muted-foreground text-sm border-t border-border/50 pt-4 bg-secondary/10">
                  <span className="font-bold text-primary mr-2">Answer:</span>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="extortion" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Extortion</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Choose the plan that best fits your budget (and our revenue goals).
            </p>

            {/* Price Hike Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
              <button 
                onClick={handleBillingToggle}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${billingCycle === 'yearly' ? 'bg-red-500' : 'bg-primary'}`}
              >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-7' : ''}`} />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-red-500 font-bold' : 'text-muted-foreground'}`}>
                Yearly <span className="text-[10px] uppercase bg-red-100 text-red-600 px-1.5 py-0.5 rounded ml-1 border border-red-200">More Expensive</span>
              </span>
            </div>
            {billingCycle === 'yearly' && (
               <motion.div 
                 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                 className="mt-2 text-xs font-bold text-red-500"
               >
                 (Admin Fee + Convenience Charge applied)
               </motion.div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="rounded-2xl border border-border p-8 bg-white hover:border-primary/40 transition-colors">
              <h3 className="font-semibold text-lg mb-2">Decoy Tier</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold tracking-tight">
                  {billingCycle === 'monthly' ? '$49' : <span className="text-red-500">$69</span>}
                </span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">Ugly features designed to make you upgrade.</p>
              <Button onClick={() => handlePricingClick('starter_decoy')} variant="outline" className="w-full rounded-lg font-medium">Try It (You'll Hate It)</Button>
              <div className="mt-8 space-y-4">
                {['Single User (You)', 'Export to CSV (Broken)', 'Support via Smoke Signal'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-primary bg-primary/5 p-8 relative shadow-xl">
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                 MOST POPULAR MISTAKE
               </div>
              <h3 className="font-semibold text-lg mb-2 text-primary">VC Trap</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold tracking-tight">
                   {billingCycle === 'monthly' ? '$499' : <span className="text-red-500">$899</span>}
                </span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">Perfect for burning through your seed round.</p>
              <Button onClick={() => handlePricingClick('pro_vc_trap')} className="w-full rounded-lg font-bold shadow-lg shadow-primary/20">Get Robbed</Button>
              <div className="mt-8 space-y-4">
                {['Unlimited Seats (Nobody will join)', 'AI-Powered Nothing', 'Dedicated Account Manager (Chatbot)', 'Priority Regret'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-foreground font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-border p-8 bg-slate-900 text-white hover:border-white/20 transition-colors">
              <h3 className="font-semibold text-lg mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold tracking-tight">
                  {billingCycle === 'monthly' ? 'Contact Us' : <span className="text-red-400">Don't Contact Us</span>}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-8">If you have to ask, you definitely can't afford it.</p>
              <Button onClick={() => handlePricingClick('enterprise')} variant="secondary" className="w-full rounded-lg font-medium bg-white text-slate-900 hover:bg-gray-100">
                Talk to Sales
              </Button>
              <div className="mt-8 space-y-4">
                {['SSO (Super Slow Onboarding)', 'Audit Logs (We log everything)', 'SLA (Somewhat Likely Available)'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border pt-16 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg">NameIsLogo</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                Revolutionizing the way you pretend to work. Built with stress and caffeine in San Francisco.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Vaporware</a></li>
                <li><a href="#" className="hover:text-primary">Integrations</a></li>
                <li><a href="#" className="hover:text-primary">Enterprise</a></li>
                <li><a href="#" className="hover:text-primary">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers (Firing)</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>

             <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy (None)</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
                <li><a href="#" className="hover:text-primary">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 pb-20 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-sm text-muted-foreground">
            <div className="flex flex-col gap-4 items-start">
              <a 
                href="https://getoden.com?utm_source=honestpmm" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleOdenClick}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-medium group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>This satirical hellscape was brought to you by <span className="font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">Oden</span> — the tool that helps PMMs actually ship work instead of pretending to.</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>

              <div className="flex flex-col gap-2">
                <div>© {new Date().getFullYear()} NameIsLogo Inc. All rights reserved.</div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setDontClickOpen(true)}
                    className="text-[10px] text-red-500/20 hover:text-red-600 font-bold font-mono uppercase transition-all hover:scale-105 cursor-pointer text-left w-fit animate-pulse"
                  >
                    [ DO NOT CLICK ]
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
