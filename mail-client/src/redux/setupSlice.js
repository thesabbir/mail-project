import { createSlice } from "@reduxjs/toolkit";

export const setupSlice = createSlice({
  name: "setup",
  initialState: {
    host: null,
    email: null,
    password: null,
    smtp: null,
  },
  reducers: {
    addUser: {
      reducer: (state, action) => (state = action.payload),
    },
  },
});
