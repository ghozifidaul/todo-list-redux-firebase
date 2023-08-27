import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ToDoList } from "./types/todos";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const fetchTodosFromFirestore = createAsyncThunk(
  "todos/fetchTodosFromFirestore",
  async () => {
    const querySnapShots = await getDocs(collection(db, "todos"));

    let todosListTemp: Array<ToDoList> = [];
    querySnapShots.forEach((doc) => {
      var data = doc.data();
      const { title, description, status } = data;
      todosListTemp.push({ id: doc.id, title, description, status });
    });

    return todosListTemp;
  }
);

export const toDoListSlice = createSlice({
  name: "todos",
  initialState: {
    todosList: [] as ToDoList[],
    loadingData: false,
  },
  reducers: {
    setToDoList: (state, action: PayloadAction<Array<ToDoList>>) => {
      state.todosList = [...action.payload];
    },
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      // console.log("loading: " + state.loadingData);
      state.loadingData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosFromFirestore.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(
        fetchTodosFromFirestore.fulfilled,
        (state, action: PayloadAction<Array<ToDoList>>) => {
          state.loadingData = false;
          state.todosList = action.payload;
        }
      );
  },
});

export const { setToDoList, toggleLoading } = toDoListSlice.actions;

export const toDoListSelector = (state: RootState) => state.todos.todosList;
export const loadingDataSelector = (state: RootState) =>
  state.todos.loadingData;

export default toDoListSlice.reducer;
