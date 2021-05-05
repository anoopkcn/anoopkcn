import { Box } from "@chakra-ui/layout";
import React from "react";

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
          PGI-1::
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consectetur, veniam obcaecati sapiente iusto dignissimos sed libero reiciendis illo nesciunt voluptate neque rem recusandae at autem est deleniti esse eaque?
        </Box>
    )
}

export function SISSA() {
  return (
      <Box>
        SISSA::
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consectetur, veniam obcaecati sapiente iusto dignissimos sed libero reiciendis illo nesciunt voluptate neque rem recusandae at autem est deleniti esse eaque?
      </Box>
  )
}

export function ICTP() {
  return (
      <Box>
        ICTP::
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consectetur, veniam obcaecati sapiente iusto dignissimos sed libero reiciendis illo nesciunt voluptate neque rem recusandae at autem est deleniti esse eaque?
      </Box>
  )
}

export function IITH() {
  return (
      <Box>
        IITH::
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consectetur, veniam obcaecati sapiente iusto dignissimos sed libero reiciendis illo nesciunt voluptate neque rem recusandae at autem est deleniti esse eaque?
      </Box>
  )
}