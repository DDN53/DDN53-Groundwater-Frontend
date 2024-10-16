import React, { useState, useEffect } from "react";
import { usePDF } from "react-to-pdf";
import ChemicalData from "../components/ViewWell/ChemicalData";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../api/index";
import { getUserDataFromToken } from "../utils/userValidation";

import { useSelector } from "react-redux";
import WellData from "../components/ViewWell/WellData";
import MonthlyInfo from "../components/ViewMonthlyInfo/MonthlyInfo";
import WHPA4GW from "../components/ViewMonthlyInfo/WHPA4GW";
import OtherDetails from "../components/ViewMonthlyInfo/OtherDetails";
import PumpDetails from "../components/ViewMonthlyInfo/PumpDetails";

function AddMonthlyInfo() {
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

  const SampleId = useSelector((state) => state.SampleId);
  console.log('samplae id',SampleId);
  // for use nav
  const navigate = useNavigate();

  //for form data
  const [formData, setFormData] = useState({});
  const [selectedWell, setSelectedWell] = useState("");
  const [wellFormData, setWellFormData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.viewmonthlydata(SampleId);
        console.log('data',data);
        await setFormData(data?.data);
        await setWellFormData(data?.Well?.data);
        await console.log(formData);
        await console.log(formData.newWellNo);
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

  const [wellData, setwellData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (formData.newWellNo !== undefined && formData.newWellNo) {
        const data = await API.viewwell(formData.newWellNo);
        setwellData(data?.data);
      }
    };

    fetchData();
  }, [selectedWell]);

  const currentDate = new Date();
  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const formattedDate = formatter.format(currentDate);
  const sanitizedDate = formattedDate.replace(/[/:]/g, "_");
  const { toPDF, targetRef } = usePDF({
    filename: `${formData.SampleDate}_Monthly_Well_Information_${formData.newWellNo} ,${sanitizedDate}.pdf`,
  });
  const monthFormatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const monthFormattedDate = monthFormatter.format(currentDate);
  const sanitizedMonthDate = monthFormattedDate.replace(/[/:]/g, "/");

  const allowedRoles = ["Super", "Editor", "Admin", "Viewer"];
  if (!allowedRoles.includes(user.userRole)) {
    return <Navigate to="/404" />;
  }

  if (!SampleId) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <div>
        <div className="flex  w-[100%] my-5 px-10">
          <div
            onClick={() => navigate("/monthlyinfo")}
            className="flex justify-center w-32 p-2 ml-auto mr-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
          >
            Cancel
          </div>
          <button
            className="flex justify-center w-32 p-2 mr-3 text-white bg-red-500 rounded-lg hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault();
              toPDF();
            }}
          >
            Download PDF
          </button>
        </div>
        <div ref={targetRef}>
          <form>
            <div className="flex mb-3 mx-auto w-[95%]">
              {sanitizedMonthDate} | ID - [{SampleId}]
            </div>
            <div className=" border border-gray-400 w-[95%] h-[500%] shadow-xl mx-auto p-6 flex flex-col">
              {/* <div className="flex items-center w-full h-10 p-1 pl-2 bg-gray-300 ">
                Well Infomation
              </div> */}

              <div className="bg-gray-100">
                <WellData formData={wellData} />
              </div>
              <div className="border-t border-gray-500"></div>

              <div className="flex items-center w-full h-10 p-1 pl-2 mt-5 bg-gray-300 ">
                Monthly Data
              </div>
              <div className="p-3 border border-gray-400">
                {/* Monthly Info */}
                <div className="py-3 border-t border-gray-500">
                  <div className="w-[100%] justify-center flex"></div>
                  <div className="w-[30%] mt-4">
                    {/*  */}
                    <MonthlyInfo formData={formData} />
                  </div>
                </div>
                <div className="py-3 border-t border-gray-500">
                  <div className="w-[100%] mt-4">
                    <ChemicalData formData={formData} />
                  </div>
                </div>
                <div className="py-3 border-t border-gray-500">
                  <div className="w-[100%] mt-4">
                    <PumpDetails formData={formData} />
                  </div>
                </div>
                <div className="py-3 border-t border-gray-500">
                  <div className="w-[100%] mt-4">
                    <OtherDetails formData={formData} />
                  </div>
                </div>
                <div className="py-3 border-t border-gray-500">
                  <div className="w-[100%] mt-4">
                    <WHPA4GW formData={formData} />
                  </div>
                </div>
                <div className="py-3 border-t border-gray-500">
                  <div className="w-[100%] justify-center flex"></div>
                  <div className="w-[100%] mt-4">
                    <p className="w-full h-[300px] p-2 border border-gray-500 rounded-md ">
                      {formData.Note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMonthlyInfo;
//done
