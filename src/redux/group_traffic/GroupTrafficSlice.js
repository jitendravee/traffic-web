import { createSlice } from "@reduxjs/toolkit";
import { getGroupSignalDataThunk } from "./GroupTrafficThunk.ts";

const initialState = {
  data: null, // Initialize as null or an empty object
  loading: false,
  error: null, // Optional error handling
};

const groupTrafficSignalSlice = createSlice({
  name: 'groupTraffic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupSignalDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroupSignalDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
      .addCase(getGroupSignalDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      });
  }
});

export default groupTrafficSignalSlice.reducer;
