import React, { useEffect, useState } from "react";
import { EarthquackeService, imageURL } from "../service/Earthquacke";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faCalendarDays,
  faDownLong,
  faHouseTsunami,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
function Earthquacke() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await EarthquackeService.getData()
      .then((r) => {
        console.log(r);
        setData(r);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }

  if (!loading)
    return (
      <div
        className=" rounded bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
 text-white w-fit h-fit p-4"
      >
        <div>
          <div className="text-center text-xl mb-1">Earthquake Update</div>
          <div className="flex">
            <div className="flex items-start mt-2 flex-wrap justify-start">
              <a
                className="flex flex-col items-center w-full md:w-fit md:mb-0"
                href={imageURL + data?.Infogempa.gempa.Shakemap}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="rounded mt-1 cursor-pointer"
                  src={imageURL + data?.Infogempa.gempa.Shakemap}
                  width={84}
                ></img>
              </a>

              <div className="flex flex-col gap-2 ml-3 mt-2 md:mt-0">
                <h3 className=" text-l">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                  {dayjs(data?.Infogempa?.gempa?.DateTime).format(
                    "YY/MM/DD HH:mm:ss"
                  )}
                </h3>
                <h3 className=" text-l">
                  <FontAwesomeIcon icon={faBullseye} className="mr-2" />
                  {data?.Infogempa?.gempa?.Magnitude}
                </h3>
                <h3 className=" text-l">
                  <FontAwesomeIcon icon={faDownLong} className="mr-2" />
                  {data?.Infogempa?.gempa?.Kedalaman}
                </h3>
              </div>
              <div className="ml-3 flex flex-col flex-wrap gap-2 max-w-[220px]">
                <h3 className=" text-l">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                  {data?.Infogempa?.gempa?.Wilayah}
                </h3>

                <h3 className=" text-l">
                  <FontAwesomeIcon icon={faHouseTsunami} className="mr-2" />
                  {data?.Infogempa?.gempa?.Potensi ==
                  "Gempa ini dirasakan untuk diteruskan pada masyarakat"
                    ? "Tidak Berpotensi Tsunami"
                    : "Berpotensi Tsunami"}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className=" rounded bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white  p-4">
        <div>
          <div className="text-center text-xl animate-pulse">
            <div className="bg-slate-700 h-[28px] w-full rounded-lg"></div>
          </div>
          <div className="flex animate-pulse mt-1">
            <div className="flex items-center flex-wrap justify-center md:justify-start">
              <div className="flex justify-center md:justify-start w-full md:w-fit">
                <div className="bg-slate-700 h-[100px] w-[100px] rounded-lg"></div>
              </div>

              <div className="flex flex-col gap-2 ml-2 md:mt-0 mt-1">
                <div className="bg-slate-700 h-[28px] w-[233px] rounded-lg"></div>
                <div className="bg-slate-700 h-[28px] w-[233px] rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Earthquacke;
