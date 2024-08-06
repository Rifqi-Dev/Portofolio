import React from "react";
import underConstruction from "../../resources/underConstruction.gif";

function Education() {
  return (
    <div
      className="p-8  rounded-md bg-red-700 bg-opacity-20 text-white z-10"
      id="education"
    >
      <h3 className="font-montserrat text-3xl font-semibold">Education</h3>
      <p className="mt-5 font-helvetica text-justify text-base font-normal">
        Education Works
      </p>
      <img
        src={underConstruction}
        alt="under-construction"
        className="rounded-xl"
      ></img>
    </div>
  );
}

export default Education;
