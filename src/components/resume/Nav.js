import {
  faAddressCard,
  faBriefcase,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Nav({ state, setState }) {
  return (
    <header className="rounded-md bg-red-700 bg-opacity-20 w-full h-fit flex md:flex-col justify-evenly md:justify-normal md:sticky md:top-20">
      <button
        className={`text-left flex md:flex-row flex-col-reverse justify-between  items-center py-3 px-4 bg-red-700 bg-opacity-0 hover:bg-opacity-10 ${
          state === "about" && "bg-opacity-10"
        }`}
        onClick={() => {
          setState("about");
        }}
      >
        <span>About</span>
        <FontAwesomeIcon icon={faAddressCard} />
      </button>
      <button
        className={`text-left flex md:flex-row flex-col-reverse justify-between  items-center py-3 px-4 bg-red-700 bg-opacity-0 hover:bg-opacity-10 ${
          state === "work" && "bg-opacity-10"
        }`}
        onClick={() => {
          setState("work");
        }}
      >
        <span>Work</span>
        <FontAwesomeIcon icon={faBriefcase} />
      </button>
      <button
        className={`text-left flex md:flex-row flex-col-reverse justify-between  items-center py-3 px-4 bg-red-700 bg-opacity-0 hover:bg-opacity-10 ${
          state === "education" && "bg-opacity-10"
        }`}
        onClick={() => {
          setState("education");
        }}
      >
        <span>Education</span>
        <FontAwesomeIcon icon={faSchool} />
      </button>
    </header>
  );
}

export default Nav;
