'use client'
import Navbar from '../navbar/page';

const Landing_Page = () => {
  return (
    <div className='bg-gray-200 h-screen'>
        <Navbar/>
       <header className="bg-gray-800 text-white text-center h-screen flex flex-col justify-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Awesome Landing Page</h1>
          <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          <button className="bg-white text-blue-600 font-bold px-6 py-3 mt-6 rounded-lg shadow-lg hover:bg-blue-50 focus:outline-none">Get Started</button>
        </div>
      </header>
    </div>
  );
};

export default Landing_Page;
