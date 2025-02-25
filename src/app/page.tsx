
import * as React from "react";
import Link from "next/link";

export default function Home() {

  const jobData = [
    {
      title: "Frontend Developer",
      company: "Tech Innovators",
      description: "Build modern web applications using React and Next.js.",
    },
    {
      title: "UI/UX Designer",
      company: "Creative Minds",
      description: "Design user-friendly interfaces with Figma & Tailwind CSS.",
    },
    {
      title: "Full Stack Developer",
      company: "Code Masters",
      description: "Work on both frontend and backend using MERN stack.",
    },
  ]

  return (
       <>
           <div className='header-image flex flex-col justify-center items-center text-white'>
                  <h1 className='font-bold text-4xl '>WELCOME TO OUR WEB</h1>
                  {/* <p  className=' text-xl mt-2'>Search for any job you want</p> */}

             </div>

           <div className="mt-10 w-full flex flex-col gap-6 px-5 max-w-3xl mx-auto">
              {jobData.map((job, index) => (
      <div  key={index} className="bg-teal-900 text-gray-900 p-6 rounded-2xl shadow-2xl w-full transition-transform duration-300 hover:scale-[1.02]">
        <h2 className="text-2xl font-semibold text-blue-700">{job.title}</h2>
        <p className="text-white mt-2">{job.company}</p>
        <p className="mt-3 text-white mb-5">{job.description}</p>
        <Link href={'/login'} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">
          Explore Now
        </Link>
    </div>
  ))}
</div>

   </>
  );
};
