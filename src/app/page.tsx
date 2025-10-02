"use client";

import { useState } from "react";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import WhoWeAre from "../components/WhoWeAre/WhoWeAre";
import WhatWeDo from "../components/WhatWeDo/WhatWeDo";
import MissionVisionVictories from "../components/MissionVisionVictories/MissionVisionVictories";
import WhereWeWork from "../components/WhereWeWork/WhereWeWork";
import NewsRoom from "../components/NewsRoom/NewsRoom";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

export default function Home() {
  const [showHeader, setShowHeader] = useState(false);

  const handleMenuClick = () => console.log("Menu clicked!");
  const handleContactClick = () => console.log("Contact Us clicked!");

  const handleBannerAnimationComplete = () => {
    setShowHeader(true); // ✅ reveal header only after banner
  };

  return (
    <div className={styles.container}>
      <Header
        onMenuClick={handleMenuClick}
        onContactClick={handleContactClick}
        isVisible={showHeader}
      />
      <Banner
        imageSrc="/banners/final-banner-image.jpg"
        onAnimationComplete={handleBannerAnimationComplete}
      />
      <MissionVisionVictories />
      <WhoWeAre />
      <WhatWeDo />
      <WhereWeWork />
      <NewsRoom />
      <PhotoGallery />
      <Footer />
    </div>
  );
}
