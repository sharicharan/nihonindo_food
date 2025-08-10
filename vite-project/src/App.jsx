import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing_page from "./components/Landing_page";
import Todays from "./components/Todays";
import Cart from "./components/Cart";

import "swiper/css";
import axios from "axios";
import "swiper/css/navigation";



import { useNavigate } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);
   const [foods, setFoods] = useState([]);
  const [currentType, setCurrentType] = useState("");
   const [update_foods, setUpdate_foods] = useState([]);
   const [cartItem,setCartItem] =useState([]);
   let insert_into_cart =(item)=>{
      const existingItem = cartItem.find(cartFood => cartFood.id === item.id);

  if (existingItem) {
    setCartItem(cartItem.map(cartFood =>
      cartFood.id === item.id
        ? { ...cartFood, quantity: cartFood.quantity + 1 }
        : cartFood
    ));
  } else {
    setCartItem([...cartItem, { ...item, quantity: 1 }]);
  }

   }
   let reomve_from_cart =(item)=>{
     let remove_item =  cartItem.filter((current_item)=>{
      return current_item.id != item.id
     })
     setCartItem(remove_item)
   }
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/foods")
      .then((response) => {
        const allFoods = response.data;
        setFoods(allFoods);
        const filtered = allFoods.filter(
          (item) => item.style?.toLowerCase() === "japan"
        );
        setUpdate_foods(filtered);
      })
      .catch((error) => console.log(error));
  }, []);

  
  return (
    <div className="app h-full" >
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_page />} />
        <Route path="/home" element={<Todays foods={foods}
      currentType={currentType}
      setCurrentType={setCurrentType}
      update_foods={update_foods}
      setUpdate_foods={setUpdate_foods} 
      cartItem={cartItem}
      insert_into_cart={insert_into_cart}
      reomve_from_cart={reomve_from_cart}
      />} />
         <Route path="/cart" element={<Cart  update_foods={update_foods} cartItem={cartItem} setCartItem={setCartItem}/>} />

      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
