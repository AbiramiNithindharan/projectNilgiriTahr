"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./TeamMembers.module.css";

export default function TeamMembers() {
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: boolean;
  }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const teamSections = [
    {
      id: "board-members",
      title: "Board Members",
      members: [
        {
          name: "Thiru.M.G.Ganesan",
          image: "/members/thiru-mg-ganesan.png",
          about:
            "Project Director a native of Ramanathapuram district has completed B.Sc.Agri at PAJANCOA &RI, Karaikal and M.Sc.Agri at GP Pant University at Uttarakhand. Worked as an agricultural officer and got selected as ACF in 2014. Trained at CASFOS dehradun from 2014 to 2016. Worked as ACF squad and vigilance, Eco development officer in KMTR, DD at ATR Pollachi, DD at AIWC. Now working as State Project Director, Project Nilgiri Tahr at Coimbatore. Majorly worked for tribal welfare, local community development, wildlife and wildlife forensics..",
        },
        {
          name: "Thiru.K.Ganesh Ram",
          image: "/members/thiru-k-ganesh-ram.png",
          about:
            "Assistant Director of Project Nilgiri Tahr, Has Contributed much for Declaration of Nanjarayan tank Bird Sanctuary in Tiruppur Forest Division. Dedicated service for Forest and Wildlife protection and Conservation by untired field inspection in all Ranges of Tiruppur Forest Division and under the leadership and guidance, major Elephant tusk and Sandal wood offence were detected, accused was arrested and remanded in Udumalpet Range. Regular inspection in all Antipoaching campsheds , wildlife census and All Scheme works and guiding Range officers and field staffs in all aspects for best outcome of all works. Excellently formed the Medicinal Tree garden in Palani Range in Kodaikanal wildlife sanctuary under 110 announcement scheme and now it look like a natural Evergreen Forest in Palani Town.",
        },
      ],
    },
    {
      id: "research-team",
      title: "Research Team",
      members: [
        {
          name: "Dr.M.Ashok Kumar",
          image: "/members/dr-m-ashok-kumar.png",
          about:
            "Senior Scientist and Research Coordinator is an ecologist with over 20 years of experience in ecology, wildlife conservation, wildlife management, and academia, he earned his doctoral degree in wildlife biology from AVC College in 2012. He has worked with conservation NGOs, including WWF-India and BNHS, as well as academic institutions such as Kerala Veterinary and Animal Sciences University, JNCASR-Deemed University, and AVC College. His expertise includes conducting wildlife surveys, radio-collaring large mammals, data analysis, and reporting. He has published more than 15 research articles, three book chapters, popular articles, and scientific reports.",
        },
        {
          name: "Dr.B.Subbaiyan",
          image: "/members/dr-b-subbaiyan.png",
          about:
            "Senior Research Fellow of Project Nilgiri Tahr, is a plant taxonomist and conservationist. He graduated in Botany from Government Arts College, Coimbatore. He worked as a biologist at Anamalai Tiger Reserve from 2018-2020. He has co-authored two books and published 8 research articles in reputed scientific journals.",
        },
      ],
    },
    {
      id: "scientific-committee",
      title: "Scientific Committee",
      members: [
        {
          name: "K.Manigandan",
          image: "/members/k-manigandan.png",
          about:
            "Mr. K. Manigandan, Senior Research Fellow of Project Nilgiri Tahr, is a Wildlife Biologist. He received his Bachelor of Science in Zoology, Government Arts College, Coimbatore and Master of Science in Wildlife Biology from Government Arts College, The Nilgiris. He has studied Human Elephant Conflicts in Hosur Forest Division, Cauvery North Wildlife Sanctuary during his Master's. He worked as a Field Officer in A Rocha India (NGO), Bannerghatta National Park, Bangalore for Research and Monitoring of the Elephant Corridors. He is keen on Nature & Wildlife Conservation through Scientific Research and Conservation Education.",
        },
        {
          name: "T.Nesan",
          image: "/members/t-nesan.png",
          about:
            "Nesan T. serves as a Senior Research Fellow in the prestigious Nilgiri Thar project. He holds undergraduate and postgraduate degrees in Wildlife Biology from Ooty Arts and Science College. His academic pursuits highlighted in a dissertation entitled Status and Distribution of Tigers & Sympatric Carnivores in the Megamalai Division of Srivilliputhur Megamalai Tiger Reserve. With an intense passion for wildlife, Nesan has developed extensive experience with the wildlife, driven by his self-initiated interest in this remarkable species.",
        },
        {
          name: "K.Ragavendran",
          image: "/members/k-ragavendran.png",
          about:
            "K. Ragavendran has completed a Bachelor's and a Master of Science in Zoology from St. Xavier’s College, Palayamkottai. He joined as a Project Associate at Xavier Research Foundation. The core concept of the project is to promote organic farming and environmental protection in every village in Tirunelveli district. He has published seven research articles in highly reputed journals and one book. He has research experience with two funding agencies: the Jesuitenweltweit Funding Agency and the Indian Council of Medical Research (ICMR). Recently, he completed a project as a Project Associate at AIWC, with a project entitled “Fireflies: Ecology, Species Diversity, Distribution, and Habitats in Anamalai Tiger Reserve.” Currently, he has joined as a Senior Research Fellow in Project Nilgiri Tahr.",
        },
      ],
    },
    {
      id: "our-partners",
      title: "Our Partners",
      members: [], // Empty members array for partners
      partners: [
        {
          name: "GOVERNMENT OF TAMIL NADU FOREST DEPARTMENT",
          logo: "/logo/header-right-logo.png",
          website: "https://www.forests.tn.gov.in/",
        },
        {
          name: "Advanced Institute for Wildlife Conservation",
          logo: "/logo/aiwc-logo.png",
          website: "https://www.aiwc.res.in/",
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  function generateRandomPositions(count: number) {
    const positions = [];

    for (let i = 0; i < count; i++) {
      const top = Math.floor(Math.random() * 91) + 5; // 5 to 95
      const left = Math.floor(Math.random() * 91) + 5; // 5 to 95

      positions.push({ top, left });
    }

    return positions;
  }

  // Function to generate random leaf decorations
  const generateLeafDecorations = () => {
    // Only render on client to avoid hydration issues
    if (!isClient) return [];

    const leafTypes = ["🍃", "🌿", "🍂", "🌱", "🌾"];
    const colors = ["#52b788", "#40916c", "#2d5016", "#1b4332"];
    const leafDecorations = [];

    // Use fixed seed for consistent positioning
    const positions = generateRandomPositions(50);

    for (let i = 0; i < positions.length; i++) {
      const leafIndex = i % leafTypes.length;
      const colorIndex = i % colors.length;
      const randomLeaf = leafTypes[leafIndex];
      const randomColor = colors[colorIndex];
      const position = positions[i];
      const randomSize = 1.2 + (i % 3) * 0.8; // Fixed size based on index
      const randomOpacity = (5 + (i % 8)) / 100; // 0.05 to 0.12
      const randomDuration = 5 + (i % 4); // 5s to 8s
      const randomDelay = i % 3; // 0s to 2s delay
      const isReverse = i % 2 === 0;

      leafDecorations.push(
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${position.top}%`,
            left: `${position.left}%`,
            fontSize: `clamp(${randomSize}rem, ${randomSize + 1}vw, ${
              randomSize + 1.5
            }rem)`,
            opacity: randomOpacity,
            color: randomColor,
            zIndex: 1,
            animation: `float ${randomDuration}s ease-in-out infinite ${
              isReverse ? "reverse" : ""
            } ${randomDelay}s`,
            pointerEvents: "none",
          }}
        >
          {randomLeaf}
        </div>
      );
    }
    return leafDecorations;
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        padding: "clamp(2rem, 4vw, 6rem) clamp(1rem, 4vw, 3rem)",
        background: "linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic leaf decorations - only render on client */}
      {isClient && generateLeafDecorations()}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(0.5rem, 2vw, 0)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {teamSections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            id={section.id}
            variants={sectionVariants}
            style={{
              marginBottom: "clamp(2rem, 4vw, 6rem)",
              scrollMarginTop: "120px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                fontWeight: "700",
                color: "#1b4332",
                marginBottom: "clamp(1.5rem, 3vw, 3rem)",
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
                background:
                  "linear-gradient(135deg, #1b4332, #2d5016, #52b788)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {section.title}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  section.id === "our-partners"
                    ? "repeat(auto-fit, minmax(200px, max-content))"
                    : isClient && window.innerWidth >= 768
                    ? "repeat(auto-fit, minmax(300px, 1fr))"
                    : "1fr", // Single column on mobile for member cards
                gap: "clamp(1rem, 2vw, 3rem)",
                justifyContent:
                  section.id === "our-partners" ? "center" : "initial",
              }}
            >
              {section.id === "our-partners"
                ? // Render partner logos
                  section.partners?.map((partner, partnerIndex) => (
                    <motion.div
                      key={partnerIndex}
                      variants={cardVariants}
                      whileHover={{ y: -3, scale: 1.02 }}
                      style={{
                        background: "#ffffff",
                        borderRadius: "12px",
                        padding: "clamp(1.5rem, 3vw, 2rem)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #e5e7eb",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        minHeight: "clamp(150px, 25vw, 200px)",
                        width: "fit-content",
                        minWidth: "200px",
                        maxWidth: "300px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        margin: "0 auto",
                      }}
                      onClick={() => window.open(partner.website, "_blank")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(0, 0, 0, 0.15)";
                        e.currentTarget.style.borderColor = "#52b788";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(0, 0, 0, 0.1)";
                        e.currentTarget.style.borderColor = "#e5e7eb";
                      }}
                    >
                      <div
                        style={{
                          width: "clamp(60px, 12vw, 100px)",
                          height: "clamp(60px, 12vw, 100px)",
                          marginBottom: "clamp(1rem, 2vw, 1.5rem)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>

                      <h3
                        style={{
                          fontSize: "clamp(0.8rem, 2.2vw, 1.1rem)",
                          fontWeight: "600",
                          color: "#1b4332",
                          margin: "0",
                          fontFamily: "Poppins, sans-serif",
                          textAlign: "center",
                          lineHeight: "1.3",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "normal",
                          maxWidth: "100%",
                        }}
                      >
                        {partner.name}
                      </h3>
                    </motion.div>
                  ))
                : // Render member cards for other sections
                  section.members.map((member, memberIndex) => {
                    const cardId = `${section.id}-${memberIndex}`;
                    const isExpanded = expandedCards[cardId];

                    return (
                      <motion.div
                        key={memberIndex}
                        variants={cardVariants}
                        whileHover={{ y: -3 }}
                        style={{
                          background: "#ffffff",
                          borderRadius: "8px",
                          padding: "clamp(1rem, 2vw, 2rem)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #e5e7eb",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                          minHeight:
                            isClient && window.innerWidth >= 768
                              ? "clamp(300px, 40vw, 400px)"
                              : "auto",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(0, 0, 0, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 2px 8px rgba(0, 0, 0, 0.1)";
                        }}
                      >
                        <div
                          style={{
                            width:
                              isClient && window.innerWidth >= 768
                                ? "clamp(70px, 15vw, 120px)"
                                : "100px",
                            height:
                              isClient && window.innerWidth >= 768
                                ? "clamp(70px, 15vw, 120px)"
                                : "100px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            margin: "0 auto clamp(1rem, 2vw, 1.5rem) auto",
                            border: "clamp(2px, 0.5vw, 4px) solid #52b788",
                            position: "relative",
                          }}
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center top",
                              position: "absolute",
                              top: "0",
                              left: "0",
                            }}
                          />
                        </div>

                        <h3
                          style={{
                            fontSize:
                              isClient && window.innerWidth >= 768
                                ? "clamp(0.9rem, 2.5vw, 1.3rem)"
                                : "1.1rem",
                            fontWeight: "600",
                            color: "#1b4332",
                            marginBottom: "clamp(0.5rem, 1vw, 1rem)",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: "1.3",
                          }}
                        >
                          {member.name}
                        </h3>

                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <p
                            style={{
                              fontSize:
                                isClient && window.innerWidth >= 768
                                  ? "clamp(0.75rem, 2vw, 0.95rem)"
                                  : "0.9rem",
                              lineHeight: "1.5",
                              color: "#2d5016",
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "400",
                              margin: "0",
                              textAlign: "left",
                              flex: 1,
                              cursor:
                                member.about.length > 150
                                  ? "pointer"
                                  : "default",
                            }}
                            onClick={() =>
                              member.about.length > 150 && toggleCard(cardId)
                            }
                          >
                            {isExpanded
                              ? member.about
                              : truncateText(member.about)}
                            {member.about.length > 150 && (
                              <span
                                style={{
                                  color: "#52b788",
                                  fontWeight: "600",
                                  marginLeft: "0.5rem",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                              >
                                {isExpanded ? " Show Less" : " Read More"}
                              </span>
                            )}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(3deg);
          }
          66% {
            transform: translateY(-8px) rotate(-2deg);
          }
        }
      `}</style>
    </motion.section>
  );
}
