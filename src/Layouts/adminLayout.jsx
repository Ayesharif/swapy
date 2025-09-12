import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Aside from '../component/admin/Aside';
import Footer from '../component/common/Footer';

export default function AdminLayout() {
  const [showAside, setShowAside] = useState(false);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-[200px_1fr] overflow-hidden">
      {/* Sidebar */}
      <Aside showAside={showAside} setShowAside={setShowAside} />

      {/* Right section */}
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <nav className="flex justify-between items-center bg-blue-50 p-4 shadow-md">
          <h1 className="text-2xl font-bold">Swapy</h1>
          <button
            className="md:hidden px-4 py-2 outline-1 hover:text-white hover:bg-orange-700 rounded"
            onClick={() => setShowAside(!showAside)}
          >
            ≡ Menu
          </button>
        </nav>

        {/* Content (scrollable only here) */}
        <main className="flex-1 overflow-y-scroll p-4">
          <Outlet />
        </main>


      </div>
    </div>
  );
}
