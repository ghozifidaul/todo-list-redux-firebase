import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ToDoList {
  id: string;
  title: string;
  description: string;
  reminder?: string;
  status: boolean;
}

const initialState: Array<ToDoList> = [];

export const toDoListSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToDoList: (state, action: PayloadAction<ToDoList>) => {
      state.push(action.payload);
    },
    toggleTodos: (state, action: PayloadAction<ToDoList>) => {
      state.push(action.payload);
    },
  },
});

export const { addToDoList, toggleTodos } = toDoListSlice.actions;
export const toDoListSelector = (state: RootState) => state.todos;
export default toDoListSlice.reducer;
