// App.tsx - Main React application component
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ResearchSection from './components/ResearchSection';
import Footer from './components/Footer';
import { CssBaseline, Container } from '@mui/material';

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Hero />
        <ResearchSection />
      </Container>
      <Footer />
    </div>
  );
};

export default App;