import React from "react";

const mock = {
  about:
    "Passionate developer with strong skill in programming and problem solving. A fast learner with a strong ability to learn new concepts quickly, both independently and as part of a collaborative team. Staying up-to-date with industry trends and best practices to continuously enhance skills.",
};

function About() {
  return (
    <div
      className="p-8  rounded-md bg-red-700 bg-opacity-20 text-white z-10"
      id="about-me"
    >
      <h3 className="font-montserrat text-3xl font-semibold">About Me</h3>
      <p className="mt-5 font-helvetica text-justify text-base font-normal">
        {mock.about}
      </p>
    </div>
  );
}

export default About;
