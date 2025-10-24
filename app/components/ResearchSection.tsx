"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ResearchItemProps {
  number: string;
  title: string;
  description: string;
  details: string;
}

const ResearchItem = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
  "& .number": {
    fontSize: "3rem",
    color: "#0066CC",
    fontWeight: "bold",
    lineHeight: 1,
  },
}));

const StatsBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  backgroundColor: "#0066CC",
  color: "white",
  borderRadius: 12,
}));

const ResearchSection: React.FC = () => {
  const researchItems: ResearchItemProps[] = [
    {
      number: "01",
      title: "Patient Similarity Matching",
      description: "Advanced AI algorithms to find similar patient cases",
      details:
        "Using machine learning and vector databases to identify patients with similar medical profiles, enabling personalized treatment recommendations based on successful outcomes from comparable cases.",
    },
    {
      number: "02",
      title: "Clinical Data Analytics",
      description: "Comprehensive analysis of electronic health records",
      details:
        "Processing vast amounts of clinical data to uncover patterns, predict outcomes, and support evidence-based medical decisions through sophisticated statistical modeling.",
    },
    {
      number: "03",
      title: "Predictive Healthcare Models",
      description: "Early intervention through predictive analytics",
      details:
        "Developing models that can predict patient deterioration, treatment responses, and optimal care pathways to improve outcomes and reduce healthcare costs.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Patients Analyzed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "50+", label: "Research Papers" },
    { number: "15", label: "Clinical Partners" },
  ];

  return (
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      {/* Research Impact Section */}
      <Box sx={{ padding: 4, textAlign: "center", backgroundColor: "white" }}>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          sx={{
            textTransform: "uppercase",
            letterSpacing: 1,
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Our Research Impact
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 800,
            mx: "auto",
            mb: 6,
            lineHeight: 1.6,
          }}
        >
          We leverage cutting-edge data science and machine learning to
          revolutionize patient care through intelligent similarity matching and
          predictive analytics.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          {researchItems.map((item) => (
            <ResearchItem key={item.number}>
              <CardContent sx={{ p: 3, textAlign: "left" }}>
                <span className="number">{item.number}</span>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: "bold", mt: 1 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: "medium" }}
                >
                  {item.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {item.details}
                </Typography>
              </CardContent>
            </ResearchItem>
          ))}
        </Box>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ padding: 4, backgroundColor: "#F5F5F5" }}>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Research by the Numbers
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 3,
            maxWidth: 800,
            mx: "auto",
          }}
        >
          {stats.map((stat, index) => (
            <StatsBox elevation={3} key={index}>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {stat.number}
              </Typography>
              <Typography variant="body2">{stat.label}</Typography>
            </StatsBox>
          ))}
        </Box>
      </Box>

      {/* Mission Statement */}
      <Box sx={{ padding: 4, textAlign: "center", backgroundColor: "white" }}>
        <Paper
          elevation={2}
          sx={{
            p: 4,
            maxWidth: 800,
            mx: "auto",
            borderRadius: 3,
            backgroundColor: "#FAFAFA",
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 3 }}
          >
            To advance precision medicine through innovative data science
            approaches that identify patient similarities, predict outcomes, and
            guide personalized treatment decisions. We believe that by
            understanding patterns in patient data, we can improve care quality
            and save lives.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
            }}
          >
            Learn More About Our Work
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ResearchSection;
