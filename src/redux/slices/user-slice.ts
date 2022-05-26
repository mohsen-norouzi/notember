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
    login: (state, action: PayloadAction<UsersPermissionsLoginPayload>) => {
      const { jwt, user } = action.payload;

      if (jwt && jwt.trim() !== '') {
        state.token = jwt;
        state.authenticated = true;
        state.email = user.email || '';
        state.userId = user.id;
        state.username = user.username;
        localStorage.setItem('jwt', jwt);
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
