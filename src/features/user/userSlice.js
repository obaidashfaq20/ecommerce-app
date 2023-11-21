import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_URL, SIGNUP_URL } from "../../constants/constant";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: localStorage.getItem('user-email') ||'',
    name: localStorage.getItem('user-name') ||'',
    token: localStorage.getItem('user-token')||'',
    isLoggedIn: localStorage.getItem('user-email') ? true : false,
  },
  reducers: {
    login: (state, user) => {
      state.email = user.payload.email;
      state.token = user.payload.token;
      state.isLoggedIn = true;
      storeInLocalStorage(state.email, state.token);
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
  extraReducers: (builder) => {
    builder
      .addCase(postLoginReqesut.fulfilled, (state, {payload}) => {
        const { user } = payload.response.status.data;
        state.email = user.email;
        state.name = user.name;
        state.token = payload.token;
        state.isLoggedIn = true;
        storeInLocalStorage(state.email, state.token, state.name);
      })
      .addCase(postLoginReqesut.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(postLoginReqesut.rejected, (state, object) => {
        console.log({object})
        alert(`${object.error.name}: Backend is not running`)
        window.location.reload(false);
      })
      .addCase(postSignupRequest.fulfilled, (state, {payload}) => {
        const user = payload.response.data;
        state.email = user.email;
        state.name = user.name;
        state.token = payload.token;
        state.isLoggedIn = true;
        storeInLocalStorage(state.email, state.token, state.name);
        
      })
      .addCase(postSignupRequest.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(postSignupRequest.rejected, (state, object) => {
        const {error} = object;
        state.isLoggedIn = false;
        alert(`${error.name}: ${error.message}`)
      })
  }
})

export const { login, logout, setUserLoggedIn, setUserLoggedOut } = userSlice.actions;
export default userSlice.reducer;

export const postLoginReqesut = createAsyncThunk(
  'user/login',
  async(user) => {
    const response = await axios.post(LOGIN_URL, {
      user
    });
    const authorizationHeader = response.headers.get('authorization');
    const token = authorizationHeader.split(' ')[1];
    return {response: response.data, token: token};
  }
);

export const postSignupRequest = createAsyncThunk(
  'user/signup',
  async(user) => {
    const response = await axios.post(SIGNUP_URL, {
      user
    });
    const authorizationHeader = response.headers.get('authorization');
    const token = authorizationHeader.split(' ')[1];
    return {response: response.data, token: token};
  }
);

const storeInLocalStorage = (email, token, name) => {
  localStorage.clear();
  localStorage.setItem('user-email', email);
  localStorage.setItem('user-token', token);
  localStorage.setItem('user-name', name);
}