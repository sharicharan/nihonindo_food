import axios from "axios";
import React from "react";

function Cart({ update_foods, cartItem,setCartItem }) {
  const messege = async ()=>{
     if(cartItem.length ===0){
      alert("cart is empty ")
      return;
     }
     try {
      const OrderList = {
        items:cartItem,
         total: cartItem.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
      ),
      }
      const response = await axios.post("http://localhost:5000/create-order", OrderList, { responseType: "blob" } );
        const qrUrl = URL.createObjectURL(response.data);

  
   const div = document.createElement('div');
  const button = document.createElement('input');
    const button2 = document.createElement('input');
button.type = "button";
button.value = "Cancel";
button2.type = "button";
button2.value = "Done";
div.className = "payment";

const p = document.createElement("p");
p.textContent = "Pay here";

const img = document.createElement("img");
img.src = qrUrl;
button.style.marginTop = "20px";
button.style.padding = "10px 20px";
button.style.cursor = "pointer";
div.appendChild(p);
div.appendChild(img);
div.appendChild(button);
div.appendChild(button2)
document.body.appendChild(div);


  button.addEventListener('click', () => {
  document.body.removeChild(div);
});

    
     }
     catch(error){
      console.log(error)
     }
  }
  return (
   <div className="flex">
  {/* Left side: Cart items list */}
  <div className="left w-[50%] h-[100vh] overflow-y-auto p-4 scrollbar-hide container">
    {cartItem.length > 0 ? (
      cartItem.map((ele) => (
        <div
          key={ele.id}
          className="border-4 w-[300px] h-[310px] rounded-xl text-white border-yellow-400 overflow-hidden mb-4"
        >
          <img
            src={`/images/${ele.poster}`}
            alt={ele.name}
            className="h-[200px] w-full object-cover"
          />
          <p className="text-lg font-bold">{ele.name}</p>
          <p className="text-yellow-300">${ele.price}</p>
           <div className="flex items-center gap-2 mt-2">
      <button
        className="bg-yellow-500 text-black px-2 rounded"
        onClick={() => {
          setCartItem(cartItem.map(cartFood =>
            cartFood.id === ele.id
              ? { ...cartFood, quantity: Math.max(cartFood.quantity - 1, 1) }
              : cartFood
          ));
        }}
      >
        -
      </button>

      <span>{ele.quantity}</span>

      <button
        className="bg-yellow-500 text-black px-2 rounded"
        onClick={() => {
          setCartItem(cartItem.map(cartFood =>
            cartFood.id === ele.id
              ? { ...cartFood, quantity: cartFood.quantity + 1 }
              : cartFood
          ));
        }}
      >
        +
      </button>
    </div>
        </div>
      ))
    ) : (
      <p className="text-white">Your cart is empty.</p>
    )}
  </div>


  <div className="right w-[50%] h-[90vh] p-4 text-white">
    <h2 className="text-2xl mb-4">Cart Summary</h2>
    <p>
      Total:{" "}
     <span className="text-yellow-300">
  $
  {cartItem.reduce((total, item) => total + (Number(item.price) * item.quantity), 0)}
</span>

    </p>
    <button className="mt-4 bg-green-500 p-2 rounded-lg" onClick={messege}>Checkout</button>
  </div>
</div>

  );
}

export default Cart;
