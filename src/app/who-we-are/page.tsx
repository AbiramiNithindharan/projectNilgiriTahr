"use client";

import { useState } from "react";
import Header from "../../components/Header/Header";
import WhoWeAreBanner from "../../components/WhoWeAreBanner/WhoWeAreBanner";
import WhoWeAreCards from "../../components/WhoWeAreCards/WhoWeAreCards";
import TeamMembers from "../../components/TeamMembers/TeamMembers";
import styles from "./page.module.css";

export default function WhoWeArePage() {
  const [showHeader, setShowHeader] = useState(false);

  const handleMenuClick = () => {
    console.log("Menu clicked!");
  };

  const handleContactClick = () => {
    console.log("Contact Us clicked!");
  };

  const handleBannerAnimationComplete = () => {
    setShowHeader(true);
  };

  return (
    <div className={styles.container}>
      <Header
        onMenuClick={handleMenuClick}
        onContactClick={handleContactClick}
        isVisible={showHeader}
      />
      <WhoWeAreBanner onAnimationComplete={handleBannerAnimationComplete} />
      <WhoWeAreCards />
      <TeamMembers />
    </div>
  );
}
