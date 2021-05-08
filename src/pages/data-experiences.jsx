import { Box } from "@chakra-ui/layout";
import React from "react";
import { Li } from "../components/elements";

export default function TextExperiences(place) {
  switch (place) {
    case "pgi1":
      return <PGI1 />;
    case "sissa":
      return <SISSA />;
    case "ictp":
      return <ICTP />;
    case "iith":
      return <IITH />;
    default:
      return <div>No text found</div>;
  }
}


export function PGI1() {
    return (
        <Box>
          Thesis: Photovoltaic Device inspired Materials Search: Focus on Metal-Halide Perovskites
          <br />
          Supervisors: Irene Aguilera, Christoph Friedrich, Thomas Kirchartz, Prof. Uwe Rau, Prof. Stefan Blügel
        </Box>
    )
}

export function SISSA() {
  return (
      <Box>
        Work: Improving the performace of Kohn-Sham Solvers implemented in Quantum Espresso
        <br />
        Supervisors: Prof. Stefano de Gironcoli
      </Box>
  )
}

export function ICTP() {
  return (
      <Box>
        Thesis: A performance study of Quantum ESPRESSO’s diagonalization methods on cutting edge computer technology for high-performance computing.
        <br />
        Supervisors: Prof. Stefano de Gironcoli, Ivan Girotto, Filippo Spiga
      </Box>
  )
}

export function IITH() {
  return (
      <Box>
        Thesis: <Li href="https://www.sciencedirect.com/science/article/abs/pii/S0022459616303395?via%3Dihub">Structural and thermoelectric properties of zintl-phase CaLiPn</Li>
        <br />
        Supervisors: Prof. V Kanchana
      </Box>
  )
}