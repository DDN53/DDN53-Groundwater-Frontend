import React from "react";

function PumpDetails(props) {
  return (
    <div className="flex w-[100%]">
      <div className="w-[50%] pr-20 border-r border-gray-400">
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Availability of Flow Meter : </p>
          <select
            value={props.AvailabilityofFlowMeter}
            onChange={(e) =>
              props.handleAvailabilityofFlowMeterChange(e.target.value)
            }
            className="p-2 ml-auto border border-gray-500 rounded-md"
          >
            <option value="">Select Answer</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Control Valve : </p>
          <input
            placeholder="Control Valve"
            name="ControlValve"
            value={props.formData.ControlValve}
            onChange={props.handleChange}
            type="text"
            className="p-2 ml-auto border border-gray-500 rounded-md"
          />
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Non Return Valve : </p>
          <input
            placeholder="Non Return Valve"
            name="NonReturnValve"
            value={props.formData.NonReturnValve}
            onChange={props.handleChange}
            type="text"
            className="p-2 ml-auto border border-gray-500 rounded-md"
          />
        </div>
      </div>

      {/* 2nd row */}
      <div className="w-[50%] pr-20 pl-5">
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Pump Control Unit : </p>
          <select
            value={props.PumpControlUnit}
            onChange={(e) => props.handlePumpControlUnitChange(e.target.value)}
            className="p-2 ml-auto border border-gray-500 rounded-md"
          >
            <option value="">Select Answer</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Diameter of Pumping main(mm) : </p>
          <input
            placeholder="Diameter of Pumping main"
            name="DiameterofPumpingmain"
            value={props.formData.DiameterofPumpingmain}
            onChange={props.handleChange}
            type="text"
            className="p-2 ml-auto border border-gray-500 rounded-md"
          />
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Capacity of the Pump(KVA) : </p>
          <input
            placeholder="Capacity of the Pump"
            name="CapacityofthePump"
            value={props.formData.CapacityofthePump}
            onChange={props.handleChange}
            type="text"
            className="p-2 ml-auto border border-gray-500 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default PumpDetails;
