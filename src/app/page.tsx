"use client";

import { useState } from 'react';
import Header from '../components/Header/Header';
import Banner from '../components/Banner/Banner';
import Section1 from '../components/Section1/Section1';
import styles from './page.module.css';

export default function Home() {
  const [showHeader, setShowHeader] = useState(false);

  const handleMenuClick = () => {
    console.log('Menu clicked!');
    // Add your menu functionality here
  };

  const handleContactClick = () => {
    console.log('Contact Us clicked!');
    // Add your contact functionality here
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
      <Banner 
        imageSrc="/banners/DJI_0036.jpg"
        onAnimationComplete={handleBannerAnimationComplete}
      />
      <Section1 />
    </div>
  );
}
