import React from 'react';
import { Users, CheckCircle, Heart, ArrowRight } from 'lucide-react';

const Roommate = () => {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Main Light Blue Container */}
            <div className="bg-blue-50/70 rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-100/60 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                    
                    {/* Left Side: Text Content */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Top Pill Badge */}
                        <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-800 shadow-xs border border-emerald-100">
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Intelligent Compatibility Index</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                            Find your perfect roommate before signing a single lease.
                        </h2>

                        {/* Description */}
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            Our 32-factor lifestyle matching framework syncs waking schedules, cleaning standards, remote working habits, and social boundaries to eliminate shared living friction.
                        </p>

                        {/* Feature Points */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-start gap-3">
                                <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Circadian Schedule Alignment</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">Night owls paired with night owls; early birds with morning makers.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Verified Identity & Employment</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">Triple-point check: credit tier, payroll direct-deposit, and criminal record clearance.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Communal Household Agreement</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">Pre-signed guest policies, chore cadences, and shared pantry expectations.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <button className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer">
                                <span>Take Compatibility Quiz</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Roommate Preview Cards */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                        
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-4">
                            {/* Profile Header */}
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    {/* Image field - change URL here */}
                                    <img
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                                        alt="Maya Chen"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full text-[10px]">
                                        ✓
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base leading-tight">Maya Chen, 28</h3>
                                    <p className="text-xs text-slate-500">UX Designer • Brooklyn</p>
                                    <span className="text-[11px] font-semibold text-emerald-600">Verified Resident</span>
                                </div>
                            </div>

                            {/* Compatibility Score Pill */}
                            <div className="bg-blue-50/80 p-3 rounded-xl flex items-center justify-between border border-blue-100/60">
                                <div>
                                    <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Mutual Compatibility</p>
                                    <p className="text-lg font-extrabold text-emerald-800">96% Match</p>
                                </div>
                                <button className="p-2 rounded-full bg-white text-slate-400 hover:text-rose-500 shadow-xs border border-slate-100 transition">
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-600">
                                <span className="bg-slate-100 px-2.5 py-1 rounded-md">🌱 Plant Lover</span>
                                <span className="bg-slate-100 px-2.5 py-1 rounded-md">🌅 7:00 AM Riser</span>
                                <span className="bg-slate-100 px-2.5 py-1 rounded-md">💻 Hybrid 3d/wk</span>
                                <span className="bg-slate-100 px-2.5 py-1 rounded-md">🧘 Deep Focus Hours</span>
                            </div>

                            {/* Card Footer */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className="text-slate-500 font-medium">Target: <strong className="text-slate-900">$1.2k - $1.5k</strong></span>
                                <a href="#" className="font-bold text-emerald-800 hover:underline">View Match Profile</a>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-4">
                            {/* Profile Header */}
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    {/* Image field - change URL here */}
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                                        alt="Julian Rossi"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full text-[10px]">
                                        ✓
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base leading-tight">Julian Rossi, 30</h3>
                                    <p className="text-xs text-slate-500">Data Analyst • Austin</p>
                                    <span className="text-[11px] font-semibold text-emerald-600">Verified Resident</span>
                                </div>
                            </div>

                            {/* Compatibility Score Pill */}
                            <div className="bg-blue-50/80 p-3 rounded-xl flex items-center justify-between border border-blue-100/60">
                                <div>
                                    <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Mutual Compatibility</p>
                                    <p className="text-lg font-extrabold text-emerald-800">91% Match</p>
                                </div>
                                <button className="p-2 rounded-full bg-white text-slate-400 hover:text-rose-500 shadow-xs border border-slate-100 transition">
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-600">
                                <span className="bg-slate-100 px-2.5 py-1 rounded-md">🍳 Loves Cooking</span>
                                <span className="bg-slate-100 px-2.5 py-1 rounded-md">🏃 Weekend Runner</span>
                                <span className="bg-slate-100 px-2.5 py-1 rounded-md">🐕 No Pets Own</span>
                                <span className="bg-slate-100 px-2.5 py-1 rounded-md">🧹 Weekly Tidy Clean</span>
                            </div>

                            {/* Card Footer */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className="text-slate-500 font-medium">Target: <strong className="text-slate-900">$1.0k - $1.3k</strong></span>
                                <a href="#" className="font-bold text-emerald-800 hover:underline">View Match Profile</a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Roommate;