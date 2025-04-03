import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: (() => {
    const localState = localStorage.getItem("userData");
    const sessionState = sessionStorage.getItem("userData");

    const storedState = sessionState || localState;

    if (!storedState) return null;

    try {
      const { token, expiresAt } = JSON.parse(storedState);

      if (new Date().getTime() > expiresAt) {
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");
        return null;
      }

      return { token, expiresAt };
    } catch (error) {
      console.error("Failed to parse userData:", error);
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      return null;
    }
  })(),
};


const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    
    setUser(state, action) {
      const expirationDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day
      const { token, rememberMe } = action.payload;
      const userData = { token, expiresAt: expirationDate };

      try {
        sessionStorage.setItem("userData", JSON.stringify(userData)); // Always save in sessionStorage
        if (rememberMe) {
          localStorage.setItem("userData", JSON.stringify(userData)); // Save in localStorage if "Remember Me"
        }
      } catch (error) {
        console.error("Error saving userData:", error);
      }

      console.log(userData)

      state.user = userData;
    },

    logoutUser(state) {
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
