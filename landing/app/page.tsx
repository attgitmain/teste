"use client";

import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Plans from "./components/Plans";
import Functionalities from "./components/Functionalities";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Plans />
      <Functionalities />
      <CTA />
      <Footer />
    </>
  );
}
