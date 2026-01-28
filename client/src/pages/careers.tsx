import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Briefcase, ChevronRight, Share2, AlertTriangle, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import posthog from "posthog-js";

// Job Data
const JOBS = [
  {
    id: "slide-adjuster",
    title: "Senior Slide Adjuster (PMM)",
    department: "Sales Support (Emotional)",
    salary: "Equity (Worthless)",
    description: "We are looking for someone to move a text box 2 pixels to the left because the VP of Sales 'doesn't like the vibe'.",
    requirements: [
      "Expertise in pretending to listen to feedback",
      "Ability to create 50-slide decks that will be opened exactly once",
      "Thick skin (for when Sales blames you for missing quota)",
      "Proficiency in 'making it pop'"
    ],
    reality: "You are basically a glorified graphic designer who knows what 'GTM' stands for."
  },
  {
    id: "launch-scapegoat",
    title: "Head of Launch Scapegoating",
    department: "Vaporware Division",
    salary: "$0 (Experience!)",
    description: "Do you love organizing launches for products that Engineering hasn't started building yet? This role is for you.",
    requirements: [
      "Mastery of 'Coming Soon' messaging",
      "Ability to write press releases for bug fixes",
      "Comfortable lying to customers about timelines",
      "Advanced Apology Writing skills"
    ],
    reality: "Your main job is to take the fall when the product crashes during the demo."
  },
  {
    id: "pricing-pivoter",
    title: "Director of Pricing Panic",
    department: "Strategy (Lol)",
    salary: "Competitive (with interns)",
    description: "Join us to change our pricing model every Tuesday at 3 AM because the CEO read a LinkedIn post.",
    requirements: [
      "Excel wizardry (VLOOKUP is life)",
      "Zero attachment to logic",
      "Ability to explain why we are 5x more expensive than competitors with 5x fewer features",
      "No moral compass"
    ],
    reality: "You will spend 90% of your time explaining the new pricing to the Sales team, who will ignore it anyway."
  }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);

  const handleApply = () => {
    posthog.capture('fake_job_apply_clicked', { job: selectedJob?.title });
    window.open("https://getoden.com?utm_source=honest_careers&utm_content=save_yourself", "_blank");
  };

  const handleShare = (job: typeof JOBS[0]) => {
    posthog.capture('fake_job_shared', { job: job.title });
    const text = encodeURIComponent(`I just found my dream job: ${job.title} at @thehonestpmm. Finally, a JD that tells the truth. 💀 #PMM #TechLife`);
    const url = encodeURIComponent(`https://thehonestpmm.com/careers`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[110] bg-white/80 backdrop-blur-xl border-b border-border/60 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Reality
          </Link>
          <div className="font-display font-bold text-lg flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            The Honest Job Board™
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
            We are (Unfortunately) Hiring
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight font-display">
            Find Your Next <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Trauma Bond</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Real job descriptions for the roles you actually do. Apply now to ruin your mental health forever.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {JOBS.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col"
              onClick={() => setSelectedJob(job)}
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground bg-zinc-50 px-2 py-1 rounded border border-zinc-200">
                    {job.department}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-display group-hover:text-primary transition-colors">{job.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {job.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                   <AlertTriangle className="w-3 h-3 text-yellow-500" />
                   <span>Salary: {job.salary}</span>
                </div>
              </div>
              
              <div className="p-4 border-t border-border bg-zinc-50/50 flex items-center justify-between group-hover:bg-primary/5 transition-colors">
                <span className="text-sm font-bold text-muted-foreground group-hover:text-primary">Read The Truth</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform group-hover:text-primary" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedJob(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 pb-0">
                <div className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 border border-red-200">
                   Warning: High Churn Role
                </div>
                <h2 className="text-3xl font-black mb-2 font-display">{selectedJob.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{selectedJob.description}</p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                       <Briefcase className="w-5 h-5 text-zinc-400" />
                       "Requirements" (The Wishlist)
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                     <h3 className="text-sm font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        The Honest Reality
                     </h3>
                     <p className="text-base font-medium text-zinc-800 italic">
                        "{selectedJob.reality}"
                     </p>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-8 flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white border-t border-border mt-8">
                <Button 
                  onClick={handleApply}
                  size="lg"
                  className="flex-1 bg-black hover:bg-zinc-800 text-white font-bold text-base h-12"
                >
                  Save Yourself (Use Oden)
                  <ArrowLeft className="w-4 h-4 rotate-135 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => handleShare(selectedJob)}
                  className="flex-1 font-bold text-base h-12 gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Send to Boss
                </Button>
              </div>

            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}