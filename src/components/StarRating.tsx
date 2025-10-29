import { Star } from "lucide-react";
import { useState } from "react";

export const StarRating = ({
  id,
  rating,
  onChange,
  readonly = true,
  size = "30px",
}: {
  id: string;
  rating: number;
  onChange?: (rating: number) => void;
  size?: string;
  readonly?: boolean;
}) => {
  const handleUpdateRating = (newRating: number) => {
    if (!readonly) {
      onChange?.(newRating);
    }
  };

  return (
    <span className="inline-flex" id={id}>
      {[...Array(5).keys()].map((starNumber) => (
        <Star
          key={starNumber}
          size={size}
          color="gold"
          onClick={() => {
            handleUpdateRating(starNumber + 1);
          }}
          onMouseEnter={() => {
            handleUpdateRating(starNumber + 1);
          }}
          fill={starNumber < rating ? "gold" : "transparent"}
        />
      ))}
    </span>
  );
};
