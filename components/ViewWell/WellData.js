import React from "react";
import {
  Worklocations,
  getWorklocationById,
} from "../../constants/WorkLocations";
import { allRSC, getRSCByNumber, getRSCById } from "../../constants/RSC";

function WellData(props) {
  const selectedWorkLocation = getWorklocationById(
    props.formData.selectedWorkLocation
  );
  let WorkLocation = null;

  if (selectedWorkLocation) {
    WorkLocation = selectedWorkLocation.name;
  }

  const selectedRSC = getRSCById(parseInt(props.formData.selectedRSC));
  let RSC = null;

  if (selectedRSC) {
    RSC = selectedRSC.costCentreName;
  }

  return (
    <div>
      <div
        className={`p-2 text-white my-3 flex border border-white  bg-gray-700 `}
      >
        Well Information | WEll Number - (
        <div className="">{props.formData.newWellNo}</div>)
      </div>
      <div className="flex border-b border-gray-400 ">
        <div className="w-[50%]  p-3 flex items-center">
          <p className="mr-2">New Well No : </p>
          <div className="h-10 p-2 border border-gray-500 rounded-md w-52">
            {props.formData.newWellNo}
          </div>
        </div>
        <div className="w-[50%]  p-3 flex items-center">
          <p className="mr-2">Old Well No : </p>
          <div className="h-10 p-2 border border-gray-500 rounded-md w-52">
            {props.formData.OldWellNo}
          </div>
        </div>
      </div>
      <div className="flex">
        {/* 1st row */}
        <div className="w-[33%] border-r border-gray-400 p-3 ml-auto">
          {/* project office */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Project Office : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.ProjectOffice}
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Location : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.Location}
            </div>
          </div>
          {/* Electorate */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Electorate : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.Electorate}
            </div>
          </div>
          {/* Village */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Village : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.Village}
            </div>
          </div>
          {/* User Type */}
          <div className="flex items-center mb-1">
            <p className="mr-2">User Type : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.UserType}
            </div>
          </div>
          {/*  */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Well Type : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.selectedWellType}
            </div>
          </div>
          {/*  */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Well Condition: </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.selectedWellCondition}
            </div>
          </div>
        </div>
        {/* 2nd row */}
        <div className="p-3 w-[34%] border-r border-gray-400">
          {/* Province */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Province : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.selectedProvince}
            </div>
          </div>
          {/* District */}
          <div className="flex items-center mb-1">
            <p className="mr-2">District : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.selectedDistrict}
            </div>
          </div>
          {/* DS Division */}
          <div className="flex items-center mb-1">
            <p className="mr-2">DS Division : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.selectedDSDivision}
            </div>
          </div>
          {/* GS Division */}
          <div className="flex items-center mb-1">
            <p className="mr-2">GS Division : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.GSDivision}
            </div>
          </div>

          {/* Scheme Name */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Scheme Name : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.SchemeName}
            </div>
          </div>
          {/*  */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Work locations: </p>
            <div className="min-w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {WorkLocation}
            </div>
          </div>
          {/*  */}
          <div className="flex items-center mb-1">
            <p className="mr-2">RSC locations: </p>
            <div className="min-w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {RSC}
            </div>
          </div>
        </div>
        {/* 3rd row */}
        <div className="p-3">
          {/* Topo sheet */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Topo Sheet : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.TopoSheet}
            </div>
          </div>
          {/* Scale Topo Sheet */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Scale Topo Sheet : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.ScaleTopoSheet}
            </div>
          </div>
          {/* Geology Map */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Geology Map : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.GeologyMap}
            </div>
          </div>
          {/* Scale Geology Map */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Scale Geology Map : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.ScaleGeologyMap}
            </div>
          </div>
          {/* Depth to Bottom of Soil Layer */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Depth to The Bottom of Soil Layer : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.DepthtoTheBottomofSoilLayer}
            </div>
          </div>
          {/* Highly Weathered Rock */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Highly Weathered Rock : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.HighlyWeatheredRock}
            </div>
          </div>
          {/* Weathered Rock */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Weathered Rock : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.WeatheredRock}
            </div>
          </div>
          {/* Geologist */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Geologist : </p>
            <div className="w-[198px] h-10 p-2 ml-auto border border-gray-500 rounded-md">
              {props.formData.Geologist}
            </div>
          </div>
        </div>
      </div>
      {/* geo location info */}
      <div className="flex py-3 border-t border-gray-500">
        {/* 1st row */}
        <div className="w-[50%] ">
          <div className="flex">
            <p>Co-ordinates Geographic</p>
            <div className="flex ml-8">
              <div className="flex items-center">
                <p>X : </p>
                <p className="w-24 h-10 p-2 ml-2 border border-gray-500 rounded-md">
                  {props.formData.X}
                </p>
              </div>
              <div className="flex items-center ml-3">
                <p>Y : </p>
                <p className="w-24 h-10 p-2 ml-2 border border-gray-500 rounded-md">
                  {props.formData.Y}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <p>Elevation</p>
            <p className="w-24 h-10 p-2 ml-2 border border-gray-500 rounded-md">
              {props.formData.Elevation}
            </p>
          </div>
        </div>
        {/* 2nd row */}
        <div className="w-[50%] ">
          <div className="flex items-center">
            <p>Local Metric</p>
            <p className="w-24 h-10 p-2 ml-2 border border-gray-500 rounded-md">
              {props.formData.LocalMetric1}
            </p>
            <p className="w-24 h-10 p-2 ml-2 border border-gray-500 rounded-md">
              {props.formData.LocalMetric2}
            </p>
          </div>

          <div className="flex mt-2">
            <p>Method of survey</p>
            <p className="h-10 p-2 ml-2 border border-gray-500 rounded-md w-36">
              {props.formData.Methodofsurvey}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WellData;
