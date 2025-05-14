import React from "react";
import dayjs from "dayjs";

const data = [
  {
    companyName: "PT. Ondel Teknologi Indonesia",
    location: "Jakarta Utara",
    type: "Contract",
    jobTitle: "Fullstack Developer",
    from: dayjs("2023-08-14"),
    to: dayjs("2025-05-16"),
    responsibility: [
      "Collaborated with cross-functional teams to gather and analyze project requirements, translating them into technical specifications and actionable development plans.",
      "Designed and developed responsive and user-friendly web interfaces using HTML, CSS, and JavaScript, ensuring optimal user experiences across various devices and browsers.",
      "Created and maintained RESTful APIs and back-end systems using expressJs, optimizing data retrieval, storage, and processing for efficiency.",
      "Implemented security best practices, including authentication and authorization mechanisms, to safeguard user data and system resources.",
      "Integrated third-party APIs and services to extend the functionality of web applications and improve user experiences.",
      "Managed version control with Git, using branches and pull requests for collaborative development.",
      "Utilized agile methodologies, such as Scrum, to plan and prioritize tasks, ensuring on-time project delivery. Maintained thorough documentation for projects, including technical specifications, user manuals, and change logs.",
      "Stayed up-to-date with industry trends and emerging technologies, participating in continuous learning and knowledge-sharing with the team.",
    ],
    techStack: [
      "https://img.shields.io/badge/ANGULAR-0F0F11?logo=angular",
      "https://img.shields.io/badge/SASS-CC6699?logo=sass&logoColor=FFF",
      "https://img.shields.io/badge/JAVASCRIPT-323330?logo=javascript",
      "https://img.shields.io/badge/TYPESCRIPT-3178C6?logo=typescript&logoColor=FFF",
      "https://img.shields.io/badge/NODE.JS-5FA04E?logo=node.js&logoColor=fff",
      "https://img.shields.io/badge/EXPRESS.JS-000000?logo=express",
      "https://img.shields.io/badge/SOCKET.IO-fff?logo=socket.io&logoColor=000",
      "https://img.shields.io/badge/POSTMAN-ff4438?logo=postman&logoColor=fff",
      "https://img.shields.io/badge/POSTGRESQL-4169E1?logo=postgresql&logoColor=fff",
      "https://img.shields.io/badge/MONGODB-47A248?logo=mongodb&logoColor=fff",
      "https://img.shields.io/badge/REDIS-ff4438?logo=redis&logoColor=fff",
      "https://img.shields.io/badge/GIT-ff4438?logo=git&logoColor=fff",
      "https://img.shields.io/badge/GITHUB-fff?logo=github&logoColor=000",
      "https://img.shields.io/badge/JIRA-357DE8?logo=jira&logoColor=fff",
    ],
  },
];

function Work() {
  const now = dayjs();
  return (
    <div
      className="p-8  rounded-md bg-red-700 bg-opacity-20 text-white z-10"
      id="work"
    >
      <h3 className="font-poppins text-3xl font-semibold">
        Working Experience
      </h3>
      <div className="relative text-white mt-12">
        {data.map((item, index) => (
          <div key={index} className="mb-8 ">
            <h4 className=" font-poppins text-xl font-semibold">
              {item.jobTitle}
            </h4>
            <h5 className=" font-poppins ">
              {item.companyName}, {item.location} ({item.type})
            </h5>
            <h6 className="font-poppins text-gray-400 text-sm">
              {item.from.format("MMM YYYY")} -{" "}
              {item.to ? item.to.format("MMM YYYY") : "Present"} (
              {item.to
                ? item.to.diff(item.from, "y") +
                  " years " +
                  (item.to.diff(item.from, "M") % 12) +
                  " months"
                : `${now.diff(item.from, "y")} year${
                    now.diff(item.from, "y") > 1 ? "s" : ""
                  } ${now.diff(item.from, "M") % 12} month${
                    now.diff(item.from, "M") % 12 > 1 ? "s" : ""
                  }`}
              )
            </h6>
            <div className="border-l-2 border-white border-opacity-50 my-3">
              <h5 className="ml-3 font-semibold">Responsibility:</h5>
              <ul className="ml-6 list-disc list-inside">
                {item.responsibility.map((resp, i) => (
                  <li key={i} className="py-1">
                    {resp}
                  </li>
                ))}
              </ul>

              <div className="ml-4 mt-5 flex md:flex-row flex-col">
                <h5 className="font-semibold text-gray-100 flex-shrink-0">
                  Tech Stack:
                </h5>
                <div className="md:ml-4 md:mt-0 mt-4 flex flex-wrap gap-2">
                  {item.techStack.map((tech, i) => (
                    <img
                      key={i}
                      src={tech}
                      alt={`Tech stack ${i}`}
                      className="h-6 hover:scale-105 hover:transition-all"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;
