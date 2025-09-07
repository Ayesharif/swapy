import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Aside from './aside';
import Footer from '../user/Footer';

export default function AdminLayout() {
  const [showAside, setShowAside] = useState(false);

  return (
    <div className='h-[100vh] grid grid-rows-[auto_1fr_auto] '>
      {/* Navbar */}
      <nav className='flex justify-between items-center bg-blue-50 p-4 shadow-md '>
        <h1 className='text-2xl font-bold '>Swapy</h1>
        <button
          className='md:hidden px-4 py-2 outline-1 hover:text-white hover:bg-orange-700 rounded'
          onClick={() => setShowAside(!showAside)}
        >
          ≡ Menu
        </button>
      </nav>

      {/* Content area: grid with aside + main */}
     <div className="h-full grid grid-cols-1 md:grid-cols-[200px_1fr] ">
  {/* Sidebar */}
  <Aside showAside={showAside} setShowAside={setShowAside} />

  {/* Main content */}
  <main className="p-4 overflow-y-auto scroll-smooth">
    <Outlet />
  </main>
</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
