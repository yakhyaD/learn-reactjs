import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    step: false,
    plan: null,
  },
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
    },
    Setstep: state => {
      state.step = true
    },
    SetPlan: (state, action) => {
      state.plan = action.payload
    }
  },
});

export const { login, logout, Setstep, SetPlan } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = state => state.user.user;
export const selectStep = state => state.user.step
export const selectPlan = state => state.user.plan

export default userSlice.reducer;
