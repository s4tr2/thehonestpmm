import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Share2, Zap, Brain, TrendingUp, AlertTriangle, RefreshCw, Trophy, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import posthog from "posthog-js";

// Game Scenarios
const SCENARIOS = [
  {
    id: 1,
    text: "Engineering says the 'AI Feature' is just an if/else statement.",
    choiceA: { text: "Ship it anyway. Fake it 'til you make it.", effect: { hype: 20, sanity: -10, runway: 0 } },
    choiceB: "Delay launch to build a real model.", effect: { hype: -30, sanity: 10, runway: -20 }
  },
  {
    id: 2,
    text: "Sales promised a customer a feature that defies the laws of physics.",
    choiceA: { text: "Update the roadmap to include 'Time Travel'.", effect: { hype: 10, sanity: -20, runway: 10 } },
    choiceB: "Tell Sales to apologize.", effect: { hype: -10, sanity: 20, runway: -10 }
  },
  {
    id: 3,
    text: "The CEO wants to pivot to 'Crypto for Pets' because he saw a tweet.",
    choiceA: { text: "Nod enthusiastically and update the deck.", effect: { hype: 40, sanity: -40, runway: -10 } },
    choiceB: "Explain why that's a bad idea.", effect: { hype: -20, sanity: 10, runway: -5 }
  },
  {
    id: 4,
    text: "Competitor just launched the exact same product but better.",
    choiceA: { text: "Panic and tweet cryptic shade.", effect: { hype: 15, sanity: -15, runway: 0 } },
    choiceB: "Focus on our 'unique value proposition' (we have none).", effect: { hype: -10, sanity: 5, runway: -5 }
  },
  {
    id: 5,
    text: "Server crashed during the big demo.",
    choiceA: { text: "Blame the wifi.", effect: { hype: -5, sanity: -10, runway: 0 } },
    choiceB: "Claim it's a 'load testing feature'.", effect: { hype: 20, sanity: -30, runway: 0 }
  }
];

// Badges based on final stats
const getBadge = (hype: number, sanity: number, runway: number) => {
  if (runway <= 0) return { title: "Bankrupt Visionary", desc: "You burned all the cash but looked cool doing it.", icon: Skull, color: "text-zinc-500" };
  if (sanity <= 0) return { title: "Burnout Legend", desc: "Product launched, but you are now a hermit.", icon: Brain, color: "text-orange-500" };
  if (hype >= 80) return { title: "Vaporware God", desc: "Nothing works, but everyone wants it.", icon: Zap, color: "text-purple-500" };
  if (hype <= 20) return { title: "Honest Failure", desc: "You told the truth and nobody cared.", icon: AlertTriangle, color: "text-blue-500" };
  return { title: "Average PMM", desc: "You survived. Mediocrity achieved.", icon: Trophy, color: "text-green-500" };
};

export default function LaunchSimulator() {
  const [started, setStarted] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [stats, setStats] = useState({ hype: 50, sanity: 50, runway: 50 });
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState<number[]>([]); // To track path

  const handleChoice = (choice: 'A' | 'B') => {
    // This function seems unused and has errors, removing logic inside or just removing it if not needed.
    // The actual game logic is in processChoice below.
    // I will remove this function to clean up the unused code causing errors.
  };

  // Re-defining SCENARIOS with correct structure for the component
  const GAME_DATA = [
    {
      id: 1,
      text: "Engineering says the 'AI Feature' is just an if/else statement.",
      choices: [
        { text: "Ship it anyway. Fake it 'til you make it.", effect: { hype: 30, sanity: -20, runway: 0 } },
        { text: "Delay launch to build a real model.", effect: { hype: -20, sanity: 10, runway: -30 } }
      ]
    },
    {
      id: 2,
      text: "Sales promised a feature that defies physics to close a deal.",
      choices: [
        { text: "Put 'Time Travel' on the roadmap.", effect: { hype: 20, sanity: -30, runway: 10 } },
        { text: "Tell Sales to apologize.", effect: { hype: -10, sanity: 20, runway: -10 } }
      ]
    },
    {
      id: 3,
      text: "CEO wants to pivot to 'Crypto for Pets' after reading a tweet.",
      choices: [
        { text: "Nod and update the deck.", effect: { hype: 40, sanity: -40, runway: -10 } },
        { text: "Explain why it's stupid.", effect: { hype: -20, sanity: 10, runway: 0 } }
      ]
    },
    {
      id: 4,
      text: "Server crashed during the live demo.",
      choices: [
        { text: "Blame the wifi.", effect: { hype: -5, sanity: -10, runway: 0 } },
        { text: "Call it a 'load testing feature'.", effect: { hype: 25, sanity: -20, runway: 0 } }
      ]
    },
    {
      id: 5,
      text: "Marketing budget is gone. You have $50 left.",
      choices: [
        { text: "Buy fake Twitter followers.", effect: { hype: 15, sanity: -5, runway: -5 } },
        { text: "Write a 'thought leadership' LinkedIn post.", effect: { hype: -5, sanity: -15, runway: 0 } }
      ]
    }
  ];

  const processChoice = (choiceIndex: number) => {
    const scenario = GAME_DATA[currentScenarioIndex];
    const effect = scenario.choices[choiceIndex].effect;

    const newStats = {
      hype: Math.min(100, Math.max(0, stats.hype + effect.hype)),
      sanity: Math.min(100, Math.max(0, stats.sanity + effect.sanity)),
      runway: Math.min(100, Math.max(0, stats.runway + effect.runway))
    };

    setStats(newStats);
    setHistory([...history, choiceIndex]);

    if (newStats.runway <= 0 || newStats.sanity <= 0) {
      setGameOver(true);
    } else if (currentScenarioIndex < GAME_DATA.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setStats({ hype: 50, sanity: 50, runway: 50 });
    setCurrentScenarioIndex(0);
    setGameOver(false);
    setHistory([]);
    posthog.capture('game_restarted');
  };

  const handleShare = (badge: any) => {
    posthog.capture('game_result_shared', { badge: badge.title });
    const text = encodeURIComponent(`I played the Launch Day Simulator by @thehonestpmm and earned the badge: "${badge.title}". 🚀💀 #LaunchDay #Vaporware`);
    const url = encodeURIComponent("https://thehonestpmm.com/launch-simulator");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const badge = gameOver ? getBadge(stats.hype, stats.sanity, stats.runway) : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[110] border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Abort Mission
          </Link>
          <div className="font-bold text-lg tracking-widest uppercase text-green-500">
             Launch.exe
          </div>
          <div className="w-20" />
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-4 pt-20 max-w-2xl mx-auto w-full">
        {!started ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-green-500 animate-pulse">
              <Zap className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Launch Day<br/><span className="text-green-500">Simulator</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-md mx-auto">
              Can you survive a product launch without burning out, going bankrupt, or losing your mind?
            </p>
            <Button 
              onClick={() => { setStarted(true); posthog.capture('game_started'); }}
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-12 py-8 rounded-none border-2 border-transparent hover:border-green-400 transition-all uppercase tracking-widest"
            >
              Start Simulation
            </Button>
          </motion.div>
        ) : gameOver && badge ? (
          <motion.div 
            key="game-over"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-zinc-900 border-2 border-zinc-800 p-8 rounded-xl text-center"
          >
            <div className={`w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center mx-auto mb-6 border-4 ${badge.color === 'text-purple-500' ? 'border-purple-500' : 'border-zinc-700'}`}>
              <badge.icon className={`w-10 h-10 ${badge.color}`} />
            </div>
            <div className="uppercase text-xs font-bold text-zinc-500 tracking-widest mb-2">Simulation Result</div>
            <h2 className={`text-3xl font-black mb-4 uppercase ${badge.color}`}>{badge.title}</h2>
            <p className="text-zinc-300 mb-8 leading-relaxed">
              {badge.desc}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8 text-center text-xs">
              <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
                <div className="text-purple-400 font-bold mb-1">Hype</div>
                <div>{stats.hype}%</div>
              </div>
              <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
                <div className="text-blue-400 font-bold mb-1">Sanity</div>
                <div>{stats.sanity}%</div>
              </div>
              <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
                <div className="text-green-400 font-bold mb-1">Runway</div>
                <div>{stats.runway}%</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => handleShare(badge)}
                className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-12 uppercase tracking-wide"
              >
                <Share2 className="w-4 h-4 mr-2" /> Share Result
              </Button>
              <Button 
                onClick={restartGame}
                variant="outline"
                className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white h-12 uppercase tracking-wide"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Try Again
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-xl">
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-purple-400">
                   <span>Hype</span>
                   <span>{stats.hype}%</span>
                 </div>
                 <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                   <motion.div 
                     className="h-full bg-purple-500" 
                     initial={{ width: `${stats.hype}%` }}
                     animate={{ width: `${stats.hype}%` }}
                   />
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-blue-400">
                   <span>Sanity</span>
                   <span>{stats.sanity}%</span>
                 </div>
                 <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                   <motion.div 
                     className="h-full bg-blue-500" 
                     initial={{ width: `${stats.sanity}%` }}
                     animate={{ width: `${stats.sanity}%` }}
                   />
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-green-400">
                   <span>Runway</span>
                   <span>{stats.runway}%</span>
                 </div>
                 <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                   <motion.div 
                     className="h-full bg-green-500" 
                     initial={{ width: `${stats.runway}%` }}
                     animate={{ width: `${stats.runway}%` }}
                   />
                 </div>
              </div>
            </div>

            {/* Scenario Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScenarioIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-zinc-900 border border-zinc-700 p-8 rounded-xl shadow-2xl relative"
              >
                 <div className="absolute -top-3 left-8 bg-zinc-950 px-3 py-1 text-xs font-mono text-zinc-500 border border-zinc-700">
                    SCENARIO {currentScenarioIndex + 1} / {GAME_DATA.length}
                 </div>
                 <h3 className="text-xl md:text-2xl font-bold leading-relaxed mb-8">
                   {GAME_DATA[currentScenarioIndex].text}
                 </h3>

                 <div className="space-y-4">
                    <button
                      onClick={() => processChoice(0)}
                      className="w-full text-left p-4 bg-zinc-950 border border-zinc-800 hover:border-green-500 hover:bg-green-950/10 transition-all rounded group"
                    >
                      <span className="text-green-500 font-bold mr-3 group-hover:underline">A.</span>
                      {GAME_DATA[currentScenarioIndex].choices[0].text}
                    </button>
                    <button
                      onClick={() => processChoice(1)}
                      className="w-full text-left p-4 bg-zinc-950 border border-zinc-800 hover:border-red-500 hover:bg-red-950/10 transition-all rounded group"
                    >
                      <span className="text-red-500 font-bold mr-3 group-hover:underline">B.</span>
                      {GAME_DATA[currentScenarioIndex].choices[1].text}
                    </button>
                 </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}