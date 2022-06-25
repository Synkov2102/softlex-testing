import * as React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { Button, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { openLoginPopup, openCreationPopup } from "../store/popupsSlice";
import { logOut } from "../store/userSlice";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleExit = () => {
    dispatch(logOut())
    localStorage.clear()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My ToDo List
          </Typography>
          <Button color="inherit" onClick={() => dispatch(openCreationPopup())}>
            Create ToDo
          </Button>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleExit}>
              Exit
            </Button>
          ) : (
            <Button color="inherit" onClick={() => dispatch(openLoginPopup())}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
