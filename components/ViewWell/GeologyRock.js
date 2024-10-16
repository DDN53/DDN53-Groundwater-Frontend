import React from "react";

function GeologyRock(props) {
  return (
    <div>
      <div className={`p-2 text-white my-3  border border-white  bg-gray-700 `}>
        GeologyRock
      </div>
      <div>
        <p className="w-full min-h-[300px] p-2 border border-gray-500 rounded-md ">
          {props.formData.GeologyRock}
        </p>
      </div>
    </div>
  );
}

export default GeologyRock;
