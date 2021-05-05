import fzjLogo from '../images/fzjLogo.png'
import sissaLogo from '../images/sissaLogo.png'
import ictpLogo from '../images/ictpLogo.png'
import iithLogo from '../images/iithLogo.png'
import TextExperiences from '../pages/data-experiences'

import {FcGraduationCap} from 'react-icons/fc'
// Data for the timeline
export const timelineData = [
    {
      meta: {
        id: "pgi1",
        place: "Peter Grünberg Institute (PGI-1)",
        position: "Doctoral Researcher",
        from: "Oct 2018",
        to: "Present",
        address: "Forschungszentrum Jülich, Germany",
        image: fzjLogo,
        link: {
          url: "https://www.fz-juelich.de/portal/DE/Home/home_node.html",
          text: "fzj",
        },
      },
      text: TextExperiences("pgi1"),
    },
    {
      meta: {
        id: "sissa",
        place: "International School for Advanced Studies(SISSA)",
        position: "Research stay",
        from: "Jan 2018",
        to: "Jul 2018",
        address: "Scuola Internazionale Superiore di Studi Avanzati,  Trieste, Italy",
        image:sissaLogo,
        link: {
          url: "https://www.sissa.it/",
          text: "sissa",
        },
      },
      text: TextExperiences("sissa"),
    },
    {
      meta: {
        id: "ictp",
        place: "International Centre for Theoretical Physics(ICTP)",
        position: "Masters in High-Performance computing",
        icon: FcGraduationCap,
        from: "2016",
        to: "Dec 2017",
        address: "International Centre for Theoretical Physics, Trieste, Italy",
        image:ictpLogo,
        link: {
          url: "https://www.ictp.it/",
          text: "Read more",
        },
      },
      text: TextExperiences('ictp'),
    },
    {
      meta: {
        id: "iith",
        place: "Indian Institute of Technology(IITH)",
        position: "Master of Science, Physics",
        icon: FcGraduationCap,
        from: "2014",
        to: "2016",
        address: "Indian Institute of Technology Hyderabad, Telangana, India",
        image:iithLogo,
        link: {
          url: "https://www.iith.ac.in/",
          text: "Read more",
        },
      },
      text: TextExperiences('iith'),
    },
  ];