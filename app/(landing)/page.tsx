import Content from "@/components/Content";
import Hero from "@/components/Hero";
import LandingNav from "@/components/LandingNav";
import Slider from "@/components/Slider";

import React from "react";

const LandingPage = () => {
  return (
    <section className="">
      <LandingNav />
      <Hero />
      <Slider />
      <Content />
    </section>
  );
};

export default LandingPage;
