"use client"
import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';


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
      {/* Top utility bar */}
      <div className="w-full bg-gray-50 text-gray-700 text-sm hidden md:flex justify-end px-4 py-1">
        <nav className="flex gap-4 items-center">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Careers</a>
        </nav>
      </div>

      {/* Main AppBar */}
      <AppBar position="static" elevation={2} sx={{ backgroundColor: '#002855' }}>
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
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: '0.02em' }}>
              <span style={{ color: '#ffffff' }}>UCSF</span>
            </Typography>
            <Typography variant="caption" component="div" sx={{ color: '#cfe8ff', marginLeft: 1, fontWeight: 500 }}>
              Health • Science • Education
            </Typography>
          </Box>

          {/* Primary nav (hidden on small) */}
          <Box className="hidden md:flex items-center gap-6 flex-1">
            <nav className="flex gap-4 items-center">
              <a href="#" className="text-white hover:underline">Patient Care</a>
              <a href="#" className="text-white hover:underline">Research</a>
              <a href="#" className="text-white hover:underline">Education</a>
              <a href="#" className="text-white hover:underline">Giving</a>
            </nav>
          </Box>

          {/* Spacer for desktop */}
          <Box className="flex-1 md:hidden" />

          {/* Search + actions */}
          <Box className="flex items-center gap-3">
            {/* Search field (desktop) */}
            <Box className="hidden sm:flex items-center rounded-md bg-white px-2 py-1" sx={{ minWidth: 220 }}>
              {/* <SearchIcon sx={{ mr: 1, color: 'rgba(0,0,0,0.54)' }} /> */}
              <InputBase placeholder="Search UCSF" inputProps={{ 'aria-label': 'search' }} sx={{ ml: 1 }} />
            </Box>

            {/* Patient / MyUCSF button */}
            <Button variant="outlined" size="small" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}>
              MyUCSF
            </Button>

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
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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

      {/* Secondary sticky nav (optional middle band) */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-4 items-center overflow-x-auto">
          <a href="#" className="text-sm text-gray-700 whitespace-nowrap">Find a Doctor</a>
          <a href="#" className="text-sm text-gray-700 whitespace-nowrap">Locations</a>
          <a href="#" className="text-sm text-gray-700 whitespace-nowrap">Billing & Insurance</a>
          <a href="#" className="text-sm text-gray-700 whitespace-nowrap">COVID-19</a>
        </div>
      </div>
    </header>
  );
}
