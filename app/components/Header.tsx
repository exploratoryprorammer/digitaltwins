"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid #CCC",
  borderRadius: 4,
  marginLeft: theme.spacing(2),
  width: "200px",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  padding: theme.spacing(0.5),
}));

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ backgroundColor: "#001E62" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          University of California San Francisco
        </Typography>
      </Toolbar>
      <Toolbar sx={{ backgroundColor: "#F5F5F5", color: "#001E62" }}>
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
          {["Find Twins", "About", "Lab Members"].map((item) => (
            <Button
              key={item}
              color="inherit"
              href={`#${item.toLowerCase().replace(" & ", "-")}`}
            >
              {item}
            </Button>
          ))}
        </Box>
        <Search>
          <SearchInput placeholder="Search UCSF" />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
