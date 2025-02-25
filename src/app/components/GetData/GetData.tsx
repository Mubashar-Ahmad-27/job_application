"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Job {
  id: number;
  title: string;
  description: string;
  price: number;
}


const fetchJobs = async (): Promise<any> => {

const res =  await fetch('https://fakestoreapi.com/products')
  if(!res.ok){
      throw new  Error("Failed to Fetch Data")
  }
  const data =  await res.json()
  return data
}

const postJob = async(newJob : Job) =>{
const res =  await fetch('https://fakestoreapi.com/products',{

    method: 'POST',
    headers: {"content-Type": "application/json"},
    body: JSON.stringify(newJob)
})
    if (!res.ok) {
      throw new Error("Failed to post job");
    }
    return res.json();
}

const GetData: React.FC = () => {

  const queryClient = useQueryClient();
     const router = useRouter()
  
  const { data: userdata, isLoading, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
  
  const mutation = useMutation({
    mutationFn: postJob,
    onSuccess: () => {  queryClient.invalidateQueries({ queryKey: ['jobs'] })},
  })

  if (isLoading) return <p className="text-center font-bold mt-2 text-3xl">Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div>
      <h2 className="font-medium text-4xl text-center">Job Listings</h2>
      <div className="flex flex-wrap justify-center gap-6 p-4">
  {userdata.map((item: any) => (
    <div
      key={item.id}
      className="p-6 border border-gray-700 rounded-lg bg-teal-900 text-white w-full sm:w-[45%] md:w-[30%] shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold text-yellow-400 mb-2 text-center">
        {item.title}
      </h3>
      <p className="font-bold text-lg text-yellow-400 text-center my-3">
        SALARY: ${item.price}
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => router.push(`/detailpage/${item.id}`)}
          className="bg-black px-4 py-2 text-white rounded-md cursor-pointer hover:bg-teal-600 transition duration-300"
        >
          Job Detail
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default GetData;
