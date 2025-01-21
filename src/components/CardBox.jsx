import React from "react";
import { Card } from "./card";

const CardBox = ({ data }) => {
  return (
    <div>
      {/* <h2 className="ml-12">{title || "Team Image"}</h2> */}
      <div className="card-container my-5 grid gap-10 grid-rows-6">
        {data.map((data, i) => (
          <Card
            key={i}
            title={data.photographer}
            ImageURl={data.src.small}
            Id={data.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CardBox;
