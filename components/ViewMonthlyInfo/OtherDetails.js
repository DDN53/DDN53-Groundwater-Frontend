import React from "react";

function OtherDetails(props) {
  return (
    <div className="flex w-[100%]">
      <div className="w-[50%] pr-20 border-r border-gray-400">
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Availability of Observed Well : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.AvailabilityofObservedWell}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Availability of Welll Maintenance Program : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.AvailabilityofWelllMaintenanceProgram}
          </p>
        </div>
      </div>

      {/* 2nd row */}
      <div className="w-[50%] pr-20 pl-5">
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Last Date of Well Flushed : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.LastDateofWellFlushed}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Last Date of Pumping Test Done : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.LastDateofPumpingTestDone}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Possibility Fore New WEll Construct) : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.PossibilityForeNewWEllConstruct}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtherDetails;
