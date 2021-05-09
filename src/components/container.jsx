import React from "react"
import { Box} from "@chakra-ui/react"

export const Container = (props) => (
  <Box
    pb="12"
    pt="3"
    maxW={{ base: "100%", md: "7xl" }}
    mx="auto"
    px={{ base: "6", md: "8" }}
    {...props}
  />
)

export default Container