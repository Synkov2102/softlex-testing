import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useSelector, useDispatch } from "react-redux/es/exports";
import { getToDoForEdit } from "../store/toDoSlice";
import { openEditPopup } from "../store/popupsSlice";

function ToDoCard({ toDo }) {
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state.user.isLoggedIn);

  const handleEdit = () => {
    dispatch(getToDoForEdit(toDo))
    dispatch(openEditPopup())
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {toDo.email}
        </Typography>
        <Typography variant="h5" component="div">
          {toDo.username}
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {toDo.text}
        </Typography>
      </CardContent>
      {isLogged ? (
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pr: 2,
            pl: 2,
            pt: 0,
          }}
        >
          {toDo.status === 10 || toDo.status === 11 ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
          <Button size="small" onClick={handleEdit}>
            <EditIcon />
          </Button>
        </CardActions>
      ) : (
        <></>
      )}
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275, margin: 2 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default ToDoCard;
