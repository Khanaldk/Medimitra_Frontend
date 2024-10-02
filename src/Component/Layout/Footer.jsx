import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-scroll";
import navlogo from "/Users/bhair/7th Sem/Medi-mitra/src/assets/navlogo.jpg";

const Footer = () => {
  return (
    <div
      id="footer"
      className="flex justify-between bg-slate-300 py-8 px-10 mt-6"
    >
      <div className="w-1/3">
        {/* <h2 className="text-xl font-bold mb-2">MediMitra</h2> */}
        <img
          className="rounded-[1rem] mb-2"
          src={navlogo}
          alt="logo"
          width={60}
        />
        <p>
          MediMitra is a healthcare platform that helps parents manage their
          child's vaccination schedule.
        </p>
      </div>

      {/* Quick Links */}
      <div className="w-1/3 px-10">
        <h2 className="text-xl font-bold mb-2">Quick Links</h2>
        <ul>
          <li>
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="hover:underline cursor-pointer"
            >
              Home
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="servicesSection"
              smooth={true}
              duration={500}
              className="hover:underline cursor-pointer"
            >
              Services
            </Link>
          </li>
          <li className="hover:underline cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="w-1/3 px-10">
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <ul>
          <li>Phone: 9800000000</li>
          <li className="py-2">
            Email:{" "}
            <a
              href="mailto:medimitra1995@gmail.com"
              className="text-red-500 hover:underline"
            >
              medimitra1995@gmail.com
            </a>
          </li>
          <li>
            <a href="" className="flex text-red-600">
              <FaFacebook className="m-2" />
              <FaInstagramSquare className="m-2" />
              <FaYoutube className="m-2" />
              <FaTwitter className="m-2" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
