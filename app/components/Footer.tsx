"use client";
import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#001E62",
        color: "white",
        padding: 2,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Typography variant="body2">
          © 2025 University of California San Francisco. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {["Privacy Policy", "Terms of Use", "Contact Us"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              color="inherit"
              underline="hover"
            >
              {item}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
