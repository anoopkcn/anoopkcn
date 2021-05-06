import { RiComputerLine } from "react-icons/ri";

import TestExample from '../posts/test-example'
import TestExample2 from '../posts/test-example2'
import CudaFortran from '../posts/cuda-fortran'

const PostsData = [
    {
        id:"test-example",
        icon: RiComputerLine,
        title: "This is a title",
        date: "02-12-2020",
        summary: "this is a summary of the post",
        content: <TestExample />
    },
    {
        id:"test-example2",
        icon: RiComputerLine,
        title: "This is a title2",
        date: "02-12-2020",
        summary: "this is a summary of the post2",
        content: <TestExample2 />
    },
    {
        id:"cuda-fortran",
        content: <CudaFortran />,
        icon: RiComputerLine,
        title: "CUDA Programming Model and CUDA Fortran",
        date: "18-04-2018",
        summary: "A quick dive into CUDA Fortran programming model to convert fortran code to a GPU compatible code with fewer modifications",
        section: "tech",
        bib:[
            {
                link: 'https://developer.nvidia.com/cuda-fortran',
                text:'CUDA Fortran for NVIDIA',
            },
            {
                link: "https://devblogs.nvidia.com/parallelforall/easy-introduction-cuda-fortran/",
                text:"An easy introduction",
            },
            {
                link:"https://github.com/anoopkcn/graphene-model",
                text:"Graphene tight binding model for porting to fortran and then to  gpu"
            }
        ],
    }
]

export default PostsData;