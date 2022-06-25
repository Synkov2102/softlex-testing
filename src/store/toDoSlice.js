import { createSlice } from "@reduxjs/toolkit";

const toDoSlice = createSlice({
  name: "toDos",
  initialState: {
    toDosData: [],
    toDoForEdit: {},
    page: 1,
    pagesQty: 1,
    isLoading: false,
  },
  reducers: {
    addToDos(state, action) {
      state.toDosData = action.payload.data;
      state.pagesQty = Math.ceil(action.payload.totalTasks / 3);
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    getToDoForEdit(state, action) {
        state.toDoForEdit = action.payload;
    },
  },
});

export const { addToDos, setIsLoading, setPage, getToDoForEdit } = toDoSlice.actions;

export default toDoSlice.reducer;
