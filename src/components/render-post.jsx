import React from "react";
import Container from "./container";
import PostsData from "../configs/data-posts-config";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { Li } from "./elements";

const Postbib = ({ bibdata }) => {
  const linkColor = useColorModeValue("#11515B", "#A4BEB1");
  if (bibdata) {
    return (
      bibdata.length > 0 && (
        <ListItem>
          {bibdata.map((data, idx) => (
            <Box key={idx} fontSize="small" color={linkColor}>
              <Li href={data.link}>
                  <Text as="cite" color="gray.500">
                    {idx+1}{". "}{data.text}
                  </Text>
              </Li>
            </Box>
          ))}
        </ListItem>
      )
    );
  } else {
    return <div></div>;
  }
};

export default function RenderPost({ match }) {
  var results = PostsData.filter((entry) => entry.id === match.params.id);
  var data = results[0]
  return (
    <Container>
      <Box>
        <Heading as="h4" size="md">
          {data.title}
        </Heading>
        <Box mb="2" mt="3" color="gray.500">
          {data.date}
        </Box>
        <Box>{data.content}</Box>
        <Box pt="10" pb="2">
          <Text color="gray.500"> References</Text>
        </Box>
        <List>
          <Postbib bibdata={data.bib} />
        </List>
      </Box>
    </Container>
  );
}
