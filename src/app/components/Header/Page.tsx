
import React from 'react'


const Header = () => {
  return (
    <div>
             <div className='header-image flex flex-col justify-center items-center text-white'>
                  <h1 className='text-bold text-4xl '>Find What You Need</h1>
                  <p  className=' text-xl mt-2'>Search for any job you want</p>

                  <div className='mt-3 w-full max-w-md bg-slate-900'>
                        <input type="search" placeholder='Search Here...'  className='p-3 rounded-lg border-none outline-none text-black w-full font-medium text-xl'/>
                  </div>
             </div>
    </div>
  )
}
export default Header 