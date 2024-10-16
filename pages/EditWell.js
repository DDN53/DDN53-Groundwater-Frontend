import React, { useState, useEffect } from "react";
import { provinces, getDistrictsByProvince } from "../constants/Area";
import { districts, getDSDivisionByDistrict } from "../constants/dsDivisions";
import ChemicalData from "../components/AddWell/ChemicalData";
import GeologyOverburden from "../components/AddWell/GeologyOverburden";
import GeologyRock from "../components/AddWell/GeologyRock";
import PumpInstalation from "../components/AddWell/PumpInstalation";
import RequestGeneral from "../components/AddWell/RequestGeneral";
import Test from "../components/AddWell/Test";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/index";
import { getUserDataFromToken } from "../utils/userValidation";
import WellData from "../components/AddWell/WellData";
import { Worklocations } from "../constants/WorkLocations";
import { allRSC, getRSCByNumber, getRSCById } from "../constants/RSC";

function EditWell(props) {
  const userData = getUserDataFromToken().result;
  const [user, setUser] = useState(userData);
  // for page relaod
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message =
        "Are you sure you want to leave? You may lose unsaved data.";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
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
  //

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

  //for change tabs
  const [ChangeTab, setChangeTab] = useState("ChemicalData");

  // for select province district gs
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedDSDivision, setSelectedDSDivision] = useState();

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
  //

  const navigate = useNavigate();
  const wellId = useSelector((state) => state.wellId);

  const [formData, setFormData] = useState({});

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const data = await api.viewwell(wellId);
          await setFormData(data?.data);
          console.log("well data:", formData);

          setTimeout(() => {
            setSelectedProvince(data?.data.selectedProvince);
            setSelectedWorkLocation(parseInt(data?.data.selectedWorkLocation));
            setSelectedWellType(data?.data.selectedWellType);
            setSelectedWellCondition(data?.data.selectedWellCondition);
            setUserType(data?.data.UserType);
            setMethodofsurvey(data?.data.Methodofsurvey);
          }, 100);

          setTimeout(() => {
            setSelectedDistrict(data?.data.selectedDistrict);
          }, 200);

          setTimeout(() => {
            setSelectedDSDivision(data?.data.selectedDSDivision);
          }, 300);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    },
    [wellId],
    rscOptions
  );
  useEffect(() => {
    setTimeout(() => {
      if (formData.selectedWorkLocation !== "") {
        const rscArray = getRSCByNumber(formData.selectedWorkLocation);
        setRscOptions(rscArray);
      }
    }, 200);

    setTimeout(() => {
      setSelectedRSC(parseInt(formData.selectedRSC));
    }, 300);
  }, [formData]);

  const [wellIdExists, setWellIdExists] = useState(false);
  useEffect(() => {
    const checkWellId = async () => {
      try {
        if (wellId === formData.newWellNo) {
          setWellIdExists(false);
        } else {
          const data = await api.viewallwells();
          const wellExists = data?.data.some(
            (well) => well.newWellNo === formData.newWellNo
          );
          setWellIdExists(wellExists);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkWellId();
  }, [wellId, formData.newWellNo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!wellId) {
    return <Navigate to="/404" />;
  }
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
    const b = {
      id: formData.id,
      newData: a,
    };
    console.log("welldata", b);
    try {
      await api.editwell(b);

      navigate("/wellinfo");
    } catch (error) {
      console.log(error);
    }
  };

  const allowedRoles = ["Super", "Editor", "Admin"];
  if (!allowedRoles.includes(user.userRole)) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className=" border border-gray-400 w-[95%] h-[500%] shadow-xl mx-auto p-6 flex flex-col">
            <button
              className="w-12 h-12 p-2 ml-auto text-3xl text-black rounded-full hover:bg-gray-300 hover:text-white focus:outline-none"
              onClick={() => navigate("/wellinfo")}
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
              getRSCByNumber={getRSCByNumber}
              rscOptions={rscOptions}
              handleWellConditionChange={handleWellConditionChange}
              selectedWellCondition={selectedWellCondition}
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
              onClick={() => navigate("/wellinfo")}
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
              Edit Well
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditWell;
