"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const formSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),
  coverLetter: z.string().min(10, "Cover letter must be at least 10 characters"),
  resume: z
    .any()
    .refine((file) => file?.length > 0, "Resume is required"),
});


type FormData = z.infer<typeof formSchema>;

interface Job {
  id: number;
  title: string;
  description: string;
  price: number;
}

const fetchJobDetails = async (id: string): Promise<Job> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch job details");
  return res.json();
};

const JobDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const jobId = params.id as string;

  const { data: job, isLoading, isError, error } = useQuery<Job>({
    queryKey: ["job", jobId],
    queryFn: () => fetchJobDetails(jobId),
  });

  const { register, handleSubmit, formState: { errors },} = useForm<FormData>({
        resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setModalIsOpen(false);
  };

  if (isLoading) return <p className="text-center text-2xl font-bold">Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <div className="header-image flex flex-col justify-center items-center text-white">
        <h1 className="text-bold text-5xl">Detail Page</h1>
        <p className="text-xl mt-2">Your Dreams Here</p>
      </div>

      <div className="min-h-screen mt-5 flex justify-center p-6 bg-teal-800">
        <div className="p-6 text-white flex flex-col items-center bg-teal-800 w-2/3 rounded">
          <h2 className="text-4xl font-bold text-yellow-500">{job?.title}</h2>
          <p className="mt-4 text-lg">{job?.description}</p>
          <p className="mt-2 text-xl font-bold text-yellow-500">SALARY: ${job?.price}</p>

          <div className="flex gap-2">
            <button
              onClick={() => router.push("/")}
              className="mt-5 bg-teal-600 px-4 py-2 rounded-md font-medium hover:bg-teal-500"
            >
              Go Back
            </button>
            <button
              onClick={() => setModalIsOpen(true)}
              className="mt-5 bg-blue-950 px-4 py-2 font-medium rounded-md hover:bg-blue-800"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="p-6 text-white max-w-md rounded">
          <img src="/images/jobPic.jpeg" alt="Job" className="rounded" />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-teal-900 text-white p-6 rounded-lg shadow-xl w-96 mt-7">
          <h2 className="text-2xl font-bold mb-4 text-center">Application Form</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input type="text" placeholder="Full Name"
                {...register("fullName")}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-white"/>
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <input type="email" placeholder="Email Address"
                {...register("email")}
   className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-white"/>
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-1">Gender</label>
              <select
                {...register("gender")}
           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-white">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>

            <div>
              <textarea
                placeholder="Cover Letter"
                {...register("coverLetter")}
                className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-white"
              ></textarea>
              {errors.coverLetter && <p className="text-red-500">{errors.coverLetter.message}</p>}
            </div>

            <div>
              <label className="block mb-1">Upload Resume</label>
              <input
                type="file"
                {...register("resume")}
                className="w-full p-2 bg-gray-800 text-white"
              />
              {errors.resume && <p className="text-red-500">{errors.resume.message}</p>}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
              >
                Cancel
              </button>
              <button type="submit" className="bg-emerald-500 px-4 py-2 rounded hover:bg-green-800">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetail;
