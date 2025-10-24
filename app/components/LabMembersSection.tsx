"use client";
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: "0 auto",
  marginBottom: theme.spacing(2),
  border: "4px solid #0066CC",
}));

interface LabMember {
  name: string;
  title: string;
  department: string;
  expertise: string[];
  image: string;
  email: string;
}

const LabMembersSection: React.FC = () => {
  const labMembers: LabMember[] = [];

  return (
    <Box sx={{ padding: 4, backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        component="h1"
        color="primary"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Lab Members
      </Typography>

      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: "text.secondary",
          mb: 6,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        Meet our dedicated team of researchers working to advance patient care
        through innovative data science and machine learning approaches.
      </Typography>

      <Grid container spacing={4} sx={{ maxWidth: 1200, mx: "auto" }}>
        {labMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <StyledAvatar
                  src={member.image}
                  alt={member.name}
                  sx={{ bgcolor: "#0066CC" }}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </StyledAvatar>

                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {member.name}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: "medium" }}
                >
                  {member.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  {member.department}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {member.expertise.map((skill, skillIndex) => (
                    <Chip
                      key={skillIndex}
                      label={skill}
                      size="small"
                      sx={{
                        m: 0.25,
                        backgroundColor: "#E3F2FD",
                        color: "#0066CC",
                        fontSize: "0.75rem",
                      }}
                    />
                  ))}
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.8rem",
                    wordBreak: "break-all",
                  }}
                >
                  {member.email}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Paper
        elevation={2}
        sx={{
          mt: 6,
          p: 4,
          backgroundColor: "white",
          borderRadius: 3,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Join Our Team
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          We're always looking for talented researchers passionate about using
          data science to improve patient outcomes. Current openings include
          positions in machine learning, clinical informatics, and
          biostatistics.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact us at <strong>research-lab@ucsf.edu</strong> for more
          information about available positions and collaboration opportunities.
        </Typography>
      </Paper>
    </Box>
  );
};

export default LabMembersSection;
