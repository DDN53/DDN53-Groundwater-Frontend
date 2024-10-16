import React from "react";

function PumpDetails(props) {
  return (
    <div className="flex w-[100%]">
      <div className="w-[50%] pr-20 border-r border-gray-400">
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Availability of Flow Meter : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.AvailabilityofFlowMeter}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Control Valve : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.ControlValve}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Non Return Valve : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.NonReturnValve}
          </p>
        </div>
      </div>

      {/* 2nd row */}
      <div className="w-[50%] pr-20 pl-5">
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Pump Control Unit : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.PumpControlUnit}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Diameter of Pumping main(mm) : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.DiameterofPumpingmain}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Capacity of the Pump(KVA) : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.CapacityofthePump}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PumpDetails;
