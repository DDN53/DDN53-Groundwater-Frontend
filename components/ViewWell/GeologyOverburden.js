import React from "react";

function GeologyOverburden(props) {
  return (
    <div>
      <div className={`p-2 text-white my-3  border border-white  bg-gray-700 `}>
        GeologyOverburden
      </div>
      <div>
        <p className="w-full min-h-[300px] p-2 border border-gray-500 rounded-md ">
          {props.formData.GeologyOverburden}
        </p>
      </div>
    </div>
  );
}

export default GeologyOverburden;
