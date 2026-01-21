import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Layers,
    Lock,
    Zap,
    MousePointer2,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Search,
    Globe,
    Users,
    ArrowRight
} from "lucide-react";

const Home = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-accent/30 selection:text-accent-foreground">
            <Navbar scrolled={scrolled} />
            <HeroSection />
            <FeaturesGrid />
            <PricingSection />
            <Footer />
            <CommentaryBubble />
        </div>
    );
};

const Navbar = ({ scrolled }: { scrolled: boolean }) => (
    <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"
            }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <Layers size={20} />
                </div>
                <span className="font-display font-bold text-lg tracking-tight">NameIsLogo</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
                {["Vaporware", "Victims", "Extortion"].map((link) => (
                    <a key={link} href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        {link}
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors hidden sm:block">
                    Login (Broken)
                </button>
                <button className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                    Schedule a Demo
                </button>
            </div>
        </div>
    </motion.nav>
);

const HeroSection = () => {
    return (
        <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 mesh-light -z-10" />

            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-primary/20 shadow-sm mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                    </span>
                    <span className="text-sm font-medium text-primary">Pre-Revenue but Highly Valued</span>
                </motion.div>

                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-foreground mb-8 max-w-4xl mx-auto">
                        We built this just to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            Get Acquired
                        </span>
                    </h1>


                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row items-center gap-4 mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <button className="h-12 px-8 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
                        Schedule a Demo
                    </button>
                    <button className="h-12 px-8 rounded-full bg-white text-foreground border border-input font-bold shadow-sm hover:bg-secondary transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-accent border-b-[4px] border-b-transparent ml-0.5"></div>
                        </div>
                        Watch Staged Demo
                    </button>
                </motion.div>

                <DashboardMockup />
            </div>
        </section>
    );
};

const DashboardMockup = () => {
    return (
        <motion.div
            className="w-full max-w-5xl mx-auto rounded-xl border border-border bg-white shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
        >
            {/* Fake Browser Toolbar */}
            <div className="bg-slate-50 border-b border-border p-3 flex items-center gap-4">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]"></div>
                </div>
                <div className="ml-4 flex-1 max-w-md bg-white border border-border h-8 rounded-lg flex items-center px-3 gap-2 text-xs text-muted-foreground shadow-sm mx-auto">
                    <Lock size={12} className="text-muted-foreground/50" />
                    <span>app.nameislogo.com</span>
                </div>
                <div className="w-16"></div> {/* Spacer to center URL */}
            </div>

            {/* App UI */}
            <div className="flex h-[600px] text-left">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-border p-6 hidden md:flex flex-col gap-8">
                    {/* Logo Area */}
                    <div className="bg-primary w-8 h-8 rounded-lg mb-2"></div>

                    {/* Main Menu */}
                    <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Main</div>
                        <div className="space-y-1">
                            {["Overview", "Performance", "Team"].map((item, i) => (
                                <div
                                    key={item}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-3 ${i === 0 ? "bg-[#F3E8FF] text-primary" : "text-slate-600 hover:bg-slate-50"}`}
                                >
                                    {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-primary absolute left-10 opacity-0 md:opacity-0 lg:opacity-100"></div>}
                                    {i === 0 ? <span className="text-primary"><Layers size={18} /></span> : i === 1 ? <span className="text-slate-400"><TrendingUp size={18} /></span> : <span className="text-slate-400"><div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300"></div></span>}
                                    {item}
                                    {i === 0 && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Workspace Menu */}
                    <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Workspace</div>
                        <div className="space-y-1">
                            {["Projects", "Documents", "Reports"].map((item) => (
                                <div key={item} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-3">
                                    <span className="text-slate-400"><div className="w-4 h-4 border border-slate-300 rounded-[2px]" /></span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-[#FAFAFA] p-8 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            {/* Tabs/Breadcrumbs could go here */}
                            <div className="flex items-center gap-4 bg-slate-100/50 rounded-lg p-1 w-fit border border-border/50">
                                <div className="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-semibold text-foreground">Dashboard</div>
                                <div className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Analytics</div>
                                <div className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Settings</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-foreground"><Search size={18} /></button>
                            <button className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-foreground"><AlertCircle size={18} /></button>
                            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-full"></div>
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Revenue Card (Spans 2 cols) */}
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Revenue (Projected)</div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-4xl font-display font-bold text-foreground">$4.2M</div>
                                        <div className="flex items-center gap-1 text-sm font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                                            <TrendingUp size={14} /> 12%
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded uppercase tracking-wide">Live</span>
                                    <div className="flex bg-slate-100 rounded-lg p-0.5">
                                        {['1D', '1W', '1M', '1Y'].map((t, i) => (
                                            <div key={t} className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${i === 2 ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{t}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="h-48 flex items-end justify-between gap-3">
                                {[40, 65, 45, 80, 60, 85, 95, 100].map((h, i) => (
                                    <div key={i} className="flex-1 group relative flex flex-col justify-end h-full">
                                        <div
                                            className={`w-full rounded-t-lg transition-all duration-300 ${i > 4 ? 'bg-[#A78BFA]' : 'bg-[#C4B5FD]'}`}
                                            style={{ height: `${h}%` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity Panel */}
                        <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Activity</div>
                                <ArrowRight size={14} className="text-muted-foreground" />
                            </div>
                            <div className="space-y-6">
                                {[
                                    { title: "System optimized", time: "Just now", color: "bg-emerald-100 text-emerald-600", icon: <CheckCircle2 size={14} /> },
                                    { title: "API latency reduced", time: "2m ago", color: "bg-emerald-100 text-emerald-600", icon: <CheckCircle2 size={14} /> },
                                    { title: "Database backup", time: "1h ago", color: "bg-blue-100 text-blue-600", icon: <div className="w-2 h-2 bg-current rounded-full" /> },
                                    { title: "Design system update", time: "3h ago", color: "bg-blue-100 text-blue-600", icon: <div className="w-2 h-2 bg-current rounded-full" /> },
                                    { title: "Index refresh scheduled", time: "5h ago", color: "bg-orange-100 text-orange-600", icon: <Zap size={14} /> }

                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                                            {item.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-foreground truncate">{item.title}</div>
                                            <div className="text-xs text-muted-foreground">{item.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="lg:col-span-3 grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm flex items-center justify-between">
                                <div>
                                    <div className="p-2 bg-red-50 rounded-lg w-fit mb-3"><Zap size={18} className="text-red-500" /></div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Burn Rate</div>
                                    <div className="text-2xl font-bold text-foreground">$450k/mo</div>
                                </div>
                                <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded-full">+24%</span>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm flex items-center justify-between">
                                <div>
                                    <div className="p-2 bg-orange-50 rounded-lg w-fit mb-3"><TrendingUp size={18} className="text-orange-500" /></div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Runway</div>
                                    <div className="text-2xl font-bold text-foreground">4 Weeks</div>
                                </div>
                                <span className="text-xs font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-full">Critical</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    )
}


const FeaturesGrid = () => {
    return (
        <section id="features" className="py-24 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Features we promised investors</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">We haven't built most of these, but they looked great in the pitch deck.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Zero Latency */}
                    <FeatureCard className="md:col-span-2 bg-white border border-border p-8 pb-0 overflow-hidden group">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                <Zap className="w-5 h-5 text-purple-600" fill="currentColor" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-display text-foreground">Zero Latency</h3>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                    Our dashboard loads instantly because there is absolutely zero data processing happening. It's just HTML.
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 rounded-t-xl border border-border border-b-0 bg-slate-50/50 p-6 relative overflow-hidden h-[200px] flex flex-col items-center justify-center">
                            <div className="w-full text-center relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-border text-xs font-mono text-muted-foreground mb-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    latency_check.sh
                                </div>
                                <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-600 tracking-tighter">
                                    0ms
                                </div>
                                <div className="mt-2 text-xs font-mono text-muted-foreground/60 bg-gray-100 inline-block px-2 py-1 rounded">
                                    Ping: 0.000001ms
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,33,177,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-100"></div>
                        </div>
                    </FeatureCard>

                    {/* Card 2: Security Theater */}
                    <FeatureCard className="md:col-span-1 bg-white border border-border p-8 flex flex-col group">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                <Lock className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-display text-foreground">Security Theater</h3>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                    We put a lock icon next to the URL bar. That means we're SOC-2 compliant, right? (Don't check).
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center min-h-[180px] relative">
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 rounded-full scale-150"></div>
                                <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-xl text-white relative z-10 rotate-3 transition-transform group-hover:rotate-6 group-hover:scale-105 duration-500">
                                    <Lock size={40} />
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg border border-green-100 flex items-center gap-1.5 whitespace-nowrap z-20">
                                    <CheckCircle2 size={12} className="text-green-500 fill-green-500" />
                                    <span className="text-[10px] font-bold text-green-700 tracking-wide uppercase">Verified</span>
                                </div>
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Card 3: Remote First */}
                    <FeatureCard className="md:col-span-1 bg-white border border-border p-8 flex flex-col group">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                <Globe className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-display text-foreground">Remote First</h3>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                    Which means our support team is asleep when you need them because they're in a different time zone.
                                </p>
                            </div>
                        </div>
                        <div className="mt-auto bg-slate-50 rounded-xl p-4 border border-border/50">
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { city: "SF", time: "10:00 AM", active: true },
                                    { city: "LONDON", time: "6:00 PM", active: false },
                                    { city: "TOKYO", time: "2:00 AM", active: false },
                                    { city: "DUBAI", time: "9:00 PM", active: false },
                                ].map((item) => (
                                    <div key={item.city} className="bg-white rounded-lg p-3 text-center shadow-sm border border-border/50">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{item.city}</div>
                                        <div className="text-xs font-bold text-foreground mb-1">{item.time}</div>
                                        <div className={`w-1.5 h-1.5 rounded-full mx-auto ${item.active ? "bg-green-500" : "bg-slate-300"}`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Card 4: Multi-User Chaos */}
                    <FeatureCard className="md:col-span-2 bg-white border border-border p-8 pb-0 overflow-hidden group">
                        <div className="flex items-start gap-4 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0 text-purple-600">
                                <Users size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-display text-foreground">Multi-User Chaos</h3>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-md">
                                    Overwrite each other's work in real-time with our buggy WebSocket implementation. Last save wins!
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 rounded-t-xl border border-border border-b-0 bg-slate-50 relative overflow-hidden h-[280px]">
                            {/* Dot Grid Background */}
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                                backgroundSize: '24px 24px'
                            }}></div>

                            {/* Canvas Area */}
                            <div className="absolute inset-0 m-6 bg-white/60 backdrop-blur-sm rounded-xl border border-border/60 shadow-sm overflow-hidden p-6">
                                {/* Skeleton UI */}
                                <div className="space-y-4 mb-8 opacity-30">
                                    <div className="h-2 bg-slate-400 rounded-full w-3/4"></div>
                                    <div className="h-2 bg-slate-400 rounded-full w-1/2"></div>
                                    <div className="h-2 bg-slate-400 rounded-full w-5/6"></div>
                                </div>
                                <div className="h-32 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
                                    <span className="text-slate-400 font-medium text-sm">Drag & Drop Here</span>
                                </div>

                                {/* Animated Cursors */}
                                <Cursor
                                    color="#ef4444"
                                    label="Dave"
                                    initial={{ top: "20%", left: "80%" }}
                                    animate={{ top: ["20%", "70%", "30%", "80%", "20%"], left: ["80%", "20%", "60%", "30%", "80%"] }}
                                    duration={4}
                                />
                                <Cursor
                                    color="#3b82f6"
                                    label="Sarah"
                                    initial={{ top: "60%", left: "30%" }}
                                    animate={{ top: ["60%", "20%", "80%", "40%", "60%"], left: ["30%", "70%", "20%", "60%", "30%"] }}
                                    duration={5}
                                    delay={0.5}
                                />
                                <Cursor
                                    color="#22c55e"
                                    label="Mike"
                                    initial={{ top: "40%", left: "50%" }}
                                    animate={{ top: ["40%", "80%", "20%", "90%", "40%"], left: ["50%", "80%", "30%", "10%", "50%"] }}
                                    duration={4.5}
                                    delay={1}
                                />
                                <Cursor
                                    color="#e11d48"
                                    label="You"
                                    initial={{ top: "80%", left: "20%" }}
                                    animate={{ top: ["80%", "10%", "50%", "30%", "80%"], left: ["20%", "50%", "90%", "40%", "20%"] }}
                                    duration={3.5}
                                    delay={1.5}
                                    customColor="#f59e0b"
                                />
                            </div>
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    )
}

const FeatureCard = ({ children, className }: any) => (
    <motion.div
        className={`rounded-2xl relative shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${className}`}
        whileHover={{ y: -5 }}
    >
        {children}
    </motion.div>
)

const Cursor = ({ color, label, initial, animate, duration, delay, customColor }: any) => {
    const finalColor = customColor || color;
    return (
        <motion.div
            className="absolute z-20 pointer-events-none"
            initial={initial}
            animate={animate}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay || 0
            }}
        >
            <MousePointer2 fill={finalColor} color={finalColor} className="w-5 h-5 transform -rotate-[15deg] drop-shadow-md" />
            <div
                className="px-2.5 py-1 rounded-full text-white text-[10px] font-bold absolute left-3 top-3 shadow-sm whitespace-nowrap"
                style={{ backgroundColor: finalColor }}
            >
                {label}
            </div>
        </motion.div>
    )
}

const PricingSection = () => {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Transparent Extortion</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">Choose the plan that best fits your budget (and our revenue goals).</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Decoy Tier */}
                    <div className="p-8 rounded-2xl border border-border bg-white shadow-sm opacity-70 hover:opacity-100 transition-opacity">
                        <div className="text-lg font-bold text-muted-foreground mb-2">Decoy Tier</div>
                        <div className="text-4xl font-display font-bold mb-4">$49<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                        <p className="text-sm text-muted-foreground mb-6">Ugly features designed to make you upgrade.</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-muted-foreground" /> No support</li>
                            <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-muted-foreground" /> 1 User (Shared login)</li>
                            <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-muted-foreground" /> Watermarked Exports</li>
                        </ul>
                        <button className="w-full py-3 rounded-xl border border-input font-bold text-foreground hover:bg-secondary transition-colors">Start Misery</button>
                    </div>

                    {/* Highly Recommended */}
                    <div className="p-8 rounded-2xl border-2 border-primary bg-white shadow-2xl shadow-primary/10 relative transform md:-translate-y-4">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                            VC's CHOICE
                        </div>
                        <div className="text-lg font-bold text-primary mb-2">Burn Rate Tier</div>
                        <div className="text-4xl font-display font-bold mb-4">$199<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                        <p className="text-sm text-muted-foreground mb-6">The only usable version of the product.</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 size={16} className="text-primary" /> Dark Mode</li>
                            <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 size={16} className="text-primary" /> Priority Ignore Status</li>
                            <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 size={16} className="text-primary" /> API Access (Rate limited)</li>
                        </ul>
                        <button className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all">Get Robbed</button>
                    </div>

                    {/* Enterprise */}
                    <div className="p-8 rounded-2xl border border-border bg-slate-50 shadow-sm flex flex-col">
                        <div className="text-lg font-bold text-foreground mb-2">Enterprise</div>
                        <div className="text-4xl font-display font-bold mb-4">$$$<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                        <p className="text-sm text-muted-foreground mb-6">If you have to ask, you can afford it.</p>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-foreground" /> Dedicated Scapegoat</li>
                            <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-foreground" /> SOC2 Report PDF</li>
                            <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-foreground" /> Zoom calls with Founder</li>
                        </ul>
                        <button className="w-full py-3 rounded-xl border-2 border-foreground bg-transparent font-bold text-foreground hover:bg-foreground hover:text-white transition-colors">Talk to Sales (Good Luck)</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Footer = () => (
    <footer id="footer" className="border-t border-border py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center text-white">
                    <Layers size={14} />
                </div>
                <span className="font-bold text-sm">NameIsLogo</span>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
                © {new Date().getFullYear()} Vaporware Inc. Delaware C-Corp. <br />
                Made with panic and coffee by <a href="#" className="underline">Design Engineer</a>.
            </div>
        </div>
    </footer>
)

const CommentaryBubble = () => {
    const [content, setContent] = useState({
        text: "Oh look, another gradient headline. Groundbreaking.",
        expression: "neutral"
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after initial load
        const timer = setTimeout(() => setIsVisible(true), 1000);

        const handleScroll = () => {
            const sections = [
                { id: "hero", text: "Oh look, another gradient headline. Groundbreaking.", expression: "neutral" },
                { id: "features", text: "We literally haven't built any of this.", expression: "eyeroll" },
                { id: "pricing", text: "Please just give us money. My equity is worthless.", expression: "tired" },
                { id: "footer", text: "You're still here? We ran out of runway 5 minutes ago.", expression: "tired" }
            ];

            // Default to first comment if at top
            if (window.scrollY < 100) {
                setContent({ text: sections[0].text, expression: sections[0].expression });
                return;
            }

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if section is roughly in the middle of the viewport
                    if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                        setContent({ text: section.text, expression: section.expression });
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        }
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-0 right-6 z-50 flex items-end gap-3 max-w-[300px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <motion.div
                        className="bg-white border-2 border-black rounded-[2rem] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] text-lg font-hand font-bold text-black relative max-w-[280px] mb-8 leading-tight tracking-wide"
                        key={content.text} // Re-animate on comment change
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                        {content.text}

                        {/* Comic Tail */}
                        <svg className="absolute -bottom-[25px] right-10 w-8 h-8 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.1))" }}>
                            <path d="M32.5 0C25 0 20 15 0 32.5C12 28 20 15 28 0H32.5Z" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round" />
                            {/* Cover the top border of the tail to merge with bubble */}
                            <path d="M0 0H40" stroke="white" strokeWidth="4" transform="translate(-2, 1)" />
                        </svg>
                    </motion.div>

                    <div className="relative shrink-0 w-32 h-32">
                        {/* Avatar Image - Static positioned to pop out */}
                        <img
                            key={content.expression}
                            src={`/Avatar/${content.expression}.png`}
                            alt="The Honest PMM"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] max-w-none drop-shadow-sm"
                            style={{ height: 'auto' }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Home;
