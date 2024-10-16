import React from "react";

function WHPA4GW(props) {
  return (
    <div className="w-[50%]">
      <div>
        <div className="flex items-center mb-1">
          <p className="mr-2">Implemented of Catchmet Protect to Well : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.ImplementedofCatchmetProtecttoWell}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <p className="mr-2">Perimeter Protect area to the Well : </p>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.PerimeterProtectareatotheWell}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center mb-1">
          <div>
            <p className="mr-2">Activities Done for GW Recharge : </p>
            <p className="mr-2">(For the Well/Scheme) </p>
          </div>
          <p className="h-10 p-2 ml-auto border border-gray-500 rounded-md min-w-48">
            {props.formData.ActivitiesDoneforGWRecharge}
          </p>
        </div>
        {/*  */}
        <div className="flex flex-col mb-1 ">
          <p className="mr-2">
            Availability of Pollets Sources Around the Well :
          </p>
          <p className="w-[300px] h-[150px] p-2 ml-auto border border-gray-500 rounded-md">
            {props.formData.AvailabilityofPolletsSourcesAroundtheWell}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WHPA4GW;
