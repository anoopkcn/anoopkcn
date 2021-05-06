import React from "react";
import { Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { Script, Li, H4 } from "../components/elements";
import { Code } from "@chakra-ui/react";

export default function CrossrefBib(){
    return (
        <Box>
<H4>tl;dr</H4>
Provided a DOI of a paper or an article the following will use the <Li hef="https://www.crossref.org">crossref-api</Li> and display the information regarding the document such as author, year, publication, etc,.
<Script language="bash" code={
`#DOI=DOI of a paper
DOI='DOI'; 
curl -s "http://api.crossref.org/works/\${DOI}/transform/application/x-bibtex"`
}/>
<br/>
The following is a bash function which make use if this one liner to do slightly complicated tasks such as appending the crossref info of a document to a file, selectively displaying the information when not given a file, etc..

<br/>
<H4>Bash Function</H4>

The <Code>BIB_FILE</Code> variable is initially empty, this is to store the file name the user would provide upon calling the function <Code>doi2bib</Code> with the flag <Code> -f </Code>. Likewise <Code> BIB_INFO</Code> is an empty string which would hold the information tag such as author, year, publisher, volume etc.., provided by the user with the flag <Code> -i </Code>. The flags <Code> -f </Code> and <Code> -i </Code> are mutually exclusive in the following script. Flag <Code> -d </Code> is mandatory since this specifies the `DOI` of the document in question. 
<Script language="bash" code={
`doi2bib(){
BIB_FILE=""; BIB_INFO="";  # empty strings not even a space
BIB_API="http://api.crossref.org/works/"
BIB_TRANS="/transform/application/x-bibtex"
while test $# -gt 0; do
  case "$1" in
    -h|--help)
      echo "Processing info using a DOI"
      exit 0
      ;;
    -d|--doi)
      shift
      if test $# -gt 0; then
        DOI=$1
      else
        echo "No DOI Specified"; exit 1
      fi
      shift
      ;;
    -i|--info)
      shift
      if test $# -gt 0; then
        BIB_INFO=$1
      fi
      shift
      ;;
    -f|--file)
      shift
      if test $# -gt 0; then
        BIB_FILE=$1
      fi
      shift
      ;;
    *)
      break
      ;;
  esac
done
# Use the information gatherd above
if [[  -z  $BIB_FILE  ]];then
# if the file name is not provided
  if [[ ! -z $BIB_INFO ]];then
    curl -s "\${BIB_API}\${DOI}\${BIB_TRANS}" | grep \${BIB_INFO} | sed "s/^[ \t]*//"
  else
    curl -s "\${BIB_API}\${DOI}\${BIB_TRANS}"
  fi
elif [[  ! -z  $BIB_FILE  ]];then
# if the file name is provided append the information to that file
    echo >> \${BIB_FILE};
    curl -s "\${BIB_API}\${DOI}\${BIB_TRANS}" >> \${BIB_FILE}
    echo >> \${BIB_FILE};
fi
}`
}/>

Few typical examples of the usage of the above script is given as follows,

To show the full info on the terminal
<Script language="bash" code={
"doi2bib -d https://doi.org/10.1016/j.jssc.2016.08.030"
}/>

To show the selective info on the terminal
<Script language="bash" code={
"doi2bib -d https://doi.org/10.1016/j.jssc.2016.08.030 -i author"
}/>

To append the full information in the bibtex format to a file named <Code>mypaper.bib</Code>
<Script language="bash" code={
"doi2bib -d https://doi.org/10.1016/j.jssc.2016.08.030 -f mypaper.bib"
}/>
        </Box>
    )}