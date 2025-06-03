const HeroSection = () => {
  return (
   
    <section className=" bg-gradient-to-t from-black via-[#0D1117] to-[#1F2937] py-30 px-6">
      
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Find Your <span className="text-[#56C8D8]">Dream Job</span> Across Multiple Platforms
        </h1>
        <p className="text-xl md:text-xl text-gray-500 max-w-xl">
          Search across LinkedIn, Naukri, Internshala and more from one place. Track applications and get hired faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            className="flex-1 px-4 py-3 rounded-md bg-[#030710] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#56C8D8]"
          />
          <button className="bg-[#56C8D8] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#56c9d8c8] transition">
            Search
          </button>
        </div>

        <div className="text-gray-400 text-sm">
          Popular: <button className="hover:underline">React</button>, <button className="hover:underline">Data Scientist</button>, <button className="hover:underline">Remote</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
