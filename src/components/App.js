import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import ToDoList from "./ToDoList";
import CreatePopup from "./CreatePopup";
import LoginPopup from "./LoginPopup";

import api from "../utils/Api";

import { addToDos, setIsLoading } from "../store/toDoSlice";
import { logIn, logOut } from "../store/userSlice";
import { setPage } from "../store/toDoSlice";
import EditPopup from "./EditPopup";

function App() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.toDos.page);
  const pagesQty = useSelector((state) => state.toDos.pagesQty);

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    getToDos(page);
    checkToken();
  }, [page]);

  const getToDos = (page) => {
    api.getToDos(page).then((data) => {
      dispatch(
        addToDos({
          data: data.message.tasks,
          totalTasks: data.message.total_task_count,
        })
      );
      dispatch(setIsLoading(false));
    });
  };

  const handleToDoCreation = (username, email, text) => {
    api
      .createToDo(username, email, text)
      .then(() => {
        return getToDos(page);
      })
      .then(() => {
        dispatch(setPage(pagesQty));
      });
  };

  const handleLogin = (username, password) => {
    api.login(username, password).then((data) => {
      dispatch(logIn());
      localStorage.setItem("token", JSON.stringify(data.message.token));
    });
  };

  const handleEdit = (toDoId, status, text) => {
    api.editToDo(toDoId, status, text).then((data) => {
      console.log(data)
      getToDos(page)
    })
  };

  const checkToken = () => {
    api.editToDo(28932).then((data) => {
      if (data.status === "ok") {
        dispatch(logIn());
      } else {
        dispatch(logOut());
      }
    });
  };

  return (
    <>
      <Header />
      <ToDoList />
      <CreatePopup handleToDoCreation={handleToDoCreation} />
      <LoginPopup handleLogin={handleLogin} />
      <EditPopup handleEdit={handleEdit}/>
    </>
  );
}

export default App;
