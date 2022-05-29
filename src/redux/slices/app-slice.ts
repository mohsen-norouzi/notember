import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

interface appState {
  mode: PaletteMode;
}

const initialState: appState = {
  mode: 'light'
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    }
  }
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
