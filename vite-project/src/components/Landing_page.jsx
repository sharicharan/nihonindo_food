import React from 'react'
import { useNavigate } from 'react-router-dom'
function Landing_page() {
  const navigate = useNavigate();
  let navigator =()=>{
      navigate("/home")
  } 
  return (
     
     <div className='h-screen border-4 text-white'>
               <h1 className='text-center mt-40 text_logo'>Nihon Foods</h1>
      <div className='text-white  landpage_content text-center'>
       <button  onClick={navigator} className='p-[8px] bg-yellow-600 rounded-md mb-4 animate-bounce
'>Order now</button>
       <p>Best <strong>taste ever </strong> every day a new flavor</p>
       </div>
       </div>
    
  )
}

export default Landing_page