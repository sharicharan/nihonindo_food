import React, { useState, useEffect } from "react";
import axios from "axios";
function FoodList() {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/foods")
      .then((response) => setFoods(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
     
      <ul>
        {foods.map((food) => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FoodList;
