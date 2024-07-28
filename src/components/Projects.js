import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Projects() {
  return (
    <div className="relative px-5 lg:px-32 md:px-9">
      <h3 className="text-center font-poppins text-[36px] font-bold pt-[65px] mb-5">
        My Projects
      </h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 justify-arround mt-10 ">
        <div className="relative  rounded-lg overflow-hidden mx-auto md:m-0">
          <img
            loading="lazy"
            className="w-full transition-transform duration-300 transform hover:scale-105"
            src="https://api.screenshotmachine.com?key=67285c&url=robotik.pkm.unp.ac.id/&dimension=1024x600"
            alt="app-screenshot"
          />
          <a
            href="http://robotik.pkm.unp.ac.id"
            target="__blank"
            className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 cursor-pointer flex gap-2 items-center justify-center text-white text-lg"
          >
            http://robotik.pkm.unp.ac.id{" "}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </div>
        <div className="relative   rounded-lg overflow-hidden mx-auto md:m-0">
          <img
            loading="lazy"
            className="w-full transition-transform duration-300 transform hover:scale-105"
            src="https://api.screenshotmachine.com?key=67285c&url=sunshine.onindonesia.id&dimension=1024x600"
            alt="app-screenshot"
          />
          <a
            href="https://sunshine.onindonesia.id"
            target="__blank"
            className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 cursor-pointer flex gap-2 items-center justify-center text-white text-lg"
          >
            https://sunshine.onindonesia.id{" "}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </div>
        <div className="relative   rounded-lg overflow-hidden mx-auto md:m-0">
          <img
            loading="lazy"
            className="w-full transition-transform duration-300 transform hover:scale-105"
            src="https://api.screenshotmachine.com?key=67285c&url=onmarket.id&dimension=1024x600"
            alt="app-screenshot"
          />
          <a
            href="https://onmarket.id"
            target="__blank"
            className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 cursor-pointer flex gap-2 items-center justify-center text-white text-lg"
          >
            https://onmarket.id{" "}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </div>
        <div className="relative   rounded-lg overflow-hidden mx-auto md:m-0">
          <img
            loading="lazy"
            className="w-full transition-transform duration-300 transform hover:scale-105"
            src="https://api.screenshotmachine.com?key=67285c&url=seller.onmarket.id&dimension=1024x600"
            alt="app-screenshot"
          />
          <a
            href="https://seller.onmarket.id"
            target="__blank"
            className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 cursor-pointer flex gap-2 items-center justify-center text-white text-lg"
          >
            https://seller.onmarket.id{" "}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </div>
        <div className="relative    rounded-lg overflow-hidden mx-auto md:m-0">
          <img
            loading="lazy"
            className="w-full transition-transform duration-300 transform hover:scale-105"
            src="https://api.screenshotmachine.com?key=67285c&url=admin.onmarket.id&dimension=1024x600"
            alt="app-screenshot"
          />
          <a
            href="https://admin.onmarket.id"
            target="__blank"
            className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 cursor-pointer flex gap-2 items-center justify-center text-white text-lg"
          >
            https://admin.onmarket.id{" "}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Projects;
