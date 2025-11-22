import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../socket";
import { fetchMessages } from "../../features/action/chatAction";
import { receiveMessage } from "../../features/slices/chatSlice";
import { useNavigate } from "react-router-dom";

export default function Messages({ setSelected, setShowContacts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedChat, messages, contacts } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.auth);
 
  
  
  const [text, setText] = useState("");
  const myId = currentUser._id;
  
  if (!selectedChat) return null;
  const { otherId, productId } = selectedChat;
  // console.log(selectedChat);
  
  const userData= contacts?.find(user=> user.user._id == otherId && user.productId==productId);
  // console.log(userData);
  // Unique room ID
  const roomId = [myId, otherId, productId].sort().join("_");

  // Join room
  useEffect(() => {
    socket.emit("join_room", roomId);
  }, [roomId]);

  // Receive message live
  useEffect(() => {
    const handler = (msg) => dispatch(receiveMessage(msg));
    socket.on("receive_message", handler);

    return () => socket.off("receive_message", handler);
  }, [dispatch]);

  // Send message
  const sendMsg = () => {
    if (!text.trim()) return;

    const data = {
      roomId,
      senderId: myId,
      receiverId: otherId,
      productId,
      message: text
    };

    // Realtime send
    socket.emit("send_message", data);



    setText("");
  };

  return (
    <div className="h-full flex flex-col">
<div className="flex items-center w-full justify-between p-2 border-b border-gray-400">
                  <div className="flex items-center gap-5"
                  onClick={()=>navigate('/')}
                  >

                    
{
userData.user.image? (
<img src={userData?.user?.image?.image}
className=" h-15 rounded"
alt="" />):
            (    <i className='fa-solid fa-user text-3xl text-blue-950 p-3'></i> )
            }
                    <div >
                      <p className="text-md font-bold">{`${userData.user.firstName} ${userData.user.lastName}`}</p>
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
<img src={userData?.product?.images[0]?.imageUrl}
className=" h-15 rounded"
alt="" />
                    <div>
                      <p className="text-lg font-bold">{userData.product.title}</p>
                      <p className="text-md">{`Rs ${userData.product.price}`}</p>
                    </div>
                  </div>
                  <div>
                    <button className="bg-blue-950 text-white text-lg font-medium px-3 rounded"
                    onClick={() => navigate(`/detailpage/${productId}`)}
                    >
                      View Ad
                    </button>
                  </div>
                </div>
      <div className="flex-1 p-4 overflow-y-scroll    ">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`mb-3 ${m.senderId === myId ? "text-right" : "text-left"}`}
          >
            <p className={`inline-block px-3 py-2 rounded-lg 
                ${m.senderId === myId ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {m.message}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3 flex border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
        />
        <button onClick={sendMsg} className="ml-2 bg-blue-600 text-white px-3 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
