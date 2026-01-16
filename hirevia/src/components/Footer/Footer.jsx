import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] text-slate-500 py-16 px-6 md:px-20 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white font-black text-[10px]">H</div>
            <h2 className="text-white font-black text-lg tracking-tight">Hire<span className="text-indigo-400">Via</span></h2>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest leading-relaxed">
            Global aggregator for <br /> high-performance <br /> engineering talent.
          </p>
        </div>

        <div>
          <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Network</h3>
          <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest">
            <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home Base</Link></li>
            <li><Link href="/jobs" className="hover:text-indigo-400 transition-colors">Marketplace</Link></li>
            <li><Link href="/tracker" className="hover:text-indigo-400 transition-colors">Pipeline</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Resources</h3>
          <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Resume Engine</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Interview Prep</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Yield Guide</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Job Feeds</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Protocol</h3>
          <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Use</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Encrypted Data</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">System Status</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 mt-16 pt-8 text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
        © 2025 HireVia Neural. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
