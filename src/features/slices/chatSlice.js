import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages, getContacts, sendMessage } from "../action/chatAction";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    contacts: [],
    messages: [],
    selectedChat: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload; // {otherId, productId}
      state.messages = []; // clear old messages
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { selectChat, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
