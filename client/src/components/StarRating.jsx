
import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 4 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src={assets.starIconFilled}
          alt="star"
          className={`w-4 h-4 ${
            star <= rating ? "opacity-100" : "opacity-30"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
