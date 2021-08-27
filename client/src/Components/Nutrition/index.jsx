import React from "react";

// components
import NutritionHeroCarousal from "./NutritionHeroCarousal";
import NutritionCarousal from "./NutritionalCarousal";

const Nutrition = () => {
  return (
    <div>
      <NutritionHeroCarousal />
     <div className="my-4"><NutritionCarousal /></div>
    </div>
  );
};

export default Nutrition;