"use client"
import { useState } from 'react';
import LogoImage from '../assets/icons/logo.svg';
import MenuIcon from '../assets/icons/menu.svg';
import CloseIcon from '../assets/icons/close.svg';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white">
      <div className="px-4">
        <div className="container bg-white">
          <div className="py-4 flex items-center justify-between">
            {/* Logo Section */}
            <div className="relative">
              <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F7AABE,#B57CEC,#E472D1)] blur-md"></div>
              <LogoImage className="h-12 w-12 relative mt-1" />
            </div>

            {/* Mobile Menu Icon */}
            <div
              className="border border-black border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden cursor-pointer"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <CloseIcon className="text-black" /> : <MenuIcon className="text-black" />}
            </div>

            {/* Navigation Links */}
            <nav
              className={`${
                isMenuOpen ? 'flex' : 'hidden'
              } sm:flex flex-col sm:flex-row gap-6 items-center text-black absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent z-10 sm:z-auto p-4 sm:p-0`}
            >
              <a
                href="#"
                className="text-opacity-60 text-black hover:text-opacity-100 transition"
              >
                About
              </a>
              <a
                href="#"
                className="text-opacity-60 text-black hover:text-opacity-100 transition"
              >
                Features
              </a>
              <a
                href="#"
                className="text-opacity-60 text-black hover:text-opacity-100 transition"
              >
                Updates
              </a>
              <a
                href="#"
                className="text-opacity-60 text-black hover:text-opacity-100 transition"
              >
                Help
              </a>
              <a
                href="#"
                className="text-opacity-60 text-black hover:text-opacity-100 transition"
              >
                Customers
              </a>
              <button className="bg-black py-2 px-4 rounded-lg text-white">
                Ride for free
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
