import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, X, Copy, Share2, ArrowLeft, ShieldAlert, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import posthog from "posthog-js";

export default function BattleCard() {
  const handleShare = (platform: 'twitter' | 'linkedin') => {
    posthog.capture('battlecard_shared', { platform });
    const text = encodeURIComponent("Finally found a battle card that doesn't lie. @thehonestpmm admits they are worse than competitors in every way. Refreshing. 📉");
    const url = encodeURIComponent("https://thehonestpmm.com/battle-card");

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    } else {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  const rows = [
    {
      feature: "AI Capabilities",
      competitorA: "Proprietary LLM models",
      competitorB: "OpenAI Wrapper",
      us: "We typed 'AI' in the pitch deck",
      winner: "competitorA"
    },
    {
      feature: "Uptime SLA",
      competitorA: "99.999% Guaranteed",
      competitorB: "99.9% (Business Hours)",
      us: "It works on localhost",
      winner: "competitorA"
    },
    {
      feature: "Security",
      competitorA: "SOC2 Type II, HIPAA",
      competitorB: "Basic Encryption",
      us: "We use 'password123'",
      winner: "competitorA"
    },
    {
      feature: "Integrations",
      competitorA: "200+ Native Connectors",
      competitorB: "Zapier only",
      us: "We have a CSV import (broken)",
      winner: "competitorA"
    },
    {
      feature: "Pricing",
      competitorA: "$$$ Enterprise",
      competitorB: "$ Affordable",
      us: "Please just give us money",
      winner: "competitorB"
    },
    {
      feature: "Support",
      competitorA: "24/7 Global Team",
      competitorB: "Email Support",
      us: "The CTO answers if awake",
      winner: "competitorA"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[110] bg-white/80 backdrop-blur-xl border-b border-border/60 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Safety
          </Link>
          <div className="font-display font-bold text-lg">The Honest Battle Card™</div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 border border-red-200">
            <ShieldAlert className="w-3 h-3" /> Internal Use Only
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight font-display">
            Competitive Intel <span className="text-muted-foreground line-through decoration-red-500 decoration-4">Lies</span> Truths
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stop gaslighting your prospects. Here is exactly how we stack up against the competition. (Spoiler: It's not looking good).
          </p>
        </motion.div>

        {/* Battle Card Table */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-border overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <img src="/avatar-nervous.png" className="w-32 h-32 rotate-12" alt="Watermark" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 border-b-2 border-border">
                  <th className="p-6 font-display font-bold text-muted-foreground w-1/4">Feature</th>
                  <th className="p-6 font-display font-bold text-zinc-500 w-1/4">
                    Market Leader
                    <div className="text-xs font-normal opacity-70 mt-1">They have budget</div>
                  </th>
                  <th className="p-6 font-display font-bold text-zinc-500 w-1/4">
                    Cheap Alternative
                    <div className="text-xs font-normal opacity-70 mt-1">Good enough</div>
                  </th>
                  <th className="p-6 font-display font-bold text-primary w-1/4 bg-primary/5 border-l-2 border-primary/20 relative">
                    Us (The Honest PMM)
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rotate-12 shadow-sm border border-yellow-500">
                      Zero PMF!
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-border hover:bg-zinc-50 transition-colors group">
                    <td className="p-6 font-medium text-foreground">{row.feature}</td>
                    <td className="p-6 text-zinc-600 relative">
                      {row.competitorA}
                      {row.winner === 'competitorA' && <Check className="w-4 h-4 text-green-500 absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </td>
                    <td className="p-6 text-zinc-600 relative">
                       {row.competitorB}
                       {row.winner === 'competitorB' && <Check className="w-4 h-4 text-green-500 absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </td>
                    <td className="p-6 font-bold text-red-600 bg-red-50/50 border-l-2 border-red-100 relative">
                      {row.us}
                      <X className="w-4 h-4 text-red-400 absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-zinc-50 p-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-3 max-w-md">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
              <p className="text-sm text-zinc-500 italic">
                "We recommend buying the Market Leader if you actually need these features. Buy us if you enjoy pain or hate money."
              </p>
            </div>
            
            <div className="flex gap-3">
               <Button 
                onClick={() => handleShare('twitter')}
                className="bg-black hover:bg-zinc-800 text-white font-bold gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Steal this Card
              </Button>
               <Button 
                onClick={() => handleShare('linkedin')}
                variant="outline"
                className="gap-2 font-bold border-2"
              >
                 <svg className="w-4 h-4 fill-current text-[#0077b5]" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Share Intel
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}