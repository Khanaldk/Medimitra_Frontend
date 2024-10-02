import React from "react";
import { Link } from "react-scroll"; // Importing from react-scroll
import { Link as RouterLink } from "react-router-dom"; // Importing for routing
import navlogo from "/Users/bhair/7th Sem/Medi-mitra/src/assets/navlogo.jpg";

const Navbar = () => {
  return (
    <div>
      <nav className="w-full shadow-lg py-3">
        <div className="flex justify-between mx-auto items-center max-w-screen-xl px-6">
          <div>
            <RouterLink to="/">
              <img src={navlogo} alt="logo" width={60} />
            </RouterLink>
            {/* <h2 className='navbar-brand font-bold italic text-3xl'>Medi-mitra</h2> */}
          </div>

          <div className="list">
            <ul className="flex space-x-6 px-6">
              {/* Links for routing */}
              <li>
                <RouterLink to="/">Home</RouterLink>
              </li>

              {/* Smooth scroll link for services section */}
              <li>
                <Link to="servicesSection" smooth={true} duration={500}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="footer" smooth={true} duration={500}>
                  Contact
                </Link>
              </li>
              <li className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                <RouterLink to="/signup">Signup</RouterLink>
              </li>
              <li className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                <RouterLink to="/login">Login</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
