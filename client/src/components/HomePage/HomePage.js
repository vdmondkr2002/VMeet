import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Description from "./Description/Description.js";
import Feature from "./Feature/Feature.js";
import AboutUs from "./AboutUs/AboutUs.js";
import Testimonals from "./Testimonals/Testimonals.js";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Description />
      {/* <Feature /> */}
      <AboutUs />
      <Testimonals />
      <Footer />
    </>
  );
};

export default HomePage;
