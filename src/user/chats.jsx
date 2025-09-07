import React, { useState } from 'react'
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { chat } from '../chat';

export default function Chats() {
  const navigate= useNavigate();
  const [selected, setSelected] = useState(false);
  const [haveChats, setHaveChats] = useState(true);
  const [showContacts, setShowContacts] = useState(true); // ✅ controls mobile switching

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <NavBar />

      {haveChats ? (
        <div className="grid lg:grid-cols-[30%_1fr] md:grid-cols-[40%_1fr] grid-cols-1 w-[90%] h-[85vh] border border-gray-400">
          {/* CONTACTS LIST */}
          <div
            className={`grid grid-rows-[auto_auto_1fr] h-full border-r border-gray-400
              ${showContacts ? "block" : "hidden md:block"}`}
          >
            {/* Header */}
            <div className="flex items-center w-full justify-between p-2 border-b border-gray-400">
              <p className="text-xl py-2 font-bold">INBOX</p>
            </div>

            {/* Filters */}
            <div className="flex items-center w-full gap-3 px-2 py-4 border-b border-gray-400">
              <button className="outline-1 py-1 px-3 rounded-2xl text-lg">All</button>
              <button className="outline-1 py-1 px-3 rounded-2xl text-lg">Unread Chats</button>
            </div>
<div className='flex flex-col'>

            {/* Contact Item */}
            <div
              className="flex items-center w-full justify-between p-2 border-b border-gray-400 cursor-pointer"
              onClick={() => {
                setSelected(true);
                setShowContacts(false); // ✅ hide contacts on mobile
              }}
            >
              <div className="flex items-center gap-5">
                <i className="fa-solid fa-user text-4xl"></i>
                <div>
                  <p className="text-md font-medium">Muhammad Ali</p>
                  <p className="text-lg font-medium">Full sleeves shirt</p>
                  <p className="text-sm">Last active 4:30pm</p>
                </div>
              </div>
              <div>
                <i
                  className="fa-solid fa-trash text-xl"
                  onClick={() => setHaveChats(false)}
                ></i>
              </div>
            </div>
            </div>
          </div>

          {/* CHAT BOX */}
          <div
            className={`h-full ${showContacts ? "hidden md:block" : "block"}`}
          >
            {selected ? (
              <div className="grid grid-rows-[auto_auto_1fr] h-full relative">
                {/* Chat Header */}
                <div className="flex items-center w-full justify-between p-2 border-b border-gray-400">
                  <div className="flex items-center gap-5"
                  onClick={()=>navigate('/profile')}
                  >

                    
                    <i className="fa-solid fa-user text-4xl"></i>
                    <div >
                      <p className="text-md font-bold">Muhammad Ali</p>
                      <p className="text-sm">Last active 4:30pm</p>
                    </div>
                  </div>
                  <div>
                    <i
                      className="fa-solid fa-xmark text-2xl cursor-pointer"
                      onClick={() => {setSelected(false), setShowContacts(true)}}
                    ></i>
                  </div>
                </div>


                <div className="flex items-center w-full justify-between p-2 border-b border-gray-400">
                  <div className="flex items-center gap-5">
                    <i className="fa-solid fa-shirt text-4xl"></i>
                    <div>
                      <p className="text-lg font-bold">Full sleeves shirt</p>
                      <p className="text-md">Rs 550</p>
                    </div>
                  </div>
                  <div>
                    <button className="bg-blue-950 text-white text-lg font-medium px-3 rounded"
                    onClick={() => navigate('/detailpage/5')}
                    >
                      View Ad
                    </button>
                  </div>
                </div>

                {/* Chat Messages Area */}
                <div className="grid grid-rows-[1fr_auto]">
<div className="p-4 h-[65vh]  overflow-scroll">
  {chat.map((response, key) => (
    <div
      key={key}
      className={`flex flex-col mb-3 ${
        response.sender === "Buyer" ? "items-end" : "items-start"
      }`}
    >
      <p
        className={`px-3 py-2 rounded-lg ${
          response.sender === "Buyer"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {response.message}
      </p>
      <p className="text-[10px] text-gray-500">{response.timestamp}</p>
    </div>
  ))}
</div>

                <div className="flex items-center relative border-t bg-white ">
<input className=' w-[95%] text-xl py-2 px-1 outline-0' type="text"  />
             <i className='fa-solid fa-paper-plane text-xl px-2 absolute right-5'></i>
                </div>

                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-2xl font-light">No chat selected !</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-2xl font-light">You don't have any chat !</p>
        </div>
      )}
    </div>
  );
}
