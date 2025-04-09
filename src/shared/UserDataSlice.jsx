import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  email: "",
  Admin: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        return action.payload;
    },
    resetUserData: () => initialState
  }
});

export const { setUser,resetUserData } = userSlice.actions;
export default userSlice.reducer;
