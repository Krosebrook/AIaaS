import React from 'react';

import ScrollIndicator from '@/components/ScrollIndicator';

import Header from '@/components/Header';

import LandingContent from '@/components/LandingContent';

import Footer from '@/components/Footer';

import ChatWidget from '@/components/ChatWidget';


const Home = () => {
  return (
    <>

      <ScrollIndicator />

      <Header />

      <LandingContent />

      <Footer />

      <ChatWidget />

    </>
  );
};

export default Home;