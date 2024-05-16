import Aos from "aos";
import "aos/dist/aos.css";
Aos.init({ duration: 1500 });

const Card = ({ title, text }) => {
  return (
    <div className=" rounded-md bg-red-700 bg-opacity-10 p-5 hover:bg-opacity-20 hover:scale-105 cursor-pointer select-none">
      <div className="card-header font-poppins font-bold text-xl mb-3">
        {title}
      </div>
      <div className="card-body font-poppins font-light text-sm">
        <p>{text}</p>
      </div>
    </div>
  );
};

function WhatIdo() {
  return (
    <div className="flex flex-col items-center min-h-screen m-auto">
      <h3 className="text-center font-poppins text-[36px] font-bold">
        Skills & Services
      </h3>
      <div
        // data-aos="zoom-in"
        className="card-container p-5 mt-5 md:mt-20 grid md:grid-cols-2 gap-4 md:max-w-3xl w-full"
      >
        <Card
          title="Frontend Development"
          text="Implementing design mockups provided by UI/UX designers to create visually appealing layouts"
        />
        <Card
          title="Backend Development"
          text="Writing server-side code to handle HTTP requests, perform data validation, and execute business logic"
        />
        <Card
          title="API Documentation"
          text="Documenting the endpoints, request methods, request parameters, response formats, and error codes for each API"
        />

        <Card
          title="Database Management"
          text="Designing database schemas and defining data models based on application requirements"
        />
      </div>
    </div>
  );
}

export default WhatIdo;
