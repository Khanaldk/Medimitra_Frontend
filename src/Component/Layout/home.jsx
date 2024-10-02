import React from "react";
import Navbar from "./Navbar";
import Service from "./Services";
import Footer from "./Footer";
import { CgEnter } from "react-icons/cg";

const Home = () => {
  const backgroundImage =
    "https://www.sutterhealth.org/images/health-topics/pregnancy/pediatrician-with-baby-600x300.jpg";
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div id="home">
      <Navbar />

      {/* Hero Section */}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={backgroundStyle}
      >
        <div className="text-center">
          <h1 className="font-bold text-3xl mb-4 text-blue-800">
            Welcome to MediMitra
          </h1>
          <h2>Your trusted partner in healthcare</h2>
        </div>
      </div>

      {/* Services Section */}
      <div id="servicesSection">
        <Service />
      </div>

      <br />

      {/* Footer Section */}
      <div id="footerSection">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
