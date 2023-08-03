 'use client'

 import React from 'react';
 import { useRouter } from 'next/navigation';
 import axios from 'axios';
 import { useAuth } from '@/contextApi/contextProvider';
 import { toast } from 'react-toastify';
 
 export const Navbar = (props:any) => {
   const router = useRouter();
   const { auth, setAuth } = useAuth();
 
  //  const LogOut = async () => {
  //    try {
  //      setAuth({user:null});
  //      await axios.post('/api/logout');
  //      router.push('/components/homePage');
  //    } catch (error) {
  //      console.error('Logout error:', error);
  //    }
  //  };
 
   const deleteUser = async () => {
     try {
       if (auth && auth.user && auth.user.email) {
         const response = await axios.delete('/api/login', {
           data: { email: auth.user.email },
         });
 
         if (response.status === 200) {
           toast.success('User deleted successfully');
           setAuth({
            ...auth,
            user:null
           })
           router.push('/components/homePage');
         } else {
           toast.error('Error deleting user');
         }
       }
     } catch (error) {
       console.error('Delete user error:', error);
       toast.error('Error deleting user');
     }
   };
 
   return (
     <nav className="bg-gray-950 text-white p-4">
       <div className="container mx-auto flex justify-between items-center">
         <div className="flex items-center">
           <h1 className="text-2xl font-bold">{
               props.auth && props.auth.user?`${props.dashboard}`:'WELCOME TO OUR WEBSITE'
               }              </h1>
         </div>
         <div className="flex items-center space-x-4">
           {/* Your navigation buttons */}
         </div>
         <div className="flex items-center space-x-4">
           {props.auth && props.auth.user ? (
             <>
               <button onClick={deleteUser} className="nav-button">
                 Delete Account
               </button>
               {/* <button onClick={LogOut} className="nav-button">
                 Logout
               </button> */}
             </>
           ) : (
             <>
               <button onClick={() => router.push('/components/signUp')} className="nav-button">
                 Register
               </button>
               <button onClick={() => router.push('/components/signIn')} className="nav-button">
                 Login
               </button>
             </>
           )}
         </div>
       </div>
     </nav>
   );
 };
 
 export default Navbar;
 
