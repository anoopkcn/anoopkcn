import { Box } from "@chakra-ui/layout";
import React from "react";

export default function TextSkills(id) {
  switch (id) {
    case "python":
      return <Python />;
    default:
      return <div>No text found</div>;
  }
}


export function Python() {
    return (
        <Box>
          Python::
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consectetur,
        </Box>
    )
}