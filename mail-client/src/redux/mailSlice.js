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

const mailSlice = createSlice({
  name: "mails",
  initialState: { messages: [], detail: {}, loading: "idle", error: false },
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
    [fetchMailDetails.fulfilled]: (state, action) => {
      // Add mails to the state
      state.detail = action.payload.detail;
    },
    [fetchMailDetails.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

export default mailSlice;