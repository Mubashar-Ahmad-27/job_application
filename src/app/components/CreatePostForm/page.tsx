'use client'
import { useState } from "react";

interface Job {
  title: string;
  description: string;
  salary: string;
  city: string;
}

interface Props {
  onCreate: (job: Job) => void;
  onClose: () => void;
}

const CreatePostForm: React.FC<Props> = ({ onCreate, onClose }) => {
  const [job, setJob] = useState<Job>({ title: "", description: "", salary: "", city: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!job.title || !job.description || !job.salary || !job.city) {
      alert("All fields are required!");
      return;
    }
  
    onCreate(job);
    onClose(); 
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create Job</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" className="w-full p-2 mb-3 border rounded" value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} />
          <input type="text" placeholder="Description" className="w-full p-2 mb-3 border rounded" value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} />
          <input type="text" placeholder="Salary" className="w-full p-2 mb-3 border rounded" value={job.salary} onChange={(e) => setJob({ ...job, salary: e.target.value })} />
          <input type="text" placeholder="City" className="w-full p-2 mb-3 border rounded" value={job.city} onChange={(e) => setJob({ ...job, city: e.target.value })} />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Create</button>
          <button type="button" onClick={onClose} className="ml-3 text-gray-700">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
