// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    counter: counterReducer,
  },
});
