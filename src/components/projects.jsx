import React from "react";
import { Box, Center, Grid, Heading } from "@chakra-ui/layout";
import { ProjectItem } from "../components/elements";
import { projectData } from "../configs/project-data-config";

const ProjectDescription = () =>
  projectData.length > 0 && (
    <Grid
      templateRows={`repeat(${projectData.length / 2}, 1fr)`}
      templateColumns="repeat(2, 1fr)"
      gap={4}
    >
      {projectData.map((data, idx) => (
        <ProjectItem data={data} key={idx} />
      ))}
    </Grid>
  );

export default function Projects(props) {
  return (
    <Box py="10" id="projects">
      <Center mb="10">
        <Heading as="h5" size="sm">
          Projects
        </Heading>
      </Center>
      <ProjectDescription />
    </Box>
  );
}
