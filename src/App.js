import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Play, Twitter, X, User } from 'lucide-react';

// --- IMPORT LOCAL IMAGES ---
import amjadImage from './AMJAD.jpg';
import mo3thImage from './MO3TH.jpg';

// --- DATA MODEL ---
class Member {
    constructor(id, name, role, handle, themeHex, gradient, bio, localImage = null) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.handle = handle;
        this.themeHex = themeHex;
        this.gradient = gradient;
        this.bio = bio;
        this.image = localImage || `https://unavatar.io/twitter/${handle}`;
        this.twitterUrl = `https://twitter.com/${handle}`;
    }
}

// --- CONFIGURATION ---
const MO3TH_HANDLE = "Nishkiyama1";
const FRAGMENTS_HANDLE = "GoldenAion";

export default function App() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null); // NEW: State for Video
    const [isReady, setIsReady] = useState(false);
    
    // --- ANIMATION STATES ---
    const [founderMode, setFounderMode] = useState(false);
    const [glitchMode, setGlitchMode] = useState(false);
    
    // --- DISPLAY STATES ---
    const [displayedRole, setDisplayedRole] = useState("");
    const [displayedName, setDisplayedName] = useState("");
    const [displayedAvatar, setDisplayedAvatar] = useState("");

    // --- DATA ---
    const members = [
        new Member(1, "𝐅𝐫𝐚𝐠𝐦𝐞𝐧𝐭𝐬", "Founder", "GoldenAion", "#F59E0B", "from-amber-400 to-orange-500", "Everything is connected."),
        new Member(2, "æ", "Member", "exvition", "#EC4899", "from-pink-500 to-rose-500", "Artist & Designer.", amjadImage),
        new Member(3, "💢💢🕊️", "Member", "MeSilverhand", "#8B5CF6", "from-violet-500 to-purple-500", "Silverhand vibes."),
        new Member(4, "mystic", "Member", "R0dofV", "#3B82F6", "from-blue-500 to-cyan-500", "Mysterious entity."),
        new Member(5, "Karuuu", "Member", "iiikaruuu", "#10B981", "from-emerald-400 to-green-500", "Tech enthusiast."),
        new Member(6, "Mo3th", "Member", "Nishkiyama1", "#6366F1", "from-indigo-500 to-violet-600", "The quiet observer.", mo3thImage),
        new Member(7, "𝐒𝐚𝐧𝐚𝐝𝐚 𝐙𝐡𝐮𝐠𝐞", "Member", "llVivyll", "#EF4444", "from-red-500 to-orange-500", "Strategist."),
        new Member(8, "🕊️", "Member", "Lopobiia", "#14B8A6", "from-teal-400 to-emerald-400", "Peace maker."),
        new Member(9, "свобода", "Member", "Corvlaw", "#64748B", "from-slate-500 to-gray-500", "Freedom seeker."),
        new Member(10, "whooj", "Member", "whooj_", "#06B6D4", "from-cyan-500 to-blue-500", "Digital wanderer.") 
    ];

    // UPDATED: Added a sample video URL for demonstration
    const podcasts = [
        { 
            id: 1, 
            title: "EP 01", 
            subtitle: "سلطة الثقاقة الغالبة", 
            gradient: "from-blue-500 to-cyan-400", 
            // The path starts with /videos because 'public' is the root folder
            videoUrl: process.env.PUBLIC_URL + "/videos/98a81516-596c-4815-a87d-2686936d7bba.mp4"
        },
    ];

    // --- ROBUST STYLE & ASSET LOADER ---
    useEffect(() => {
        const loadScript = (src) => new Promise((resolve) => {
            if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
            const script = document.createElement('script');
            script.src = src; 
            script.onload = resolve;
            document.head.appendChild(script);
        });

        const loadFont = (href) => {
            if (!document.querySelector(`link[href="${href}"]`)) {
                const link = document.createElement('link');
                link.rel = "stylesheet"; link.href = href;
                document.head.appendChild(link);
            }
        };

        loadFont("https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700;900&display=swap");
        loadFont("https://fonts.googleapis.com/css2?family=Courier+Prime:wght@700&display=swap");

        loadScript("https://cdn.tailwindcss.com").then(() => {
            const checkTailwind = setInterval(() => {
                if (window.tailwind) {
                    clearInterval(checkTailwind);
                    setIsReady(true);
                }
            }, 50);
            setTimeout(() => { clearInterval(checkTailwind); setIsReady(true); }, 1000);
        });
    }, []);

    // --- RESET LOGIC ---
    useEffect(() => {
        if (selectedMember) {
            setDisplayedRole(selectedMember.role);
            setDisplayedName(selectedMember.name);
            setDisplayedAvatar(selectedMember.image);
        } else {
            setFounderMode(false);
            setGlitchMode(false);
        }
    }, [selectedMember]);

    // --- LOGIC 1: MO3TH ---
    useEffect(() => {
        if (!selectedMember || selectedMember.handle !== MO3TH_HANDLE) return;
        const timer = setTimeout(() => {
            let currentRole = selectedMember.role;
            const deleteInterval = setInterval(() => {
                currentRole = currentRole.slice(0, -1);
                setDisplayedRole(currentRole);
                if (currentRole.length === 0) {
                    clearInterval(deleteInterval);
                    setFounderMode(true);
                    const target = "THE REAL FOUNDER";
                    let i = 0;
                    setTimeout(() => {
                        const typeInterval = setInterval(() => {
                            setDisplayedRole(target.substring(0, i + 1));
                            i++;
                            if (i === target.length) clearInterval(typeInterval);
                        }, 250);
                    }, 500);
                }
            }, 100);
        }, 15000);
        return () => clearTimeout(timer);
    }, [selectedMember]);

    // --- LOGIC 2: FRAGMENTS ---
    useEffect(() => {
        if (!selectedMember || selectedMember.handle !== FRAGMENTS_HANDLE) return;
        const timer = setTimeout(() => {
            setGlitchMode(true);
            setTimeout(() => { setDisplayedAvatar(mo3thImage); }, 300);
            let currentName = selectedMember.name;
            const deleteInterval = setInterval(() => {
                currentName = currentName.slice(0, -1);
                setDisplayedName(currentName);
                if (currentName.length === 0) {
                    clearInterval(deleteInterval);
                    const target = "Mo3th";
                    let i = 0;
                    setTimeout(() => {
                        const typeInterval = setInterval(() => {
                            setDisplayedName(target.substring(0, i + 1));
                            i++;
                            if (i === target.length) clearInterval(typeInterval);
                        }, 300);
                    }, 200);
                }
            }, 100);
        }, 10000);
        return () => clearTimeout(timer);
    }, [selectedMember]);

    // --- LOADING SCREEN ---
    if (!isReady) {
        return (
            <div style={{ height: '100vh', width: '100vw', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
                <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderLeftColor: '#74d4eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    const appBg = founderMode ? 'bg-black' : 'bg-slate-900';

    return (
        <div className={`min-h-screen ${appBg} text-gray-100 font-sans selection:bg-purple-600/30 transition-colors duration-1000 pb-20`} style={{ fontFamily: "'Cairo', sans-serif" }}>
            
            <div className={`fixed inset-0 overflow-hidden z-0 transition-opacity duration-1000 ${founderMode ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute w-96 h-96 top-[-100px] right-[-100px] bg-purple-700/50 rounded-full filter blur-[150px] animate-pulse-slow"></div>
                <div className="absolute w-80 h-80 bottom-[-100px] left-[-100px] bg-cyan-700/50 rounded-full filter blur-[150px] animate-pulse-slow delay-1000"></div>
            </div>
            
            <div className="relative z-10 p-4 sm:p-8">
                <header className="flex flex-col items-center py-6">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-lg mb-3">
                        <span className="text-3xl">✨</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl font-black tracking-tighter drop-shadow-lg transition-colors duration-500 ${founderMode ? 'text-red-600' : 'text-white'}`}>
                        {founderMode ? "النظام الحقيقي" : "الكوكبة"}
                    </motion.h1>
                </header>

                <main className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                    
                    {/* PODCASTS */}
                    <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} dir="rtl" className="lg:col-span-3 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl space-y-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cyan-400"><Mic size={24} /> البودكاست</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
                            {podcasts.map((pod, index) => (
                                <motion.div 
                                    key={pod.id} 
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ delay: 0.3 + (index * 0.1) }} 
                                    onClick={() => setSelectedPodcast(pod)} // OPEN VIDEO ON CLICK
                                    className={`flex-shrink-0 w-40 h-48 rounded-2xl bg-gradient-to-br ${pod.gradient} p-4 flex flex-col justify-between shadow-2xl hover:scale-[1.02] transition-transform cursor-pointer relative`}
                                >
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30"><Play size={20} fill="currentColor" /></div>
                                    <div><h3 className="text-2xl font-extrabold text-white">{pod.title}</h3><p className="text-white/80 text-sm font-medium">{pod.subtitle}</p></div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* MEMBERS GRID */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} dir="rtl" className="lg:col-span-3 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl space-y-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-pink-400"><User size={24} /> الأعضاء</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {members.map((member, index) => (
                                <motion.div key={member.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + (index * 0.05) }} onClick={() => setSelectedMember(member)} className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer group">
                                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-white/50 transition-all">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover bg-slate-800" onError={(e) => { e.target.src = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" }} />
                                    </div>
                                    <span className="block text-lg font-bold text-white text-center">{member.name}</span>
                                    <span className="text-xs text-gray-400 text-center">{member.role}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </main>
            </div>

            {/* --- MEMBER DETAIL SHEET --- */}
            <AnimatePresence>
                {selectedMember && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMember(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
                        <motion.div layoutId={selectedMember.id} initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className={`fixed bottom-0 left-0 right-0 h-[85vh] ${founderMode ? 'bg-black border-red-800' : 'bg-slate-900 border-white/10'} rounded-t-[3rem] shadow-2xl z-50 overflow-hidden border-t transition-colors duration-1000`}>
                            <div className="relative h-full overflow-y-auto">
                                <button onClick={() => setSelectedMember(null)} className="absolute top-6 left-6 z-50 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"><X size={24} /></button>
                                
                                <div className="h-48 w-full absolute top-0 left-0 opacity-40 transition-colors duration-1000" style={{ background: founderMode ? 'linear-gradient(to bottom, #7f1d1d, transparent)' : `linear-gradient(to bottom, ${selectedMember.themeHex}90, transparent)` }} />
                                
                                <div className="px-8 pt-24 pb-10 flex flex-col gap-6 relative z-10">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        
                                        <div className="relative">
                                            <motion.div className={`w-32 h-32 rounded-full border-4 shadow-xl bg-slate-800 overflow-hidden transition-all duration-300`} style={{ borderColor: founderMode ? '#ef4444' : selectedMember.themeHex, animation: glitchMode ? 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both' : 'none', filter: glitchMode ? 'contrast(1.5) hue-rotate(90deg)' : 'none' }}>
                                                <img src={displayedAvatar} alt="Avatar" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" }} />
                                            </motion.div>
                                            {glitchMode && <div className="absolute inset-0 bg-red-500 mix-blend-overlay opacity-50 animate-pulse rounded-full"></div>}
                                        </div>
                                        
                                        <div>
                                            <h2 className={`text-4xl font-black mb-1 transition-colors duration-500 ${founderMode ? 'text-red-500' : 'text-white'}`}>
                                                {displayedName}
                                                {(selectedMember.handle === FRAGMENTS_HANDLE && glitchMode) && <span className="animate-pulse">|</span>}
                                            </h2>
                                            
                                            <div className="h-8 flex justify-center items-center">
                                                <span className={`text-xl font-medium block transition-all ${founderMode ? 'font-mono text-2xl font-bold text-red-500 tracking-widest' : 'text-gray-400'}`}>
                                                    {displayedRole}
                                                    {(selectedMember.handle === MO3TH_HANDLE && founderMode) && <span className="animate-pulse">_</span>}
                                                </span>
                                            </div>
                                        </div>

                                        <a href={selectedMember.twitterUrl} target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full bg-gradient-to-r ${founderMode ? 'from-red-900 to-black border border-red-600' : selectedMember.gradient} text-white shadow-lg hover:scale-[1.05] transition-transform`}>
                                            <Twitter size={18} /> @{selectedMember.handle}
                                        </a>
                                    </div>

                                    <hr className={`border-white/10 my-2 ${founderMode ? 'border-red-900' : ''}`} />

                                    <div dir="rtl" className="space-y-6">
                                        <div>
                                            <h3 className={`text-xl font-bold mb-2 ${founderMode ? 'text-red-500' : 'text-white'}`}>نبذة</h3>
                                            <p className={`text-lg leading-relaxed font-light ${founderMode ? 'text-red-100' : 'text-gray-300'}`}>{selectedMember.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* --- VIDEO PLAYER OVERLAY --- */}
            <AnimatePresence>
                {selectedPodcast && (
                    <>
                         {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={() => setSelectedPodcast(null)} 
                            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
                        >
                            {/* Video Container */}
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="w-full max-w-4xl bg-slate-800 rounded-3xl overflow-hidden shadow-2xl relative border border-white/10"
                                onClick={(e) => e.stopPropagation()} // Prevent clicking video from closing it
                            >
                                <button 
                                    onClick={() => setSelectedPodcast(null)}
                                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                                
                                <div className="aspect-video bg-black flex items-center justify-center">
                                    <video 
                                        controls 
                                        autoPlay 
                                        src={selectedPodcast.videoUrl} 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                
                                <div className="p-6 text-right" dir="rtl">
                                    <h3 className="text-2xl font-bold text-white">{selectedPodcast.title}</h3>
                                    <p className="text-gray-400">{selectedPodcast.subtitle}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style jsx>{`
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
            `}</style>
        </div>
    );
}