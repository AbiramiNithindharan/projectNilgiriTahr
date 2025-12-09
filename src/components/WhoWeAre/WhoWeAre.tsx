"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./WhoWeAre.module.css";
import Link from "next/link";

interface TeamMember {
  name: string;
  image: string;
  about: string;
  isPartner?: boolean;
  website?: string;
}

interface Card extends TeamMember {
  section: string;
  description?: string; // optional, because partners don’t have one
  isPartner?: boolean;
}

interface Partner {
  name: string;
  logo: string;
  website: string;
  about: string;
}

interface TeamSection {
  id: string;
  title: string;
  description: string;
  members: TeamMember[];
  partners?: Partner[];
}

export default function WhoWeAre() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const teamSections: TeamSection[] = [
    {
      id: "board-members",
      title: "Board Members",
      description: "Guiding our mission with vision with expertise.",
      members: [
        {
          name: "Tmt. Supriya Sahu, IAS",
          image: "/members/supriya-sahu.jpg",
          about:
            "Additional Chief Secretary to the Government of Tamil Nadu, Department of Environment, Climate Change & Forests, Tmt. Supriya Sahu is a 1991-batch IAS officer with a distinguished career in public administration and environmental leadership. She provides strategic direction for policies and programs that address critical issues including wildlife conservation, forest management, climate resilience, and pollution control. Under her visionary leadership, Tamil Nadu has launched several landmark initiatives such as the Tamil Nadu Climate Change Mission, Green Tamil Nadu Mission, and Project Nilgiri Tahr, which focuses on the scientific protection of the state animal and restoration of fragile high-altitude grasslands. She has been instrumental in integrating climate action with conservation planning, fostering a sustainable and resilient future for both people and ecosystems.",
        },
        {
          name: "Thiru Srinivas R. Reddy, IFS",
          image: "/members/srinivas-reddy-1.png",

          about:
            "Principal Chief Conservator of Forests (PCCF) and Head of Forest Force, Tamil Nadu, Thiru Srinivas R. Reddy assumed charge as PCCF & HoFF in October 2024. With a long-standing career in forest and wildlife management, he has also served as Chief Wildlife Warden since 2022. Over the years, he has held several key positions including Field Director of Mudumalai Tiger Reserve, Conservator of Forests (Genetics), and Managing Director of Tamil Nadu Tea Plantation Corporation. His expertise spans forest management, biodiversity conservation, wildlife protection enforcement, and strengthening frontline forest staff through training and capacity building. As a leader, he plays a vital role in guiding statewide conservation projects like Project Nilgiri Tahr, ensuring effective coordination between divisions and field teams for the protection of this endangered species.",
        },
        {
          name: "Thiru Rakesh Kumar Dogra, IFS",
          image: "/members/rakesh-kumar-dogra.jpg",

          about:
            "Principal Chief Conservator of Forests and Chief Wildlife Warden, Tamil Nadu, Thiru Rakesh Kumar Dogra oversees the protection and management of the state’s rich biodiversity. He is responsible for enforcing wildlife laws, supervising conservation activities across national parks, tiger reserves, and wildlife sanctuaries, and coordinating with national-level conservation programs. In his role, he ensures that strategic initiatives such as Project Nilgiri Tahr are implemented effectively, emphasizing habitat restoration, population monitoring, and field-level protection to secure the long-term survival of Tamil Nadu’s state animal and the high-altitude ecosystems it inhabits.",
        },
        {
          name: "Thiru.M.G.Ganesan, IFS",
          image: "/members/thiru-mg-ganesan.png",

          about:
            "Project Director a native of Ramanathapuram district has completed B.Sc.Agri at PAJANCOA &RI, Karaikal and M.Sc.Agri at GP Pant University at Uttarakhand. Worked as an agricultural officer and got selected as ACF in 2014. Trained at CASFOS dehradun from 2014 to 2016. Worked as ACF squad and vigilance, Eco development officer in KMTR, DD at ATR Pollachi, DD at AIWC. Now working as State Project Director, Project Nilgiri Tahr at Coimbatore. Majorly worked for tribal welfare, local community development, wildlife and wildlife forensics..",
        },
        {
          name: "Thiru.K.Ganeshram",
          image: "/members/thiru-k-ganesh-ram.png",

          about:
            "Assistant Director of Project Nilgiri Tahr, Has Contributed much for Declaration of Nanjarayan tank Bird Sanctuary in Tiruppur Forest Division. Dedicated service for Forest and Wildlife protection and Conservation by untired field inspection in all Ranges of Tiruppur Forest Division and under the leadership and guidance, major Elephant tusk and Sandal wood offence were detected, accused was arrested and remanded in Udumalpet Range. Regular inspection in all Antipoaching campsheds , wildlife census and All Scheme works and guiding Range officers and field staffs in all aspects for best outcome of all works. Excellently formed the Medicinal Tree garden in Palani Range in Kodaikanal wildlife sanctuary under 110 announcement scheme and now it look like a natural Evergreen Forest in Palani Town.",
        },
      ],
    },
    {
      id: "research-team",
      title: "Research Team",
      description: "On the ground, uncovering insights for conservation.",
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
      id: "scientific-committee",
      title: "Scientific Committee",
      description: "Guidance and support through the Scientific Committee",
      members: [
        {
          name: "Dr. S. S. Sathyakumar",
          image: "/fallback.png",

          about:
            "Scientist-G and Senior Professor at the Wildlife Institute of India (WII), Dehradun, is a wildlife ecologist with over 35 years of experience in mountain ecosystems and wildlife conservation. He specializes in the study of mountain ungulates, habitat ecology, and human-wildlife interactions. He has led numerous projects across the Himalayas, focusing on wildlife surveys, habitat management, and community-based conflict resolution. His expertise also includes training forest department staff and stakeholders in conservation practices. Dr. Sathyakumar has published over 260 research papers, reports, and book chapters and serves on several IUCN/SSC specialist groups, contributing to global wildlife conservation efforts",
        },
        {
          name: "Vivek Menon ",
          image: "/fallback.png",

          about:
            "Senior Advisor to the CEO & President of IFAW Asia, long-time leader of the Wildlife Trust of India (WTI), author, environmental commentator, and wildlife photographer, with a strong advocacy background. He has trained enforcement and wildlife protection staff in many countries, lectured internationally, and served on multiple IUCN commissions (Species Survival Commission, Asian Elephant Specialist Group, etc.). He has authored and edited several books (including /'Indian Mammals: A Field Guide/'), published over 250 scientific and popular articles, and been involved in founding multiple environmental NGOs. His professional focus includes wildlife protection policy, natural heritage conservation, and raising public awareness.",
        },
        {
          name: "Dr. Yash Veer Bhatnagar ",
          image: "/fallback.png",

          about:
            "Country Representative at IUCN, PhD (Wildlife Sciences) is a conservation scientist with over 30 years of experience focused on high-altitude ecosystems, mountain ungulates, and human-wildlife coexistence. He completed a Master’s in Agricultural Entomology and another in Wildlife Science from the Wildlife Institute of India (WII), and earned his PhD for research on ranging and habitat use by Himalayan ibex. He has worked at Nature Conservation Foundation since 2003, co-directing its High Altitude Program, and prior to that with WII and the Snow Leopard Trust. His expertise includes wildlife ecology, habitat modelling, participatory conservation planning, policy support, and conflict resolution between people and wildlife. He has more than 90 publications spanning peer-reviewed papers, technical reports and field studies.",
        },
        {
          name: "Dr. Sreekumar Chirukandoth (TANUVAS)",
          image: "/fallback.png",

          about:
            "Professor at Tamil Nadu Veterinary and Animal Sciences University (TANUVAS), Head of the Department of Wildlife Science, is a veterinarian and parasitologist with deep experience in wildlife health, diagnostics, and disease in both captive and free-range species. He teaches undergraduate, postgraduate, and doctoral students, manages wildlife health management programs, works with forest departments, NGOs, and zoos. His research spans molecular parasitology, immunology, infection in wildlife, disease diagnosis, and treatment. He has over 200 publications in related fields.",
        },
        {
          name: "Dr. S. Arumugam",
          image: "/fallback.png",

          about:
            "Botanical Assistant at the Southern Regional Centre, Botanical Survey of India (BSI), Coimbatore, is a plant taxonomist with over 14 years of experience in floristics and angiosperm taxonomy, specializing in the grass family (Poaceae). He began his career as a Research Fellow in 2010 and became permanent staff in 2012.  He has contributed to key projects, including the Floristic Assessment of Megamalai Wildlife Sanctuary, Cyperaceae of Tamil Nadu, and the Flora of India (Poaceae Volumes 31 & 32), covering 25 genera and 139 species. Dr. Arumugam has published 20 research papers, described eight new taxa, rediscovered one species, and reported six new state records. He has presented his work at national and international conferences, supporting conservation and ecological restoration efforts across Tamil Nadu.",
        },
      ],
    },
    {
      id: "our-partners",
      title: "Our Partners",
      description:
        "Knowledge behind the breakthroughs in the Nilgiri Tahr conservation.",
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

  // Flatten all members from all sections
  const allMembers: Card[] = teamSections.reduce<Card[]>((acc, section) => {
    const sectionMembers: Card[] = section.members.map((member) => ({
      ...member,
      section: section.title,
      description: section.description,
    }));
    return [...acc, ...sectionMembers];
  }, []);

  // Add partners as special cards
  const partnerCards: Card[] =
    teamSections
      .find((s) => s.id === "our-partners")
      ?.partners?.map((partner) => ({
        name: partner.name,
        image: partner.logo,
        description: `Partnership organization supporting Nilgiri Tahr conservation efforts. Visit: ${partner.website}`,
        about: partner.about,
        section: "Our Partners",
        isPartner: true,
        website: partner.website,
      })) || [];

  const allCards: Card[] = [...allMembers, ...partnerCards];

  return (
    <section id="who-we-are" className={styles.section}>
      {/* Main Split Screen Section */}
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "clamp(2rem, 6vw, 8rem)",
          alignItems: "center",
          padding: "20px 2rem 80px", // Reduced padding for better integration
          minHeight: isMobile ? "auto" : "70vh", // Adjusted height
        }}
      >
        {/* Left Side - Image with wave cut effect */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.clippedImage}
        >
          <Image
            src="/banners/who-we-are.JPG"
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
              fontSize: "clamp(2rem, 5vw, 3rem)",
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
          <Link href={"/who-we-are"}>
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
