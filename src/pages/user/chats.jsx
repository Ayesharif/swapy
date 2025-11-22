import React, { useEffect, useState } from "react";
import ContactList from "../../component/user/chatContacts";
import Messages from "../../component/user/messages";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, getContacts } from "../../features/action/chatAction";
import { useParams } from "react-router-dom";
import { selectChat } from "../../features/slices/chatSlice";

export default function Chats() {

  const { id } = useParams();

  const [selected, setSelected] = useState(false);
  const [haveChats, setHaveChats] = useState(true);
  const [showContacts, setShowContacts] = useState(true);


  useEffect(()=>{

    if (id) {
      
      console.log(id);
      
      const [reciverId, productId] = id.split("-");
      
      console.log(reciverId);
      console.log(productId);
      setSelected(true)
      dispatch(selectChat({ otherId: reciverId, productId: productId }));
      dispatch(fetchMessages({ otherId: reciverId, productId: productId }));
    }

  },[])

  
  const dispatch= useDispatch();
  



//   const {contacts, error, messages, loading}= useSelector((state)=>state.chat)
// useEffect(()=>{
// dispatch(getContacts())
// },[])


  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center gap-5 py-5">
      {haveChats ? (
        <div className="grid lg:grid-cols-[30%_1fr] md:grid-cols-[40%_1fr] grid-cols-1 w-[90%] h-[85vh] border border-gray-400">
          
          <div
            className={`${showContacts ? "block" : "hidden md:block"}`}
          >
            <ContactList
              setSelected={setSelected}
              setShowContacts={setShowContacts}
              setHaveChats={setHaveChats}
              // contacts={contacts}
            />
          </div>

          {/* CHAT BOX */}
          <div
            className={`${showContacts ? "hidden md:block" : "block" }  overflow-y-scroll`}
          >
            {selected ? (
              <Messages
                setSelected={setSelected}
                setShowContacts={setShowContacts}
              />
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
