'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePostForm from "../components/CreatePostForm/page";
import JobTable from "../components/JobTable/page";
import EditJobForm from '../components/EditJobForm/page';

interface Job {
  id: string;
  title: string;
  description: string;
  salary: string;
  city: string;
}

const DashboardPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editJob, setEditJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs()
  }, [])

  const handleCreateJob = async (jobData: Job) => {
    try {
      const response = await axios.post("/api/jobs", jobData);
      setJobs((prevJobs) => [...prevJobs, response.data]); 
      setShowForm(false);
    } catch (error) {
      console.error("Error creating job:", error.response?.data || error.message);
    }
  }
  
  const handleDeleteJob = async (id: string) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id)); 
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  
const handleEditJob = async (updatedJob: Job) => {
  try {
    const res = await axios.put(`/api/jobs/${updatedJob.id}`, updatedJob);  
    setJobs((prevJobs) => prevJobs.map((job) => (job.id === updatedJob.id ? res.data : job)));
    setEditJob(null);
  } catch (error) {
    console.error("Error updating job:", error);
  }
};

  return (
    <div className="bg-teal-800 min-h-screen p-6">
      <div className="relative">
        <div className="w-full bg-white p-6 shadow-lg">
          <h1 className="text-center font-bold text-2xl">ADMIN DASHBOARD</h1>
        </div>

        <button
          className="absolute top-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => setShowForm(true)}
        >
          Create Post
        </button>

        {showForm && <CreatePostForm onCreate={handleCreateJob} onClose={() => setShowForm(false)} />}
        {editJob && <EditJobForm job={editJob} onEdit={handleEditJob} onClose={() => setEditJob(null)} />}
      </div>

      <div className="mt-16">
        <JobTable jobs={jobs} onDelete={handleDeleteJob} onEdit={setEditJob} />
      </div>
    </div>
  );
};

export default DashboardPage;
