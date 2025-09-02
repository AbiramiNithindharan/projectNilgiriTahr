"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./WhoWeAre.module.css";

interface TeamMember {
  name: string;
  image: string;
  about: string;
  isPartner?: boolean;
  website?: string;
}

interface Partner {
  name: string;
  logo: string;
  website: string;
}

interface TeamSection {
  id: string;
  title: string;
  members: TeamMember[];
  partners?: Partner[];
}

export default function WhoWeAre() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamSections: TeamSection[] = [
    {
      id: "board-members",
      title: "Board Members",
      members: [
        {
          name: "Thiru.M.G.Ganesan",
          image: "/members/thiru-mg-ganesan.png",
          about:
            "Project Director a native of Ramanathapuram district has completed B.Sc.Agri at PAJANCOA &RI, Karaikal and M.Sc.Agri at GP Pant University at Uttarakhand. Worked as an agricultural officer and got selected as ACF in 2014. Trained at CASFOS dehradun from 2014 to 2016. Worked as ACF squad and vigilance, Eco development officer in KMTR, DD at ATR Pollachi, DD at AIWC. Now working as State Project Director, Project Nilgiri Tahr at Coimbatore. Majorly worked for tribal welfare, local community development, wildlife and wildlife forensics.",
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
            "K. Ragavendran has completed a Bachelor's and a Master of Science in Zoology from St. Xavier's College, Palayamkottai. He joined as a Project Associate at Xavier Research Foundation. The core concept of the project is to promote organic farming and environmental protection in every village in Tirunelveli district. He has published seven research articles in highly reputed journals and one book. He has research experience with two funding agencies: the Jesuitenweltweit Funding Agency and the Indian Council of Medical Research (ICMR). Recently, he completed a project as a Project Associate at AIWC, with a project entitled 'Fireflies: Ecology, Species Diversity, Distribution, and Habitats in Anamalai Tiger Reserve.' Currently, he has joined as a Senior Research Fellow in Project Nilgiri Tahr.",
        },
      ],
    },
    {
      id: "our-partners",
      title: "Our Partners",
      members: [],
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

  // Flatten all members from all sections
  const allMembers = teamSections.reduce((acc, section) => {
    const sectionMembers = section.members.map((member) => ({
      ...member,
      section: section.title,
    }));
    return [...acc, ...sectionMembers];
  }, [] as (TeamMember & { section: string })[]);

  // Add partners as special cards
  const partnerCards =
    teamSections
      .find((s) => s.id === "our-partners")
      ?.partners?.map((partner) => ({
        name: partner.name,
        image: partner.logo,
        about: `Partnership organization supporting Nilgiri Tahr conservation efforts. Visit: ${partner.website}`,
        section: "Our Partners",
        isPartner: true,
        website: partner.website,
      })) || [];

  const allCards = [...allMembers, ...partnerCards];

  return (
    <section
      id="who-we-are"
      style={{
        padding: "40px 0 0", // Further reduced top padding for wave integration
        background: "#ffffff",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Main Split Screen Section */}
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 8vw, 8rem)",
          alignItems: "center",
          padding: "20px 2rem 80px", // Reduced padding for better integration
          minHeight: "70vh", // Adjusted height
        }}
      >
        {/* Left Side - Image with wave cut effect */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{
            position: "relative",
            height: "500px",
            overflow: "hidden",
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)", // Wave cut on right side
          }}
        >
          <Image
            src="/banners/DJI_0036.jpg"
            alt="Nilgiri Tahr conservation work"
            fill
            style={{
              objectFit: "cover",
            }}
          />
          {/* Subtle overlay for text readability */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(45deg, rgba(0,0,0,0.1), transparent)",
            }}
          />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            padding: "2rem 0",
          }}
        >
          {/* Section Number */}
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#52b788",
              marginBottom: "1rem",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            03
          </div>

          {/* Main Heading */}
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "900",
              lineHeight: "1.1",
              margin: "0 0 2rem 0",
              color: "#000000",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Who We Are — dedicated scientists, conservationists, and communities
            united in protecting the Nilgiri Tahr through research and
            education.
          </h2>

          {/* Learn More Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            style={{
              background: "transparent",
              border: "2px solid #000000",
              color: "#000000",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginTop: "2rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#000000";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#000000";
            }}
          >
            LEARN MORE
          </motion.button>
        </motion.div>
      </div>

      {/* Team Members Section */}
      <motion.div
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fffe 100%)",
          padding: "80px 2rem",
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            marginTop: "8rem",
          }}
        >
          {/* Section Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#52b788",
                marginBottom: "1rem",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              04
            </div>
            <h3
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "900",
                margin: "0 0 2rem 0",
                color: "#000000",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Our Team
            </h3>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666666",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Meet the dedicated professionals working tirelessly to protect and
              preserve the Nilgiri Tahr through scientific research and
              conservation efforts.
            </p>
          </div>

          {/* Team Members Slider */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className={styles.swiperContainer}
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next-team",
                prevEl: ".swiper-button-prev-team",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-team",
                bulletClass: "swiper-pagination-bullet-custom",
                bulletActiveClass: "swiper-pagination-bullet-active-custom",
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={allCards.length > 3}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
              style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                position: "relative",
              }}
            >
              {allCards.map((member, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(15px)",
                      borderRadius: "16px",
                      padding: "2rem 1.5rem",
                      boxShadow: "0 8px 32px rgba(27, 67, 50, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: member.isPartner ? "pointer" : "default",
                      height: "480px", // Fixed height for all cards
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: "0 16px 48px rgba(27, 67, 50, 0.12)",
                      transition: { duration: 0.2 },
                    }}
                    onClick={() => {
                      if (member.isPartner && member.website) {
                        window.open(member.website, "_blank");
                      }
                    }}
                  >
                    {/* Member/Partner Image */}
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: member.isPartner ? "12px" : "50%",
                        overflow: "hidden",
                        margin: "0 auto 1.5rem",
                        background: "linear-gradient(135deg, #52b788, #a8dab5)",
                        padding: member.isPartner ? "8px" : "4px",
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: member.isPartner ? "8px" : "50%",
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          style={{
                            objectFit: member.isPartner ? "contain" : "cover",
                            objectPosition: member.isPartner
                              ? "center"
                              : "center top",
                          }}
                        />
                      </div>
                    </div>

                    {/* Member/Partner Info */}
                    <div
                      style={{
                        textAlign: "center",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Name and Section */}
                      <div>
                        <h3
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "700",
                            margin: "0 0 0.5rem 0",
                            color: "#1b4332",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: "1.3",
                            minHeight: "2.4rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {member.name}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            margin: "0 0 1rem 0",
                            color: "#52b788",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: "1.3",
                            minHeight: "1.8rem",
                          }}
                        >
                          {member.section}
                        </p>
                      </div>

                      {/* About/Description */}
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "#2d5016",
                            lineHeight: "1.4",
                            margin: "0",
                            fontFamily: "Poppins, sans-serif",
                            opacity: 0.9,
                            display: "-webkit-box",
                            WebkitLineClamp: 6, // Limit to 6 lines
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textAlign: "left",
                          }}
                        >
                          {member.about}
                        </p>
                      </div>

                      {/* Partner Link Indicator */}
                      {member.isPartner && (
                        <div
                          style={{
                            marginTop: "1rem",
                            padding: "0.5rem",
                            background: "rgba(82, 183, 136, 0.1)",
                            borderRadius: "8px",
                            border: "1px solid rgba(82, 183, 136, 0.2)",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "#1b4332",
                              fontWeight: "500",
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            Click to visit website
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            {allCards.length > 4 && (
              <>
                <button
                  className="swiper-button-prev-team"
                  style={{
                    position: "absolute",
                    left: "-1.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(82, 183, 136, 0.2)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "#1b4332",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 10,
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#52b788";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.95)";
                    e.currentTarget.style.color = "#1b4332";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1)";
                  }}
                >
                  ‹
                </button>
                <button
                  className="swiper-button-next-team"
                  style={{
                    position: "absolute",
                    right: "-1.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(82, 183, 136, 0.2)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "#1b4332",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 10,
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#52b788";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.95)";
                    e.currentTarget.style.color = "#1b4332";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1)";
                  }}
                >
                  ›
                </button>
              </>
            )}

            {/* Custom Pagination */}
            <div
              className="swiper-pagination-team"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.8rem",
                marginTop: "2rem",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
