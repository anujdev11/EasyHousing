import React, { useContext } from "react";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Divider,
} from "@mui/material";
import { AppContext } from "../../../context/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants";
const Settings = () => {
  const {
    state: { authenticated, currentUser },
  } = useContext(AppContext);
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuClick = (event, route) => {
    navigate(route);
  };
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open User Setting">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={currentUser.firstName + " " + currentUser.lastName}
              src={currentUser.imgURL}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem disableTouchRipple>
            <Typography textAlign="center">
              <strong>
                {currentUser.firstName} {currentUser.lastName}
              </strong>
            </Typography>
          </MenuItem>
          <MenuItem disableTouchRipple>
            <Typography textAlign="center">{currentUser.email}</Typography>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={(event) => handleUserMenuClick(event, ROUTES.USERS_PROPERTY)}
          >
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem
            onClick={(event) =>
              handleUserMenuClick(event, ROUTES.CHANGEPASSWORD)
            }
          >
            <Typography textAlign="center">Change Password</Typography>
          </MenuItem>

          <MenuItem
            onClick={(event) => handleUserMenuClick(event, ROUTES.LOGOUT)}
          >
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default Settings;
