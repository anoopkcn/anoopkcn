import React from "react";
import Container from "./container";
import PostsData from '../configs/data-posts-config'
import { Box, Heading } from "@chakra-ui/layout";

export default function RenderPost({match}) {
    var results = PostsData.filter((entry) => entry.id === match.params.id);
  return (
    <Container>
      <Box>
          <Heading>{results[0].title}</Heading>
          <Box>{results[0].content}</Box>
      </Box>
    </Container>
  );
}
