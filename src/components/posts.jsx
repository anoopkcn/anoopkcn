import { Box, Heading, List, ListItem } from "@chakra-ui/layout";
import React from "react";
import Container from "./container";
import Icon from "@chakra-ui/icon";
import { Link } from "react-router-dom";
import PostsData from "../configs/data-posts-config";
import { Flex, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";


const PostsList = () =>{
  const linkColor = useColorModeValue("#11515B", "#A4BEB1");
  return PostsData.length > 0 && (
    <ListItem>
      {PostsData.map((data, idx) => (
        <Box mb="5" key={idx}>
          <Link to={`/posts/${data.id}`}>
            <Flex color={linkColor}>
            <Icon as={data.icon} w="5" h="5" />
              <Text pl="3" fontWeight="600">
                 {data.title}
              </Text>
              <Box ml="3" color="gray.500">
                {data.date}
              </Box>
            </Flex>
            </Link>
            <Box pl="9">
              <Box>{data.summary}</Box>
            </Box>
        </Box>
      ))}
    </ListItem>
  )};

export default function Posts() {
  return (
    <Container>
      <Heading as="h4" size="md" mb="10">
        Posts
      </Heading>
      <List spacing={3}>
        <PostsList />
      </List>
    </Container>
  );
}
