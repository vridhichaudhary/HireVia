"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPenNib, FaFileAlt, FaCheckCircle, FaRobot, FaCopy, FaMagic, FaSyncAlt } from 'react-icons/fa';
import API from '@/api/axios';

const CoverLetterGenerator = () => {
    const [resume, setResume] = useState(null);
    const [jd, setJd] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!resume || !jd.trim()) return alert("Please upload your resume and paste the job description.");
        setLoading(true);

        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('jd', jd);

        try {
            const res = await API.post('/ai/generate-cover-letter', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data);
        } catch (error) {
            console.error("Generation failed:", error);
            alert("Cover letter generation failed. Ensure your backend is ready.");
        }
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result.cover_letter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC] pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
                        <FaPenNib className="text-emerald-600 text-xs" />
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Automated Synthesis</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">AI Cover Letter Builder</h1>
                    <p className="text-slate-500 font-medium">Create industry-standard cover letters personalized to your profile and the job.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Baseline Intelligence</label>
                                <input
                                    type="file"
                                    onChange={(e) => setResume(e.target.files[0])}
                                    className="w-full text-xs text-slate-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-slate-50 file:text-slate-600 hover:file:bg-slate-100 cursor-pointer"
                                />
                                {resume && (
                                    <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                        <FaCheckCircle /> {resume.name}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Context (Job Description)</label>
                                <textarea
                                    className="w-full h-80 p-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none"
                                    placeholder="Paste the job description here to help the AI contextualize your letter..."
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="w-full py-5 bg-black hover:bg-slate-800 text-white font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-2xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                {loading ? <><FaSyncAlt className="animate-spin" /> Synthesizing...</> : <><FaMagic /> Generate Professional Draft</>}
                            </button>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="lg:col-span-7 h-full min-h-[600px]">
                        <AnimatePresence mode="wait">
                            {!result ? (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="bg-white/50 border-4 border-dashed border-slate-100 rounded-[3rem] h-full flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-slate-100 text-4xl mb-6 shadow-sm">
                                        <FaFileAlt />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-300 tracking-tight">Draft Area</h3>
                                    <p className="text-slate-300 text-xs font-bold uppercase tracking-[0.2em] mt-3">Synthesized output will appear here</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl relative group"
                                >
                                    <div className="absolute top-8 right-8 flex gap-2">
                                        <button
                                            onClick={copyToClipboard}
                                            className={`p-3 rounded-xl border transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${copied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-900'
                                                }`}
                                        >
                                            {copied ? <><FaCheckCircle size={12} /> Copied</> : <><FaCopy size={12} /> Copy Draft</>}
                                        </button>
                                    </div>

                                    <div className="prose prose-slate max-w-none">
                                        <pre className="whitespace-pre-wrap font-sans text-slate-700 text-base leading-relaxed">
                                            {result.cover_letter}
                                        </pre>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs">
                                                <FaRobot />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Generated Draft</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidence: 98%</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterGenerator;
