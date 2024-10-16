import React from "react";
import WellsTable from "../components/MonthlyInfo/InfoTable";
import Search from "../components/MonthlyInfo/Search";
import Filter from "../components/MonthlyInfo/Filter";
import { Navigate, useNavigate } from "react-router-dom";
import SortBy from "../components/MonthlyInfo/SortBy";
import { getUserDataFromToken } from "../utils/userValidation";
import { useState } from "react";

function MonthlyInfo() {
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
            className="p-[6px] bg-green-500 rounded-md text-white  hover:bg-green-700"
            onClick={() => navigate("/addmonthlyinfo")}
          >
            Add new Monthly Data
          </button>
        )}
      </div>
      <WellsTable />
    </div>
  );
}

export default MonthlyInfo;
