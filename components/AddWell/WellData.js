import React from "react";

function WellData(props) {
  return (
    <div>
      <div className="border-b border-gray-400 ">
        <div className="flex">
          <div className="w-[50%]  p-3 flex items-center">
            <p className="mr-2">New Well No : </p>
            <input
              required
              placeholder="New Well No"
              name="newWellNo"
              value={props.formData.newWellNo}
              onChange={props.handleChange}
              type="text"
              className="p-2 border border-gray-500 rounded-md"
            />
          </div>
          <div className="w-[50%]  p-3 flex items-center">
            <p className="mr-2">Old Well No : </p>
            <input
              placeholder="Old Well No"
              name="OldWellNo"
              value={props.formData.OldWellNo}
              onChange={props.handleChange}
              type="text"
              className="p-2 border border-gray-500 rounded-md"
            />
          </div>
        </div>
        {props.wellIdExists && (
          <span className="ml-2 text-red-500">Well ID already exists!</span>
        )}
      </div>

      <div className="flex">
        {/* 1st row */}
        <div className="w-[33%] border-r border-gray-400 p-3 ml-auto">
          {/* project office */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Project Office : </p>
            <input
              placeholder="Project Office"
              name="ProjectOffice"
              value={props.formData.ProjectOffice}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Location */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Location : </p>
            <input
              placeholder="Location"
              name="Location"
              value={props.formData.Location}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Electorate */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Electorate : </p>
            <input
              placeholder="Electorate"
              name="Electorate"
              value={props.formData.Electorate}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Village */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Village : </p>
            <input
              placeholder="Village"
              name="Village"
              value={props.formData.Village}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* User Type */}
          <div className="flex items-center mb-1">
            <p className="mr-2">User Type : </p>
            <select
              value={props.UserType}
              onChange={(e) => props.handleUserTypeChange(e.target.value)}
              className="p-2 ml-auto border border-gray-500 rounded-md w-[200px]"
            >
              <option value="">Select User Type</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Domestic">Domestic</option>
              <option value="Tourism">Tourism</option>
              <option value="Water Supply Scheme">Water Supply Scheme</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>
          {/*  */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Well Type: </p>
            <select
              value={props.selectedWellType}
              onChange={(e) => props.handleTypeChange(e.target.value)}
              className="p-2 ml-auto border border-gray-500 rounded-md w-[200px]"
            >
              <option value="">Select Well Type</option>
              <option value="Deep Tube Well">Deep Tube Well</option>
              <option value="Shallow Tube Well">Shallow Tube Well</option>
              <option value="Dug Well">Dug Well</option>
              <option value="Other..">Other..</option>
            </select>
          </div>
          {/*  */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Well Condition: </p>
            <select
              value={props.selectedWellCondition}
              onChange={(e) => props.handleWellConditionChange(e.target.value)}
              className="p-2 ml-auto border border-gray-500 rounded-md w-[200px]"
            >
              <option value="">Select Well Condition</option>
              <option value="Pumping">Pumping</option>
              <option value="abandoned">abandoned</option>
            </select>
          </div>
        </div>
        {/* 2nd row */}
        <div className="p-3 w-[34%] border-r border-gray-400">
          {/* Province */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Province : </p>
            <select
              value={props.selectedProvince}
              onChange={(e) => props.handleProvinceChange(e.target.value)}
              className="p-2 ml-auto border border-gray-500 rounded-md w-[200px]"
            >
              <option value="">Select Province</option>
              {props.provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          {/* District */}
          <div className="flex items-center mb-1">
            <p className="mr-2">District : </p>
            <select
              value={props.selectedDistrict}
              onChange={(e) => props.handleDistrictChange(e.target.value)}
              disabled={!props.selectedProvince}
              className="p-2 ml-auto border border-gray-500 rounded-md  w-[200px]"
            >
              <option value="">Select District</option>
              {props
                .getDistrictsByProvince(props.selectedProvince)
                .map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          </div>
          {/* DS Division */}
          <div className="flex items-center mb-1">
            <p className="mr-2">DS Division : </p>
            <select
              value={props.selectedDSDivision}
              onChange={(e) => props.setSelectedDSDivision(e.target.value)}
              disabled={!props.selectedDistrict}
              className="p-2 ml-auto border border-gray-500 rounded-md  w-[200px]"
            >
              <option value="">Select DS Division</option>
              {props
                .getDSDivisionByDistrict(props.selectedDistrict)
                .map((dsDivision) => (
                  <option key={dsDivision} value={dsDivision}>
                    {dsDivision}
                  </option>
                ))}
            </select>
          </div>
          {/* GS Division */}
          <div className="flex items-center mb-1">
            <p className="mr-2">GS Division : </p>
            <input
              placeholder="GS Division"
              name="GSDivision"
              value={props.formData.GSDivision}
              onChange={props.handleChange}
              type="text"
              ml-auto
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>

          {/* Scheme Name */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Scheme Name : </p>
            <input
              placeholder="Scheme Name"
              name="SchemeName"
              value={props.formData.SchemeName}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>

          {/*  */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Work locations: </p>
            <select
              required
              value={props.selectedWorkLocation}
              onChange={(e) => props.handleWorkLocationChange(e.target.value)}
              className="p-2 ml-auto border border-gray-500 rounded-md w-[200px]"
            >
              <option value="">Select Work Location</option>
              {props.Worklocations.map((workLocation) => (
                <option key={workLocation.id} value={workLocation.id}>
                  {workLocation.name}
                </option>
              ))}
            </select>
          </div>

          {/*  */}
          <div className="flex items-center mb-1">
            <p className="mr-2">RSC locations: </p>
            <select
              value={props.selectedRSC}
              onChange={(e) => props.handleRSCChange(e.target.value)}
              className="p-2 ml-auto border border-gray-500 rounded-md w-[200px]"
              disabled={!props.selectedWorkLocation}
            >
              <option value="">Select RSC Location</option>
              {props.rscOptions.map((rscLocation) => (
                <option key={rscLocation.id} value={rscLocation.id}>
                  {rscLocation.costCentreName}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 3rd row */}
        <div className="p-3">
          {/* Topo sheet */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Topo Sheet : </p>
            <input
              placeholder="Topo Sheet"
              name="TopoSheet"
              value={props.formData.TopoSheet}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Scale Topo Sheet */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Scale Topo Sheet : </p>
            <input
              placeholder="Scale Topo Sheet"
              name="ScaleTopoSheet"
              value={props.formData.ScaleTopoSheet}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Geology Map */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Geology Map : </p>
            <input
              placeholder="Geology Map"
              name="GeologyMap"
              value={props.formData.GeologyMap}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Scale Geology Map */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Scale Geology Map : </p>
            <input
              placeholder="Scale Geology Map"
              name="ScaleGeologyMap"
              value={props.formData.ScaleGeologyMap}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Depth to Bottom of Soil Layer */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Depth to The Bottom of Soil Layer : </p>
            <input
              placeholder="Depth to The Bottom of Soil Layer"
              name="DepthtoTheBottomofSoilLayer"
              value={props.formData.DepthtoTheBottomofSoilLayer}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Highly Weathered Rock */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Highly Weathered Rock : </p>
            <input
              placeholder="Highly Weathered Rock"
              name="HighlyWeatheredRock"
              value={props.formData.HighlyWeatheredRock}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Weathered Rock */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Weathered Rock : </p>
            <input
              placeholder="Weathered Rock"
              name="WeatheredRock"
              value={props.formData.WeatheredRock}
              onChange={props.handleChange}
              type="text"
              className="p-2 ml-auto border border-gray-500 rounded-md"
            />
          </div>
          {/* Geologist */}
          <div className="flex items-center mb-1">
            <p className="mr-2">Geologist : </p>
            <input
              placeholder="Geologist"
              name="Geologist"
              value={props.formData.Geologist}
              onChange={props.handleChange}
              type="text"
              className="items-end p-2 ml-auto border border-gray-500 rounded-md"
            />
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
                <input
                  placeholder="X"
                  name="X"
                  value={props.formData.X}
                  onChange={props.handleChange}
                  type="text"
                  className="w-24 p-2 ml-2 border border-gray-500 rounded-md"
                />
              </div>
              <div className="flex items-center ml-3">
                <p>Y : </p>
                <input
                  placeholder="Y"
                  name="Y"
                  value={props.formData.Y}
                  onChange={props.handleChange}
                  type="text"
                  className="w-24 p-2 ml-2 border border-gray-500 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <p>Elevation</p>
            <input
              placeholder="Elevation"
              name="Elevation"
              value={props.formData.Elevation}
              onChange={props.handleChange}
              type="text"
              className="w-24 p-2 ml-2 border border-gray-500 rounded-md"
            />
          </div>
        </div>
        {/* 2nd row */}
        <div className="w-[50%] ">
          <div className="flex items-center">
            <p>Local Metric</p>
            <input
              placeholder="LocalMetric1"
              name="LocalMetric1"
              value={props.formData.LocalMetric1}
              onChange={props.handleChange}
              type="text"
              className="w-24 p-2 ml-2 border border-gray-500 rounded-md"
            />
            <input
              placeholder="LocalMetric2"
              name="LocalMetric2"
              value={props.formData.LocalMetric2}
              onChange={props.handleChange}
              type="text"
              className="w-24 p-2 ml-2 border border-gray-500 rounded-md"
            />
          </div>

          <div className="flex mt-2">
            <p>Method of survey</p>
            <select
              value={props.Methodofsurvey}
              onChange={(e) => props.handleMethodofsurveyChange(e.target.value)}
              className="p-2 ml-2 border border-gray-500 rounded-md w-[220px]"
            >
              <option value="">Select Method of survey</option>
              <option value="GPS">GPS</option>
              <option value="Map">Map</option>
              <option value="Survey">Survey</option>
              <option value="USGS">USGS</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WellData;
