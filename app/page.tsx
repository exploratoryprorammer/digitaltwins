"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ResearchSection from "./components/ResearchSection";
import FindTwinsSection from "./components/FindTwinsSection";
import LabMembersSection from "./components/LabMembersSection";
import Footer from "./components/Footer";
import { CssBaseline, Container } from "@mui/material";

type Section = "find-twins" | "about" | "lab-members";

const App = () => {
  const [activeSection, setActiveSection] = useState<Section>("about");

  const renderSection = () => {
    switch (activeSection) {
      case "find-twins":
        return <FindTwinsSection />;
      case "about":
        return (
          <>
            <ResearchSection />
          </>
        );
      case "lab-members":
        return <LabMembersSection />;
      default:
        return (
          <>
            <ResearchSection />
          </>
        );
    }
  };

  // Listen for hash changes to handle navigation
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as Section;
      if (["find-twins", "about", "lab-members"].includes(hash)) {
        setActiveSection(hash);
      }
    };

    // Set initial section based on hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <CssBaseline />
      <Header />
      <div style={{ flex: 1 }}>
        {activeSection === "find-twins" ? (
          <FindTwinsSection />
        ) : (
          <Container maxWidth="lg">{renderSection()}</Container>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
