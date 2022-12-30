import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';

const mainReducer = combineReducers({
   mainSlice,
});

export const store: any = configureStore({
   reducer: {
      mainReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
