import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Cards from "./Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Todays({ foods, currentType, setCurrentType, update_foods, setUpdate_foods ,cartItem,insert_into_cart,reomve_from_cart }) {
  const nav = useNavigate();

  const open_cart = () => {
    nav("/cart");
  };


  // Default filter when foods first load
  useEffect(() => {
    if (foods.length > 0) {
      const filtered = foods.filter(item => item.style?.toLowerCase() === "japan");
      setUpdate_foods(filtered);
      setCurrentType("japan");
    }
  }, [foods, setUpdate_foods, setCurrentType]);

  // Dropdown filter handler
  const filter = (e) => {
    const selected = e.target.value;
    setCurrentType(selected);
    const filtered = foods.filter(item => item.style?.toLowerCase() === selected);
    setUpdate_foods(filtered);
  };

  return (
    <div className="p-4 border-[2px]">
      {/* Swiper Slider */}
      <div>
        <Swiper
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          navigation={true}
          loop={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper w-full h-[300px] md:h-[500px] max-w-3xl max-h-[300px] overflow-visible"
        >
          <SwiperSlide>
            <img src="/bg2.jpg" alt="Food 1" className="w-full h-full object-cover rounded-xl" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bg2.jpg" alt="Food 2" className="w-full h-full object-cover rounded-xl" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bg2.jpg" alt="Food 3" className="w-full h-full object-cover rounded-xl" />
          </SwiperSlide>
          <img src="/tag2.jpeg" alt="" className="absolute top-[3px] max-w-[100px] z-50" />
        </Swiper>
      </div>

      {/* Filter Dropdown */}
      <div className="flex gap-5 items-center mt-4">
        <h2 className="text-white text-[30px]">Filter</h2>
        <select
          className="text-white bg-black border-2 rounded-sm p-1"
          value={currentType}
          onChange={filter}
        >
          <option value="japan">Japanese</option>
          <option value="india">India</option>
        </select>
      </div>

   
      <Cards foods={foods} update_foods={update_foods} currentType={currentType} cartItem={cartItem} insert_into_cart={insert_into_cart} reomve_from_cart={reomve_from_cart}  />


      <button className="text-white bottom-10 right-8 fixed">
        <FontAwesomeIcon
          onClick={open_cart}
          icon={faShoppingCart}
          className="p-3 rounded-full border-2 text-white hover:bg-orange-300 hover:cursor-pointer transition duration-[0.5s]"
        />
      </button>
    </div>
  );
}

export default Todays;
