import { Box, Heading, List, ListItem } from "@chakra-ui/layout";
import React from "react";
import Container from "./container";
import Icon from "@chakra-ui/icon";
import { Link } from "react-router-dom";
import PostsData from "../configs/data-posts-config";

const PostsList = () =>
  PostsData.length > 0 && (
    <ListItem>
      {PostsData.map((data, idx) => (
        <Box mb="5" key={idx}>
          <Link to={`/posts/${data.id}`}>
            <Heading s="h5" size="sm">
              <Icon as={data.icon} w="5" h="5" /> {data.title}
            </Heading>
            <Box pl="6">{data.summary}</Box>
          </Link>
        </Box>
      ))}
    </ListItem>
  );

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
