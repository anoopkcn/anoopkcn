
import { FaPython, FaReact, FaGitAlt } from "react-icons/fa";
import {GrStatusPlaceholder} from "react-icons/gr"
import { SiJavascript } from "react-icons/si"
import TextSkills from "../pages/data-skills"
import go from "../images/go.png"
import clang from "../images/clang.svg"
import aiida from "../images/aiida.png"
import pytorch from "../images/pytorch.png"
import cuf from "../images/cuf.jpg"

export const skillsData = [
    {
        title: "Git",
        icon: FaGitAlt,
        type: "VSC",
        text: TextSkills('git')
    },
    {
        title: "Python",
        icon: FaPython,
        type: "language",
        text: TextSkills('python')
    },
    {
        title: "C and C++",
        image: clang,
        type: "language",
        text: TextSkills('cpp')
    },
    {
        title: "Fortran",
        icon: GrStatusPlaceholder,
        type: "language",
        text: TextSkills('fortran')
    },
    {
        title: "GO",
        image: go,
        type: "language",
        text: TextSkills('go')
    },
    {
        title: "JavaScript",
        icon: SiJavascript,
        type: "language",
        text: TextSkills('js')
    },
    {
        title: "CUDA-Fortran",
        image: cuf,
        type: "language",
        text: TextSkills('cuf')
    },
    {
        title: "MPI and OpenMP",
        icon: GrStatusPlaceholder,
        type: "language",
        text: TextSkills('mpi')
    },
    {
        title: "PyTorch",
        image: pytorch,
        type: "library",
        text: TextSkills('pytorch')
    },
    {
        title: "AiiDA",
        image: aiida,
        type: "library",
        text: TextSkills('aiida')
    },
    {
        title: "NodeJS",
        icon: FaReact,
        type: "library",
        text: TextSkills('nodejs')
    },
    {
        title: "React",
        icon: FaReact,
        type: "library",
        text: TextSkills('react')
    },
    {
        title: "REST",
        icon: GrStatusPlaceholder,
        type: "",
        text: TextSkills('rest')
    },
    {
        title: "Tools",
        icon: GrStatusPlaceholder,
        type: "Scripting",
        text: TextSkills('tools')
    },
    {
        title: "Design Tools",
        icon: GrStatusPlaceholder,
        type: "",
        text: TextSkills('dtools')
    },
    {
        title: "Web",
        icon: GrStatusPlaceholder,
        type: "",
        text: TextSkills('web')
    },
    {
        title: "DFT & related codes",
        icon: GrStatusPlaceholder,
        type: "code",
        text: TextSkills('dftcodes')
    },
    {
        title: "Not in regular use",
        icon: GrStatusPlaceholder,
        type: "",
        text: TextSkills('notused')
    },
]