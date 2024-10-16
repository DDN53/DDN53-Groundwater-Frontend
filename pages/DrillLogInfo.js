import React from "react";
import WellsTable from "../components/DrillLog/InfoTable";
import Search from "../components/DrillLog/Search";
import Filter from "../components/DrillLog/Filter";
import { Navigate, useNavigate } from "react-router-dom";
import SortBy from "../components/DrillLog/SortBy";
import { allRSC, getRSCByNumber } from "../constants/RSC";
import { getUserDataFromToken } from "../utils/userValidation";
import { useState } from "react";
function DrillLogInfo() {
  const navigate = useNavigate();

  const userData = getUserDataFromToken().result;
  const [user, setUser] = useState(userData);

  if (!user) {
    return <Navigate to="/Login" />;
  }

  const allowedRoles = ["Super", "Editor", "Admin", "Viewer"];
  if (!allowedRoles.includes(user.userRole)) {
    return <Navigate to="/404" />;
  }
  console.log(getRSCByNumber(41));
  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
     <div className="flex flex-row justify-between">
        <div className="mt-4 ml-6">
          <SortBy />
        </div>
        <div className="flex-col justify-end py-3 pl-3 mr-3 border border-gray-300 rounded-lg">
          <div className="mb-2 text-sm font-medium text-gray-600">
            Filter by:
          </div>
          <Filter />
          <div className="mt-3">
            <Search />
          </div>
        </div>
      </div>
      <div className="m-6">
        {["Super", "Admin", "Editor"].includes(user.userRole) && (
        <button
        className="p-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-700"
        onClick={() => navigate("/adddrillloginfo")}
      >
        Add Drill Log Data
      </button>
      
        )}
      </div>
      <WellsTable />
    </div>
  );
}

export default DrillLogInfo;
