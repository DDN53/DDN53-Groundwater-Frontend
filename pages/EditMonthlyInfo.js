import React, { useState, useEffect } from "react";
import ChemicalData from "../components/AddWell/ChemicalData";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../api/index";
import { getUserDataFromToken } from "../utils/userValidation";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MonthlyInfo from "../components/AddMonthlyInfo/MonthlyInfo";
import WellData from "../components/ViewWell/WellData";
import PumpDetails from "../components/AddMonthlyInfo/PumpDetails";
import OtherDetails from "../components/AddMonthlyInfo/OtherDetails";
import WHPA4GW from "../components/AddMonthlyInfo/WHPA4GW";
import { Worklocations } from "../constants/WorkLocations";
import { allRSC, getRSCById, getRSCByNumber } from "../constants/RSC";

function AddMonthlyInfo() {
  const userData = getUserDataFromToken().result;
  const [user, setUser] = useState(userData);
  // for page relaod
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message =
        "Are you sure you want to leave? You may lose unsaved data.";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const SampleId = useSelector((state) => state.SampleId);

  // for use nav
  const navigate = useNavigate();

  //RSC and Work Location
  const [selectedWorkLocation, setSelectedWorkLocation] = useState("");
  const [selectedRSC, setSelectedRSC] = useState("");
  const [isRSCDisabled, setIsRSCDisabled] = useState(true);
  const [rscOptions, setRscOptions] = useState([]);

  const handleWorkLocationChange = (value) => {
    setSelectedWorkLocation(value);
    setSelectedRSC("");
    setIsRSCDisabled(value === "");

    if (value !== "") {
      const rscArray = getRSCByNumber(value);
      setRscOptions(rscArray || []);
    }
  };

  const handleRSCChange = (value) => {
    setSelectedRSC(value);
  };

  //for Availability of Flow Meter
  const [AvailabilityofFlowMeter, setAvailabilityofFlowMeter] = useState("");

  const handleAvailabilityofFlowMeterChange = (value) => {
    setAvailabilityofFlowMeter(value);
  };
  //for Pump Control Unit
  const [PumpControlUnit, setPumpControlUnit] = useState("");

  const handlePumpControlUnitChange = (value) => {
    setPumpControlUnit(value);
  };
  //for Availability of Observed Well
  const [AvailabilityofObservedWell, setAvailabilityofObservedWell] =
    useState("");

  const handleAvailabilityofObservedWellChange = (value) => {
    setAvailabilityofObservedWell(value);
  };
  //for Availability of Welll Maintenance Program
  const [
    AvailabilityofWelllMaintenanceProgram,
    setAvailabilityofWelllMaintenanceProgram,
  ] = useState("");

  const handleAvailabilityofWelllMaintenanceProgramChange = (value) => {
    setAvailabilityofWelllMaintenanceProgram(value);
  };

  //for Implemented of Catchmet Protect to Well
  const [
    ImplementedofCatchmetProtecttoWell,
    setImplementedofCatchmetProtecttoWell,
  ] = useState("");

  const handleImplementedofCatchmetProtecttoWellChange = (value) => {
    setImplementedofCatchmetProtecttoWell(value);
  };

  //for form data
  const [formData, setFormData] = useState({});
  const [selectedWell, setSelectedWell] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.viewmonthlydata(SampleId);
        await setFormData(data?.data);
        setAvailabilityofFlowMeter(data?.data.AvailabilityofFlowMeter);
        setPumpControlUnit(data?.data.PumpControlUnit);
        setAvailabilityofObservedWell(data?.data.AvailabilityofObservedWell);
        setAvailabilityofWelllMaintenanceProgram(
          data?.data.AvailabilityofWelllMaintenanceProgram
        );
        setImplementedofCatchmetProtecttoWell(
          data?.data.ImplementedofCatchmetProtecttoWell
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [SampleId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSelectedWell({
          value: formData.newWellNo,
          label: formData.newWellNo,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = {
      ...formData,
      newWellNo: selectedWell.value,
      id: wellData.id,
      AvailabilityofFlowMeter,
      PumpControlUnit,
      AvailabilityofObservedWell,
      AvailabilityofWelllMaintenanceProgram,
      ImplementedofCatchmetProtecttoWell,
    };
    const b = {
      mid: formData.mid,
      newData: a,
    };
    try {
      await API.editmonthlydata(b);
      navigate("/monthlyinfo");
    } catch (error) {
      console.log(error);
    }
  };

  const [wellData, setwellData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (formData.newWellNo !== undefined && formData.newWellNo) {
        const data = await API.viewwell(selectedWell.value);
        setwellData(data?.data);
      }
    };

    fetchData();
  }, [selectedWell]);

  const [wells2, setWells2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.viewallwells();
        const sortedData = response?.data.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        setWells2(sortedData);
      } catch (error) {
        console.error("Error fetching well data:", error);
      }
    };

    fetchData();
  }, []);

  const wells = wells2
    .filter(
      (well) =>
        selectedWorkLocation === "" ||
        well.selectedWorkLocation === selectedWorkLocation
    )
    .filter((well) => selectedRSC === "" || well.selectedRSC === selectedRSC);

  const [wellInfo, setWellInfo] = useState(false);

  const handleWellSelect = (selectedOption) => {
    setSelectedWell(selectedOption);
  };

  const wellOptions = wells.map((well) => {
    const a = getRSCById(parseInt(well.selectedRSC));
    console.log(well.selectedRSC);
    return {
      value: well.newWellNo,
      label: well.newWellNo + " - " + a.costCentreName,
    };
  });

  const allowedRoles = ["Super", "Editor", "Admin"];
  if (!allowedRoles.includes(user.userRole)) {
    return <Navigate to="/404" />;
  }
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 200,
      height: 42,
    }),
  };

  if (!SampleId) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className=" border border-gray-400 w-[95%] h-[500%] shadow-xl mx-auto p-6 flex flex-col">
            <button
              className="w-12 h-12 p-2 ml-auto text-3xl text-black rounded-full hover:bg-gray-300 hover:text-white focus:outline-none"
              onClick={() => navigate("/monthlyinfo")}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <div className="">
              <div className="flex">
                <div className="w-[50%]  p-3 ">
                  <div className="flex items-center">
                    <p className="mr-2">New Well No : </p>
                    <Select
                      options={wellOptions}
                      styles={customStyles}
                      value={selectedWell}
                      onChange={handleWellSelect}
                      placeholder="Select Well Number"
                      isSearchable
                      required
                    />
                  </div>
                  <div className="flex items-center mt-3">
                    Can't Find Well Number?
                    <Link
                      to="/addwell"
                      className="ml-2 text-blue-500 underline hover:text-blue-900"
                    >
                      Add Well
                    </Link>
                  </div>
                </div>
                <div className="w-[40%] mx-auto flex-col justify-end py-3 p-3 mr-3 border mb-3 border-gray-300 rounded-lg">
                  <div className="mb-2 text-sm font-medium text-gray-600">
                    Filter Well ID Selection by:
                  </div>
                  {/*  */}
                  <div className="flex items-center mb-1">
                    <p className="mr-2">Work locations: </p>
                    <select
                      value={selectedWorkLocation}
                      onChange={(e) => handleWorkLocationChange(e.target.value)}
                      className="p-2 ml-auto border border-gray-500 rounded-md w-[200px]"
                    >
                      <option value="">Select Work Location</option>
                      {Worklocations.map((workLocation) => (
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
                      value={selectedRSC}
                      onChange={(e) => handleRSCChange(e.target.value)}
                      className="p-2 ml-auto border border-gray-500 rounded-md w-[200px]"
                      disabled={isRSCDisabled}
                    >
                      <option value="">Select RSC Location</option>
                      {rscOptions.map((rscLocation) => (
                        <option key={rscLocation.id} value={rscLocation.id}>
                          {rscLocation.costCentreName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*  */}
                  <div
                    onClick={() => {
                      handleWorkLocationChange("");
                    }}
                    className="flex justify-center w-32 p-1 mt-3 ml-auto text-white bg-red-500 rounded-lg hover:bg-red-700"
                  >
                    Reset
                  </div>
                </div>
              </div>
            </div>

            {selectedWell && (
              <div className="flex items-center w-full p-1 pl-2 bg-gray-300 rounded-lg">
                {wellInfo === false && (
                  <>Well Infomation | Well Number : {selectedWell.value}</>
                )}
                <div className="flex items-center justify-center w-8 h-8 p-1 ml-auto mr-2 text-xl rounded-full hover:bg-slate-400">
                  {wellInfo === false ? (
                    <div onClick={() => setWellInfo(true)}>
                      <ion-icon name="chevron-up-outline"></ion-icon>
                    </div>
                  ) : (
                    <div onClick={() => setWellInfo(false)}>
                      <ion-icon name="chevron-down-outline"></ion-icon>
                    </div>
                  )}
                </div>
              </div>
            )}

            {wellInfo === true && (
              <div className="bg-gray-100">
                <WellData formData={wellData} />
              </div>
            )}

            {/* Monthly Info */}
            <div className="py-3 border-t border-gray-500">
              <div className="w-[100%] justify-center flex"></div>
              <div className="w-[30%] mt-4">
                {/*  */}
                <MonthlyInfo formData={formData} handleChange={handleChange} />
              </div>
            </div>
            <div className="py-3 border-t border-gray-500">
              <div className="w-[100%] mt-4">
                <ChemicalData handleChange={handleChange} formData={formData} />
              </div>
            </div>
            <div className="py-3 border-t border-gray-500">
              <div className="w-[100%] mt-4">
                <PumpDetails
                  handleChange={handleChange}
                  formData={formData}
                  AvailabilityofFlowMeter={AvailabilityofFlowMeter}
                  handleAvailabilityofFlowMeterChange={
                    handleAvailabilityofFlowMeterChange
                  }
                  PumpControlUnit={PumpControlUnit}
                  handlePumpControlUnitChange={handlePumpControlUnitChange}
                />
              </div>
            </div>
            <div className="py-3 border-t border-gray-500">
              <div className="w-[100%] mt-4">
                <OtherDetails
                  handleChange={handleChange}
                  formData={formData}
                  AvailabilityofObservedWell={AvailabilityofObservedWell}
                  handleAvailabilityofObservedWellChange={
                    handleAvailabilityofObservedWellChange
                  }
                  AvailabilityofWelllMaintenanceProgram={
                    AvailabilityofWelllMaintenanceProgram
                  }
                  handleAvailabilityofWelllMaintenanceProgramChange={
                    handleAvailabilityofWelllMaintenanceProgramChange
                  }
                />
              </div>
            </div>
            <div className="py-3 border-t border-gray-500">
              <div className="w-[100%] mt-4">
                <WHPA4GW
                  handleChange={handleChange}
                  formData={formData}
                  ImplementedofCatchmetProtecttoWell={
                    ImplementedofCatchmetProtecttoWell
                  }
                  handleImplementedofCatchmetProtecttoWellChange={
                    handleImplementedofCatchmetProtecttoWellChange
                  }
                />
              </div>
            </div>
            <div className="py-3 border-t border-gray-500">
              <div className="w-[100%] justify-center flex"></div>
              <div className="w-[100%] mt-4">
                <textarea
                  placeholder="Note"
                  name="Note"
                  value={formData.Note}
                  onChange={handleChange}
                  type="text"
                  className="w-full h-[300px] p-2 border border-gray-500 rounded-md "
                />
              </div>
            </div>
          </div>
          <div className="flex  w-[100%] my-5 px-10">
            <div
              onClick={() => navigate("/monthlyinfo")}
              className="flex justify-center w-32 p-2 ml-auto mr-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
            >
              Cancel
            </div>
            <button
              type="submit"
              className={`flex justify-center p-2 text-white rounded-lg w-44 bg-green-500 hover:bg-green-700`}
            >
              Edit Monthly Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMonthlyInfo;
//done
