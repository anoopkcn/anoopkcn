import React from "react";
import { Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { Script, Li, H4 } from "../components/elements";
import { Code } from "@chakra-ui/react";

export default function PortListening(){
    return (
        <Box>
<H4>tl;dr</H4>
<UnorderedList pb="5">
    <ListItem>step 1: <Code>Start Jupyter notebook</Code> on the cluster/workstation/node with a specific port(say port0)
    <Script language="bash" code= {`jupyter notebook --no-browser --port=<port0> # <port0> ex: 8000`} />
    </ListItem>
    <ListItem>step 2: <Code>Listen to port0</Code> from local machine on a port(say port1) 
    <Script language="bash" code={`ssh -N -f -L localhost:<port1>:localhost:<port0> <uname>@<domain> # <port1>=8000`} />
    </ListItem>
    <ListItem>step 3: <Code>Open port1 on the browser</Code> to see/edit the Jupyter notebook running on cluster/workstation : use the token</ListItem>
    <ListItem>step 4: <Code>remove port</Code> after done
    <Script language="bash" code= {`lsof -ti:<port1> | xargs kill -9  # port1=8001`} />
    </ListItem>
</UnorderedList>


<H4> Intension and explanation </H4>
<Li href="http://www.penguintutor.com/linux/network-services-ports">Port </Li> listening can come handy on many occasions, primarily when working with a remote machine. Some of the services that would consume a lot of memory, ram and other resources are most often handled using a cluster or a workstation. Especially in scientific programming or in machine learning. In such situations downloading the data from the remote machine and use visualisation tools on the local device can be tedious and cumbersome. Other scenarios include using tools, modules, packages and compilers available only on clusters or in cases where one doesn't want to have it on a local machine. One such example is GPU programming. When all the hardware resources, compilers and other tools (such as CUDA, PGI, etc.,..) are available on a cluster, to use Jupiter notebook with Fortran or C <Li href="https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts">magic</Li> for demonstrating or live-testing the GPU code is almost impossible without port listening over SSH. 

Following steps can be adopted for such a case

<UnorderedList pt="5">
<ListItem>step 1: <Code>Start Jupyter notebook</Code> on the cluster/workstation/node with a specific port(say port0)</ListItem>
<ListItem>step 2: [Optional] <Code>Listen to port0</Code> from master-node/intermediary machine on a different port(say port1) over SSH</ListItem>
<ListItem>step 3: <Code>Listen to port1</Code> from local machine on a port2 over SSH</ListItem>
<ListItem>step 4: <Code>Open port2 on the browser</Code> to see/edit the Jupyter notebook running on cluster/workstation/node</ListItem>
<ListItem>step 5: <Code>remove port</Code> after done</ListItem>
</UnorderedList>
<br />
<Text as="b" >Step 1</Text>: run Jupyter notebook on cluster/workstation/node

By default jupyter runs on port <Code>8888</Code> of <Code>localhost</Code>, here i'm running it on port <Code>8000</Code>. Take note of the token given when notebook starts running <Code>Example: http://localhost:8000/?token=ee0ed73819259b12e015d0af69fc7ke689d7fe4077b43785</Code>
<Script language="bash" code={`jupyter notebook --no-browser --port=8000`} />

Note that, If you are running it on one of the nodes of a cluster then take the node interactively to get the token. Or employ other means when submitting a job such as writing the standard out and error to a log-file.
<br />
<Text as="b">Step 2</Text>: [Optional] <Code>Listen to 8000</Code> from master-node/intermediary machine on a port over SSH

This step is need if you are running jupyter on a cluster node. This is to listen to the Jupyter service running on port <Code>8000</Code> of the node from the master node.
<Script language="bash" code={`ssh -N -f -L localhost:8001:localhost:8000 <NODE>`} />

Here master node is listening to the service on port <Code>8001</Code> and <Code>&lt;NODE&gt;</Code> is the node name. The SSH options are `-N` for not executing any remote commands, `-f` to make SSH to go background just before execution and `-L` for listening from <Code>remote_socket</Code> to <Code>local_socket</Code> in the order `ssh -L local_socket:remote_socket`
<br />
<Text as="b">Step 3</Text>: <Code>Listen to 8001</Code> from local machine on port 8002, over SSH

Same as above but here instead from a master-node a port on the local machine is assigned for listening the remote.
<Script language="bash" code={`ssh -N -f -L localhost:8002:localhost:8001 <uname>@<domain> # assuming optional step`} />
Note that no other services are using the port <Code>8002</Code> already. use `lsof -ti:8002` to check it. If there are other services on the said port either provide a different one or kill the service running on that port using command given in <Text as="b">Step 5</Text>.
<br />
<Text as="b">Step 4</Text>: <Code>Open localhost:8002 on a browser</Code> to see/edit the Jupyter notebook running on cluster/workstation

Note that jupyter asks for the token of the running jupyter instance (if a password is not set). Copy the token and paste it in the form field to authenticate the notebook.
<br />
<Text as="b">Step 5</Text>: <Code>remove port</Code> after done
<Script language="bash" code={`lsof -ti:8002 | xargs kill -9 `} />

Depending on the security of the system these configurations can vary but the basic idea remains as above. 
        </Box>
    )
}