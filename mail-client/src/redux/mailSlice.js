import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../client";

export const fetchRecentMail = createAsyncThunk(
  "mail/fetch/recent",
  async (data) => {
    const response = await client.post("/api/mails", data);
    return response.data;
  }
);

const mailSlice = createSlice({
  name: "mails",
  initialState: { messages: [], loading: "idle", error: false },
  reducers: {
    // non async logics
  },
  extraReducers: {
    [fetchRecentMail.fulfilled]: (state, action) => {
      // Add mails to the state
      state.messages = action.payload.messages;
    },
    [fetchRecentMail.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

export default mailSlice;
