import { Box } from "@chakra-ui/layout";
import React from "react";

export default function TextProject(id) {
  switch (id) {
    case "pvims":
      return <Pvims />;
    default:
      return <div>No text found</div>;
  }
}


export function Pvims() {
    return (
        <Box>
          PViMS::
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consectetur, veniam obcaecati sapiente iusto dignissimos sed libero reiciendis illo nesciunt voluptate neque rem recusandae at autem est deleniti esse eaque?
        </Box>
    )
}