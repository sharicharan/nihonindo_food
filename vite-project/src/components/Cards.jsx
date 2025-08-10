import React from "react";

function Cards({ update_foods, currentType, cartItem, insert_into_cart, reomve_from_cart }) {
  const user_prefer =
    currentType === "india"
      ? ["main_dish", "snack", "dessert"]
      : ["noodles", "seafood", "dessert"];

  function doesHave(food) {
    return cartItem.some((cartFood) => cartFood.id === food.id);
  }

  return (
    <div>
      {user_prefer.map((type) => {
        const items = update_foods.filter((fooditem) => fooditem.type === type);
        if (items.length === 0) return null;
        return (
          <div key={type}>
            <h1 className="text-yellow-300 underline m-10 text-2xl">{type}</h1>
            <div className="flex flex-wrap gap-4 justify-evenly">
              {items.map((food) => (
                <div
                  key={food.id}
                  className="border-4 w-[300px] h-[310px] rounded-xl text-white border-yellow-400 overflow-hidden"
                >
                  <img
                    src={`/images/${food.poster}`}
                    alt=""
                    className="h-[200px] w-full object-cover"
                  />
                  <p>{food.name}</p>
                  <p>${food.price}</p>

                  {doesHave(food) ? (
                    <button
                      onClick={() => reomve_from_cart(food)}
                      className="w-full p-1 mt-2 border-2 border-white rounded-[20px] bg-red-400"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => insert_into_cart(food)}
                      className="w-full p-1 mt-2 border-2 border-white rounded-[20px] bg-yellow-300"
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
