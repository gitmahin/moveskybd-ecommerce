import { Star } from "lucide-react";
import React from "react";

export const Stars = () => {
  return (
    <div className="flex justify-start items-center shrink-0">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <Star
            key={i}
            size={16}
            className={`stroke-3 stroke-yellow-500`}
          />
        );
      })}
    </div>
  );
};
