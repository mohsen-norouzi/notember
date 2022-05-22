import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface appState {
  token?: string;
  theme: 'dark' | 'light';
}

const initialState: appState = {
  token: undefined,
  theme: 'dark'
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme === 'dark' ? 'light' : 'dark';
    },

    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('jwt', action.payload);
    },

    logout: (state) => {
      localStorage.removeItem('jwt');
      state.token = undefined;
    },

    authenticate: (state) => {
      const token = localStorage.getItem('jwt');
      state.token = token || '';
    }
  }
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
