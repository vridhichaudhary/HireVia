"use client";
import React, { useState } from "react";
import Footer from "@/components/Footer/Footer";
import API from "@/api/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PostJob = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        type: "Full Time",
        remote: false,
        description: "",
        requirements: "",
        salary: "",
        industry: "Tech",
        seniority: "Mid",
        techStack: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login as a recruiter to post jobs");
            return;
        }
        setLoading(true);
        try {
            await API.post("/jobs", formData);
            alert("Job posted successfully!");
            router.push("/jobs");
        } catch (err) {
            console.error("Error posting job:", err);
            alert(err.response?.data?.message || "Failed to post job");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background text-white pt-28 pb-20 px-6 md:px-20 relative overflow-hidden">
            <div className="glow-mesh opacity-20" />

            <div className="max-w-3xl mx-auto relative z-10">
                <header className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-2 uppercase text-white">
                        Post a <span className="text-blue-400">Job</span>
                    </h2>
                    <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">
                        Create a new opportunity for professionals
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="glass-card p-10 rounded-3xl border border-white/5 space-y-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Job Title</label>
                            <input
                                required
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Senior Software Engineer"
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Company Name</label>
                            <input
                                required
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="e.g. Acme Corp"
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Location</label>
                            <input
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Remote"
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Job Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
                            >
                                <option value="Full Time">Full Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Salary Range</label>
                            <input
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="e.g. $120k - $160k"
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Industry</label>
                            <select
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
                            >
                                <option value="Tech">Tech</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Design">Design</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Seniority</label>
                            <select
                                name="seniority"
                                value={formData.seniority}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
                            >
                                <option value="Junior">Junior</option>
                                <option value="Mid">Mid</option>
                                <option value="Senior">Senior</option>
                                <option value="Lead">Lead</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tech Stack (Comma Separated)</label>
                        <input
                            name="techStack"
                            value={formData.techStack}
                            onChange={handleChange}
                            placeholder="e.g. React, Node.js, AWS"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Outline the core responsibilities and requirements..."
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-medium text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                        />
                    </div>

                    <div className="flex items-center gap-3 py-2">
                        <input
                            type="checkbox"
                            name="remote"
                            id="remote"
                            checked={formData.remote}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-white/10 bg-slate-900 text-blue-500 focus:ring-blue-500"
                        />
                        <label htmlFor="remote" className="text-[11px] font-bold uppercase tracking-widest text-slate-300 cursor-pointer">Remote Opportunity</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
                    >
                        {loading ? "Posting..." : "Post Opportunity"}
                    </button>
                </form>
            </div>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
};

export default PostJob;
