import { createAsyncThunk } from "@reduxjs/toolkit";

export const getContacts = createAsyncThunk(
  "chat/getContacts",
  async () => {
    const res = await fetch("https://swapy-backend.vercel.app/contacts", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load contacts");

    return data.data;
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ otherId, productId }) => {
    const url = `https://swapy-backend.vercel.app/messages/${otherId}/${productId}`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch messages");

    return data.data;
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (msgData) => {
    const res = await fetch("https://swapy-backend.vercel.app/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(msgData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to send message");

    return data.data;
  }
);
