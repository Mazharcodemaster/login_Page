'use client'
import React, { useState } from 'react';
import Navbar from '../navbar/page';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    setLoading(true); 
    try {
      if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        toast.error('Please fill all fields');
        setLoading(false);
        return;
      }
      const res = await axios.post('/api/register', {
       username,
        email,
        password,
      });
       if(res.data.message=='Please fill all fields'){
        toast.error(res.data.message)
       }
      if (res.data.message === 'User Sign Up Successfully' || res.data.message === 'User Already Sign Up') {
        toast.success(res.data.message);
        router.push('/components/signIn');
      }
    } catch (error) {
      toast.error('Error occurred during sign up');
    } finally {
      setLoading(false); // Set loading back to false after the sign-up process is done
    }
  };

  return (
    <>
      <Navbar register={'SignUp Page'}/>
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="text-white bg-gray-700 border shadow-lg rounded-xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign up</h2>
          <form>
          <div className="mb-4 ">
             <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
               Username
             </label>             
             <input
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
               id="username"
               type="text"
               placeholder="Username"
               value={username}
               onChange={(e)=>setUsername(e.target.value)}
              
             />
           </div>
           <div className="mb-4">
             <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
               Email
             </label>
             <input
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
               id="email"
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
             />
           </div>
           <div className="mb-4">
             <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
               Password
             </label>
             <div className="relative">
                  <input
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                 id="password"
                 type={showPassword ? 'text' : 'password'}
                 placeholder="Password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
               />
               <span                 className="absolute top-0 right-0 h-full flex items-center px-2 cursor-pointer"
                 onClick={toggleShowPassword}
               >
                 {showPassword ? (
                   <svg
                     className="h-5 w-5 text-gray-700"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                       d="M15.536 8.464a9 9 0 1112.728 12.728 1 1 0 01-1.414-1.414 7 7 0 10-9.9-9.9 1 1 0 01-1.414-1.414zM12 6a2 2 0 100 4 2 2 0 000-4z"
                     />
                   </svg>
                 ) : (
                   <svg
                     className="h-5 w-5 text-gray-700"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                       d="M17.657 6.343a9 9 0 1112.728 12.728 1 1 0 01-1.414-1.414 7 7 0 10-9.9-9.9 1 1 0 01-1.414-1.414zM12 4a8 8 0 018 8 8 8 0 01-16 0 8 8 0 018-8z"                     />
                     <path
                       strokeLinecap="round"                       strokeLinejoin="round"
                       strokeWidth="2"
                       d="M2 2l20 20"
                     />
                   </svg>
                 )}
               </span>
            </div>
           </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                type="button"
                onClick={handleSignUp}
                disabled={loading} // Disable the button while loading is true
              >
                {loading ? 'Loding...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

