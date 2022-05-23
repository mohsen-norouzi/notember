import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Maybe,
  UsersPermissionsLoginPayload,
  UsersPermissionsMe
} from 'graphql/generated/graphql-types';

interface userState {
  token?: string;
  authenticated: boolean;
  username: string;
  email: string;
}

const initialState: userState = {
  token: undefined,
  authenticated: false,
  username: '',
  email: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      if (action.payload && action.payload.trim() !== '') {
        state.token = action.payload;
        state.authenticated = true;
        localStorage.setItem('jwt', action.payload);
      }
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
    },

    setUserData: (state, action: PayloadAction<UsersPermissionsMe>) => {
      const { username, email } = action.payload;

      if (username) {
        state.username = action.payload.username;
      }

      if (email) {
        state.email = action.payload.email || '';
      }
    }
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
