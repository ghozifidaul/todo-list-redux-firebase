import { configureStore } from "@reduxjs/toolkit";
import toDoListSlice from "./todoListSlice";

export const store = configureStore({
  reducer: {
    todos: toDoListSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
