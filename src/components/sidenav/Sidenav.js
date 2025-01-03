import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCode,
  faEnvelope,
  faFileAlt,
  faGear,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
function Sidenav() {
  return (
    <>
      <nav className="z-10 md:w-14 w-full  p-2 ">
        <div className="shrink-0  flex  md:flex-col items-center justify-evenly md:justify-start gap-5 bg-white bg-opacity-5 px-5 py-2 rounded-lg h-full">
          <NavLink
            data-tooltip-id="home-tooltip"
            to="/"
            className="text-white hover:cursor-pointer hover:text-red-400"
          >
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>
          <ReactTooltip id="home-tooltip" place="right" content="Home" />

          <NavLink
            data-tooltip-id="skill-tooltip"
            to="/skill"
            className="text-white hover:cursor-pointer hover:text-red-400"
          >
            <FontAwesomeIcon icon={faGear} />
            <ReactTooltip id="skill-tooltip" place="right" content="Skills" />
          </NavLink>

          <NavLink
            data-tooltip-id="project-tooltip"
            to="/project"
            className="text-white hover:cursor-pointer hover:text-red-400"
          >
            <FontAwesomeIcon icon={faBriefcase} />
            <ReactTooltip
              id="project-tooltip"
              place="right"
              content="Project"
            />
          </NavLink>

          <NavLink
            data-tooltip-id="resume-tooltip"
            to="/resume"
            className="text-white hover:cursor-pointer hover:text-red-400"
          >
            <FontAwesomeIcon icon={faFileAlt} />
            <ReactTooltip id="resume-tooltip" place="right" content="Resume" />
          </NavLink>

          {/* <NavLink
            data-tooltip-id="code-editor-tooltip"
            to="/online-js-compiler"
            className="text-white hover:cursor-pointer hover:text-red-400"
          >
            <FontAwesomeIcon icon={faCode} />
            <ReactTooltip
              id="code-editor-tooltip"
              place="right"
              content="Online Javascript Compiler"
            />
          </NavLink> */}

          <NavLink
            data-tooltip-id="contact-tooltip"
            to="/contact"
            className="text-white hover:cursor-pointer hover:text-red-400"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <ReactTooltip
              id="contact-tooltip"
              place="right"
              content="Contact"
            />
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Sidenav;
