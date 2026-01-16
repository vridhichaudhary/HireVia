"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileUpload, FaCheckCircle, FaExclamationTriangle, FaStar, FaInfoCircle, FaFilePdf, FaRobot } from 'react-icons/fa';
import API from '@/api/axios';

const AIUploader = ({ onUpload, loading, title, subtitle }) => {
    const [dragActive, setDragActive] = useState(false);

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); onUpload(e.dataTransfer.files[0]); }}
            className={`relative group h-64 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
        >
            <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => onUpload(e.target.files[0])}
                disabled={loading}
            />
            <div className={`w-16 h-16 rounded-3xl mb-4 flex items-center justify-center text-2xl transition-all ${dragActive ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:scale-110'
                }`}>
                {loading ? <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" /> : <FaFileUpload />}
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">{title}</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
    );
};

const FeedbackCard = ({ title, items, variant = "positive" }) => (
    <div className={`p-8 rounded-[2rem] border ${variant === "positive" ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"
        }`}>
        <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${variant === "positive" ? "text-emerald-600" : "text-amber-600"
            }`}>
            {variant === "positive" ? <FaCheckCircle /> : <FaExclamationTriangle />}
            {title}
        </h4>
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm font-medium text-slate-700 leading-relaxed">
                    <div className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${variant === "positive" ? "bg-emerald-300" : "bg-amber-300"
                        }`} />
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleUpload = async (uploadedFile) => {
        if (!uploadedFile) return;
        setFile(uploadedFile);
        setLoading(true);

        const formData = new FormData();
        formData.append('resume', uploadedFile);

        try {
            const res = await API.post('/ai/analyze-resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data);
        } catch (error) {
            console.error("AI Analysis failed:", error);
            alert("AI analysis failed. Please ensure your backend is configured with a GEMINI_API_KEY.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC] pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 mb-6">
                        <FaRobot className="text-purple-600 text-xs" />
                        <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest leading-none">Intelligence Engine</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">Resume Analyzer</h1>
                    <p className="text-slate-500 font-medium">Institutional-grade feedback on your technical profile. Upload your PDF or DOCX file.</p>
                </header>

                {!result ? (
                    <AIUploader
                        title="Upload Document"
                        subtitle="Drop your Resume (PDF/DOCX) here"
                        onUpload={handleUpload}
                        loading={loading}
                    />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Score Card */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
                            <div className="relative w-40 h-40 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="80" cy="80" r="70" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                                    <motion.circle
                                        cx="80" cy="80" r="70" fill="none" stroke="#2563eb" strokeWidth="12"
                                        strokeDasharray={440}
                                        initial={{ strokeDashoffset: 440 }}
                                        animate={{ strokeDashoffset: 440 - (440 * (result.score || 0)) / 100 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-slate-900 leading-none">{result.score || 0}%</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Profile Score</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <h3 className="text-2xl font-black text-slate-900 leading-tight">{result.summary_title || "Analysis Complete"}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed italic">
                                    "{result.overall_feedback || "Your resume has been parsed and audited against industry standards."}"
                                </p>
                                <button
                                    onClick={() => setResult(null)}
                                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    Analyze New File
                                </button>
                            </div>
                        </div>

                        {/* Feedback Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FeedbackCard
                                title="System Flags"
                                items={result.improvements || ["No critical flags found."]}
                                variant="negative"
                            />
                            <FeedbackCard
                                title="Strengths"
                                items={result.strengths || ["Key domain competencies detected."]}
                                variant="positive"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ResumeAnalyzer;
