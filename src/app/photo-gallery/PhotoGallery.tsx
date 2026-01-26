"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "./photogallery.module.css";
import MenuButton from "@/components/PhotoGallery/components/MenuButton";
import MenuOverlay from "@/components/PhotoGallery/components/MenuOverlay";

import { useSearchParams } from "next/navigation";

type SubCategory = {
  id: number;
  title: string;
  [key: string]: any; // image arrays
};

export default function PhotoGallery() {
  const categories = {
    TahrImage: [
      {
        id: 1,
        title: "Portrait",
        images: [
          "/gallery/nt-portrait/nilgiritahr-1.JPG",
          "/gallery/nt-portrait/nilgiritahr-18.jpg",
          "/gallery/nt-portrait/nilgiritahr-23.jpeg",
        ],
      },
      {
        id: 2,
        title: "Landcape",
        images: [
          "/gallery/nt-portrait/nilgiritahr-2.JPG",
          "/gallery/nt-portrait/nilgiritahr-3.JPG",
          "/gallery/nt-portrait/nilgiritahr-17.jpg",
          "/gallery/nt-portrait/nilgiritahr-16.JPG",
          "/gallery/nt-portrait/nilgiritahr-8.jpg",
          "/gallery/nt-portrait/nilgiritahr-7.jpg",
          "/gallery/nt-portrait/nilgiritahr-4.JPG",
          "/gallery/nt-portrait/nilgiritahr-3.JPG",
          "/gallery/nt-portrait/nilgiritahr-2.JPG",
          "/gallery/nt-portrait/nilgiritahr-19.jpg",
          "/gallery/nt-portrait/nilgiritahr-20.jpg",
          "/gallery/nt-portrait/nilgiritahr-21.jpeg",
          "/gallery/nt-portrait/nilgiritahr-24.jpeg",
          "/gallery/nt-portrait/nilgiritahr-25.png",
          "/gallery/nt-portrait/nilgiritahr-27.png",
          "/gallery/nt-portrait/nilgiritahr-30.jpeg",
          "/gallery/nt-portrait/nilgiritahr-34.jpeg",
          "/gallery/nt-portrait/nilgiritahr-38.jpeg",
        ],
      },
      {
        id: 3,
        title: "Mountain",
        images: [
          "/gallery/nt-portrait/nilgiritahr-14.JPG",
          "/gallery/nt-portrait/nilgiritahr-10.jpg",
          "/gallery/nt-portrait/nilgiritahr-9.jpg",
          "/gallery/nt-portrait/nilgiritahr-22.jpeg",
          "/gallery/nt-portrait/nilgiritahr-26.png",
          "/gallery/nt-portrait/nilgiritahr-28.jpeg",
          "/gallery/nt-portrait/nilgiritahr-29.jpeg",
          "/gallery/nt-portrait/nilgiritahr-35.jpeg",
        ],
      },
      {
        id: 4,
        title: "Herd",
        images: [
          "/gallery/nt-portrait/nilgiritahr-5.JPG",
          "/gallery/nt-portrait/nilgiritahr-15.JPG",
          "/gallery/nt-portrait/nilgiritahr-13.JPG",
          "/gallery/nt-portrait/nilgiritahr-5.JPG",
        ],
      },
      {
        id: 5,
        title: "Radio Collaring",
        images: [
          "/gallery/radio-collared/radiocollar-1.JPG",
          "/gallery/radio-collared/radiocollar-2.JPG",
          "/gallery/radio-collared/radiocollar-3.JPG",
          "/gallery/radio-collared/radiocollar-4.jpg",
          "/gallery/radio-collared/radiocollar-5.jpg",
          "/gallery/radio-collared/radiocollar-6.jpg",
          "/gallery/radio-collared/radiocollar-7.jpg",
        ],
      },
      {
        id: 6,
        title: "Love",
        images: [
          "/gallery/nt-portrait/nilgiritahr-31.jpeg",
          "/gallery/nt-portrait/nilgiritahr-32.jpeg",
          "/gallery/nt-portrait/nilgiritahr-33.jpeg",
          "/gallery/nt-portrait/nilgiritahr-36.jpeg",
          "/gallery/nt-portrait/nilgiritahr-37.jpeg",
        ],
      },
    ],
    Mission: [
      {
        id: 1,
        title: "Objectives of Project Nilgiri Tahr - AIWC",
        images: ["/gallery/Mission/aiwc.jpg"],
      },
      {
        id: 2,
        title: "stamp",
        images: ["/gallery/Mission/stamp.png"],
      },
      {
        id: 3,
        title: "Initiative",
        images: ["/gallery/Mission/initiative.jpeg"],
      },
      {
        id: 4,
        title: "Morphology",
        images: ["/gallery/Mission/morphology.jpg"],
      },
      {
        id: 5,
        title: "Uniqueness of Nilgiri Tahr",
        images: ["/gallery/Mission/uniqueness.jpg"],
      },
      {
        id: 6,
        title: "A3-Flyer Nilgiri Tahr",
        images: ["/gallery/Mission/A3-flyer.jpg"],
      },
    ],
    EcoSystem: [
      {
        id: 1,
        title: "Associate Flora",
        images: ["/gallery/Flora.JPG"],
      },
      {
        id: 2,
        title: "Associate Fauna",
        images: [
          "/gallery/associate-fauna/associate-fauna-1.JPG",
          "/gallery/associate-fauna/associate-fauna-2.JPG",
          "/gallery/associate-fauna/associate-fauna-3.JPG",
          "/gallery/associate-fauna/associate-fauna-4.JPG",
          "/gallery/associate-fauna/associate-fauna-5.JPG",
          "/gallery/associate-fauna/associate-fauna-6.JPG",
          "/gallery/associate-fauna/associate-fauna-7.JPG",
          "/gallery/associate-fauna/associate-fauna-8.JPG",
        ],
      },
      {
        id: 3,
        title: "Grass Diversity",
        images: ["/gallery/Grass.jpg"],
      },
      {
        id: 4,
        title: "Habitat Ecology",
        images: [
          "/gallery/HabitatEcology/HabitatEcology-1.png",
          "/gallery/HabitatEcology/HabitatEcology-2.jpg",
        ],
      },
      {
        id: 5,
        title: "Perspectives",
        images: ["/gallery/perspectives.png"],
      },
      {
        id: 6,
        title: "Strobilanthes",
        images: ["/gallery/slobiranthus.jpg"],
      },
    ],
    Portfolio: [
      {
        id: 1,
        title: "Biennial Survey",
        images: [
          "/gallery/Portfolio/BiennialSurvey/BS1.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS2.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS3.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS4.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS5.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS6.jpg",
        ],
      },
      {
        id: 2,
        title: "Awareness",
        images: [
          "/gallery/Portfolio/Awareness/C.M.S_HSS_SRIVILLIPUTHUR.jpg",
          "/gallery/Portfolio/Awareness/KODANTHUR.jpg",
          "/gallery/Portfolio/Awareness/PAPANASAM_SCHOOL.jpg",
          "/gallery/Portfolio/Awareness/PYKARA_SCHOOL.jpg",
          "/gallery/Portfolio/Awareness/S.L.B_HSS_NAGERKOYIL.jpg",
          "/gallery/Portfolio/Awareness/SHOLUR_SCHOOL.jpg",
        ],
      },
      {
        id: 3,
        title: "M-Stripes",
        images: [
          "/gallery/Portfolio/M-Stripes/ANAIMALAIYAGAM_M-STRIPE.jpg",
          "/gallery/Portfolio/M-Stripes/M-STRIPES_CAMERATRAP.jpg",
        ],
      },
      {
        id: 4,
        title: "Pilot Study",
        images: [
          "/gallery/Portfolio/PilotStudy/PS1.jpg",
          "/gallery/Portfolio/PilotStudy/PS2.jpg",
          "/gallery/Portfolio/PilotStudy/PS3.jpg",
          "/gallery/Portfolio/PilotStudy/PS4.jpg",
        ],
      },
      {
        id: 5,
        title: "Public Interaction",
        images: [
          "/gallery/Portfolio/PublicInteraction/CHINNAMAYILAR_KAANI_SETTLEMENT_VISIT-scaled.jpg",
          "/gallery/Portfolio/PublicInteraction/MUDHUVA_INTERACTION.jpg",
          "/gallery/Portfolio/PublicInteraction/NOCHOOODAI_TRIBALS_SMTR_MEET.jpg",
        ],
      },
      {
        id: 6,
        title: "Training",
        images: [
          "/gallery/Portfolio/Training/CAIRNHILL_TRAINING.jpg",
          "/gallery/Portfolio/Training/FEO_SRIVILLIPUTHUR.jpg",
          "/gallery/Portfolio/Training/MUNDANTHURAI_RANGE_OFFICE.jpg",
          "/gallery/Portfolio/Training/NAGERKOYIL_DFO-OFFICE.jpg",
        ],
      },
    ],
    Poster: [
      {
        id: 1,
        title: "Tahr Threats",
        images: ["/gallery/Poster/Threats.jpg"],
      },
      {
        id: 2,
        title: "Tahr Comparison",
        images: ["/gallery/Poster/Three-tahr.jpg"],
      },
      {
        id: 3,
        title: "Seasonal Adaption",
        images: ["/gallery/Poster/adaptation.jpg"],
      },
      {
        id: 4,
        title: "conservation",
        images: ["/gallery/Poster/conservation.jpg"],
      },
      {
        id: 5,
        title: "Challenges",
        images: ["/gallery/Poster/PNT-Challenges.jpg"],
      },
      {
        id: 6,
        title: "Ecology",
        images: ["/gallery/Poster/Habitat-Ecology.png"],
      },
    ],
    Celebration: [
      {
        id: 1,
        title: "Indigeneous Day",
        images: ["/gallery/celebration/Indigeneous/Indigeneous.jpg"],
      },
      {
        id: 2,
        title: "Elephant Day",
        images: [
          "/gallery/celebration/ElephantDay/Elephant-day-1.png",
          "/gallery/celebration/ElephantDay/Elephant-day-2.png",
          "/gallery/celebration/ElephantDay/Elephant-day-3.jpg",
          "/gallery/celebration/ElephantDay/Elephant-day-4.jpg",
        ],
      },
      {
        id: 3,
        title: "Book Fair",
        images: [
          "/gallery/celebration/BookFair/Book-fair-1.jpg",
          "/gallery/celebration/BookFair/Book-fair-2.png",
          "/gallery/celebration/BookFair/Book-fair-3.jpg",
          "/gallery/celebration/BookFair/Book-fair-4.jpg",
        ],
      },
      {
        id: 4,
        title: "Van Mahotsav",
        images: [
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-1.png",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-2.png",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-3.jpg",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-4.png",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-5.jpg",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-6.jpg",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-7.png",
        ],
      },
      {
        id: 5,
        title: "Environment Day",
        images: [
          "/gallery/celebration/EnvironmentDay/WED1.jpg",
          "/gallery/celebration/EnvironmentDay/WED2.jpg",
          "/gallery/celebration/EnvironmentDay/WED3.jpg",
          "/gallery/celebration/EnvironmentDay/WED4.jpg",
        ],
      },
      {
        id: 6,
        title: "Photography Day",
        images: [
          "/gallery/celebration/Photography/nilgiritahr-1.jpg",
          "/gallery/celebration/Photography/nilgiritahr-2.jpg",
          "/gallery/celebration/Photography/nilgiritahr-3.jpg",
          "/gallery/celebration/Photography/Photography-day.jpg",
        ],
      },
    ],
    Study: [
      {
        id: 1,
        title: "ExpertsMeet",
        images: [
          "/gallery/study/ExpertsMeet/ARUMBUGAL_TRUST_MEET.jpg",
          "/gallery/study/ExpertsMeet/TAHR-WATCHERS_MUDHUVA_MEET_FD.jpg",
          "/gallery/study/ExpertsMeet/VANNAPOORANI_VFC_MEET.jpg",
        ],
      },
      {
        id: 2,
        title: "Orientation",
        images: [
          "/gallery/study/Orientation/ATTAKATTY_ORIENTATION-1.jpg",
          "/gallery/study/Orientation/MAHARASHTRA_F.R.O_ORIENTATION.jpg",
        ],
      },
      {
        id: 3,
        title: "Honble ACS visit",
        images: ["/gallery/study/Honble_ACS_VISIT.jpg"],
      },
      {
        id: 4,
        title: "Students Visit",
        images: ["/gallery/study/STUDENTS_VISIT.jpg"],
      },
      {
        id: 5,
        title: "KEYSTONE visit",
        images: ["/gallery/study/KEYSTONE_FOUNDATION.jpg"],
      },
      {
        id: 6,
        title: "PilotMeet",
        images: ["/gallery/study/PILOT_METHODS.jpg"],
      },
    ],
    location: [
      {
        id: 1,
        title: "Mukurthi National Park",
        images: ["/gallery/location/Mukurthi.jpg"],
      },
      {
        id: 2,
        title: "Anamalai-Tiger-Reserve",
        images: ["/gallery/location/Anamalai.jpg"],
      },
      {
        id: 3,
        title: "Srivilliputhur-Megamalai Tiger Reserve",
        images: ["/gallery/location/Srivilliputhur-Megamalai.jpg"],
      },
      {
        id: 4,
        title: "Kalakkad Mundanthurai Tiger Reserve",
        images: ["/gallery/location/Kalakkad-Mundanthurai.jpg"],
      },
      {
        id: 5,
        title: "Pilot Study",
        images: ["/gallery/location/Pilot-Study.jpg"],
      },
      {
        id: 6,
        title: "Srivilliputhur-Megamalai Tiger Reserve",
        images: ["/gallery/location/Srivilliputhur-Megamalai.jpg"],
      },
    ],
  };

  const banners: Record<string, string> = {
    TahrImage: "/gallery/nt-portrait/nilgiritahr-15.JPG",
    Mission: "/gallery/Mission/aiwc.jpg",
    EcoSystem: "/gallery/associate-fauna/associate-fauna-2.JPG",
    Portfolio: "/gallery/Portfolio/BiennialSurvey/BS1.jpg",
    Poster: "/gallery/Poster/Threats.jpg",
    Celebration: "/gallery/celebration/EnvironmentDay/WED1.jpg",
    Study: "/gallery/study/STUDENTS_VISIT.jpg",
    location: "/gallery/location/Mukurthi.jpg",
  };

  const searchParams = useSearchParams();
  const initialCategory =
    (searchParams.get("category") as keyof typeof categories) || "TahrImage";

  const [activeCategory, setActiveCategory] =
    useState<keyof typeof categories>(initialCategory);

  const [activeSubId, setActiveSubId] = useState<number>(
    categories[initialCategory][0].id,
  );

  const [openCategory, setOpenCategory] = useState<
    keyof typeof categories | null
  >(activeCategory);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Handle window resize for responsive logic
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 1024;

  /* ================= SUB CATEGORY ================= */
  const subCategories = categories[activeCategory];

  useEffect(() => {
    setActiveSubId(subCategories[0].id);
  }, [activeCategory]);

  const activeSubCategory = useMemo(() => {
    return subCategories.find((s) => s.id === activeSubId);
  }, [subCategories, activeSubId]);

  const currentImages = activeSubCategory?.images ?? [];

  // Auto slide
  useEffect(() => {
    if (!isPlaying || !lightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % currentImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying, lightboxOpen, currentImages]);

  /* const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }; */

  /* const handleCategoryChange = (cat: keyof typeof categories) => {
    setActiveCategory(cat);
    setIsMenuOpen(false);
  }; */

  /*  useEffect(() => {
    const cat = searchParams.get("category") as keyof typeof categories;
    if (cat && categories[cat]) {
      setActiveCategory(cat);
    }
  }, [searchParams]); */

  return (
    <>
      {/* Banner Section */}
      <motion.div
        className={styles.banner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "80vh",
          marginTop: "100px",
        }}
      >
        <motion.img
          key={activeCategory} // Important for smooth transitions when switching
          src={banners[activeCategory]}
          alt={`${activeCategory} banner`}
          className={styles.bannerImage}
          initial={{ scale: 1.1, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: 0.2,
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 10,
            color: "white",
          }}
        >
          <motion.h1
            key={activeCategory}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: "800",
              margin: "0",
              fontFamily: "Poppins, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            {activeCategory}
          </motion.h1>
        </div>
      </motion.div>

      {/* Mobile Menu Bar (below banner) */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            backgroundColor: "#f4f4f4",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "1.2rem",
              color: "#1b4332",
              margin: 0,
            }}
          >
            {activeCategory}
          </h3>
          <MenuButton onClick={() => setIsMenuOpen(true)} variant="compact" />
        </div>
      )}

      {/* Gallery Section */}
      <motion.div
        className={styles.galleryContainer}
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isMenuOpen ? 120 : 0, // slide down when menu opens
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
      >
        <motion.div
          className={styles.galleryInner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sidebar for large screens */}
          {!isMobile && (
            <div className={styles.sidebar}>
              <h3>Categories</h3>
              <div className={styles.categoryList}>
                {Object.entries(categories).map(([cat, subs]) => {
                  const isOpen = openCategory === cat;

                  return (
                    <div key={cat}>
                      {/* MAIN CATEGORY */}
                      <div
                        className={`${styles.mainCategory} ${
                          activeCategory === cat ? styles.activeMain : ""
                        }`}
                        onClick={() => {
                          setOpenCategory(
                            isOpen ? null : (cat as keyof typeof categories),
                          );
                          setActiveCategory(cat as keyof typeof categories);
                        }}
                      >
                        {cat}
                        <span className={styles.arrow}>
                          {isOpen ? "▲" : "▼"}
                        </span>
                      </div>

                      {/* SUB CATEGORIES */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className={styles.subCategoryList}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {subs.map((sub) => (
                              <div
                                key={sub.id}
                                className={`${styles.subCategory} ${
                                  activeSubId === sub.id ? styles.activeSub : ""
                                }`}
                                onClick={() => setActiveSubId(sub.id)}
                              >
                                {sub.title}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Image Grid */}
          <div className={styles.imageArea}>
            <motion.h2
              className={styles.categoryTitle}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategory}
              <span style={{ opacity: 0.6, margin: "0 8px" }}>›</span>
              <motion.span
                key={activeSubId}
                className={styles.categoryTitle}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeSubCategory?.title}
              </motion.span>
            </motion.h2>

            <motion.div
              layout
              className={styles.imageGrid}
              transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
            >
              {currentImages.map((img: string, index: number) => (
                <motion.div
                  key={index}
                  className={styles.imageCard}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  onClick={() => {
                    setCurrentIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={img}
                    alt={`${activeCategory} ${index}`}
                    width={300}
                    height={300}
                    className={styles.galleryImage}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                className={styles.lightbox}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Controls */}
                <div className={styles.lightboxControls}>
                  <button onClick={() => setIsPlaying((prev) => !prev)}>
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}>
                    Zoom In
                  </button>
                  <button onClick={() => setZoom((z) => Math.max(z - 0.2, 1))}>
                    Zoom Out
                  </button>
                  <button onClick={() => setLightboxOpen(false)}>Close</button>
                </div>

                {/* Image */}
                <div className={styles.lightboxImageWrapper}>
                  <motion.img
                    key={currentIndex}
                    src={currentImages[currentIndex]}
                    alt="lightbox"
                    className={styles.lightboxImage}
                    style={{ transform: `scale(${zoom})` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Menu Overlay for Mobile */}
      {isMobile && (
        <MenuOverlay
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          categories={categories}
          onSelect={(cat, subId) => {
            setActiveCategory(cat as keyof typeof categories);
            setActiveSubId(subId);
          }}
        />
      )}
    </>
  );
}
