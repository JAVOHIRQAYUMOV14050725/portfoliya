import React, { useState } from "react";
import { useContactInfoQuery } from "../api/contactInfoApi";
import ContactForm from "../components/ContactForm";
import { useTranslation } from "react-i18next";

// Framer Motion va React Icons importlari
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaGithub,
  FaLinkedin,
  FaChevronDown,
} from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useContactInfoQuery();
  const [expandedItems, setExpandedItems] = useState([]);

  // Ikonkalar bilan boyitilgan kontakt ma'lumotlari
  const contactItems = data
    ? [
        {
          label: t("contactPage.phone"),
          value: data.phone,
          icon: <FaPhone className="text-cyan-400" />,
        },
        {
          label: t("contactPage.email"),
          value: data.email,
          icon: <FaEnvelope className="text-cyan-400" />,
        },
        {
          label: t("contactPage.location"),
          value: data.location,
          icon: <FaMapMarkerAlt className="text-cyan-400" />,
        },
        {
          label: t("contactPage.telegram"),
          value: data.telegram,
          icon: <FaTelegramPlane className="text-cyan-400" />,
          link: `https://t.me/${data.telegram.replace("@", "")}`,
        },
        {
          label: t("contactPage.github"),
          value: data.github,
          icon: <FaGithub className="text-cyan-400" />,
          link: data.github,
        },
        {
          label: t("contactPage.linkedin"),
          value: data.linkedin,
          icon: <FaLinkedin className="text-cyan-400" />,
          link: data.linkedin,
        },
      ]
    : [];

  const toggleItem = (key) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAll = () => {
    if (expandedItems.length === contactItems.length) {
      setExpandedItems([]);
    } else {
      setExpandedItems(contactItems.map((item) => item.label));
    }
  };

  // Elementlarning animatsiyasi uchun variantlar
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="px-4 py-20 min-h-screen max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t("contactPage.title")}
        </h1>
        <p className="text-lg text-slate-400">
          {t("contactPage.subtitle")}
        </p>
      </motion.div>

      {/* Ikki ustunli layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* ✅ Kontakt ma'lumotlari (chap taraf) */}
        <motion.div
          className="bg-slate-800/50 rounded-xl p-6 text-white shadow-2xl border border-slate-700 backdrop-blur-sm"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {t("contactPage.details")}
            </h2>
            {!isLoading && data && (
              <button
                onClick={toggleAll}
                className="text-sm bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-300 font-semibold"
              >
                {expandedItems.length === contactItems.length
                  ? t("contactPage.collapseAll")
                  : t("contactPage.expandAll")}
              </button>
            )}
          </div>

          {isLoading ? (
            <p className="text-gray-400">{t("contactPage.loading")}</p>
          ) : !data ? (
            <p className="text-red-400">{t("contactPage.failed")}</p>
          ) : (
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {contactItems.map(({ label, value, icon, link }) => {
                const isExpanded = expandedItems.includes(label);
                return (
                  <motion.li
                    key={label}
                    variants={itemVariants}
                    className="bg-slate-900/70 border border-slate-700 rounded-lg overflow-hidden"
                  >
                    <div
                      onClick={() => toggleItem(label)}
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-slate-800 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{icon}</span>
                        <strong className="text-lg font-medium text-slate-200">
                          {label}
                        </strong>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="text-slate-500" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="px-4 pb-4"
                        >
                          <div className="border-t border-slate-700 pt-3 mt-1 ml-12">
                            {link ? (
                              <a
                                href={link}
                                className="text-cyan-400 hover:underline break-all"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {value}
                              </a>
                            ) : (
                              <span className="text-gray-300 break-all">
                                {value}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </motion.div>

        {/* ✅ Kontakt Formasi (o'ng taraf) */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
