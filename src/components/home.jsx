import React from "react";
import About from "./about";
import Container from "./container";
import Skills from "./skills";
import Projects from "./projects";
import Experiences from "./experiences";

export default function Home() {
  return (
    <Container>
      <About></About>
      <Projects></Projects>
      <Skills></Skills>
      <Experiences></Experiences>
    </Container>
  );
}
