import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/app-slice';
import noteReducer from './slices/note-slice';
import labelReducer from './slices/label-slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    note: noteReducer,
    label: labelReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
