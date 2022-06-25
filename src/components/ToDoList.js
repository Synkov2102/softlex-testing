import * as React from "react";

import ToDoCard from "./ToDoCard";

import { Container, Pagination, CircularProgress } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { setPage } from "../store/toDoSlice";

function ToDoList({ isLoggedIn }) {
  const dispatch = useDispatch();
  const toDos = useSelector((state) => state.toDos.toDosData);
  const page = useSelector((state) => state.toDos.page);
  const isLoading = useSelector((state) => state.toDos.isLoading);
  const pagesQty = useSelector((state) => state.toDos.pagesQty);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "600px",
          justifyContent: "start",
        }}
      >
        {isLoading ? (
          <Container
            sx={{
              m: "auto",
              width: "fit-content",
            }}
          >
            <CircularProgress />
          </Container>
        ) : (
          toDos.map((toDo) => (
            <ToDoCard key={toDo.id} toDo={toDo}/>
          ))
        )}
      </Container>
      <Pagination
        count={pagesQty}
        page={page}
        onChange={(_, num) => {
          dispatch(setPage(num));
        }}
        sx={{ mr: "auto", ml: "auto", width: "fit-content" }}
        color="primary"
      />
    </>
  );
}

export default ToDoList;
