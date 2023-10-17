import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: localStorage.getItem('user-email') ||'',
    token: localStorage.getItem('user-token')||'',
    isLoggedIn: localStorage.getItem('user-email') ? true : false,
  },
  reducers: {
    login: (state, user) => {
      state.email = user.payload.email;
      state.token = user.payload.token;
      state.isLoggedIn = true;
      localStorage.clear();
      localStorage.setItem('user-email', state.email);
      localStorage.setItem('user-token', state.token);
    },
    logout: (state) => {
      state.email = '';
      state.token = '';
      state.isLoggedIn = false;
      localStorage.clear();
    },
    setUserLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setUserLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
})

export const { login, logout, setUserLoggedIn, setUserLoggedOut } = userSlice.actions;
export default userSlice.reducer;