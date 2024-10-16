import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import ChemicalData from "../components/ViewWell/ChemicalData";
import GeologyOverburden from "../components/ViewWell/GeologyOverburden";
import GeologyRock from "../components/ViewWell/GeologyRock";
import PumpInstalation from "../components/ViewWell/PumpInstalation";
import RequestGeneral from "../components/ViewWell/RequestGeneral";
import Test from "../components/ViewWell/Test";
import api from "../api/index";
import { usePDF } from "react-to-pdf";
import { getUserDataFromToken } from "../utils/userValidation";
import WellData from "../components/ViewWell/WellData";

function ViewWell() {
  const wellId = useSelector((state) => state.wellId);
  // for use nav
  const navigate = useNavigate();

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
    filename: `Well_Information_${wellId} ,${sanitizedDate}.pdf`,
  });
  const monthFormatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const monthFormattedDate = monthFormatter.format(currentDate);
  const sanitizedMonthDate = monthFormattedDate.replace(/[/:]/g, "/");

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.viewwell(wellId);
      setFormData(data?.data);
    };
    fetchData();
  }, [wellId]);

  const userData = getUserDataFromToken().result;
  const [user, setUser] = useState(userData);

  const allowedRoles = ["Super", "Editor", "Admin", "Viewer"];
  if (!allowedRoles.includes(user.userRole)) {
    return <Navigate to="/404" />;
  }

  //   useEffect(() => {
  //     toPDF();
  //   }, []);

  if (!wellId) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="">
      <div
        className="min-h-full min-w-[1080px]"
        style={{ minHeight: "calc(100vh - 347px)" }}
      >
        <div className="flex  w-[100%] my-5 px-10">
          <div
            onClick={() => navigate("/wellinfo")}
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
              {sanitizedMonthDate}
            </div>
            <div className=" border border-gray-400 w-[95%] h-[500%] shadow-xl mx-auto p-6 flex flex-col">
              {/* WellData */}
              <WellData formData={formData} />
              {/* ChemicalData */}
              <div className="w-[100%] mt-4">
                {<ChemicalData formData={formData} />}
              </div>
              {/* GeologyOverburden */}
              <div className="w-[100%] mt-4">
                {<GeologyOverburden formData={formData} />}
              </div>
              {/* GeologyRock */}
              <div className="w-[100%] mt-4">
                {<GeologyRock formData={formData} />}
              </div>
              {/* PumpInstalation */}
              <div className="w-[100%] mt-4">
                {<PumpInstalation formData={formData} />}
              </div>
              {/* RequestGeneral */}
              <div className="w-[100%] mt-4">
                {<RequestGeneral formData={formData} />}
              </div>
              {/* Test */}
              <div className="w-[100%] mt-4">
                {<Test formData={formData} />}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ViewWell;
//done
