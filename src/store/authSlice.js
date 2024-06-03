import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {email, password} = action.payload;
      if (email && password) {
        state.user = {name: 'Test User'};
        state.status = 'succeeded';
        state.error = null;
      } else {
        state.status = 'failed';
        state.error = 'Invalid username or password';
      }
    },
    logout: state => {
      state.user = null;
      state.status = 'idle';
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
