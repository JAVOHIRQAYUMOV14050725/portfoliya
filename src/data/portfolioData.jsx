import {
    SiJavascript, SiTypescript, SiNodedotjs, SiNestjs, SiExpress,
    SiPostgresql, SiTypeorm, SiPrisma, SiMongodb, SiRedis,
    SiApollographql, SiGraphql, SiSocketdotio, SiDocker, SiGithub,
    SiMicrodotblog, SiAuth0, SiSwagger
  } from "react-icons/si";
  import {
    PiChatCenteredTextBold,
    PiUsersThreeBold
  } from "react-icons/pi";
  import { FaBrain } from "react-icons/fa6";
  import { TbLanguage } from "react-icons/tb";
  
  const portfolioData = {
    personalInfo: {
      name: "Qayumov Javohir",
      title: "Backend Developer",
      location: "Tashkent, Uzbekistan",
      email: "qayumovjavohir2@gmail.com",
      phone: "+998 94 202 40 44",
      socials: {
        github: "https://github.com/JAVOHIRQAYUMOV14050725",
        telegram: "https://t.me/Javohir14054545",
        linkedin: "https://linkedin.com/in/your-profile",
      },
    },
    hero: {
      tagline: "I build robust and scalable backend systems.",
      technologies: ["Node.js", "NestJS", "PostgreSQL", "TypeScript", "Docker", "Microservices"],
    },
    about: {
      bio: "I was born in 2002 in the Surxondaryo region. As a dedicated and passionate backend developer, I thrive on solving complex problems and building efficient, scalable server-side applications. I am currently a student at the Tashkent University of Information Technologies (2020–2024). From January to October 2023, I studied Backend Node.js at Najot Talim (Xadra Branch). During this intensive program, I mastered modern technologies and significantly expanded my knowledge in the programming field, preparing me for real-world challenges.",
    },
    skills: {
      hard: [
        { name: "JavaScript", icon: <SiJavascript className="w-5 h-5" /> },
        { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" /> },
        { name: "Node.js", icon: <SiNodedotjs className="w-5 h-5" /> },
        { name: "NestJS", icon: <SiNestjs className="w-5 h-5" /> },
        { name: "Express.js", icon: <SiExpress className="w-5 h-5" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="w-5 h-5" /> },
        { name: "TypeORM", icon: <SiTypeorm className="w-5 h-5" /> },
        { name: "Prisma", icon: <SiPrisma className="w-5 h-5" /> },
        { name: "MongoDB", icon: <SiMongodb className="w-5 h-5" /> },
        { name: "Redis", icon: <SiRedis className="w-5 h-5" /> },
        { name: "REST API", icon: <SiApollographql className="w-5 h-5" /> },
        { name: "GraphQL", icon: <SiGraphql className="w-5 h-5" /> },
        { name: "WebSocket", icon: <SiSocketdotio className="w-5 h-5" /> },
        { name: "Docker", icon: <SiDocker className="w-5 h-5" /> },
        { name: "Git & GitHub", icon: <SiGithub className="w-5 h-5" /> },
        { name: "Microservices", icon: <SiMicrodotblog className="w-5 h-5" /> },
        { name: "OAuth2 & JWT", icon: <SiAuth0 className="w-5 h-5" /> },
        { name: "Technical Documentation", icon: <SiSwagger className="w-5 h-5" /> },
      ],
      soft: [
        { name: "Effective Communication", icon: <PiChatCenteredTextBold className="w-5 h-5" /> },
        { name: "Critical Thinking", icon: <FaBrain className="w-5 h-5" /> },
        { name: "Public Relations", icon: <PiUsersThreeBold className="w-5 h-5" /> },
        { name: "Teamwork", icon: <PiUsersThreeBold className="w-5 h-5" /> },
      ],
      languages: [
        { name: "English", level: "Intermediate", icon: <TbLanguage className="w-5 h-5" /> },
        { name: "Uzbek", level: "Native", icon: <TbLanguage className="w-5 h-5" /> },
      ],
    },
    experience: [
      {
        role: "Backend Developer",
        company: "Starlab",
        period: "Nov 2023 – Present",
        description: "Developing and maintaining scalable backend services for various client projects, focusing on API design, database management, and performance optimization.",
      },
      {
        role: "Bachelor's Degree",
        company: "Tashkent University of Information Technologies",
        period: "2020 – 2024",
        description: "Studied computer science and software engineering, laying the foundational knowledge for my career.",
      },
      {
        role: "Backend Node.js Bootcamp",
        company: "Najot Ta'lim (Xadra Branch)",
        period: "Jan 2023 – Oct 2023",
        description: "Intensive, project-based training focused on building production-grade backend applications with Node.js, NestJS, and related technologies.",
      },
    ],
    projects: [
      {
        title: "ERP Sphere (ERP System)",
        description: "A fully automated ERP system for managing sales, purchases, inventory, and finance. Built with a microservices architecture for scalability and maintainability.",
        techStack: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Docker", "Chart.js"],
        imageUrl: "https://placehold.co/600x400/1a202c/718096?text=ERP+Dashboard",
        liveUrl: "#",
        githubUrl: "https://github.com/JAVOHIRQAYUMOV14050725/portfoliya",
      },
      {
        title: "Online Bookstore",
        description: "A comprehensive system allowing users to browse, manage, and buy books. Features robust user authentication, secure payment logic, and an intuitive admin panel.",
        techStack: ["Express.js", "TypeScript", "JWT", "Prisma", "PostgreSQL"],
        imageUrl: "https://placehold.co/600x400/1a202c/718096?text=Bookstore+API",
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        title: "Uzum Market Clone (Team Project)",
        description: "An e-commerce platform for buyers and sellers with full admin control. Implemented secure registration/login (JWT, OAuth2.0), middleware, guards, and RBAC.",
        techStack: ["NestJS", "PostgreSQL", "TypeScript", "Microservices", "RBAC"],
        imageUrl: "https://placehold.co/600x400/1a202c/718096?text=E-commerce+Platform",
        liveUrl: "#",
        githubUrl: "#",
      },
    ],
  };
  
  export default portfolioData;