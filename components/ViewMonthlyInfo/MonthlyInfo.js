import React from "react";

function MonthlyInfo(props) {
  return (
    <div>
      <div className="flex items-center mb-1">
        <p className="mr-2">Ground Water Extraction (m^3/month) : </p>
        <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-36">
          {props.formData.GroundWaterExtraction}
        </p>
      </div>
      {/*  */}
      <div className="flex items-center mb-1">
        <p className="mr-2">Ground Water Level : </p>
        <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md w-36">
          {props.formData.GroundWaterLevel}
        </p>
      </div>
      {/*  */}
      <div className="flex items-center mb-1">
        <p className="mr-2">Water Supply Scheme : </p>
        <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md w-36">
          {props.formData.WaterSupplyScheme}
        </p>
      </div>
    </div>
  );
}

export default MonthlyInfo;
