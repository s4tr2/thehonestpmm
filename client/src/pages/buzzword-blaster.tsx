import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Target, Trophy, Play, Skull, RefreshCw, Zap, Volume2, VolumeX, Share2 } from "lucide-react";
import posthog from "posthog-js";

// Buzzwords to destroy
const BUZZWORDS = [
  "Synergy", "Paradigm Shift", "GenAI", "Blockchain", "Deep Dive", "Touch Base",
  "Low Hanging Fruit", "Disruptive", "Circle Back", "Thought Leader", "Pivot",
  "Growth Hack", "Bandwidth", "Leverage", "Holistic", "Eco-system", "Next-Gen",
  "Robust", "Scalable", "Agile", "Digital Twin", "Metaverse", "Web3"
];

const POWERUPS = [
  { type: "coffee", label: "Double Shot", icon: "☕️", duration: 5000 },
  { type: "clear", label: "Reality Check", icon: "👓", duration: 0 } // Instant clear
];

type GameObject = {
  id: number;
  x: number;
  y: number;
  text: string;
  speed: number;
  type: "word" | "powerup";
  powerupType?: string;
  isHit?: boolean;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

export default function BuzzwordBlaster() {
  const [gameStatus, setGameStatus] = useState<"start" | "playing" | "gameover">("start");
  const [score, setScore] = useState(0);
  const [clarity, setClarity] = useState(100); // Health
  const [level, setLevel] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Game state refs (for loop performance)
  const objectsRef = useRef<GameObject[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const scoreRef = useRef(0);
  const clarityRef = useRef(100);
  const frameRef = useRef(0);
  const lastShotRef = useRef(0);

  // Initialize/Reset Game
  const startGame = () => {
    setGameStatus("playing");
    setScore(0);
    setClarity(100);
    setLevel(1);
    objectsRef.current = [];
    particlesRef.current = [];
    scoreRef.current = 0;
    clarityRef.current = 100;
    posthog.capture('game_buzzword_blaster_start');
  };

  const handleShare = () => {
    const text = `I just blasted corporate jargon and scored ${score} in Buzzword Blaster! Can you beat my clarity score? #HonestPMM`;
    const url = "https://thehonestpmm.com/buzzword-blaster"; 
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const spawnObject = (width: number) => {
    const isPowerup = Math.random() < 0.05; // 5% chance
    const id = Date.now() + Math.random();
    
    if (isPowerup) {
      const p = POWERUPS[Math.floor(Math.random() * POWERUPS.length)];
      objectsRef.current.push({
        id,
        x: Math.random() * (width - 60) + 30,
        y: -50,
        text: p.icon,
        speed: 1 + Math.random(),
        type: "powerup",
        powerupType: p.type
      });
    } else {
      objectsRef.current.push({
        id,
        x: Math.random() * (width - 100) + 50,
        y: -50,
        text: BUZZWORDS[Math.floor(Math.random() * BUZZWORDS.length)],
        speed: 1.5 + (level * 0.4) + Math.random(),
        type: "word"
      });
    }
  };

  const createExplosion = (x: number, y: number, color: string) => {
    for (let i = 0; i < 12; i++) {
      particlesRef.current.push({
        id: Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1.0,
        color
      });
    }
  };

  // Game Loop
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = (timestamp: number) => {
      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn Logic
      if (timestamp - lastSpawnRef.current > Math.max(400, 1800 - (level * 150))) {
        spawnObject(canvas.width);
        lastSpawnRef.current = timestamp;
      }

      // Update & Draw Objects
      objectsRef.current = objectsRef.current.filter(obj => {
        obj.y += obj.speed;

        // Draw
        ctx.font = obj.type === "powerup" ? "30px Arial" : "bold 16px Inter";
        ctx.fillStyle = obj.type === "powerup" ? "#FFF" : "#fff";
        ctx.textAlign = "center";
        
        if (obj.type === "word") {
            // Glow effect for words
            ctx.shadowColor = "#FF3366";
            ctx.shadowBlur = 10;
        } else {
            ctx.shadowColor = "#00FF99";
            ctx.shadowBlur = 15;
        }
        
        ctx.fillText(obj.text, obj.x, obj.y);
        ctx.shadowBlur = 0; // Reset

        // Hit player check (Bottom of screen)
        if (obj.y > canvas.height - 50) {
          if (obj.type === "word") {
            clarityRef.current -= 10;
            setClarity(clarityRef.current);
            createExplosion(obj.x, obj.y, "#FF0000");
            if (clarityRef.current <= 0) {
              setGameStatus("gameover");
              posthog.capture('game_buzzword_blaster_over', { score: scoreRef.current });
            }
          }
          return false;
        }
        return true;
      });

      // Update & Draw Particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        p.vy += 0.2; // Gravity

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        return p.life > 0;
      });

      // Draw Player (Shooter)
      ctx.save();
      ctx.translate(mousePos.x, canvas.height - 50);
      
      // Spaceship body
      ctx.fillStyle = "#3366FF";
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(15, 15);
      ctx.lineTo(0, 5);
      ctx.lineTo(-15, 15);
      ctx.closePath();
      ctx.fill();
      
      // Engine flame
      ctx.fillStyle = `rgba(255, 100, 0, ${Math.random()})`;
      ctx.beginPath();
      ctx.moveTo(-5, 10);
      ctx.lineTo(0, 25);
      ctx.lineTo(5, 10);
      ctx.fill();
      
      ctx.restore();

      // Difficulty ramping
      if (scoreRef.current > level * 500) {
        setLevel(l => l + 1);
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameRef.current);
  }, [gameStatus, level, mousePos]);

  // Input Handling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };
    
    // Shoot on click
    const handleClick = () => {
        if (gameStatus !== "playing") return;
        
        // Simple raycast shooting
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        // Find closest object in vertical line with mouse
        // We'll give it a generous hit box width
        const hitWidth = 60; 
        
        const hitIndex = objectsRef.current.findIndex(obj => 
            Math.abs(obj.x - mousePos.x) < hitWidth && 
            obj.y < canvas.height - 50 && 
            obj.y > 0
        );

        if (hitIndex !== -1) {
            const obj = objectsRef.current[hitIndex];
            
            // Effect
            if (obj.type === "word") {
                createExplosion(obj.x, obj.y, "#3366FF");
                scoreRef.current += 100;
                setScore(scoreRef.current);
            } else {
                createExplosion(obj.x, obj.y, "#00FF00");
                if (obj.powerupType === "clear") {
                    // Nuke everything
                    objectsRef.current.forEach(o => createExplosion(o.x, o.y, "#FFF"));
                    objectsRef.current = [];
                    scoreRef.current += 500;
                } else if (obj.powerupType === "coffee") {
                   clarityRef.current = Math.min(100, clarityRef.current + 20);
                   setClarity(clarityRef.current);
                }
            }
            
            // Remove
            objectsRef.current.splice(hitIndex, 1);
        } else {
            // Miss effect
             // createExplosion(mousePos.x, canvas.height - 100, "#555");
        }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);
    
    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleClick);
    };
  }, [gameStatus, mousePos]);

  // Window Resize
  useEffect(() => {
    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden relative cursor-crosshair">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 pointer-events-none">
        <div className="flex flex-col gap-2">
           <Link href="/" className="pointer-events-auto flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2">
             <ArrowLeft className="w-4 h-4" /> Back to Reality
           </Link>
           <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
             Buzzword Blaster
           </h1>
           <div className="text-sm text-slate-400">Level {level}</div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <div className="text-4xl font-mono font-bold text-white tabular-nums">
             {score.toString().padStart(6, '0')}
           </div>
           
           <div className="flex items-center gap-3 bg-slate-900/50 backdrop-blur p-2 rounded-lg border border-slate-800">
             <div className="flex items-center gap-2">
               <Zap className="w-4 h-4 text-yellow-400" />
               <span className="text-sm font-bold text-slate-300">Clarity</span>
             </div>
             <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all duration-300 ${clarity > 50 ? 'bg-green-500' : clarity > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                 style={{ width: `${clarity}%` }}
               />
             </div>
             <div className="text-xs font-mono w-8 text-right">{Math.round(clarity)}%</div>
           </div>
        </div>
      </div>

      {/* Game Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Start Screen */}
      <AnimatePresence>
        {gameStatus === "start" && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl text-center">
              <Target className="w-16 h-16 text-blue-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-2">Defend Your Roadmap</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Buzzwords are raining from the C-Suite! Shoot them down before they drain your "Clarity" and force you into a pivot.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="bg-slate-800 p-3 rounded-lg flex flex-col items-center gap-2">
                  <span className="text-2xl">🖱️</span>
                  <span>Move Mouse to Aim</span>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg flex flex-col items-center gap-2">
                  <span className="text-2xl">💥</span>
                  <span>Click to Clarify</span>
                </div>
              </div>

              <Button onClick={startGame} size="lg" className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                Start Mission
              </Button>
            </div>
          </motion.div>
        )}

        {/* Game Over Screen */}
        {gameStatus === "gameover" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="absolute inset-0 z-20 flex items-center justify-center bg-red-950/80 backdrop-blur-md p-4"
          >
             <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
               
               <Skull className="w-16 h-16 text-red-500 mx-auto mb-4" />
               <h2 className="text-3xl font-bold mb-2 text-white">Disrupted!</h2>
               <p className="text-red-200/70 mb-6">
                 You ran out of clarity. The company has pivoted to "Blockchain for Pets".
               </p>

               <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
                 <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Final Score</div>
                 <div className="text-5xl font-mono font-bold text-white">{score}</div>
               </div>

               <div className="flex flex-col gap-3">
                 <Button onClick={handleShare} size="lg" className="w-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white font-bold gap-2">
                   <Share2 className="w-4 h-4" /> Share Score
                 </Button>
                 <Button onClick={startGame} size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold">
                   <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                 </Button>
                 <Link href="/">
                   <Button variant="ghost" className="w-full text-slate-400 hover:text-white">
                     Return to Safety
                   </Button>
                 </Link>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}