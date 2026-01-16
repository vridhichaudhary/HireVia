"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPlay, FaRocket, FaShieldAlt, FaChartLine, FaArrowRight, FaTerminal, FaCodeBranch, FaBriefcase, FaUserAstronaut } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const StatCard = ({ icon, label, value, trend }) => (
    <div className="saas-card p-4 space-y-2">
        <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                {icon}
            </div>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {trend}
            </span>
        </div>
        <div>
            <p className="meta-label">{label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">{value}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <div className="text-center space-y-4">
                    <p className="meta-label">Access Denied</p>
                    <h2 className="professional-heading">Authentication Required</h2>
                    <Link href="/">
                        <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest mt-4">
                            Return Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface pt-24 pb-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                            <span className="meta-label">System Active — Client: Institutional</span>
                        </div>
                        <h1 className="professional-heading">Carrier Command Center</h1>
                        <p className="text-slate-500 font-medium">Welcome back, {user.name}. Deployment status: Nominal.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/jobs">
                            <button className="bg-white border border-slate-200 text-slate-900 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                                Market Monitor
                            </button>
                        </Link>
                        <Link href="/tracker">
                            <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md">
                                Active Pipeline
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={<FaBriefcase />} label="Active Applications" value="12" trend="+3.2%" />
                    <StatCard icon={<FaChartLine />} label="Response Velocity" value="84%" trend="+12.4%" />
                    <StatCard icon={<FaCodeBranch />} label="Role Compatibility" value="92.4%" trend="+1.2%" />
                    <StatCard icon={<FaShieldAlt />} label="Profile Trust" value="Level 4" trend="Stable" />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Recent Activity Panel */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Application Pipeline</h3>
                            <Link href="/tracker" className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">
                                Full Log
                            </Link>
                        </div>
                        <div className="saas-card overflow-hidden">
                            <div className="divide-y divide-slate-100">
                                {[
                                    { company: "Stripe", role: "Sr. Frontend Engineer", status: "Interview", time: "2h ago" },
                                    { company: "Vercel", role: "Product Designer", status: "Applied", time: "5h ago" },
                                    { company: "Linear", role: "Product Engineer", status: "Screening", time: "1d ago" },
                                    { company: "Anthropic", role: "Research Engineer", status: "Applied", time: "2d ago" },
                                ].map((item, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs">
                                                {item.company[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{item.company}</p>
                                                <p className="text-[11px] text-slate-500 font-medium">{item.role}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${item.status === 'Interview' ? 'bg-blue-50 text-blue-600' :
                                                    item.status === 'Screening' ? 'bg-indigo-50 text-indigo-600' :
                                                        'bg-slate-100 text-slate-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                            <p className="text-[10px] text-slate-400 font-medium mt-1">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI Insights Sidebar */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Intelligence Node</h3>

                        <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <FaUserAstronaut size={48} />
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Profile Calibration</span>
                                </div>
                                <h4 className="text-xl font-black tracking-tighter">FAANG Ready.</h4>
                                <p className="text-[12px] text-slate-400 font-medium leading-relaxed">
                                    Your technical profile cluster is currently trending for "Staff Engineer" roles at Tier-1 institutions.
                                </p>
                            </div>

                            <div className="pt-4 space-y-3 relative z-10">
                                <Link href="/ai/analyze">
                                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/40">
                                        Execute Deep Audit
                                    </button>
                                </Link>
                                <Link href="/ai/match">
                                    <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">
                                        Market Intelligence
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="saas-card p-4 bg-indigo-50/50 border-indigo-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <FaTerminal size={12} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-indigo-900 uppercase">System Note</p>
                                    <p className="text-[11px] text-indigo-700 font-medium">3 Target roles detected in LinkedIn region.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
