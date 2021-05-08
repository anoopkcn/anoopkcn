import { Box, Text } from "@chakra-ui/layout";
import {useColorModeValue} from "@chakra-ui/react"
import React from "react";
const FF = ({children}) =>{
  const ibg = useColorModeValue("#11515B","#A4BEB1");
  const ffcolor= useColorModeValue("white", "black");
  return (
    <Box 
    w="full" 
    borderRadius="3"
    color={ffcolor} 
    position="absolute" 
    p="1"
    px="2"
    bottom="0" 
    left="0" 
    bg={ibg}>
      Favourite Feature:{" "}
    {children}
    </Box>
  )
}

export default function TextSkills(id) {
  switch (id) {
    case "python":
      return <Python />;
    case "git":
      return <Git />;
    case "Python":
      return <Python />;
    case "cpp":
      return <Cpp />;
    case "fortran":
      return <Fortran />;
    case "go":
      return <GO />;
    case "js":
      return <JavaScript />;
    case "cuf":
      return <CUDAFortran />;
    case "mpi":
      return <MPI />;
    case "pytorch":
      return <PyTorch />;
    case "aiida":
      return <AiiDA />;
    case "nodejs":
      return <NodeJS />;
    case "react":
      return <ReactJS />;
    case "rest":
      return <REST />;
    case "os":
      return <OperatingSystems />;
    case "tools":
      return <Tools />;
    case "dtools":
      return <DesignTools />;
    case "web":
      return <Web />;
    case "dftcodes":
      return <DFTcodes />;
    case "notused":
      return <Notused />;
    default:
      return <div></div>;
  }
}

export function Python() {
  return (
    <Box>
      <Text>Experience in generic scripting and programming with Python</Text>
      <FF>Trial &amp; error development</FF>
    </Box>
  );
}
export function Git() {
  return (
    <Box>
      <Text>
        Git is used for version controlling all the projects. Git hosting
        systems such as GitHub and GitLab are used extensively
      </Text>
      <FF>git reset</FF>
    </Box>
  );
}

export function Cpp() {
  return (
    <Box>
      C is my first programming language. I use C and C++ for my
      High-Performance projects.
      <FF>Memory control </FF>
    </Box>
  );
}

export function Fortran() {
  return (
    <Box>
      Most of the DFT codes I work with are developed using Fortran.
      <br />
      <FF>Speed</FF>
    </Box>
  );
}

export function GO() {
  return (
    <Box>
      Clip library is developed with the Golang. It's easy to implement concurrency
      feature makes code run faster.
      <br />
      <FF>Concurrency</FF>
    </Box>
  );
}

export function JavaScript() {
  return (
    <Box>
      Javascript and it's variants are used for all my web applications.
      <br />
      <FF>async-await</FF>
    </Box>
  );
}

export function CUDAFortran() {
  return <Box>
    CUF kernels are used for developing qe-gpu during masters project
     <FF>Easy integration</FF>
  </Box>;
}

export function MPI() {
  return <Box>
    Proficient in parallel computation architectures 
    <FF>Multi-node communication</FF>
  </Box>;
}

export function PyTorch() {
  return <Box>
    Machine learning models are developed using pytorch library. Its autograd function helps back-propagation easier to implement. 
    <FF>Dynamic Graph Layout</FF>
  </Box>;
}

export function AiiDA() {
  return <Box>
    AiiDA is used in my research project to create reproducible high-throughput workflows. I also developed AiiDa-SPEX plugin for AiiDA. 
     <FF>Query feature</FF>
  </Box>;
}

export function NodeJS() {
  return <Box>
    NodeJs is used for developing verdiweb. I also use it for small projects and developing desktop applications using electron.
     <FF>Package manager</FF>
  </Box>;
}

export function ReactJS() {
  return <Box>
    React is used to develop this website.
    <FF>Component based</FF>
  </Box>;
}

export function REST() {
  return <Box>
    Proficient in using and developing REST API's. The backend of verdiweb is using such an implementation. 
    <FF>🤔</FF>
  </Box>;
}

export function OperatingSystems() {
  return (
    <Box>
      <Text>Linux, Mac, Windows</Text>
    </Box>
  );
}

export function Tools() {
  return (
    <Box>
      <Text>BASH, Sed, Awk, vim, vscode</Text>
    </Box>
  );
}

export function DesignTools() {
  return (
    <Box>
      <Text>Procreate, Affinity Designer, D3</Text>
    </Box>
  );
}

export function Web() {
  return (
    <Box>
      <Text>HTML, CSS, MongoDB</Text>
    </Box>
  );
}

export function DFTcodes() {
  return (
    <Box>
      <Text>FLEUR, SPEX, Quantum ESPRESSO, WIEN2k, VESTA</Text>
    </Box>
  );
}

export function Notused() {
  return (
    <Box>
      <Text>R, PhP, SQL, CodeIgniter, Atom, Emacs, Photoshop, MatLab</Text>
    </Box>
  );
}
