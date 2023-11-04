import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { user: Cookies.get("token") },
  reducers: {
    changeUservalues: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { changeUservalues } = userSlice.actions;
export default userSlice.reducer;
