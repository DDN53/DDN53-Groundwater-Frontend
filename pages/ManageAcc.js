import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserDataFromToken } from "../utils/userValidation";

function ManageAcc() {
  const userData = getUserDataFromToken().result;
  const [user, setUser] = useState(userData);

  const allowedRoles = ["LOCAL"];
  if (!allowedRoles.includes(user.mode)) {
    return <Navigate to="/404" />;
  }
  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <div className="border border-gray-500 m-5 p-5">
        <p className="text-xl font-bold">
          Change Password | User - {user.userName}
        </p>
        <div>
          <form>
            <div className="">
              <input
                type="password"
                className="text-3xl w-52 border border-gray-500 rounded-md px-2 "
              ></input>
            </div>
            <div className=""></div>
            <div className=""></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageAcc;
