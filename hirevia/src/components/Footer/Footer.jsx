const Footer = () => {
    return (
      <footer className="bg-[#0D1117] text-gray-400 py-10 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-2xl"></span>
              <h2 className="text-white font-semibold text-lg">HireVia</h2>
            </div>
            <p className="text-sm">
              Your one-stop platform for finding and tracking job opportunities across multiple job boards.
            </p>
          </div>
  
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/">Home</a></li>
              <li><a href="/jobs">Job Listings</a></li>
              <li><a href="/tracker">Application Tracker</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Resume Builder</a></li>
              <li><a href="#">Interview Prep</a></li>
              <li><a href="#">Salary Guide</a></li>
              <li><a href="#">Job Alerts</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-800 mt-10 pt-4 text-center text-sm text-gray-500">
          © 2025 HireVia. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  