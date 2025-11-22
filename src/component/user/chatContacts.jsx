import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, getContacts } from "../../features/action/chatAction";
import { selectChat } from "../../features/slices/chatSlice";

export default function ContactList({ setSelected, setShowContacts }) {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  return (
    <div className="h-full border-r border-gray-400">
      <div className="p-2 border-b">
        <p className="text-xl font-bold">INBOX</p>
      </div>

      <div className="flex flex-col">
        {contacts.map((c, index) => (
          <div
            key={index}
            className="flex items-center p-2 border-b cursor-pointer"
            onClick={() => {
              dispatch(selectChat({ otherId: c.user._id, productId: c.product._id }));
              dispatch(fetchMessages({ otherId: c.user._id, productId: c.product._id }));
              setSelected(true);
              setShowContacts(false);
            }}
          >
            <img
              src={c.product.images[0].imageUrl}
              className="w-16 h-16 rounded"
            />
            <div className="ml-3">
              <p className="font-medium">{c.user.firstName} {c.user.lastName}</p>
              <p className="text-sm">{c.product.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
