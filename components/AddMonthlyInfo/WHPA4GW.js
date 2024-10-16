import React from "react";

function WHPA4GW(props) {
  return (
    <div className="w-[50%]">
      <div>
        <div className="flex items-center mb-1">
          <p className="mr-2">Implemented of Catchmet Protect to Well : </p>
          <select
            value={props.ImplementedofCatchmetProtecttoWell}
            onChange={(e) =>
              props.handleImplementedofCatchmetProtecttoWellChange(
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
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Perimeter Protect area to the Well : </p>
          <input
            placeholder="Perimeter Protect area to the Well"
            name="PerimeterProtectareatotheWell"
            value={props.formData.PerimeterProtectareatotheWell}
            onChange={props.handleChange}
            type="text"
            className="p-2 ml-auto border border-gray-500 rounded-md w-36"
          />
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <div>
            <p className="mr-2">Activities Done for GW Recharge : </p>
            <p className="mr-2">(For the Well/Scheme) </p>
          </div>
          <input
            placeholder="Activities Done for GW Recharge"
            name="ActivitiesDoneforGWRecharge"
            value={props.formData.ActivitiesDoneforGWRecharge}
            onChange={props.handleChange}
            type="text"
            className="p-2 ml-auto border border-gray-500 rounded-md w-36"
          />
        </div>
        {/*  */}
        <div className="flex flex-col mb-1 ">
          <p className="mr-2">
            Availability of Pollets Sources Around the Well :
          </p>
          <textarea
            placeholder="Availability of Pollets Sources Around the Well"
            name="AvailabilityofPolletsSourcesAroundtheWell"
            value={props.formData.AvailabilityofPolletsSourcesAroundtheWell}
            onChange={props.handleChange}
            type="text"
            className="w-[300px] h-[150px] ml-auto p-2 border border-gray-500 rounded-md "
          />
        </div>
      </div>
    </div>
  );
}

export default WHPA4GW;
