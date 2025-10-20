"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// This component is an MUI + Tailwind approximation of the UCSF website header.
// It is intentionally self-contained and responsive. Tweak the colors, spacing,
// and link items to match the live site if you want pixel-perfect parity.

export default function UcsfHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="w-full">
      {/* Main AppBar */}
      <AppBar
        position="static"
        elevation={2}
        sx={{ backgroundColor: "#002855" }}
      >
        <Toolbar className="max-w-7xl mx-auto w-full px-4">
          {/* Mobile menu icon */}
          <Box className="mr-2 md:hidden">
            <IconButton edge="start" color="inherit" aria-label="menu">
              {/* <MenuIcon /> */}
            </IconButton>
          </Box>

          {/* Logo area */}
          <Box className="flex items-center flex-shrink-0 mr-6">
            {/* Simple UCSF-like wordmark; replace with actual SVG/logo if you have it */}
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 700, letterSpacing: "0.02em" }}
            >
              <span style={{ color: "#ffffff" }}>UCSF</span>
            </Typography>
          </Box>

          {/* Spacer for desktop */}
          <Box className="flex-1 md:hidden" />

          {/* Search + actions */}
          <Box className="flex items-center gap-3">
            {/* Search field (desktop) */}

            {/* Sign in avatar/menu */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ ml: 1 }}
            >
              {/* <AccountCircle /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Sign in</MenuItem>
              <MenuItem onClick={handleClose}>My profile</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Patient portal</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
}
