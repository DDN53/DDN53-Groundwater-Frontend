import React from "react";

function OtherDetails(props) {
  return (
    <div className="flex w-[100%]">
      <div className="w-[50%] pr-20 border-r border-gray-400">
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Availability of Observed Well : </p>
          <select
            value={props.AvailabilityofObservedWell}
            onChange={(e) =>
              props.handleAvailabilityofObservedWellChange(e.target.value)
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
          <p className="mr-2">Availability of Welll Maintenance Program : </p>
          <select
            value={props.AvailabilityofWelllMaintenanceProgram}
            onChange={(e) =>
              props.handleAvailabilityofWelllMaintenanceProgramChange(
                e.target.value
              )
            }
            className="p-2 ml-auto border border-gray-500 rounded-md"
          >
            <option value="">Select Answer</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* 2nd row */}
      <div className="w-[50%] pr-20 pl-5">
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Last Date of Well Flushed : </p>
          <input
            placeholder="Last Date of Well Flushed"
            name="LastDateofWellFlushed"
            value={props.formData.LastDateofWellFlushed}
            onChange={props.handleChange}
            type="text"
            className="p-2 ml-auto border border-gray-500 rounded-md"
          />
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Last Date of Pumping Test Done : </p>
          <input
            placeholder="Last Date of Pumping Test Done"
            name="LastDateofPumpingTestDone"
            value={props.formData.LastDateofPumpingTestDone}
            onChange={props.handleChange}
            type="text"
            className="p-2 ml-auto border border-gray-500 rounded-md"
          />
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Possibility Fore New WEll Construct) : </p>
          <input
            placeholder="Possibility Fore New WEll Construct"
            name="PossibilityForeNewWEllConstruct"
            value={props.formData.PossibilityForeNewWEllConstruct}
            onChange={props.handleChange}
            type="text"
            className="p-2 ml-auto border border-gray-500 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default OtherDetails;
