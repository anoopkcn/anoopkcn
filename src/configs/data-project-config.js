import { FaPython, FaGithub, FaGitlab } from "react-icons/fa";
import { FcLandscape } from "react-icons/fc"
import { SiLatex, SiJavascript } from "react-icons/si"

import go from "../images/go.png"
import qe from "../images/qe.png"
import clang from "../images/clang.svg"
import aiida from "../images/aiida.png"

import TextProject from '../pages/data-project'

export const projectData = [
   {
      id: "pvims",
      title: "PViMS",
      icon: FcLandscape,
      role: "Research",
      type: "Academic",
      text: TextProject('pvims')
   },
   {
      title: "mlms",
      icon: FaPython,
      role: "Developer",
      type: "Library",
      text: TextProject("mlms"),
      link: "https://iffgit.fz-juelich.de/chand/mlms",
      linktext: "",
      linkicon: FaGitlab,
   },
   {
      title: "aiida-spex",
      image: aiida,
      role: "Developer",
      type: "Library",
      text: TextProject("aiida-spex"),
      link: "https://iffgit.fz-juelich.de/chand/aiida-spex",
      linktext: "",
      linkicon: FaGitlab,

   },
   {
      title: "lazylatex",
      icon: SiLatex,
      role: "Developer",
      type: "Tool",
      text: TextProject("lazylatex"),
      link: "https://github.com/anoopkcn/lazylatex",
      linktext: "",
      linkicon: FaGithub,
   },
   {
      title: "clip",
      image: go,
      role: "Developer",
      type: "Tool",
      text: TextProject("clip"),
      link: "https://github.com/anoopkcn/clip",
      linktext: "",
      linkicon: FaGithub,
   },
   {
      title: "qe-gpu",
      image: qe,
      role: "Contributor",
      type: "Code",
      text: TextProject("qegpu"),
      link: "https://github.com/anoopkcn/qe-gpu",
      linktext: "",
      linkicon: FaGithub,
   },
   {
      title: "Graphene Model",
      icon: FaPython,
      role: "Developer",
      type: "Academic",
      text: TextProject("graphene"),
      link: "https://github.com/anoopkcn/graphene-model",
      linktext: "",
      linkicon: FaGithub,
   },
   {
      title: "ljmd",
      image: clang,
      role: "Co-Developer",
      type: "Library",
      text: TextProject("ljmd"),
      link: "https://github.com/jnvance/ljmd-c",
      linktext: "",
      linkicon: FaGithub,
   },
   {
      title: "finite-element",
      icon: FaPython,
      role: "Developer",
      type: "Academic",
      text: TextProject("finiteelement"),
      link: "https://github.com/anoopkcn/finite_element",
      linktext: "",
      linkicon: FaGithub,
   },
   {
      title: "verdi-web",
      icon: SiJavascript,
      role: "Developer",
      type: "Tool",
      text: TextProject("verdiweb"),
      link: "https://github.com/anoopkcn/verdiweb",
      linktext: "",
      linkicon: FaGithub,
   },

]