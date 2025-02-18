import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-600">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-center font-medium text-2xl text-white">LOGIN</h1>

        <div className="mt-4">
          <input type="email" className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded outline-none" placeholder="Enter Email"/>
          <input type="password" className="w-full mt-3 p-2 text-white bg-gray-700 border border-gray-600 rounded outline-none" placeholder="Enter Password"/>

          <button className="w-full p-2 mt-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded">
            Login
          </button>

          <p className="text-gray-400 text-sm text-center mt-3">   Don't have an account?{' '}
              <Link href="/signup" className="text-teal-400 text-base hover:underline "> Sign up </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

