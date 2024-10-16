import React from "react";

function MonthlyInfo(props) {
  return (
    <div>
      <div className="flex items-center mb-1">
        <p className="mr-2">Ground Water Extraction (m^3/month) : </p>
        <input
          required
          placeholder="Ground Water Extraction"
          name="GroundWaterExtraction"
          value={props.formData.GroundWaterExtraction}
          onChange={props.handleChange}
          type="text"
          className="p-2 ml-auto border border-gray-500 rounded-md w-36"
        />
      </div>
      {/*  */}
      <div className="flex items-center mb-1">
        <p className="mr-2">Ground Water Level : </p>
        <input
          required
          placeholder="Ground Water Level"
          name="GroundWaterLevel"
          value={props.formData.GroundWaterLevel}
          onChange={props.handleChange}
          type="text"
          className="p-2 ml-auto border border-gray-500 rounded-md w-36"
        />
      </div>
      {/*  */}
      <div className="flex items-center mb-1">
        <p className="mr-2">Water Supply Scheme : </p>
        <input
          required
          placeholder="Water Supply Scheme"
          name="WaterSupplyScheme"
          value={props.formData.WaterSupplyScheme}
          onChange={props.handleChange}
          type="text"
          className="p-2 ml-auto border border-gray-500 rounded-md w-36"
        />
      </div>
    </div>
  );
}

export default MonthlyInfo;
