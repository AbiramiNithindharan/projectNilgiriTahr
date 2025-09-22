"use client";

import { useState } from "react";
import Header from "../../components/Header/Header";
import WhatWeDoBanner from "../../components/WhatWeDoBanner/WhatWeDoBanner";

import WhatWeDoCards from "../../components/WhatWeDoCards/WhatWeDoCards";
import styles from "./page.module.css";

export default function WhatWeDoPage() {
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
      <WhatWeDoBanner onAnimationComplete={handleBannerAnimationComplete} />

      <WhatWeDoCards />
    </div>
  );
}
