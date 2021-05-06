import React from "react";
import Container from "./container";
import PostsData from "../configs/data-posts-config";
import { Box, Heading, Link, List, ListItem, Text } from "@chakra-ui/layout";

const Postbib = ({ bibdata }) =>
  bibdata.length > 0 && (
    <ListItem>
      {bibdata.map((data, idx) => (
        <Box key={idx}>
          <Link isExternal href={data.link}>
            <Box fontSize="small">
              <Text as="cite" color="gray.500">
                {idx}.
              </Text>{" "}
              <Text as="cite">{data.text}</Text>
            </Box>
          </Link>
        </Box>
      ))}
    </ListItem>
  );

export default function RenderPost({ match }) {
  var results = PostsData.filter((entry) => entry.id === match.params.id);
  return (
    <Container>
      <Box>
        <Heading as="h4" size="md" mb="10">
          {results[0].title}
        </Heading>
        <Box>{results[0].content}</Box>
        <Box pt="10" pb="2">
          <Text color="gray.500"> References</Text>
        </Box>
        <List>
          <Postbib bibdata={results[0].bib} />
        </List>
      </Box>
    </Container>
  );
}
