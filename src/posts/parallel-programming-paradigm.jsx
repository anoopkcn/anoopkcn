import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { H4, Li, Script } from "../components/elements";
import { Code } from "@chakra-ui/react";

import MPI_simple_program from "./images/MPI_simple_program.png";
import MPI_serial from "./images/MPI_serial.png";
import MPI_parallel from "./images/MPI_parallel.png";
import MPI_mixed_arch from "./images/MPI_mixed_arch.png";
import MPI_numa from "./images/MPI_numa.png";
import MPI_two_cpu from "./images/MPI_two_cpu.png";
import MPI_two_algo from "./images/MPI_two_algo.png"

export default function ParallelProgramming() {
  return (
    <Box>
      <H4>Parallel programming in comparison with Serial</H4>A typical execution
      sequence of a serial program follows the pattern of{" "}
      <Text as="b">loading the data from memory to CPU</Text>,{" "}
      <Text as="b">doing computations in CPU</Text> and{" "}
      <Text as="b">returning the computed data back to the memory</Text> as
      shown in Fig 0.
      <Center pb="2" pt="5">
        <Image src={MPI_simple_program} w="50%" alt="simple-mpi" />
      </Center>
      <Center pt="2" pb="5">
        <Text color="gray.500">Fig 0. Execution of a serial Program </Text>
      </Center>
      A program is a series of Instructions (I<sub>0</sub>, I<sub>1</sub>, I
      <sub>2</sub>, …., I<sub>N</sub>) which is executed in the CPU one by one.
      How one can formulate and arrange these instructions would determine the
      speed and accuracy of the program. The general logic of the program (shown
      in Fig 1) doesn’t vary. There are always smart ways to reduce the number
      of instructions or optimise an instruction or a group of instructions to
      perform at its maximum efficiency. A straightforward example would be to
      sum the whole numbers from 1 to 100. Here one can consider instructions
      being executed adding first 1+2 then adding 3 to the result of the
      previous step and so on. One can naively count the instructions to result
      in 99. One may employ the Gauss method of summation and do 100*101/2 and
      achieve the same result which would constitute efficiently reducing the
      number of instructions to just 2. But for the sake of understanding
      parallel computation one can pretend the only way to compute the sum is
      adding it one by one and each instruction takes 1 second. For summing a
      sequence of N numbers the total number of instructions is (N-1) and the
      entire time made is (N-1) seconds.
      <Center pb="2" pt="5">
        <Image src={MPI_serial} w="50%" alt="simple-mpi" />
      </Center>
      <Center pt="2" pb="5">
        <Text color="gray.500">Fig 1. Serial Program ExecutionProgram </Text>
      </Center>
      In a similar spirit, a parallel program can be visualised in the following
      manner. Instead of a single processing unit doing all the job, the job is
      split into independent sub-jobs and computation is carried out by multiple
      processors. We can take the same example job of summing from 1 to 100.
      This time we will split the job into 5, first from 1-20, 21-40, 41-60,
      61-80, 81-100. This five sub-jobs are given to 5 different CPU’s so that
      they can execute this at the same time (shown in Fig 2) and then gather
      and sum all the results.
      <Center pb="2" pt="5">
        <Image src={MPI_parallel} w="50%" alt="simple-mpi" />
      </Center>
      <Center pt="2" pb="5">
        <Text color="gray.500"> Fig 2. Parallel Program ExecutionProgram</Text>
      </Center>
      Ideally if one solves the problem using five processors instead of 1, then
      the program should run five times faster, but in the real case, this never
      happens. In the example described here, say each processor will take
      (20-1) instructions and thereby (20-1) seconds to execute the additional
      sum of results from each processor will take (5-1) seconds. In total, one
      would assume this was resulting in a total of 23 seconds. However all the
      CPUs must be able to communicate the results at least to one CPU to do the
      final sum, this will require additional time.
      <H4>Modern machine architecture</H4>A better understanding of the machine
      architecture is vital in parallel programming since the program will
      require one to take into consideration the topology of the machine. This
      information is required to develop a universal application. Modern machine
      architecture can be broadly categorised into two main factions, Shared
      Memory scheme (single machine) and Distributed Memory scheme (multiple
      machines). Though most computers have a mixed architecture (Fig 3). It is
      possible to create a distributed memory system by logically partitioning
      the shared memory computer hence the logical organisation of the machine
      seen by the programmer can be different from the actual hardware
      architecture.
      <Center pb="2" pt="5">
        <Image src={MPI_mixed_arch} w="50%" alt="simple-mpi" />
      </Center>
      <Center pt="2" pb="5">
        <Text color="gray.500"> Fig 3. Modern machine architecture</Text>
      </Center>
      For an efficient parallel program, one must be conscious of balancing the
      work among available processors, memory, network bandwidth and I/ O, etc.,
      Modern computers have multi-core processors, since we are going to use
      core and a processing unit synonymously it would be better to say modern
      computers have multi-core sockets. Which means instead of a socket (a slot
      connected to the motherboard which accepts processors) having one single
      core, it contains multiple cores. A machine can also have multiple sockets
      which intern have multiple cores. NUMA (Non-Uniform Memory Access)
      machines are an example of this type of architecture (Fig 4).
      <Center pb="2" pt="5">
        <Image src={MPI_numa} w="50%" alt="simple-mpi" />
      </Center>
      <Center pt="2" pb="5">
        <Text color="gray.500">
          {" "}
          Fig 4. Multi-CPUs &amp; Multi-cores NUMA system
        </Text>
      </Center>
      In High-Performance Computing (HPC) the terminology used for a machine as
      shown in Figure 1 is NODE. Multiple nodes connected together via a network
      is called a Cluster As for 2017 November, the top supercomputing centre
      with 10,649,600 cores is the National Supercomputing Center in Wuxi. The
      list of top 500 supercomputing centres is published every six months in
      the <Li href="https://www.top500.org">TOP500 Supercomputer Sites</Li>{" "}
      list. For all practical purposes, there are different tools available for
      analysing the topology of a cluster. For acquiring node information one
      could use <Code>lstopo</Code> command. This command will give the
      programmer the details of the architecture including number of processors,
      L1, L2, L3 cache sizes, total RAM available to the node, etc., For systems
      that don’t have this utility, one could always rely on{" "}
      <Code>less /proc/cpuinfo</Code> and <Code>less /proc/meminfo</Code> for
      getting CPU and Memory information. Following one-liner is used for
      getting the total number of processors available for a node.
      <Script
        language="bash"
        code={` echo $(($(less /proc/cpuinfo | grep "processor" | tail -1 | cut -d: -f2)+1))`}
      />

      <H4>Different parallel programming paradigms</H4>
      Machine architecture can be broadly categorised into two main factions, Shared Memory scheme (single machine) and Distributed Memory scheme (multiple machines). Though most computers have a mixed architecture (Fig 5). It is possible to create a distributed memory system by logically partitioning the shared memory computer hence the logical organisation of the machine seen by the programmer can be different from the actual hardware architecture.
      <Center pb="2" pt="5">
        <Image src={MPI_two_cpu} w="50%" alt="simple-mpi" />
      </Center>
      <Center pt="2" pb="5">
        <Text color="gray.500">
          {" "}
          Fig 5. Parallel Programming
        </Text>
      </Center>
      For an efficient parallel program, one must be conscious of balancing the work among available processors
      <Center pb="2" pt="5">
        <Image src={MPI_two_algo} w="50%" alt="simple-mpi" />
      </Center>
      <Center pt="2" pb="5">
        <Text color="gray.500">
          {" "}
          Fig 6. Parallel Programming algorithm
        </Text>
      </Center>

    </Box>
  );
}
