import React, { useEffect, useState } from "react";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-scroll";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition duration-300 ${
        isScrolled ? "bg-opacity-100" : "bg-opacity-60"
      } bg-[#000] text-white`}
    >
      <div className="container mx-auto flex justify-between items-center py-5 px-8">
        <div className="text-2xl font-bold "></div>
        <div className="hidden md:flex space-x-7">
          <Link
            activeClass="text-red-400 "
            to="home"
            smooth={true}
            duration={500}
            spy={true}
            offset={-20}
            className="cursor-pointer hover:text-red-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            activeClass="text-red-400 "
            to="skills"
            smooth={true}
            duration={500}
            spy={true}
            offset={-20}
            className="cursor-pointer hover:text-red-400 transition-colors duration-300"
          >
            Skills
          </Link>

          <Link
            activeClass="text-red-400 "
            to="project"
            smooth={true}
            duration={500}
            spy={true}
            offset={-30}
            className="cursor-pointer hover:text-red-400 transition-colors duration-300"
          >
            Projects
          </Link>
          <Link
            activeClass="text-red-400 "
            to="resume"
            smooth={true}
            duration={500}
            spy={true}
            offset={-30}
            className="cursor-pointer hover:text-red-400 transition-colors duration-300"
          >
            Resume
          </Link>
          <Link
            activeClass="text-red-400 "
            to="contact"
            smooth={true}
            duration={500}
            spy={true}
            className="cursor-pointer hover:text-red-400 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 py-4 px-5">
            <Link
              activeClass="text-red-400 "
              onClick={toggleMenu}
              to="home"
              smooth={true}
              duration={500}
              spy={true}
              className="cursor-pointer hover:text-red-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              activeClass="text-red-400 "
              onClick={toggleMenu}
              to="skills"
              smooth={true}
              duration={500}
              spy={true}
              className="cursor-pointer hover:text-red-400 transition-colors duration-300"
            >
              Skills
            </Link>

            <Link
              activeClass="text-red-400 "
              onClick={toggleMenu}
              to="project"
              smooth={true}
              duration={500}
              spy={true}
              className="cursor-pointer hover:text-red-400 transition-colors duration-300"
            >
              Projects
            </Link>
            <Link
              activeClass="text-red-400 "
              to="resume"
              smooth={true}
              duration={500}
              spy={true}
              offset={-30}
              className="cursor-pointer hover:text-red-400 transition-colors duration-300"
            >
              Resume
            </Link>
            <Link
              activeClass="text-red-400 "
              onClick={toggleMenu}
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              className="cursor-pointer hover:text-red-400 transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
