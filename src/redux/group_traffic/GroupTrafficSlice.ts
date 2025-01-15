import { createSlice } from "@reduxjs/toolkit";
import { getGroupSignalDataThunk } from "./GroupTrafficThunk.ts";

interface Signal {
  signal_id: string;
  lane_no: number;
  current_color: "green" | "yellow" | "red";
  green_duration: number;
  yellow_duration: number;
  red_duration: number;
  vehicle_count: number;
  signal_image: string;
}

interface GroupTrafficData {
  group_id: string;
  group_name: string;
  signal_count: number;
  signals: Signal[];
}

interface GroupTrafficState {
  data: GroupTrafficData | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: GroupTrafficState = {
  data: null,
  loading: false,
  error: null,
};

const groupTrafficSignalSlice = createSlice({
  name: "groupTraffic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupSignalDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroupSignalDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unknown error occurred."; // Provide a fallback value
      })
      .addCase(getGroupSignalDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Update the state with fetched data
        state.error = null; // Clear any previous error
      });
  },
});

export default groupTrafficSignalSlice.reducer;
