import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-t from-black via-[#0D1117] to-[#1F2937] py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        
        <div className="text-left max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Find Your <br />
          Dream Job Across <br />
            <span className="text-[#56C8D8]">Multiple Platforms</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4">
          Search across LinkedIn, Naukri, Internshala and more from one place. Track applications and get hired faster.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-8 w-full">
            <input
              type="text"
              placeholder="Job title or keyword"
              className="flex-1 px-4 py-3 rounded-md bg-[#030710] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#56C8D8]"
            />
            <input
              type="text"
              placeholder="Bangalore, India"
              className="flex-1 px-4 py-3 rounded-md bg-[#030710] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#56C8D8]"
            />
            <button className="bg-[#56C8D8] text-white font-medium px-6 py-3 rounded-md hover:bg-[#56c9d8c8] transition">
              Search
            </button>
          </div>

          
          <div className="text-gray-400 text-sm mt-4">
            Popular: <button className="hover:underline">UI Designer</button>,{" "}
            <button className="hover:underline">UX Researcher</button>,{" "}
            <button className="hover:underline">Android</button>,{" "}
            <button className="hover:underline">Admin</button>
          </div>
        </div>

      
        <div className="hidden lg:block">
          <Image
            src={"/girl_img.png"}
            alt=""
            width={800}
            height={800}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
