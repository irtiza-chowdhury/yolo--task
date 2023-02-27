import React, { useEffect, useState } from "react";
import Vectors from "../assets/images/Vector.svg";

import UpperPart from "./UpperPart";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let { data: task, error } = await supabase.from("yolo-task").select("*");

      if (error) {
        console.log("error is happened", error);
      }
      setCarts(task);
    }
    fetchData();
  }, []);

  return (
    // <!-- fullBody starts-->
    <div className="fullBody">
      <UpperPart />
      {/* <!-- mainPart starts --> */}
      <div className="mainPart">
        {carts?.map((item) => (
          <div className="card--wrapers" key={item.id}>
            <div className="mainPart__card">
              <div className="mainPart__card-image">
                <img
                  src={`${process.env.PUBLIC_URL}/${item.imageUrl}`}
                  alt="Persons"
                />
                <div className="card-info--wrapper">
                  <div className="mainPart__card-image-info">
                    <div className="mainPart__card-image-info-vector">
                      <img src={Vectors} alt="Vector" />
                    </div>
                    <div className="mainPart__card-image-info-title">
                      {item.title}
                    </div>
                    <div className="mainPart__card-image-info-text">
                      {item.text}
                    </div>
                    <div className="mainPart__card-image-info-button">
                      View details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <!-- mainPart ends --> */}
    </div>
    // fullBody ends
  );
}
