"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { log } from "console";
import Link from "next/link";
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
  // console.log(data)
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
  
  console.log(userdata);
  
  const mutation = useMutation({
    mutationFn: postJob,
    onSuccess: () => {  queryClient.invalidateQueries({ queryKey: ['jobs'] })},
  })

  if (isLoading) return <p className="text-center font-bold mt-2 text-3xl">Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="font-medium text-4xl text-center">Job Listings</h2>
      <div className="flex flex-wrap justify-center gap-4 ">
        {userdata.map((item: any) => (

          <div  key={item.id} className="p-4 border rounded-md bg-teal-900 text-white w-full sm:w-2/5 m-2 ">

            <h3 className="text-lg font-bold text-yellow-500">{item.title}</h3>
            <p>{item.description}</p>
            <p className="text-bold text-xl text-yellow-500 mb-5">SALARY: ${item.price}</p>

     <button  onClick={() => router.push(`/detailpage/${item.id}`)} className="bg-black p-2 text-white rounded-md cursor-pointer  hover:bg-teal-600"                  >
              Job Detail
            </button>
       
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetData;
