import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import languageReducer from "./slices/languageSlice";
import filterReducer from "./slices/filterSlice";
import themeReducer from "./slices/themeSlice";
import { createLogger } from "redux-logger";

const logger = createLogger();

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    filter: filterReducer,
    theme: themeReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
