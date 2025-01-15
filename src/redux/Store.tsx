import { configureStore } from '@reduxjs/toolkit';
import groupTrafficSignalSlice from './group_traffic/GroupTrafficSlice';

const store = configureStore({
  reducer: {
    groupTraffic: groupTrafficSignalSlice,  
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
