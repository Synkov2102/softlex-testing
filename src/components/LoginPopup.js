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

function LoginPopup({ handleLogin }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popups.isLoginPopupOpen);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleLogin(data.username, data.password);
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeAllPopups());
    reset();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
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
            {errors?.email?.message}
          </Typography>
          <TextField
            type="password"
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            fullWidth
            variant="standard"
            {...register("password", {
              required: "Поле обязательно для заполнения",
            })}
          />
          <Typography variant="body2" sx={{ color: "red" }}>
            {errors?.password?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default LoginPopup;
