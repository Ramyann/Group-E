import { createSlice } from "@reduxjs/toolkit";

const loadLanguageFromLocalStorage = () => {
  try {
    const serializedLanguage = localStorage.getItem("language");
    if (serializedLanguage === null || serializedLanguage === undefined) {
      return "en";
    }
    return JSON.parse(serializedLanguage);
  } catch (error) {
    return "en";
  }
};

const saveLanguageToLocalStorage = (language) => {
  try {
    const serializedLanguage = JSON.stringify(language);
    localStorage.setItem("language", serializedLanguage);
  } catch (error) {
    console.error(error);
  }
};

const languageSlice = createSlice({
  name: "language",
  initialState: {
    currentLanguage: loadLanguageFromLocalStorage(),
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      saveLanguageToLocalStorage(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;