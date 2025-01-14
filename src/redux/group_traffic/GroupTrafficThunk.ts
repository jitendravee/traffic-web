import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGroupSignalDataThunk = createAsyncThunk(
  'group/getSignal',
  async (id:string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://go-clean-architectur.onrender.com/v1/signal/${id}`);

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Failed to get the group data');
      }
    } catch (error) {      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
