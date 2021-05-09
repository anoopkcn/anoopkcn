import React from "react";
import { Box, Center, SimpleGrid, Heading } from "@chakra-ui/layout";
import { ProjectItem } from "../components/elements";
import { projectData } from "../configs/data-project-config";

const ProjectDescription = () =>
  projectData.length > 0 && (
    <SimpleGrid columns={["1","1","2","2"]}
      gap={4}
    >
      {projectData.map((data, idx) => (
        <ProjectItem data={data} key={idx} />
      ))}
    </SimpleGrid>
  );

export default function Projects(props) {
  return (
    <Box py="10" id="projects">
      <Center mb="10">
        <Heading as="h4" size="md">
          Projects
        </Heading>
      </Center>
      <ProjectDescription />
    </Box>
  );
}
