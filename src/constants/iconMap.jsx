import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaComments,
  FaUsers,
  FaRegLightbulb,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiVite,
  SiNestjs,
} from "react-icons/si";
import { GrLanguage } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";

// Ikonka nomini (string) uning komponentiga bog'laymiz
const iconComponents = {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaComments,
  FaUsers,
  FaRegLightbulb,
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiVite,
  SiNestjs,
  GrLanguage,
  TbWorld,
};

// Bu funksiya string nom bo'yicha kerakli ikonkani qaytaradi
export const getIcon = (iconName) => {
  const Icon = iconComponents[iconName];
  return Icon ? <Icon /> : null; // Bu yerda stil berish shart emas, chaqirilgan joyda beramiz
};
