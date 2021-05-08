import { Box } from "@chakra-ui/layout";
import React from "react";
import { Code, Text} from "@chakra-ui/react";
import { Li } from "../components/elements";

export default function TextProject(id) {
  switch (id) {
    case "pvims":
      return <Pvims />;
    case "aiida-spex":
      return <AiiDASpex />;
    case "mlms":
      return <MLMS />;
    case "lazylatex":
      return <LazyLatex/>
    case "clip":
      return <Clip/>
    case "qegpu":
      return <QeGPU/>
    case "graphene":
      return <Graphene/>
    case "ljmd":
      return <Ljmd/>
    case "finiteelement":
      return <FiniteElement/>
    case "verdiweb":
      return <VerdiWeb/>
    default:
      return <div>No text found</div>;
  }
}

export function Pvims() {
  return (
    <Box>
      Metal-halide perovskites have become a highly promising material class for
      low-cost, high-efficiency solar cells. The community initiated substantial
      experimental and mostly computational efforts to find better materials in
      this class. This project focuses on developing a methodological framework
      to predict the most efficient photovoltaic materials in an automated
      workflow. This is currently my research project
    </Box>
  );
}

export function AiiDASpex() {
  return (
    <Box>
      <Li href="https://www.aiida.net/">AiiDA</Li> plugin for <Code><Li href="https://spex.readthedocs.io/en/master/">SPEX</Li></Code> code. Developed as part of the PViMS project. Alows to run high-throughput <Text as="i">GW</Text> calculations.
      <br />
      Note: Still under development, it is not public yet. Available for testing and development for Forschungszentrum Jülich members.
    </Box>
  );
}

export function MLMS() {
  return (
    <Box>
      Machine Learning library developed for material science. Library containes neural network and regression models for training, testing and visualizing data. Developed on top of <Code><Li href="https://pytorch.org/">PyTorch</Li></Code> machine learning library.
      <br />
      Note: Still under development, it is not public yet. Available for testing and development for Forschungszentrum Jülich members.
    </Box>
  );
}

export function LazyLatex() {
  return (
    <Box>
      LazyLatex is a <Code><Li href="https://www.latex-project.org/">LaTeX</Li></Code> package inspired by sphinx-rtd-theme. Build with tcolorbox, minted, tikz, etc,. Some of the elements are also simulating elements from the tcolorbox manual
    </Box>
  );
}
export function Clip() {
  return (
    <Box>
      Command LIne Papers(CLIP), a high performance reference manager. Features include, fast inspection of pdf files, reference creation, searching papers and articles in multiple repositories, etc,. 
    </Box>
  );
}
export function QeGPU() {
  return (
    <Box>
      GPU implementation of <Code><Li href="https://www.quantum-espresso.org/">Quantum ESPRESSO</Li></Code>. Developed as part of the Masters in HPC thesis project. Also developed during this project is a fast and efficent Projected Preconditioned conjugate gradient(PPCG) Kohn-Sham Solver.
    </Box>
  );
}

export function Graphene() {
  return (
    <Box>
     Python implementation of Graphene tight binding model. Includes responsive visualization tools for demonstrations.
     <br />
     Note: This codebase is archived. No new additions are available.
    </Box>
  );
}
export function Ljmd() {
  return (
    <Box>
      This package contains simplified molecular dynamics(MD) code with multi-threading parallelization for simulating atoms with a Lennard-Jones potential.
    </Box>
  );
}

export function FiniteElement() {
  return (
    <Box>
      The finite element method (FEM) is a numerical technique for finding approximate solutions to boundary value problems for partial differential equations. In other words it can be used to find solutions to problems that can be expressed into 'governing equations' and 'boundary conditions'. This Library provides a python implementation of the basic FEM algorithm. 
    </Box>
  );
}
export function VerdiWeb() {
  return (
    <Box>
      A GUI implementation for monitoring AiiDA nodes. This package includes a flexible REST API implementation of aiida database and a REACT front end. 
    </Box>
  );
}