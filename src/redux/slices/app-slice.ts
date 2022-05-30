import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

interface appState {
  mode: PaletteMode;
}

const stored_mode = localStorage.getItem('mode') as PaletteMode;

const initialState: appState = {
  mode: stored_mode ? stored_mode : 'light'
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', state.mode);
    }
  }
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
