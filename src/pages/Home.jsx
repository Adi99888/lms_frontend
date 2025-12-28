import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import HomeCourses from "../components/HomeCourses";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <HomeCourses />
      <Testimonial />
      <Footer />

    </>
  );
};

export default Home;
