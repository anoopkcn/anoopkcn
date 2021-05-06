import React from "react";
import { Box, UnorderedList, ListItem, Heading } from "@chakra-ui/react";
import { Script } from "../components/elements";
import { Code } from "@chakra-ui/react"

export default function CudaFortran() {
  return (
    <Box>
CUDA-enabled GPU’s are capable of running tens of thousands of threads concurrently. This functionality is possible due to a large number of processor cores available on each GPU device. They are grouped into multiprocessors. The design of the CUDA programming model is done such that it can utilise the massive parallelism capability of the GPU’s. A subroutine or a kernel it is launched with a grid of threads grouped into thread blocks. These thread blocks can operate independently of one another thereby allowing scalability of a program. In addition to that data can be shared between these threads enabling more granular data parallelism.
The available multiprocessors can schedule these block of treads in any order allowing the program to be executed on any device with any number of multiprocessors. This scheduling is performed automatically so that one can concentrate on the partition of the program into factions that can be run and parallelised on a block of treads.
CUDA programming model allows utilising both CPU and GPU to perform computations. This hybrid computing capability can be used to achieve massive performance improvements. A typical sequence of operations for a simple CUDA Fortran code are:

<UnorderedList py="5">
<ListItem>Declare and allocate host (CPU) and device (GPU) memory</ListItem>
<ListItem>Initialize host data</ListItem>
<ListItem>Transfer data from the host to the device</ListItem>
<ListItem>Execute one or more kernels which perform operations on the device data</ListItem>
<ListItem>Transfer results from the device to the host</ListItem>
</UnorderedList>

There are a number of good programming practices to be observed when moving data back and forth from host to device and vice-versa. Among those the most noticeable being the bandwidth of PCI's and bandwidth between device's memory and GPU, where the former is an order of magnitude lower than that of the later.  From a performance point of view, the less number of data transfers between the host and the device the better will be the performance. 

The <Code>allocate()</Code> command and the assignment operator's are overloaded in the CUDA Fortran model so that it can also allow allocation of the device memory (using <Code>device</Code> attribute) and data transfer between the host and device memory spaces. The Fortran2003 source allocation construct, <Code>allocate(A, source=B)</Code>, for cloning <Code>A</Code> to <Code>B</Code> is also extended. In CUDA Fortran, if the <Code>A</Code> array is defined as a device array and <Code>B</Code> is defined as host array, then contents of <Code>B</Code> will be copied over the PCI bus to <Code>A</Code>. These methods of data transfer are all blocking transfers, in that control is not returned to the CPU thread until the transfer is complete. This prevents the possibility of overlapping data transfers with computation on both the host and device. For concurrent computation one might employ CUDA API function <Code>cudaMemcpyAsync()</Code> to perform asynchronous data transfers

<br/>
Kernels, or subroutines are typically invoked in host code just as any subroutine is called, but since the kernel code is executed by many threads in parallel an additional execution configuration has to be provided to indicate thread specifications.
Data elements are mapped to threads using the automatically defined variables <Code>threadIdx</Code>, <Code>blockIdx</Code>, <Code>blockDim</Code>, and <Code>gridDim</Code>.

One of the functionalities provided by CUDA Fortran is that it can automatically generate and invoke kernel code from a region of host code containing tightly nested loops. Such type of kernels are referred to as CUF kernel's. A simple example of a CUF kernel is:

<Script language="fortran" code=
{`!$cuf kernel do <<<*,*>>>
do i=1, n
 ! a_d is a device array, b is a host scalar
 a_d(i) = a_d(i) + b 
end do`}
/>

In the above code wild-cards are used to make the runtime system determine the execution configuration. Even though the scalar <Code>b</Code> is a host variable it is passed as a kernel argument by value upon the execution of the CUF kernel.

In the following code subroutine <Code>add_scalar</Code> is making use of the module <Code>array_def</Code> which defines the array <Code>a(n)</Code>
<Script language="fortran" code=
{`module array_def
 real :: a(n)
end module array_def
!
! Following subroutine make use of the module array_def
subroutine add_scalar
 use array_def, only: a
 do i=1, n
  a(i) = a(i) + b 
 end do
end subroutine add_scalar`}
/>

Converting this code to a GPU friendly one can be done as follows:
<Script language="fortran" code=
{`module array_def 
 real :: a(n)
 real,device :: a_d(n)
end module array_def
!
subroutine add_scalar
#ifdef USE_GPU
 use array_def, only: a => a_d 
#else
 use array_def, only: a
#endif
!$cuf kernel do <<<*,*>>>
 do i=1, n
  a(i) = a(i) + b
 end do
end subroutine add_scalar`}
/>
When compiling without the preprocessor directive <Code>USE_GPU</Code>. The code will behave the same as the CPU version. Ignoring the CUF kernel execution configuration. When GPU is enabled the device allocated array <Code>a_d(n)</Code> is used instead, for a calculation respecting the CUF kernel.
If the arrays used in the subroutine are explicitly passed then one can make use of the <Code>device</Code> attribute to achieve the same effect as above. The following code illustrate the same.
<Script language="fortran" code=
{`subroutine add_scalar(a,n) 
 real:: a(n)
#ifdef USE_GPU
 attributes(device) :: a
#endif
!$cuf kernel do <<<*,*>>>
 do i=1, n
  a(i) = a(i) + b
 end do
end subroutine add_scalar`}
/>

<Heading as="h4" size="sm" pb="5"> Compiling and Running the Script </Heading>

Any code in a file with a `.cuf` or `.CUF` extension is compiled with CUDA Fortran automatically enabled. Otherwise, the compiler flag -Mcuda can be used to compile CUDA Fortran code with other extensions. If above code is in a file named <Code>cufortran.cuf</Code>, compilation and execution of the code is as simple as:
<Script language="bash" code=
{` pgf90 -o cufortran cufortran.cuf 
 ./cufortran`}
/>

For files that are intented to compile both on CPU and GPU, as explained in this scible, one can compile the code using the following sequence.
<Script language="bash" code=
{`pgf90 -Mcuda=cc60 -O3 -Mpreprocess -DUSE_CUDA  cufortran.F90`}
/>
The preprocessor directive <Code>-Mpreprocess -DUSE_CUDA</Code> will activate the cuda parts of the code when used. The value of <Code>-Mcuda=cc60</Code> flag will be infered by the GPU card one is using <Code>cc60</Code> is for NVIDIA GPU P100 cards and <Code>cc35</Code> is for K80 cards and so on. 

A community edition of the PGI compiler( &gt;= version 16.10) is available at the NVIDIA website, where CUDA Fortran is implemented.
    </Box>
  );
}
