import React from "react";
import Image from 'next/image';
import Footer from '@/components/Footer/Footer'

const blogs = [
  {
    category: "Interview Tips",
    title: "10 Tips for Mastering Technical Interviews",
    desc: "Prepare for your next technical interview with these expert tips and strategies to help you stand out from the competition.",
    author: "Priya Sharma",
    time: "5 min read",
    image: "/blog2.avif",
  },
  {
    category: "Job Search",
    title: "How to Build a Job Search Strategy That Works",
    desc: "Develop an effective job search plan with these proven methods to find and land your dream position faster.",
    author: "Raj Kumar",
    time: "7 min read",
    image: "/blog3.jpeg",
  },
  {
    category: "Remote Work",
    title: "The Ultimate Guide to Remote Work Opportunities",
    desc: "Everything you need to know about finding, applying for, and succeeding in remote work positions across different industries.",
    author: "Aisha Khan",
    time: "8 min read",
    image: "/blog4.jpeg",
  },
  {
    category: "Resume Tips",
    title: "Resume Mistakes That Cost You Interviews",
    desc: "Avoid these common resume pitfalls that prevent qualified candidates from getting called for interviews.",
    author: "Vikram Singh",
    time: "6 min read",
    image: "/blog5.jpeg",
  },
  {
    category: "Career Advice",
    title: "Negotiating Your Salary: A Complete Guide",
    desc: "Learn effective techniques to negotiate better compensation packages at every stage of your career.",
    author: "Neha Gupta",
    time: "10 min read",
    image: "/blog6.webp",
  },
  {
    category: "Career Change",
    title: "Transitioning to a Tech Career: Paths for Non-Technical Backgrounds",
    desc: "How to successfully pivot to a tech career without prior technical experience or education.",
    author: "Arjun Patel",
    time: "9 min read",
    image: "/blog7.png",
  },
  {
    category: "Job Search",
    title: "Crafting a LinkedIn Profile That Gets Noticed",
    desc: "Tips and tricks for optimizing your LinkedIn presence for recruiters.",
    author: "Kaitlin Milliken",
    time: "4 min read",
    image: "/blog8.webp",
  },
  {
    category: "Interview Tips",
    title: "Top 5 Mistakes in Online Interviews",
    desc: "Avoid these common virtual interview blunders to leave a strong impression.",
    author: "Karan Mehta",
    time: "6 min read",
    image: "/blog9.jpeg",
  },
  {
    category: "Career Advice",
    title: "How to Build a Personal Brand in Tech",
    desc: "Establish a strong identity and presence in the tech industry.",
    author: "Divya Rana",
    time: "7 min read",
    image: "/blog10.jpg",
  },
  {
    category: "Resume Tips",
    title: "ATS-Friendly Resumes: What You Need to Know",
    desc: "Make sure your resume passes the ATS test and reaches recruiters.",
    author: "Ravi Chauhan",
    time: "5 min read",
    image: "/blog11.jpeg",
  },
  {
    category: "Remote Work",
    title: "Tools Every Remote Worker Should Know",
    desc: "Boost your productivity with these essential remote work tools.",
    author: "Mona Das",
    time: "6 min read",
    image: "/blog12.png",
  },
  {
    category: "Career Change",
    title: "Switching Careers at 30: A Success Guide",
    desc: "Strategies and motivation to make a smooth career switch later in life.",
    author: "Rohit Sen",
    time: "8 min read",
    image: "/blog13.webp",
  },
];

const BlogSection = () => {
  return (
    <section className="bg-[#0B0D14] text-[white] px-6 py-12 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Career Blog</h2>
        <p className="text-[#A0B7C2] mb-10 text-lg">
          Insights and advice to help you navigate your job search journey
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-xl overflow-hidden mb-16">
          <div className="h-full w-full">
            <Image
              src={"/blog1.jpeg"}
              alt=""
              width={800}
              height={800}
              className="object-cover rounded-xl"
            />
          </div>

          <div className="p-6 sm:p-10 flex flex-col gap-4 mb-10">
            <span className="bg-[#8B5CF6] text-white px-4 py-1 rounded-full text-sm font-medium w-fit">
              Featured
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
              How AI is Changing Job Search in 2025
            </h3>
            <p className="text-[#555] text-base leading-relaxed">
              Discover how artificial intelligence is transforming the job
              search landscape and how you can leverage these tools to stand
              out in your applications.
            </p>
            <div className="text-[#888] text-sm flex gap-4">
              <span>By Sandeep Mehta</span>
              <span> 12 min read</span>
            </div>
            <a
              href="#"
              className="text-[#8B5CF6] hover:underline font-medium mt-2 w-fit"
            >
              Read Full Article →
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-[#0B0D14] rounded-xl overflow-hidden shadow border border-[#555] hover:shadow-md transition duration-300"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                height={200}
                width={500}
                className="object-cover"
              />
              <div className="p-5">
                <span className="inline-block bg-[#8B5CF6] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {blog.category}
                </span>
                <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                <p className="text-[#555] text-sm mb-4">{blog.desc}</p>
                <div className="flex justify-between text-sm text-[#888]">
                  <span>{blog.author}</span>
                  <span>{blog.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        <div className="mt-30">
        <Footer />
      </div>
    </section>
    
  );
};

export default BlogSection;
