import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider,
} from "@mui/material";
import { AppContext } from "../../context/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { ROUTES } from "../../common/constants";
import Settings from "./components/Settings";
import NestedMenuItem from "material-ui-nested-menu-item";

const Navbar = () => {
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

  return (
    <AppBar position="static" style={{ background: "#ffffff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box noWrap sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <img
              onClick={(event) => navigate(ROUTES.HOMEPAGE)}
              height={44}
              width={104}
              src={Logo}
              alt="logo"
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", color: "black" },
              }}
            >
              <MenuItem onClick={() => navigate(ROUTES.PROPERTY_LISTING)}>
                <Typography textAlign="center">Property Rental</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(ROUTES.VIEW_SERVICES)}>
                <Typography textAlign="center">Services</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(ROUTES.ROOMMATE_FINDER)}>
                <Typography textAlign="center">Roommate Finder</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(ROUTES.VIEW_FAVORITES)}>
                <Typography textAlign="center">Favorites</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box noWrap sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <img
              onClick={(event) => navigate(ROUTES.HOMEPAGE)}
              height={40}
              width={80}
              src={Logo}
              alt="logo"
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate(ROUTES.PROPERTY_LISTING)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              PROPERTY RENTAL
            </Button>
            <Button
              onClick={() => navigate(ROUTES.VIEW_SERVICES)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Services
            </Button>
            <Button
              onClick={() => navigate(ROUTES.ROOMMATE_FINDER)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              ROOMMATE FINDER
            </Button>
            <Button
              onClick={() =>
                authenticated
                  ? navigate(ROUTES.VIEW_FAVORITES)
                  : navigate(ROUTES.LOGIN)
              }
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Favorites
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="right"
            // width={225}
            sx={{ flexGrow: 0 }}
          >
            {authenticated && currentUser.role == "super_admin" ? (
              <Button
                variant="contained"
                onClick={() =>
                  authenticated
                    ? navigate(ROUTES.VIEW_ADMIN_PAGE)
                    : navigate(ROUTES.LOGIN)
                }
                sx={{
                  marginRight: 2,
                  backgroundColor: "#1C3988",
                  alignItems: "right",
                  display: { xs: "none", md: "flex" },
                }}
              >
                Admin
              </Button>
            ) : (
              ""
            )}
            <Button
              variant="contained"
              sx={{
                marginRight: 2,
                backgroundColor: "#1C3988",
                alignItems: "right",
                display: { xs: "none", md: "flex" },
              }}
              onClick={() => navigate(ROUTES.ADD_PROPERTY)}
            >
              Post Ad
            </Button>
            {authenticated ? (
              <Settings />
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1C3988",
                  display: { md: "flex" },
                }}
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
