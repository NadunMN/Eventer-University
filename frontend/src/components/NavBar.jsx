import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Popper,
  Grow,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../asset/site-logo.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)",
  boxShadow: "0 3px 5px 2px rgba(103, 58, 183, .3)",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const LogoTypography = styled(Typography)({
  flexGrow: 1,
  "& img": {
    width: "80px",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
});

const NavButton = styled(Button)(({ theme }) => ({
  color: "white",
  margin: theme.spacing(0, 1),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const StyledMenuList = styled(MenuList)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
export const NavBar = ({ logout, userRole, userId }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab" || event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
    logout();
    handleClose();
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoTypography variant="h5">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </LogoTypography>
        <Box>
          <NavButton component={Link} to="/">
            Home
          </NavButton>
          <NavButton component={Link} to="/event">
            Events
          </NavButton>
          <NavButton component={Link} to="/about">
            About
          </NavButton>
          <NavButton component={Link} to="/contact">
            Contact Us
          </NavButton>
          {userId ? (
            <>
              <Tooltip title={userId ? "Profile" : "Login"}>
                <StyledIconButton ref={anchorRef} onClick={handleToggle}>
                  <AccountCircleIcon />
                </StyledIconButton>
              </Tooltip>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-end"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-end"
                          ? "right top"
                          : "right bottom",
                    }}
                  >
                    <Paper elevation={3}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <StyledMenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <StyledMenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                          </StyledMenuItem>

                          <StyledMenuItem
                            component={Link}
                            to="/dashboard"
                            onClick={handleClose}
                            divider
                          >
                            <ListItemIcon>
                              <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                          </StyledMenuItem>
                          <StyledMenuItem onClick={logout}>
                            <ListItemIcon>
                              <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                          </StyledMenuItem>
                        </StyledMenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          ) : (
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{
                bgcolor: "#173a75",
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};
