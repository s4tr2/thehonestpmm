import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Layers, Lock, Zap, Globe, MousePointer2,
    CheckCircle2, TrendingUp, AlertCircle,
    BarChart3, Activity, Users,
    Bell, Settings
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                isScrolled ? "bg-white/80 backdrop-blur-xl border-border/40 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <Layers size={18} />
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight">NameIsLogo</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <a href="#vaporware" className="hover:text-primary transition-colors">Vaporware</a>
                    <a href="#victims" className="hover:text-primary transition-colors">Victims</a>
                    <a href="#extortion" className="hover:text-primary transition-colors">Extortion</a>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hidden sm:block text-sm font-medium text-gray-500 hover:text-gray-900">
                        Login (Broken)
                    </button>
                    <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
                        Schedule a Demo
                    </button>
                </div>
            </div>
        </nav>
    );
};

const FakeDashboard = () => {
    return (
        <div className="relative w-full max-w-5xl mx-auto -mt-12 lg:-mt-20 z-10 perspective-1000">
            <motion.div
                initial={{ rotateX: 10, opacity: 0, y: 50 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden ring-1 ring-black/5"
            >
                {/* Browser Chrome */}
                <div className="h-10 bg-gray-50 border-b border-border flex items-center px-4 justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex bg-white border border-border rounded-md px-3 py-1 items-center gap-2 text-xs text-gray-500 w-1/2 justify-center shadow-sm">
                        <Lock size={10} className="text-green-500" />
                        <span>app.nameislogo.com/dashboard/burn-money</span>
                    </div>
                    <div className="w-16" />
                </div>

                {/* App Content */}
                <div className="flex h-[500px]">
                    {/* Sidebar */}
                    <div className="w-60 border-r border-border bg-gray-50/50 p-4 flex flex-col gap-1">
                        <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Platform</div>
                        {['Overview', 'Analytics', 'Users', 'Settings'].map((item, i) => (
                            <div
                                key={item}
                                className={cn(
                                    "px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors flex items-center gap-3",
                                    i === 0 ? "bg-white shadow text-primary" : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900"
                                )}
                            >
                                {i === 0 && <Activity size={16} />}
                                {i === 1 && <BarChart3 size={16} />}
                                {i === 2 && <Users size={16} />}
                                {i === 3 && <Settings size={16} />}
                                {item}
                            </div>
                        ))}

                        <div className="mt-auto">
                            <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                                <div className="text-xs font-bold text-primary mb-1">Trial Ending</div>
                                <div className="text-[10px] text-gray-600 mb-2">4 days until we charge your card $9,000</div>
                                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full w-[85%] bg-primary rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-auto bg-gray-50/30 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Mission Control</h2>
                                <div className="text-sm text-gray-500">Last updated: Just now (via cron job)</div>
                            </div>
                            <div className="flex gap-3">
                                <button className="p-2 text-gray-400 hover:text-gray-600"><Bell size={20} /></button>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-8">
                            {/* Stat Cards */}
                            <div className="bg-white p-5 rounded-lg border border-border shadow-sm">
                                <div className="text-sm font-medium text-gray-500 mb-1">MRR (Fake)</div>
                                <div className="text-2xl font-bold text-gray-900">$124,500</div>
                                <div className="flex items-center gap-1 text-green-500 text-xs mt-2 font-medium">
                                    <TrendingUp size={12} />
                                    <span>+12% vs last month</span>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-border shadow-sm">
                                <div className="text-sm font-medium text-gray-500 mb-1">Burn Rate</div>
                                <div className="text-2xl font-bold text-gray-900">$850,000</div>
                                <div className="flex flex-col gap-1 mt-3">
                                    <div className="flex justify-between text-xs font-bold text-red-500">
                                        <span>CRITICAL</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="h-1.5 bg-red-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-red-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: "85%" }}
                                            transition={{ delay: 1, duration: 1.5 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-border shadow-sm">
                                <div className="text-sm font-medium text-gray-500 mb-1">Runway</div>
                                <div className="text-2xl font-bold text-gray-900">4 Weeks</div>
                                <div className="flex items-center gap-1 text-orange-500 text-xs mt-2 font-medium">
                                    <AlertCircle size={12} />
                                    <span>Before bankruptcy</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 h-64">
                            <div className="col-span-2 bg-white rounded-lg border border-border shadow-sm p-6 flex flex-col">
                                <div className="text-sm font-bold text-gray-900 mb-6">Revenue vs. Reality</div>
                                <div className="flex-1 flex items-end justify-between gap-4">
                                    {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                                            viewport={{ once: true }}
                                            className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-sm relative group cursor-pointer"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                ${h}k (Projected)
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-border shadow-sm p-6">
                                <div className="text-sm font-bold text-gray-900 mb-4">System Activity</div>
                                <div className="space-y-4">
                                    {[
                                        { text: 'Server costs doubled', icon: Activity, color: 'text-red-500' },
                                        { text: 'Optimized nothing', icon: Zap, color: 'text-yellow-500' },
                                        { text: 'Deploying bug to prod', icon: AlertCircle, color: 'text-blue-500' },
                                        { text: 'Investor update sent', icon: CheckCircle2, color: 'text-green-500' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs">
                                            <div className={cn("p-1.5 rounded-md bg-gray-50", item.color)}>
                                                <item.icon size={14} />
                                            </div>
                                            <span className="text-gray-600">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const FeatureCard = ({ title, description, icon: Icon, children, className }: { title: string, description?: string, icon?: any, children: React.ReactNode, className?: string }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        className={cn(
            "group relative bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden",
            className
        )}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-4">
                {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-primary">
                        <Icon size={20} />
                    </div>
                )}
                <h3 className="text-lg font-bold font-heading text-gray-900">{title}</h3>
            </div>

            {description && (
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    {description}
                </p>
            )}

            <div className="flex-1 w-full bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden relative">
                {children}
            </div>
        </div>
    </motion.div>
);

const PricingCard = ({ title, price, description, isHighlighted, features }: any) => (
    <motion.div
        whileHover={{ y: -8 }}
        className={cn(
            "relative p-8 rounded-2xl border flex flex-col",
            isHighlighted
                ? "bg-gray-900 text-white border-gray-800 shadow-2xl shadow-primary/20"
                : "bg-white text-gray-900 border-gray-200"
        )}
    >
        {isHighlighted && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent to-primary rounded-full text-xs font-bold text-white shadow-lg">
                VC's Choice
            </div>
        )}
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="mb-4">
            <span className="text-4xl font-extrabold font-heading">{price}</span>
            {price !== 'Hidden' && <span className="text-sm opacity-60">/mo</span>}
        </div>
        <p className="text-sm opacity-80 mb-8 leading-relaxed">{description}</p>

        <div className="flex-1 space-y-4 mb-8">
            {features.map((feat: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", isHighlighted ? "bg-primary text-white" : "bg-primary/10 text-primary")}>
                        <CheckCircle2 size={12} />
                    </div>
                    <span className="opacity-90">{feat}</span>
                </div>
            ))}
        </div>

        <button className={cn(
            "w-full py-3 rounded-xl font-bold transition-all text-sm",
            isHighlighted
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "bg-gray-900 text-white hover:bg-gray-800"
        )}>
            {isHighlighted ? "Start Burning Cash" : "Sign Up"}
        </button>
    </motion.div>
);

const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden selection:bg-primary/20 selection:text-primary">
            <Navbar />

            {/* Mesh Background */}
            <div className="fixed inset-0 mesh-light pointer-events-none -z-10" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-40 px-6 overflow-visible">
                <div className="max-w-7xl mx-auto text-center relative z-20">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border shadow-sm mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">Pre-Revenue but Highly Valued</span>
                    </motion.div>

                    <div className="relative">
                        <h1 className="text-5xl md:text-7xl font-extrabold font-heading tracking-tight text-gray-900 mb-6 leading-[1.1]">
                            We built this just to <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                                Get Acquired
                            </span>
                        </h1>
                    </div>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        The world's first platform designed solely to increase our valuation.
                        No users? No problem. We have a cool landing page and a .ai domain.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto">
                            Schedule a Demo
                        </button>
                        <button className="px-8 py-4 rounded-xl bg-white text-gray-900 border border-gray-200 font-bold text-lg shadow-sm hover:bg-gray-50 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-gray-900 border-b-[4px] border-b-transparent ml-0.5" />
                            </span>
                            Watch Staged Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Fake Dashboard */}
            <section className="px-4 pb-32">
                <FakeDashboard />
            </section>

            {/* Bento Grid Features */}
            <section className="py-24 max-w-7xl mx-auto px-6" id="vaporware">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold font-heading mb-4">Features we promised investors</h2>
                    <p className="text-gray-500">We haven't built any of these, but they look great in the pitch deck.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {/* Card 1: Zero Latency */}
                    <FeatureCard
                        title="Zero Latency"
                        description="Our dashboard loads instantly because there is absolutely zero data processing happening. It's just HTML."
                        icon={Zap}
                        className="md:col-span-1"
                    >
                        <div className="w-full h-full flex items-center justify-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                            <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="font-mono text-[10px] text-gray-400">latency_check.sh</span>
                                </div>
                                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-300 to-purple-500 font-heading tracking-tighter mb-4">
                                    0ms
                                </div>
                                <div className="bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-mono text-gray-500 border border-gray-100">
                                    Ping: 0.000001ms
                                </div>
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Card 2: Security Theater */}
                    <FeatureCard
                        title="Security Theater"
                        description="We put a lock icon next to the URL bar. That means we're SOC-2 compliant, right? (Don't check)."
                        icon={Lock}
                        className="md:col-span-2"
                    >
                        <div className="w-full h-full flex items-center justify-center relative bg-gradient-to-br from-purple-50/50 to-white">
                            <div className="relative">
                                <div className="relative z-10 bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col items-center gap-4">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                                        <Lock size={40} strokeWidth={2.5} />
                                    </div>
                                    <div className="absolute -bottom-4 bg-white/90 backdrop-blur border border-green-100 text-green-600 text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                                        <CheckCircle2 size={12} className="text-green-500" />
                                        VERIFIED
                                    </div>
                                </div>
                                {/* Decorative Blur */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-400/20 blur-3xl -z-10" />
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Card 3: Remote First */}
                    <FeatureCard
                        title="Remote First"
                        description="Which means our support team is asleep when you need them because they're in a different time zone."
                        icon={Globe}
                        className="md:col-span-1"
                    >
                        <div className="w-full h-full flex items-center justify-center p-6">
                            <div className="grid grid-cols-2 gap-4 w-full">
                                {[
                                    { city: 'SF', time: '10:00 AM', active: true },
                                    { city: 'LONDON', time: '6:00 PM', active: true },
                                    { city: 'TOKYO', time: '2:00 AM', active: false },
                                    { city: 'DUBAI', time: '9:00 PM', active: false },
                                ].map(c => (
                                    <div key={c.city} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
                                        <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">{c.city}</div>
                                        <div className="flex items-center gap-1.5">
                                            <div className={cn("w-1.5 h-1.5 rounded-full", c.active ? "bg-green-500" : "bg-gray-200")} />
                                            <span className="text-xs font-bold font-mono text-gray-900">{c.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Card 4: Multi-User Chaos */}
                    <FeatureCard
                        title="Multi-User Chaos"
                        description="Overwrite each other's work in real-time with our buggy WebSocket implementation. Last save wins!"
                        icon={Users}
                        className="md:col-span-2"
                    >
                        <div className="w-full h-full relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-gray-300 text-sm font-bold tracking-widest uppercase opacity-50">Drag & Drop Here</span>
                            </div>

                            {['Dave', 'Sarah', 'Mike', 'You'].map((user, i) => {
                                const styles = [
                                    { color: 'text-red-500 fill-red-500', bg: 'bg-red-500', initial: { x: 50, y: 50 }, animate: { x: [50, 150, 80], y: [50, 100, 40] } },
                                    { color: 'text-blue-500 fill-blue-500', bg: 'bg-blue-500', initial: { x: 300, y: 150 }, animate: { x: [300, 200, 250], y: [150, 200, 120] } },
                                    { color: 'text-green-500 fill-green-500', bg: 'bg-green-500', initial: { x: 200, y: 80 }, animate: { x: [200, 100, 180], y: [80, 40, 90] } },
                                    { color: 'text-amber-500 fill-amber-500', bg: 'bg-amber-500', initial: { x: 400, y: 100 }, animate: { x: [400, 350, 420], y: [100, 150, 80] } },
                                ];
                                const style = styles[i];

                                return (
                                    <motion.div
                                        key={user}
                                        className="absolute"
                                        initial={style.initial}
                                        animate={style.animate}
                                        transition={{ duration: 4 + i, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                                    >
                                        <MousePointer2 className={cn("transform -rotate-12 drop-shadow-md", style.color)} size={24} />
                                        <div className={cn("ml-4 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm", style.bg)}>
                                            {user}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </FeatureCard>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 bg-white border-t border-gray-100" id="extortion">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-heading mb-4 text-gray-900">Transparent Extortion</h2>
                        <p className="text-xl text-gray-500">Choose the plan that best fits your budget (and our revenue goals).</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PricingCard
                            title="Indie Hacker"
                            price="$49"
                            description="Ugly features designed specifically to annoy you into upgrading."
                            isHighlighted={false}
                            features={["1 User (You)", "Slow Support (Days)", "Export to CSV (Broken)", "Watermark everywhere"]}
                        />
                        <PricingCard
                            title="Series A Startup"
                            price="$199"
                            description="For companies that have more funding than sense. We love you."
                            isHighlighted={true}
                            features={["5 Users", "Priority Email", "Dark Mode", "Remove Watermark", "Feel important"]}
                        />
                        <PricingCard
                            title="Enterprise"
                            price="Hidden"
                            description="If you have to ask, we're definitely going to overcharge you."
                            isHighlighted={false}
                            features={["Unlimited Users", "Dedicated Account Mgr", "SOC2 Badge (Fake)", "SAML/SSO", "Golf with CEO"]}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gray-900 text-white flex items-center justify-center">
                            <Layers size={14} />
                        </div>
                        <span className="font-bold text-gray-900">NameIsLogo</span>
                    </div>
                    <div className="text-sm text-gray-500">
                        © 2024 NameIsLogo Inc. We take no responsibility for lost runway.
                    </div>
                    <div className="flex gap-6">
                        <Globe size={20} className="text-gray-400 hover:text-gray-900 cursor-pointer" />
                        <div className="text-gray-400 hover:text-gray-900 cursor-pointer font-bold text-sm">X</div>
                        <div className="text-gray-400 hover:text-gray-900 cursor-pointer font-bold text-sm">In</div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
