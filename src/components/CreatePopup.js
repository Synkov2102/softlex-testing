import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { closeAllPopups } from "../store/popupsSlice";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

function CreatePopup({ handleToDoCreation }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popups.isCreationPopupOpen);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleToDoCreation(data.username, data.email, data.text);
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeAllPopups())
    reset();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Create your ToDo</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ width: "250px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            variant="standard"
            {...register("username", {
              required: "Поле обязательно для заполнения",
            })}
          />
          <Typography variant="body2" sx={{ color: "red" }}>
            {errors?.username?.message}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            variant="standard"
            {...register("email", {
              required: "Поле обязательно для заполнения",
              pattern: {
                value: /\b([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]+)\b/i,
                message: "Почта введена не верно",
              },
            })}
          />
          <Typography variant="body2" sx={{ color: "red" }}>
            {errors?.email?.message}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Text"
            fullWidth
            variant="standard"
            {...register("text", {
              required: "Поле обязательно для заполнения",
            })}
          />
          <Typography variant="body2" sx={{ color: "red" }}>
            {errors?.text?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreatePopup;
