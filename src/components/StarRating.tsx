import React from "react";
import Image from "next/image";

import star from "../../public/Images/staricon.svg";
import nostar from "../../public/Images/nostarticon.svg";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.min(totalStars, Math.max(0, rating)); // Ensure the rating is between 0 and 5

  const starIcons = [];

  for (let i = 0; i < totalStars; i++) {
    if (i < filledStars) {
      starIcons.push(
        <Image
          key={i}
          src={star}// Use the path to your filled star image
          alt="star"
          width={16}
          height={16}
        />
      );
    } else {
      starIcons.push(
        <Image
          key={i}
          src={nostar} // Use the path to your empty star image
          alt="star"
          width={16}
          height={16}
        />
      );
    }
  }

  return <div className="flex my-4">{starIcons}</div>;
};

export default StarRating;
