'use client'
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ResearchItemProps {
  number: string;
  text: string;
}

const ResearchItem = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  '& .number': {
    fontSize: '2rem',
    color: '#0066CC',
    fontWeight: 'bold',
  },
  '& p': {
    margin: theme.spacing(0.5, 0, 0),
    fontSize: '1.1rem',
    color: '#333',
  },
}));

const ResearchSection: React.FC = () => {
  const researchItems: ResearchItemProps[] = [
    { number: '01', text: 'Transforms patients’ lives.' },
    { number: '02', text: 'Creates new industries, companies and jobs.' },
    { number: '03', text: 'Supports America’s leadership in health and science.' },
  ];

  return (
    <Box sx={{ padding: 4, textAlign: 'center', backgroundColor: 'white' }}>
      <Typography variant="h5" color="primary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
        OUR RESEARCH
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, maxWidth: 800, mx: 'auto', my: 2 }}>
        {researchItems.map((item) => (
          <ResearchItem key={item.number}>
            <span className="number">{item.number}</span>
            <p>{item.text}</p>
          </ResearchItem>
        ))}
      </Box>
      <Button variant="contained" color="primary" size="large">
        Learn how
      </Button>
    </Box>
  );
};

export default ResearchSection;