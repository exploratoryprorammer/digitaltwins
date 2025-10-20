'use client'
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeroImageProps {
  src: string;
  alt: string;
}

const HeroImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: 8,
});

const Hero: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', padding: 4, backgroundColor: '#FAFAFA', alignItems: 'center', gap: 4 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h2" component="h1" color="primary" gutterBottom>
          Saving Lives
        </Typography>
        <Typography variant="h2" component="h2" color="primary" gutterBottom sx={{ mt: -2 }}>
          with Science
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          To care for the future, we must safeguard research.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Learn how
        </Button>
      </Box>
      <Box sx={{ flex: 1 }}>
        <HeroImage src="https://via.placeholder.com/600x400?text=UCSF+Hero+Image" alt="Doctor examining newborn with mother" />
      </Box>
    </Box>
  );
};

export default Hero;