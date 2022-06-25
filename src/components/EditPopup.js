import * as React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { closeAllPopups } from "../store/popupsSlice";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

function EditPopup({ handleEdit }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popups.isEditPopupOpen);
  const toDo = useSelector((state) => state.toDos.toDoForEdit);
  const [status, setStatus] = useState(0);

  React.useEffect(() => {
    setStatus(toDo.status);
  }, [toDo]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.text != toDo.text) {
      if ((status === 10)) {
         setStatus(11);
      }
      if ((status === 0)) {
        setStatus(1);
      }
    } 
    console.log(toDo.id + " " + data.text + " " + data.status);
    handleEdit(toDo.id, status, data.text);
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeAllPopups());
    reset();
  };

  const handleStatus = () => {
    if (status < 10) {
      setStatus(status + 10);
    } else {
      setStatus(status - 10);
    }
  };

  React.useEffect(() => {
    setValue("text", toDo.text);
  });

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit ToDo</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{ width: "250px", display: "flex", flexDirection: "column" }}
        >
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

          <Button sx={{ ml: "auto", mr: "auto", mt: 2 }} onClick={handleStatus}>
            {status >= 10 ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditPopup;
