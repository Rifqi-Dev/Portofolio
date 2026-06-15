import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { to: "home", label: "Home" },
  { to: "skills", label: "Skills" },
  { to: "experience", label: "Experience" },
  { to: "projects", label: "Projects" },
  { to: "contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 font-poppins transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-sm shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end items-center">
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                spy={true}
                smooth={true}
                duration={800}
                offset={-70}
                className="text-white/80 text-sm cursor-pointer hover:text-red-400 transition-colors duration-200"
                activeClass="text-red-400 border-b border-red-500 pb-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm px-6 pb-6 border-t border-white/10">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  spy={true}
                  smooth={true}
                  duration={800}
                  offset={-70}
                  className="text-white/80 text-sm cursor-pointer hover:text-red-400 transition-colors duration-200 block py-1"
                  activeClass="text-red-400"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
