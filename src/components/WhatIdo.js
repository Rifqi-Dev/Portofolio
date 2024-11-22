import Aos from "aos";
import "aos/dist/aos.css";
import frontEndLogo from "../resources/frontend.svg";
import backendLogo from "../resources/backend.svg";
import databaseLogo from "../resources/database.svg";
import apiLogo from "../resources/api-documentation.svg";
import stoplightLogo from "../resources/StoplightLogo.svg";

Aos.init({ duration: 1500 });

const Card = ({ title, text, icon, techStack }) => {
  return (
    <div className=" rounded-md bg-red-700 bg-opacity-10 p-5 hover:bg-opacity-20 hover:scale-105 cursor-pointer select-none h-full  hover:transition-all z-10">
      <div className="card-header font-poppins font-bold text-xl mb-3">
        {title}
      </div>
      <div className="card-body font-poppins font-light text-sm grid grid-cols-70/30 w-100">
        <p>{text}</p>
        <img
          loading="lazy"
          src={icon}
          alt={title}
          className="h-[80px] fill-white m-auto"
        ></img>
      </div>
      {techStack?.length > 0 && (
        <div className="mt-5">
          <p className=" font-semibold text-[14px]">Tech Stack</p>
          <div className="flex gap-1 m-1 flex-wrap items-center">
            {techStack.map((url, i) => (
              <img
                loading="lazy"
                key={i}
                src={url}
                alt="badge"
                className=" max-h-[30px] h-full hover:scale-105 hover:transition-all"
              ></img>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function WhatIdo() {
  return (
    <div className="relative px-5 lg:px-32 md:px-9 pb-20">
      <h3 className="text-center font-poppins text-[36px] font-bold mt-10 mb-5">
        Skills & Services
      </h3>
      <div
        // data-aos="zoom-in"
        className="card-container p-5 mt-5 md:mt-10 grid md:grid-cols-2 gap-4 md:max-w-3xl w-full m-auto"
      >
        <Card
          title="Frontend Development"
          text="Implementing design mockups provided by UI/UX designers to create visually appealing layouts"
          icon={frontEndLogo}
          techStack={[
            "https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=FFF",
            "https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=FFF",
            "https://img.shields.io/badge/tailwindcss-06B6D4?logo=tailwindcss&logoColor=FFF",
            "https://img.shields.io/badge/SASS-CC6699?logo=sass&logoColor=FFF",
            "https://img.shields.io/badge/JAVASCRIPT-323330?logo=javascript",
            "https://img.shields.io/badge/TYPESCRIPT-3178C6?logo=typescript&logoColor=FFF",
            "https://img.shields.io/badge/ANGULAR-0F0F11?logo=angular",
            "https://img.shields.io/badge/REACT-1a2c3c?logo=react",
            "https://img.shields.io/badge/Next-000000?logo=Next.js&logoColor=fff",
          ]}
        />
        <Card
          title="Backend Development"
          text="Writing server-side code to handle HTTP requests, perform data validation, and execute business logic"
          icon={backendLogo}
          techStack={[
            "https://img.shields.io/badge/NODE.JS-5FA04E?logo=node.js&logoColor=fff",
            "https://img.shields.io/badge/BUN-000?logo=bun",
            "https://img.shields.io/badge/PYTHON-3776AB?logo=python&logoColor=fff",
            "https://img.shields.io/badge/EXPRESS.JS-000000?logo=express",
            "https://elysiajs.com/assets/elysia_v.webp",
            "https://img.shields.io/badge/Hono-E36002?logo=hono&logoColor=FFFFFF",
            "https://img.shields.io/badge/FLASK-000?logo=flask",
            "https://img.shields.io/badge/DOCKER-2496ED?logo=docker&logoColor=fff",
          ]}
        />
        <Card
          title="API Documentation"
          text="Documenting the endpoints, request methods, request parameters, response formats, and error codes for each API"
          icon={apiLogo}
          techStack={[stoplightLogo]}
        />

        <Card
          title="Database Management"
          text="Designing database schemas and defining data models based on application requirements"
          icon={databaseLogo}
          techStack={[
            "https://img.shields.io/badge/MYSQL-4479A1?logo=mysql&logoColor=fff",
            "https://img.shields.io/badge/POSTGRESQL-4169E1?logo=postgresql&logoColor=fff",
            "https://img.shields.io/badge/MONGODB-47A248?logo=mongodb&logoColor=fff",
            "https://img.shields.io/badge/Redis-FF4438?logo=redis&logoColor=fff",
            "https://img.shields.io/badge/Sequelize-52B0E7?logo=Sequelize&logoColor=fff",
            "https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff",
          ]}
        />
      </div>
    </div>
  );
}

export default WhatIdo;
