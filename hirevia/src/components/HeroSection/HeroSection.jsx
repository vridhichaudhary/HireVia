import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-t from-black via-[#0D1117] to-[#1F2937] py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        
        <div className="text-left max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Find Your <br />
          Dream Job Across <br />
            <span className="text-[#8B5CF6]">Multiple Platforms</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4">
          Search across LinkedIn, Naukri, Internshala and more from one place. Track applications and get hired faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center mt-8 w-full">
            <Link href="/jobs">
            <button className="bg-[#8B5CF6] text-white font-medium px-12 py-4 rounded-md hover:bg-[#7C3AED] transition">
              Search
            </button>
            </Link>
          </div>
        </div>

      
        <div className="hidden lg:block">
          <Image
            src={"/girl_img.png"}
            alt=""
            width={900}
            height={900}
            className="object-contain scale-120"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
