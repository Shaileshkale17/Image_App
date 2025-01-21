import React from "react";
import TestURL from "../assets/nasa-hubble-space-telescope-ZkDH_u3y2pk-unsplash.jpg";
import { Link } from "react-router-dom";
export const Card = ({ title = "wallpapers", ImageURl, Id }) => {
  return (
    <Link to={`/addcaption/${Id}`}>
      <div className="w-60 h-52 flex flex-col justify-center items-center border border-solid border-black">
        <div className="mb-2">
          <img
            src={ImageURl || TestURL}
            alt="Title"
            className="object-cover w-52 h-40"
          />
        </div>
        <p>{title}</p>
      </div>
    </Link>
  );
};
