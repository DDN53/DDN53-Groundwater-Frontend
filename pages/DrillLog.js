import React from "react";
import { allRSC, getRSCByNumber } from "../constants/RSC";
function AdditionalInfo() {
  console.log(getRSCByNumber(41));
  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      AdditionalInfo
    </div>
  );
}

export default AdditionalInfo;
