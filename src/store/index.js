import { configureStore } from "@reduxjs/toolkit";

import toDoReducer from "./toDoSlice";
import popupsReducer from "./popupsSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    toDos: toDoReducer,
    popups: popupsReducer,
    user: userReducer
  },
});
