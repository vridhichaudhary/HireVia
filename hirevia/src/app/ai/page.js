"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaFileInvoice, FaLayerGroup, FaPenNib, FaArrowRight, FaMagic } from 'react-icons/fa';
import Link from 'next/link';

const AiToolCard = ({ title, desc, icon: Icon, href, color }) => (
    <Link href={href}>
        <motion.div
            whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:border-blue-100"
        >
            <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{title}</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                {desc}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600">
                Launch Intelligence <FaArrowRight size={10} />
            </div>
        </motion.div>
    </Link>
);

const AiHub = () => {
    return (
        <div className="min-h-screen bg-[#F8F9FC] pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6"
                    >
                        <FaMagic className="text-blue-600 text-xs" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Advanced Career Intelligence</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
                        The <span className="text-blue-600">FAANG-Ready</span> AI Career Assistant.
                    </h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Optimize your job search with institutional-grade AI. Our proprietary models analyze, match, and generate application materials to give you an unfair advantage.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AiToolCard
                        title="Resume Analyzer"
                        desc="Institutional parsing and feedback. Upload your resume and get a professional audit with actionable improvements."
                        icon={FaFileInvoice}
                        href="/ai/analyze"
                        color="bg-purple-50 text-purple-600"
                    />
                    <AiToolCard
                        title="JD-Resume Matcher"
                        desc="Strategic alignment testing. Paste a job description to see how you score and identify missing high-impact keywords."
                        icon={FaLayerGroup}
                        href="/ai/match"
                        color="bg-blue-50 text-blue-600"
                    />
                    <AiToolCard
                        title="Cover Letter Builder"
                        desc="Automated professional synthesis. Generate industry-standard cover letters mapped exactly to job requirements."
                        icon={FaPenNib}
                        href="/ai/generate"
                        color="bg-emerald-50 text-emerald-600"
                    />
                </div>

                <section className="mt-32 p-12 rounded-[3rem] bg-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full" />
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-black text-white mb-6">Built for top-tier engineers.</h2>
                        <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                            Our AI engine isn't just about text. It understands seniority levels, tech stack importance, and the specific nuances of modern hiring pipelines.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-slate-300 uppercase tracking-wider">
                                Gemini Pro 1.5
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-slate-300 uppercase tracking-wider">
                                Precision Parsing
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AiHub;
