import React, { useEffect, useState } from "react";
import { fetchAnalytic } from "../service/analyticService";
import { useSpring, animated } from "@react-spring/web";

function Number({ num }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: num,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

function VisitorCount() {
  const [loading, setLoading] = useState(true);
  const [visitData, setVisitData] = useState({
    date: "",
    count: 0,
    last_thirty_day: 0,
  });

  useEffect(() => {
    const fetchWebAnalytic = async () => {
      setLoading(true);
      await fetchAnalytic()
        .then((response) => {
          setLoading(false);
          setVisitData(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchWebAnalytic();
  }, []);

  return (
    <div className=" font-poppins grid grid-cols-1 gap-8 md:grid-cols-20/40/40 max-w-[900px] m-auto p-5 bg-[#A20B0B] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded-md">
      <div className="text-center text-3xl font-bold p-2  md:p-5">
        Visitor Statistic
      </div>
      <div className="text-center">
        <h3 className=" text-xl">Today</h3>
        <h1 className=" font-bold text-5xl mt-3">
          <Number num={visitData.count} />
        </h1>
      </div>
      <div className="text-center">
        <h3 className=" text-xl">Last 30 day</h3>
        <h1 className=" font-bold text-5xl mt-3">
          <Number num={visitData.last_thirty_day} />
        </h1>
      </div>
    </div>
  );
}

export default VisitorCount;
