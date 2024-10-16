import React, { useState, useEffect } from "react";
import { Sliderone,Slidertwo,Groundwater } from '../assets';
const AddWell = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = 2; 

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 3000); 
    return () => clearTimeout(interval);
  }, [activeIndex]);

  return (
    <>
      <div id="indicators-carousel" className="relative w-full" data-carousel="static">
       
        <div className="relative h-64 overflow-hidden rounded-md md:h-96 -mt-5">
          
          <div
            className={`${
              activeIndex === 0 ? "block" : "hidden"
            } duration-700 ease-in-out`}
            data-carousel-item="active"
          >
            <img
              src={Sliderone}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-slate-800"
              alt="Slide 1"
            />
          </div>
          
          <div
            className={`${
              activeIndex === 1 ? "block" : "hidden"
            } duration-700 ease-in-out`}
            data-carousel-item
          >
            <img
            src={Slidertwo}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-slate-800"
              alt="Slide 2"
            />
          </div>
      
         
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                activeIndex === index ? "bg-white" : "bg-gray-400"
              }`}
              aria-current={activeIndex === index}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)}
        >
         
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems)}
        >
         
        </button>
      </div>
       {/* about section */}
      <section class="about_section layout_padding ">
 <div className=" min-h-80 min-w-20 m-auto bg-white mx-auto flex ml-4">
<div className="min-h-80 min-w-[600px] bg-white ml-16 ">
<h2 className="mt-20 text-3xl font-bold">
  Wellcome to <span className="text-900 text-primary5 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"> Groundwater Section</span>
</h2>
<div className="mt-6 text-lg">
  <p className="leading-6">
  Groundwater Resources &
  The investigation Section identifies, <br/>assesses, and remediate groundwater problems 
  </p>
  <a href="https://www.waterboard.lk/key-sections/ground-water/" class="w-28 h-8 p-2 text-white rounded-md bg-primary2  flex items-center justify-center mt-9 cursor-pointer shadow-sm ">
    Read More
</a>


</div>


    
</div>
<div className="min-h-80 min-w-[600px] mr-10 flex items-center justify-center ">
  <img
    src={Groundwater}
    alt="groundwater_logo"
    className="max-w-full h-auto border-4 border-blue-500 rounded-md"
  />
</div>


 </div>
  </section>


    </>
  );
};

export default AddWell;
