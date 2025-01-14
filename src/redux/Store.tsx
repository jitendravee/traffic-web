import { configureStore } from '@reduxjs/toolkit';
import groupTrafficSignalSlice from './group_traffic/GroupTrafficSlice';

const store = configureStore({
  reducer: {
    groupTraffic: groupTrafficSignalSlice,  // This should match the name of the slice (groupTraffic)
  },
});

// Export the store
export default store;

// Export AppDispatch type to use in components
export type AppDispatch = typeof store.dispatch;
