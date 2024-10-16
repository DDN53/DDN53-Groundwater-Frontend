import React, { useState, useEffect } from "react";
import { provinces, getDistrictsByProvince } from "../constants/Area";
import { getDSDivisionByDistrict } from "../constants/dsDivisions";
import ChemicalData from "../components/AddWell/ChemicalData";
import GeologyOverburden from "../components/AddWell/GeologyOverburden";
import GeologyRock from "../components/AddWell/GeologyRock";
import PumpInstalation from "../components/AddWell/PumpInstalation";
import RequestGeneral from "../components/AddWell/RequestGeneral";
import Test from "../components/AddWell/Test";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../api/index";
import { getUserDataFromToken } from "../utils/userValidation";
import { Worklocations } from "../constants/WorkLocations";
import {  getRSCByNumber } from "../constants/RSC";
import WellData from "../components/AddWell/WellData";

function AddWell() {
  // addmonthlyinfo;editmonthlyinfo;
  const userData = getUserDataFromToken().result;
  const [user] = useState(userData);
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
  //Work location and rsc
  const [selectedWorkLocation, setSelectedWorkLocation] = useState("");
  const [selectedRSC, setSelectedRSC] = useState("");
  const [rscOptions, setRscOptions] = useState([]);

  const handleWorkLocationChange = (value) => {
    setSelectedWorkLocation(value);
    setSelectedRSC(""); // Reset selected RSC when work location changes

    if (value !== "") {
      const rscArray = getRSCByNumber(value);
      setRscOptions(rscArray || []);
    }
  };

  const handleRSCChange = (value) => {
    setSelectedRSC(value);
  };
  //for well type
  const [selectedWellType, setSelectedWellType] = useState("");

  const handleTypeChange = (value) => {
    setSelectedWellType(value);
  };
  //for UserType
  const [UserType, setUserType] = useState("");

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };
  //for Condition
  const [selectedWellCondition, setSelectedWellCondition] = useState("");

  const handleWellConditionChange = (value) => {
    setSelectedWellCondition(value);
  };
  //for Method of survey
  const [Methodofsurvey, setMethodofsurvey] = useState("");

  const handleMethodofsurveyChange = (value) => {
    setMethodofsurvey(value);
  };
  // for select province district gs
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDSDivision, setSelectedDSDivision] = useState("");

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setSelectedDistrict("");
    setSelectedDSDivision("");
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setSelectedDSDivision("");
  };

  useEffect(() => {
    if (selectedProvince) {
      setSelectedDistrict("");
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      setSelectedDSDivision("");
    }
  }, [selectedDistrict]);
  //end of select province district gs

  //for change tabs
  const [ChangeTab, setChangeTab] = useState("ChemicalData");

  // for use nav
  const navigate = useNavigate();

  //for form data
  const initState = {
    newWellNo: "",
    OldWellNo: "",
    ProjectOffice: "",
    Location: "",
    Electorate: "",
    Village: "",
    UserType: "",
    selectedProvince: "",
    selectedDistrict: "",
    selectedDSDivision: "",
    GSDivision: "",
    SchemeName: "",
    TopoSheet: "",
    ScaleTopoSheet: "",
    GeologyMap: "",
    ScaleGeologyMap: "",
    DepthtoTheBottomofSoilLayer: "",
    HighlyWeatheredRock: "",
    WeatheredRock: "",
    Geologist: "",
    X: "",
    Y: "",
    Elevation: "",
    LocalMetric1: "",
    LocalMetric2: "",
    Methodofsurvey: "",
    SampleDate: "",
    SampleDepth: "",
    SampleTime: "",
    Color: "",
    Turbidity: "",
    PH: "",
    Elecon: "",
    Chlorides: "",
    Totalk: "",
    FreeAmonia: "",
    Albamonia: "",
    Nitrates: "",
    Nitrite: "",
    Fluorides: "",
    Phosphate: "",
    Totdissol: "",
    Tothard: "",
    Calchard: "",
    Totiron: "",
    Magnesium: "",
    Sulphate: "",
    Manganese: "",
    Dissiron: "",
    Totcoli: "",
    Faecalcoli: "",
    Filtiron: "",
    Totresidue: "",
    Calcium: "",
    Oxygen: "",
    Hysul: "",
    Fixediron: "",
    SWL: "",
    InstalledDatePedestal: "",
    InstalledDatePump: "",
    PumpType: "",
    PumpHeadNo: "",
    CylinderType: "",
    CylinderDepth: "",
    RiserPipeType: "",
    RiserPipeLength: "",
    ConnecRodType: "",
    ConnecRodLength: "",
    Remarks: "",
    RequestMode: "",
    Fundingcriteria: "",
    WellCategory: "",
    AgentName: "",
    ProjectName: "",
    ContactOrderNo: "",
    DistancetoNearestPublicPerinialWell: "",
    NoOfHousesWithin500M: "",
    ConcentOfPSForMaintenance: "",
    ConsumerSocietyFormed: "",
    NameofCareTaker: "",
    AddressofCareTakerline1: "",
    AddressofCareTakerline2: "",
    AddressofCareTakerline3: "",
    TestDate: "",
    Step1one: "",
    Step1two: "",
    Step2one: "",
    Step2two: "",
    Step3one: "",
    Step3two: "",
    Step4one: "",
    Step4two: "",
    Step5one: "",
    Step5two: "",
    TestDate2: "",
    EndDate2: "",
    PumpInstallationDepth: "",
    PumpInstallationDepth2: "",
    AvarageDischargeRate: "",
    waterlevelatendoftherecovery: "",
    PumingDuration: "",
    StaticWaterLevel: "",
    StatisticWaterLevel: "",
    PumpingWaterLevelattheEndofthetest: "",
    Storativity: "",
    RecoveryPeriod: "",
    Transmassvity: "",
    B: "",
    C: "",
    TestDate3: "",
    PumpInstallationDepth3: "",
    DischargeRate: "",
    PumpingWaterLevel: "",
    PumpingDuration: "",
    RecomendationBasedon: "",
    GeologyRock: "",
    GeologyOverburden: "",
    selectedWorkLocation: "",
    selectedRSC: "",
    selectedWellType: "",
    selectedWellCondition: "",
  };
  const [formData, setFormData] = useState(initState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const a = {
      ...formData,
      selectedProvince,
      selectedDistrict,
      selectedDSDivision,
      selectedWorkLocation,
      selectedRSC,
      selectedWellType,
      selectedWellCondition,
      UserType,
      Methodofsurvey,
    };

    try {
      console.log(a);
      await API.addwell(a);
      navigateBack();
    } catch (error) {
      console.log(error);
    }
  };

  const [wellIdExists, setWellIdExists] = useState(false);
  useEffect(() => {
    const checkWellId = async () => {
      try {
        const data = await API.viewallwells();
        const wellExists = data?.data.some(
          (well) => well.newWellNo === formData.newWellNo
        );
        setWellIdExists(wellExists);
      } catch (error) {
        console.log(error);
      }
    };
    checkWellId();
  }, [formData.newWellNo]);

  const allowedRoles = ["Super", "Editor", "Admin"];
  if (!allowedRoles.includes(user.userRole)) {
    return <Navigate to="/404" />;
  }

  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className=" border border-gray-400 w-[95%] h-[500%] shadow-xl mx-auto p-6 flex flex-col">
            <button
              className="w-12 h-12 p-2 ml-auto text-3xl text-black rounded-full hover:bg-gray-300 hover:text-white focus:outline-none"
              onClick={navigateBack}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <WellData
              handleTypeChange={handleTypeChange}
              wellIdExists={wellIdExists}
              handleChange={handleChange}
              formData={formData}
              selectedWellType={selectedWellType}
              selectedProvince={selectedProvince}
              handleProvinceChange={handleProvinceChange}
              provinces={provinces}
              selectedDistrict={selectedDistrict}
              handleDistrictChange={handleDistrictChange}
              getDistrictsByProvince={getDistrictsByProvince}
              selectedDSDivision={selectedDSDivision}
              setSelectedDSDivision={setSelectedDSDivision}
              getDSDivisionByDistrict={getDSDivisionByDistrict}
              selectedWorkLocation={selectedWorkLocation}
              handleWorkLocationChange={handleWorkLocationChange}
              Worklocations={Worklocations}
              selectedRSC={selectedRSC}
              handleRSCChange={handleRSCChange}
              rscOptions={rscOptions}
              handleWellConditionChange={handleWellConditionChange}
              handleUserTypeChange={handleUserTypeChange}
              UserType={UserType}
              handleMethodofsurveyChange={handleMethodofsurveyChange}
              Methodofsurvey={Methodofsurvey}
            />

            {/* Selection section */}
            <div className="py-3 border-t border-gray-500">
              <div className="w-[100%] justify-center flex">
                <div className="flex">
                  <div
                    className={`p-2 text-white  border border-white rounded-l-2xl  ${
                      ChangeTab === "ChemicalData"
                        ? "bg-gray-500"
                        : "bg-gray-700 hover:bg-gray-500"
                    }`}
                    onClick={() => {
                      setChangeTab("ChemicalData");
                    }}
                  >
                    ChemicalData
                  </div>
                  <div
                    className={`p-2 text-white  border border-white   ${
                      ChangeTab === "GeologyOverburden"
                        ? "bg-gray-500"
                        : "bg-gray-700 hover:bg-gray-500"
                    }`}
                    onClick={() => {
                      setChangeTab("GeologyOverburden");
                    }}
                  >
                    GeologyOverburden
                  </div>
                  <div
                    className={`p-2 text-white  border border-white   ${
                      ChangeTab === "GeologyRock"
                        ? "bg-gray-500"
                        : "bg-gray-700 hover:bg-gray-500"
                    }`}
                    onClick={() => {
                      setChangeTab("GeologyRock");
                    }}
                  >
                    GeologyRock
                  </div>
                  <div
                    className={`p-2 text-white  border border-white   ${
                      ChangeTab === "PumpInstalation"
                        ? "bg-gray-500"
                        : "bg-gray-700 hover:bg-gray-500"
                    }`}
                    onClick={() => {
                      setChangeTab("PumpInstalation");
                    }}
                  >
                    PumpInstalation
                  </div>
                  <div
                    className={`p-2 text-white  border border-white   ${
                      ChangeTab === "RequestGeneral"
                        ? "bg-gray-500"
                        : "bg-gray-700 hover:bg-gray-500"
                    }`}
                    onClick={() => {
                      setChangeTab("RequestGeneral");
                    }}
                  >
                    RequestGeneral
                  </div>
                  <div
                    className={`p-2 text-white  border border-white  rounded-r-2xl  ${
                      ChangeTab === "Test"
                        ? "bg-gray-500"
                        : "bg-gray-700 hover:bg-gray-500"
                    }`}
                    onClick={() => {
                      setChangeTab("Test");
                    }}
                  >
                    Test
                  </div>
                </div>
              </div>
              <div className="w-[100%] mt-4">
                {ChangeTab === "ChemicalData" && (
                  <ChemicalData
                    handleChange={handleChange}
                    formData={formData}
                  />
                )}
                {ChangeTab === "GeologyOverburden" && (
                  <GeologyOverburden
                    handleChange={handleChange}
                    formData={formData}
                  />
                )}
                {ChangeTab === "GeologyRock" && (
                  <GeologyRock
                    handleChange={handleChange}
                    formData={formData}
                  />
                )}
                {ChangeTab === "PumpInstalation" && (
                  <PumpInstalation
                    handleChange={handleChange}
                    formData={formData}
                  />
                )}
                {ChangeTab === "RequestGeneral" && (
                  <RequestGeneral
                    handleChange={handleChange}
                    formData={formData}
                  />
                )}
                {ChangeTab === "Test" && (
                  <Test handleChange={handleChange} formData={formData} />
                )}
              </div>
            </div>
          </div>
          <div className="flex  w-[100%] my-5 px-10">
            <div
              onClick={navigateBack}
              className="flex justify-center w-32 p-2 ml-auto mr-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
            >
              Cancel
            </div>
            <button
              disabled={wellIdExists}
              type="submit"
              className={`flex justify-center p-2 text-white rounded-lg w-44  ${
                wellIdExists
                  ? "bg-gray-500 cursor-not-allowed "
                  : "bg-green-500 hover:bg-green-700"
              }`}
            >
              Add Well
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWell;
//done
