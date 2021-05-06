import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Script } from "../components/elements";
// import { Code } from "@chakra-ui/react";
export default function OneLiners() {
  return (
    <Box>
      <Text as="b">
        Transpose of a matrix<sup>1</sup> A in python
      </Text>
      <Script language="python" code={`AT = [list(i) for i in zip(*A)]`} />

      <Text as="b">
      Remove square brackets when printing an array in python
      </Text>
      <Script language="python" code={`B=[1,2,3,4]\nprint ' '.join(map(str, B))`} />

      <Text as="b">
     Remove all html tags and empty lines using bash
      </Text>
      <Script language="bash" code={`File | awk '{gsub(/<[^>]*>/,"\\n"); print }' | sed '/^\\s*$/d'`} />

      <Text as="b">
      Number of lines added git
      </Text>
      <Script language="bash" code={`# gives the number of lines added by 'uname' to a code base.\n git log --author='uname' --stat | grep 'insertions(+)' \\\n | awk '{x+=$4} END {print x}'`} />

      <Text as="b">
      Update all pip packages at once<sup>2</sup>
      </Text>
      <Script language="bash" code={`pip freeze --local | grep -v '^\\-e' | cut -d = -f 1 \\\n | xargs -n1 pip install -U`} />

      <Text as="b">
        Building a bib file just from DOI<sup>3</sup>
      </Text>
      <Script language="bash" code={`#DOI=DOI of a paper\ncurl -s "http://api.crossref.org/works/\${DOI}/transform/application/x-bibtex"`} />

      <Text as="b">
      Remove duplicate lines from a file
      </Text>
      <Script language="python" code={`# it will keep the fist unique line and remove the rest for <file>\nawk '!x[$0]++' File`} />

    </Box>
  );
}
