"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import styles from "./TeamMembers.module.css";
import { setConfig } from "next/config";

export default function TeamMembers() {
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: boolean;
  }>({});
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          name: "Tmt. Supriya Sahu, IAS",
          image: "/members/supriya-sahu.jpg",
          alt: "Tmt. Supriya Sahu, IAS",
          about:
            "Additional Chief Secretary to the Government of Tamil Nadu, Department of Environment, Climate Change & Forests, Tmt. Supriya Sahu is a 1991-batch IAS officer with a distinguished career in public administration and environmental leadership. She provides strategic direction for policies and programs that address critical issues including wildlife conservation, forest management, climate resilience, and pollution control. Under her visionary leadership, Tamil Nadu has launched several landmark initiatives such as the Tamil Nadu Climate Change Mission, Green Tamil Nadu Mission, and Project Nilgiri Tahr, which focuses on the scientific protection of the state animal and restoration of fragile high-altitude grasslands. She has been instrumental in integrating climate action with conservation planning, fostering a sustainable and resilient future for both people and ecosystems.",
        },
        {
          name: "Thiru Srinivas R. Reddy, IFS",
          image: "/members/srinivas-reddy-1.png",
          alt: "Thiru Srinivas R. Reddy, IFS",
          about:
            "Principal Chief Conservator of Forests (PCCF) and Head of Forest Force, Tamil Nadu, Thiru Srinivas R. Reddy assumed charge as PCCF & HoFF in October 2024. With a long-standing career in forest and wildlife management, he has also served as Chief Wildlife Warden since 2022. Over the years, he has held several key positions including Field Director of Mudumalai Tiger Reserve, Conservator of Forests (Genetics), and Managing Director of Tamil Nadu Tea Plantation Corporation. His expertise spans forest management, biodiversity conservation, wildlife protection enforcement, and strengthening frontline forest staff through training and capacity building. As a leader, he plays a vital role in guiding statewide conservation projects like Project Nilgiri Tahr, ensuring effective coordination between divisions and field teams for the protection of this endangered species.",
        },
        {
          name: "Thiru Rakesh Kumar Dogra, IFS",
          image: "/members/rakesh-kumar-dogra.jpg",
          alt: "Thiru Rakesh Kumar Dogra, IFS",
          about:
            "Principal Chief Conservator of Forests and Chief Wildlife Warden, Tamil Nadu, Thiru Rakesh Kumar Dogra oversees the protection and management of the state’s rich biodiversity. He is responsible for enforcing wildlife laws, supervising conservation activities across national parks, tiger reserves, and wildlife sanctuaries, and coordinating with national-level conservation programs. In his role, he ensures that strategic initiatives such as Project Nilgiri Tahr are implemented effectively, emphasizing habitat restoration, population monitoring, and field-level protection to secure the long-term survival of Tamil Nadu’s state animal and the high-altitude ecosystems it inhabits.",
        },
        {
          name: "Thiru.M.G.Ganesan, IFS",
          image: "/members/thiru-mg-ganesan.png",
          alt: "Thiru.M.G.Ganesan",
          about:
            "Project Director a native of Ramanathapuram district has completed B.Sc.Agri at PAJANCOA &RI, Karaikal and M.Sc.Agri at GP Pant University at Uttarakhand. Worked as an agricultural officer and got selected as ACF in 2014. Trained at CASFOS dehradun from 2014 to 2016. Worked as ACF squad and vigilance, Eco development officer in KMTR, DD at ATR Pollachi, DD at AIWC. Now working as State Project Director, Project Nilgiri Tahr at Coimbatore. Majorly worked for tribal welfare, local community development, wildlife and wildlife forensics..",
        },
        {
          name: "Thiru.K.Ganeshram",
          image: "/members/thiru-k-ganesh-ram.png",
          alt: "Thiru.K.Ganesh Ram",
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
          alt: "Dr.M.Ashok Kumar",
          about:
            "Senior Scientist and Research Coordinator is an ecologist with over 20 years of experience in ecology, wildlife conservation, wildlife management, and academia, he earned his doctoral degree in wildlife biology from AVC College in 2012. He has worked with conservation NGOs, including WWF-India and BNHS, as well as academic institutions such as Kerala Veterinary and Animal Sciences University, JNCASR-Deemed University, and AVC College. His expertise includes conducting wildlife surveys, radio-collaring large mammals, data analysis, and reporting. He has published more than 15 research articles, three book chapters, popular articles, and scientific reports.",
        },
        {
          name: "Dr.B.Subbaiyan",
          image: "/members/dr-b-subbaiyan.png",
          alt: "Dr.B.Subbaiyan",
          about:
            "Senior Research Fellow of Project Nilgiri Tahr, is a plant taxonomist and conservationist. He graduated in Botany from Government Arts College, Coimbatore. He worked as a biologist at Anamalai Tiger Reserve from 2018-2020. He has co-authored two books and published 8 research articles in reputed scientific journals.",
        },
        {
          name: "K.Manigandan",
          image: "/members/k-manigandan.png",
          alt: "K.Manigandan",
          about:
            "Mr. K. Manigandan, Senior Research Fellow of Project Nilgiri Tahr, is a Wildlife Biologist. He received his Bachelor of Science in Zoology, Government Arts College, Coimbatore and Master of Science in Wildlife Biology from Government Arts College, The Nilgiris. He has studied Human Elephant Conflicts in Hosur Forest Division, Cauvery North Wildlife Sanctuary during his Master's. He worked as a Field Officer in A Rocha India (NGO), Bannerghatta National Park, Bangalore for Research and Monitoring of the Elephant Corridors. He is keen on Nature & Wildlife Conservation through Scientific Research and Conservation Education.",
        },
        {
          name: "T.Nesan",
          image: "/members/t-nesan.png",
          alt: "T.Nesan",
          about:
            "Nesan T. serves as a Senior Research Fellow in the prestigious Nilgiri Thar project. He holds undergraduate and postgraduate degrees in Wildlife Biology from Ooty Arts and Science College. His academic pursuits highlighted in a dissertation entitled Status and Distribution of Tigers & Sympatric Carnivores in the Megamalai Division of Srivilliputhur Megamalai Tiger Reserve. With an intense passion for wildlife, Nesan has developed extensive experience with the wildlife, driven by his self-initiated interest in this remarkable species.",
        },
        {
          name: "K.Ragavendran",
          image: "/members/k-ragavendran.png",
          alt: "K.Ragavendran",
          about:
            "K. Ragavendran has completed a Bachelor's and a Master of Science in Zoology from St. Xavier’s College, Palayamkottai. He joined as a Project Associate at Xavier Research Foundation. The core concept of the project is to promote organic farming and environmental protection in every village in Tirunelveli district. He has published seven research articles in highly reputed journals and one book. He has research experience with two funding agencies: the Jesuitenweltweit Funding Agency and the Indian Council of Medical Research (ICMR). Recently, he completed a project as a Project Associate at AIWC, with a project entitled “Fireflies: Ecology, Species Diversity, Distribution, and Habitats in Anamalai Tiger Reserve.” Currently, he has joined as a Senior Research Fellow in Project Nilgiri Tahr.",
        },
      ],
    },
    {
      id: "scientific-committee",
      title: "Scientific Committee",
      members: [
        {
          name: "Dr. S. S. Sathyakumar",
          image: "/members/dr-s-s-sathyaKumar.jpeg",
          alt: "Dr. S. S. Sathyakumar",
          about:
            "Scientist-G and Senior Professor at the Wildlife Institute of India (WII), Dehradun, is a wildlife ecologist with over 35 years of experience in mountain ecosystems and wildlife conservation. He specializes in the study of mountain ungulates, habitat ecology, and human-wildlife interactions. He has led numerous projects across the Himalayas, focusing on wildlife surveys, habitat management, and community-based conflict resolution. His expertise also includes training forest department staff and stakeholders in conservation practices. Dr. Sathyakumar has published over 260 research papers, reports, and book chapters and serves on several IUCN/SSC specialist groups, contributing to global wildlife conservation efforts",
        },
        {
          name: "Vivek Menon ",
          image: "/members/vivek-menon.jpg",
          alt: "Vivek Menon ",
          about:
            "Senior Advisor to the CEO & President of IFAW Asia, long-time leader of the Wildlife Trust of India (WTI), author, environmental commentator, and wildlife photographer, with a strong advocacy background. He has trained enforcement and wildlife protection staff in many countries, lectured internationally, and served on multiple IUCN commissions (Species Survival Commission, Asian Elephant Specialist Group, etc.). He has authored and edited several books (including /'Indian Mammals: A Field Guide/'), published over 250 scientific and popular articles, and been involved in founding multiple environmental NGOs. His professional focus includes wildlife protection policy, natural heritage conservation, and raising public awareness.",
        },
        {
          name: "Dr. Yash Veer Bhatnagar ",
          image: "/members/Yash-Veer.jpeg",
          alt: "Dr. Yash Veer Bhatnagar ",
          about:
            "Country Representative at IUCN, PhD (Wildlife Sciences) is a conservation scientist with over 30 years of experience focused on high-altitude ecosystems, mountain ungulates, and human-wildlife coexistence. He completed a Master’s in Agricultural Entomology and another in Wildlife Science from the Wildlife Institute of India (WII), and earned his PhD for research on ranging and habitat use by Himalayan ibex. He has worked at Nature Conservation Foundation since 2003, co-directing its High Altitude Program, and prior to that with WII and the Snow Leopard Trust. His expertise includes wildlife ecology, habitat modelling, participatory conservation planning, policy support, and conflict resolution between people and wildlife. He has more than 90 publications spanning peer-reviewed papers, technical reports and field studies.",
        },
        {
          name: "Dr. Sreekumar Chirukandoth (TANUVAS)",
          image: "/members/sreeKumar.jpg",
          alt: "Dr. Sreekumar Chirukandoth (TANUVAS)",
          about:
            "Professor at Tamil Nadu Veterinary and Animal Sciences University (TANUVAS), Head of the Department of Wildlife Science, is a veterinarian and parasitologist with deep experience in wildlife health, diagnostics, and disease in both captive and free-range species. He teaches undergraduate, postgraduate, and doctoral students, manages wildlife health management programs, works with forest departments, NGOs, and zoos. His research spans molecular parasitology, immunology, infection in wildlife, disease diagnosis, and treatment. He has over 200 publications in related fields.",
        },
        {
          name: "Dr. S. Arumugam",
          image: "/members/shri-aarumugam.jpg",
          alt: "Dr. S. Arumugam",
          about:
            "Botanical Assistant at the Southern Regional Centre, Botanical Survey of India (BSI), Coimbatore, is a plant taxonomist with over 14 years of experience in floristics and angiosperm taxonomy, specializing in the grass family (Poaceae). He began his career as a Research Fellow in 2010 and became permanent staff in 2012.  He has contributed to key projects, including the Floristic Assessment of Megamalai Wildlife Sanctuary, Cyperaceae of Tamil Nadu, and the Flora of India (Poaceae Volumes 31 & 32), covering 25 genera and 139 species. Dr. Arumugam has published 20 research papers, described eight new taxa, rediscovered one species, and reported six new state records. He has presented his work at national and international conferences, supporting conservation and ecological restoration efforts across Tamil Nadu.",
        },
      ],
    },
    {
      id: "our-partners",
      title: "Our Partners",
      members: [], // Empty members array for partners
      partners: [
        {
          name: "GOVERNMENT OF TAMIL NADU FOREST DEPARTMENT(TNFD)",
          logo: "/logo/header-right-logo.png",
          website: "https://www.forests.tn.gov.in/",
          about:
            "The Tamil Nadu Forest Department is the primary government agency responsible for protecting and managing the state’s forests, wildlife, and biodiversity. With a network of forest divisions, wildlife sanctuaries, national parks, and tiger reserves, TNFD plays a vital role in implementing wildlife protection laws, habitat restoration projects, and eco-tourism initiatives. The department leads on-ground efforts for Nilgiri Tahr conservation, including synchronized surveys, anti-poaching patrols, and landscape-level planning to ensure the survival of this iconic species.",
        },
        {
          name: "Advanced Institute for Wildlife Conservation(AIWC)",
          logo: "/logo/aiwc-logo.png",
          website: "https://www.aiwc.res.in/",
          about:
            "The Advanced Institute for Wildlife Conservation (AIWC), established by the Government of Tamil Nadu, is a premier research and training centre focused on wildlife health, conservation genetics, and wildlife forensics. Based in Vandalur, Chennai, AIWC provides scientific support to conservation programs across the state. The institute contributes to Nilgiri Tahr conservation by offering expertise in disease diagnostics, health monitoring, and training forest staff in modern wildlife management techniques.",
        },
        {
          name: "Tamil Nadu Veterinary and Animal Sciences University (TANUVAS)",
          logo: "/logo/tnvasu.png",
          website: "https://www.tanuvas.ac.in/",
          about:
            "Tamil Nadu Veterinary and Animal Sciences University (TANUVAS) is a leading institution in veterinary science, animal health, and wildlife medicine. Its faculty and research teams support conservation by studying wildlife diseases, developing diagnostic tools, and conducting field-based health assessments. TANUVAS plays a crucial role in Project Nilgiri Tahr through veterinary care, treatment protocols, and disease management strategies that help maintain healthy wild populations.",
        },
        {
          name: "PSGR Krishnammal College for Women",
          logo: "/logo/psgr.jpg",
          website: "https://www.psgrkcw.ac.in/",
          about:
            "PSGR Krishnammal College for Women, Coimbatore, is a distinguished educational institution known for its strong emphasis on environmental education, sustainability, and community engagement. The college collaborates with Project Nilgiri Tahr in conservation awareness programs, student-driven outreach activities, and capacity-building initiatives. Through research projects and public campaigns, PSGR Krishnammal helps build climate and conservation literacy, fostering future champions for wildlife protection and ecological balance.",
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
        ease: "easeOut" as const,
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
        ease: "easeOut" as const,
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
  const leafDecorations = useMemo(() => {
    // Only render on client to avoid hydration issues
    if (!isClient) return [];

    const leafTypes = ["🍃", "🌿", "🍂", "🌱", "🌾"];
    const colors = ["#52b788", "#40916c", "#2d5016", "#1b4332"];

    // Use fixed seed for consistent positioning
    const positions = generateRandomPositions(50);

    return positions.map((pos, i) => {
      const randomLeaf = leafTypes[i % leafTypes.length];
      const randomColor = colors[i % colors.length];
      const randomSize = 1.2 + (i % 3) * 0.8;
      const randomOpacity = (5 + (i % 8)) / 100;
      const randomDuration = 5 + (i % 4);
      const randomDelay = i % 3;
      const isReverse = i % 2 === 0;

      return (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${pos.top}%`,
            left: `${pos.left}%`,
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
    });
  }, [isClient]);

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
      {isClient && leafDecorations}

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

            {/* === Members Swiper === */}
            {section.members && (
              <div className={styles.swiperContainer}>
                {/* Custom Navigation Buttons */}
                {section.members.length > 3 && (
                  <>
                    <button
                      className={`swiper-button-prev-${section.id}`}
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
                      className={`swiper-button-next-${section.id}`}
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
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={section.members.length > 3}
                  grabCursor={true} // 👈 shows hand cursor + allows drag swipe
                  touchRatio={1.2}
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
                      slidesPerView: 3,
                      spaceBetween: 32,
                    },
                  }}
                  navigation={{
                    nextEl: `.swiper-button-next-${section.id}`,
                    prevEl: `.swiper-button-prev-${section.id}`,
                  }}
                  onBeforeInit={(swiper) => {
                    const nav = swiper.params.navigation as any;
                    nav.prevEl = `.swiper-button-prev-${section.id}`;
                    nav.nextEl = `.swiper-button-next-${section.id}`;
                  }}
                >
                  {section.members.map((member, index) => {
                    const cardId = `${section.id}-${index}`;
                    const isExpanded = expandedCards[cardId];

                    return (
                      <SwiperSlide key={index}>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: (index % 4) * 0.1,
                          }}
                          viewport={{ once: true }}
                          whileHover={{ y: -8, scale: 1.02 }}
                          onMouseEnter={() => setHoveredCard(section.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          style={{
                            background: "#fff",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            textAlign: "center",
                            height: "350px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          <div
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              margin: "0 auto 1rem auto",
                              border: "3px solid #52b788",
                              position: "relative",
                            }}
                          >
                            <Image
                              src={member.image}
                              alt={member.alt}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <h3
                            style={{
                              fontWeight: "600",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {member.name}
                          </h3>
                          <p
                            onClick={() => toggleCard(cardId)}
                            style={{
                              fontSize: "0.9rem",
                              textAlign: "left",
                              cursor: "pointer",
                            }}
                          >
                            {isExpanded
                              ? member.about
                              : truncateText(member.about)}
                            {member.about.length > 150 && (
                              <span
                                style={{ color: "#52b788", fontWeight: "600" }}
                              >
                                {isExpanded ? " Show Less" : " Read More"}
                              </span>
                            )}
                          </p>
                        </motion.div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}

            {/* === Partners Swiper === */}
            {section.partners && (
              <div className={styles.swiperContainer}>
                {/* Custom Navigation Buttons */}
                {section.partners.length > 3 && (
                  <>
                    <button
                      className={`swiper-button-prev-${section.id}`}
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
                      className={`swiper-button-next-${section.id}`}
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
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={section.partners.length > 3}
                  grabCursor={true} // 👈 shows hand cursor + allows drag swipe
                  touchRatio={1.2}
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
                  navigation={{
                    nextEl: `.swiper-button-next-${section.id}`,
                    prevEl: `.swiper-button-prev-${section.id}`,
                  }}
                  onBeforeInit={(swiper) => {
                    const navigation = swiper.params.navigation as any;
                    navigation.prevEl = `.swiper-button-next-${section.id}`;
                    navigation.nextEl = `.swiper-button-prev-${section.id}`;
                  }}
                >
                  {section.partners.map((partner, index) => {
                    const cardId = `${section.id}-${index}`;
                    const isExpanded = expandedCards[cardId];

                    return (
                      <SwiperSlide key={index}>
                        <motion.div
                          whileHover={{ y: -3 }}
                          onClick={() => window.open(partner.website, "_blank")}
                          style={{
                            background: "#fff",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            textAlign: "center",
                            height: "350px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          <div
                            style={{
                              width: "80px",
                              height: "80px",
                              margin: "0 auto 1rem auto",
                              position: "relative",
                            }}
                          >
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <h3
                            style={{
                              fontSize: "1rem",
                              fontWeight: "600",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {partner.name}
                          </h3>
                          <p
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCard(cardId);
                            }}
                            style={{ fontSize: "0.85rem", textAlign: "left" }}
                          >
                            {isExpanded
                              ? partner.about
                              : truncateText(partner.about)}
                            {partner.about.length > 150 && (
                              <span
                                style={{ color: "#52b788", fontWeight: "600" }}
                              >
                                {isExpanded ? " Show Less" : " Read More"}
                              </span>
                            )}
                          </p>
                        </motion.div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
