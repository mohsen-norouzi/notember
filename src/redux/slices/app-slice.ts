import { createSlice } from '@reduxjs/toolkit';

interface appState {
  theme: 'dark' | 'light';
}

const initialState: appState = {
  theme: 'dark'
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme === 'dark' ? 'light' : 'dark';
    }
  }
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
