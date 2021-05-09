import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import { skillsData } from "../configs/data-skills-config";
import { SkillsItem } from "../components/elements";

const SkillsDescription = () =>
  skillsData.length > 0 && (
    <SimpleGrid columns={["1","1","3","3"]}
      gap={4}
    >
      {skillsData.map((data, idx) => (
        <SkillsItem data={data} key={idx} />
      ))}
    </SimpleGrid>
  );

export default function Skills(props) {
  return (
    <Box py="10" id="skills">
      <Center mb="10">
        <Heading as="h4" size="md">
          Skills
        </Heading>
      </Center>
      <SkillsDescription />
    </Box>
  );
}
