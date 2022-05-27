import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersPermissionsLoginPayload, UsersPermissionsMe } from 'graphql/generated/graphql-types';

interface userState {
  token?: string;
  authenticated: boolean;
  username: string;
  email: string;
  userId: string;
}

const initialState: userState = {
  token: undefined,
  authenticated: false,
  username: '',
  email: '',
  userId: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const token = action.payload;

      if (token && token.trim() !== '') {
        state.token = token;
        state.authenticated = true;
        localStorage.setItem('jwt', token);
      }
    },

    logout: (state) => {
      localStorage.removeItem('jwt');
      state.authenticated = false;
      state.token = undefined;
      state.username = '';
      state.email = '';
      state.userId = '';
    },

    authenticate: (state) => {
      const token = localStorage.getItem('jwt');
      state.token = token || '';
      state.authenticated = token !== undefined;
    },

    setUserData: (state, action: PayloadAction<UsersPermissionsMe>) => {
      const { username, email, id } = action.payload;

      if (username) {
        state.username = username;
      }

      if (email) {
        state.email = email || '';
      }

      if (id) {
        state.userId = id;
      }
    }
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
