import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  token?: string;
  authenticated: boolean;
}

const initialState: userState = {
  token: undefined,
  authenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.authenticated = true;
      localStorage.setItem('jwt', action.payload);
    },

    logout: (state) => {
      localStorage.removeItem('jwt');
      state.authenticated = false;
      state.token = undefined;
    },

    authenticate: (state) => {
      const token = localStorage.getItem('jwt');
      state.token = token || '';
      state.authenticated = token !== undefined;
    }
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
