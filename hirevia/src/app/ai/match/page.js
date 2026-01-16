"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileInvoice, FaLayerGroup, FaRobot, FaCheckCircle, FaExclamationTriangle, FaPenAlt, FaFileUpload } from 'react-icons/fa';
import API from '@/api/axios';

const JDMatcher = () => {
    const [resume, setResume] = useState(null);
    const [jd, setJd] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleMatch = async () => {
        if (!resume || !jd.trim()) return alert("Please upload a resume and paste a job description.");
        setLoading(true);

        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('jd', jd);

        try {
            const res = await API.post('/ai/match-jd', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data);
        } catch (error) {
            console.error("Match failed:", error);
            alert("AI matching failed. Ensure your backend is ready.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC] pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                        <FaLayerGroup className="text-blue-600 text-xs" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Strategic Alignment</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">JD-Resume Matcher</h1>
                    <p className="text-slate-500 font-medium">Quantify your compatibility with specific job opportunities.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                            <div>
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Step 1: Upload Baseline Resume</label>
                                <div className={`relative border-2 border-dashed rounded-2xl p-6 transition-all ${resume ? 'border-emerald-200 bg-emerald-50' : 'border-slate-100 hover:border-slate-200'}`}>
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setResume(e.target.files[0])} />
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${resume ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-300'}`}>
                                            {resume ? <FaCheckCircle /> : <FaFileUpload />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{resume ? resume.name : "Select PDF/DOCX"}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{resume ? "File Loaded" : "Click or Drag"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Step 2: Paste Job Description</label>
                                <textarea
                                    className="w-full h-64 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
                                    placeholder="Paste the full job description here (Role, Responsibilities, Requirements)..."
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={handleMatch}
                                disabled={loading}
                                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "Matching Signals..." : "Run Compatibility Audit"}
                            </button>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-6">
                        <AnimatePresence mode="wait">
                            {!result ? (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem] h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 text-3xl mb-6 shadow-inner">
                                        <FaRobot />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-400 tracking-tight">System Idle</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 max-w-[200px]">Upload data to initialize strategic matching</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm text-center space-y-6">
                                        <div className="w-24 h-24 rounded-full border-8 border-blue-50 flex items-center justify-center mx-auto">
                                            <span className="text-3xl font-black text-slate-900">{result.match_score}%</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 leading-tight">Match Quality</h3>
                                            <p className="text-slate-500 font-medium mt-2 leading-relaxed italic">
                                                "{result.summary || "Your profile has been cross-referenced with the job requirements."}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-3">Detected Keywords</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.found_keywords?.map((k, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/50 rounded-lg text-xs font-bold text-emerald-700">{k}</span>
                                                )) || <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">None</span>}
                                            </div>
                                        </div>
                                        <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-3">Missing Criticals</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.missing_keywords?.map((k, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/50 rounded-lg text-xs font-bold text-amber-700">{k}</span>
                                                )) || <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">None</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-4">Strategic Strategy</h4>
                                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                            {result.strategy || "The system suggests emphasizing the missing keywords in your bullet points to optimize for ATS filters."}
                                        </p>
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

export default JDMatcher;
