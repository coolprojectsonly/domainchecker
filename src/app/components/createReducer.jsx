import { createSlice } from "@reduxjs/toolkit";
import { getDomain } from "./action";

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

const createReducer = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getDomain.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDomain.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDomain.rejected, (state) => {
        state.status = "failed";
        state.error = "error";
      });
  },
});

export default createReducer;
