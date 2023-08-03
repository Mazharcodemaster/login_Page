 'use client'
 import React from 'react';
 import { useAuth } from '@/contextApi/contextProvider';
 import Navbar from '../navbar/page';
 

 const UserDashboard = () => {
   const { auth }: any = useAuth(); // Assuming you have a logout function in your auth context
 
   return (
     <>
       <Navbar auth={auth} dashboard={'User DashBoard'}/> {/* Pass the logout function to Navbar */}
       <div className="min-h-screen flex items-center justify-center bg-gray-800">
         <div className="text-white bg-gray-700 border shadow-lg rounded-xl p-8 max-w-md w-full">
           <h2 className="text-3xl font-bold mb-6 text-center">User Dashboard</h2>
           {auth && auth.user ? ( // Check if auth is not null and auth.user exists
             <div>
               <p>Name: {auth.user.name}</p>
               <p>Email: {auth.user.email}</p>
             </div>
           ) : (
             <p>Loading user data...</p>
           )}
         </div>
       </div>
     </>
   );
 };
 
 export default UserDashboard;
 