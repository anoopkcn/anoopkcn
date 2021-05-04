import { Box, Center, Heading, Grid } from "@chakra-ui/layout";
import React from "react";
import { skillsData } from "../configs/skills-data-config";
import { SkillsItem } from "../components/elements";

const SkillsDescription = () =>
  skillsData.length > 0 && (
    <Grid
      templateRows={`repeat(${skillsData.length / 3}, 1fr)`}
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      {skillsData.map((data, idx) => (
        <SkillsItem data={data} key={idx} />
      ))}
    </Grid>
  );

export default function Skills(props) {
  return (
    <Box py="10" id="skills">
      <Center mb="10">
        <Heading as="h5" size="sm">
          Skills
        </Heading>
      </Center>
      <SkillsDescription />
    </Box>
  );
}
