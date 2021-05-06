import { MdComputer } from "react-icons/md";

import OneLiners from '../posts//useful-oneliners'
import PortListening from '../posts/port-listening'
import CudaFortran from '../posts/cuda-fortran'
import CrossrefBib from "../posts/crossref-bib";

const PostsData = [
    {
        id:"crossref-bib",
        content: <CrossrefBib />,
        icon: MdComputer,
        title: "Using crossref for building a bib",
        date: "06-05-2018",
        summary: "Crossref API can be used to build a simple bash function which can be used to easily manipulate the details of an article. This bash function can be extended to view the details, tags,etc., for references when writing an article",
        bib:[
            {
                link:"https://www.crossref.org",
                text:"The online service of crossref",
            },
        ]
    },
    {
        id:"useful-oneliners",
        content: <OneLiners />,
        icon: MdComputer,
        title: "Useful One Liners when scripting",
        date: "05-05-2018",
        summary: "Useful One Liner code snippets",
        bib:[
            {
                link:"https://www.youtube.com/watch?v=OSGv2VnC0go",
                text:"Raymond Hettinger's talk: Transforming Code into Beautiful, Idiomatic Python",
            },
            {
                link:"https://stackoverflow.com/a/3452888",
                text:"From a stackoverflow",
            },
            {
                link:"https://github.com/connermcd",
                text:"Courtesy of Conner McDaniel",
            }
        ]
    },
    {
        id:"cuda-fortran",
        content: <CudaFortran />,
        icon: MdComputer,
        title: "CUDA Programming Model and CUDA Fortran",
        date: "18-04-2018",
        summary: "A quick dive into CUDA Fortran programming model to convert Fortran code to a GPU compatible code with fewer modifications",
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
    },
    {
        id:"port-listening",
        content: <PortListening />,
        icon: MdComputer,
        title: "Port listening from a cluster",
        date: "19-11-2017",
        summary: "Port listening can come handy on many occasions, primarily when working with a remote machine. Some of the services that would consume a lot of memory, ram and other resources are most often handled using a cluster or a workstation",
        bib:[
            {
                link:"http://www.penguintutor.com/linux/network-services-ports",
                text:"TCP/IP and UDP/IP</a> details of service port"
            },
            {
                link:"https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts/",
                text:"Jupyter notebook tips tricks shortcuts"
            },
            {
                link:"https://hub.docker.com/r/strivetobelazy/archlinux/",
                text:"Docker image for testing c,c++,fortran,go,etc.."
            }
        ]
    },
 
]

export default PostsData;