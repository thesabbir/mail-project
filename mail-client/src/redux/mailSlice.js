import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../client";

export const fetchRecentMail = createAsyncThunk(
  "mail/fetch/recent",
  async (data) => {
    const response = await client.post("/api/mails", data);
    return response.data;
  }
);

export const fetchMailDetails = createAsyncThunk(
  "mail/fetch/single",
  async (data) => {
    const response = await client.post("/api/mail", data);
    return response.data;
  }
);
export const sendMail = createAsyncThunk("mail/send", async (data) => {
  const response = await client.post("/api/send", data);
  return response.data;
});

const mailSlice = createSlice({
  name: "mails",
  initialState: { messages: [], detail: {}, loading: false, error: false },
  reducers: {
    // non async logics
  },
  extraReducers: {
    [fetchRecentMail.fulfilled]: (state, action) => {
      // Add mails to the state
      state.messages = action.payload.messages;
      state.loading = false;
    },
    [fetchRecentMail.pending]: (state, action) => {
      // Add mails to the state
      state.loading = true;
    },
    [fetchRecentMail.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },
    [fetchMailDetails.fulfilled]: (state, action) => {
      // Add mails to the state
      state.detail[action.payload.detail.sequence] = action.payload.detail;
      state.loading = false;
    },
    [fetchMailDetails.pending]: (state, action) => {
      // Add mails to the state
      state.loading = true;
    },
    [fetchMailDetails.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default mailSlice;
