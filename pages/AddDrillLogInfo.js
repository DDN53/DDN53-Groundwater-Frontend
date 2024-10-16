import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { Link } from "react-router-dom";
import { Navigate,useNavigate } from "react-router-dom";
import API from "../api/index";
import WellData from "../components/ViewWell/WellData";
import { getUserDataFromToken } from "../utils/userValidation";



const customStyles = {
  control: (base) => ({
    ...base,
    minHeight: '34px',
    height: '34px',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '4px',
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: '4px',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0px 6px',
  }),
  input: (base) => ({
    ...base,
    margin: '0px',
  }),
};


function WellForm() {
  const userData = getUserDataFromToken().result;
  const [user] = useState(userData);
 
  const [wellOptions, setWellOptions] = useState([ ]);
  const [projectOffice, setProjectOffice] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState(""); 
  const [dsDivision, setDsDivision] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [selectedWell, setSelectedWell] = useState("");
  const [drillLogs, setDrillLogs] = useState([{ rodNo: '' }]);
  const [wellData, setwellData] = useState({});

  
  



const handleSave = async () => {
  try {
    if (!selectedWell?.label) {
      console.log('Please select a well number before saving drill logs.');
      return;
    }

    const data = {
      newWellNo: selectedWell.label,
      drillLogs: drillLogs,
    };

  
    console.log('Payload being sent to API:', JSON.stringify(data, null, 2));

    const response = await API.adddrill(data);
    console.log('API request completed. Response:', response);

   
    if (response && response.data) {
    
      if (response.data.message === 'Drill logs saved successfully') {
        console.log('Drill logs saved successfully');
      } else {
        console.log("Failed to save drill logs: ${response.data.message || 'Unknown error occurred'}");
      }
    } else {
      console.error('Invalid response:', response);
    }
  } catch (error) {
    
    if (error.response) {
      const { data } = error.response;
      //console.error(`Error status: ${status}, Response data:`, data);
      console.log(`Error saving drill logs: ${data?.message || 'Unknown server error'}`);
    } else {
      console.log('An unexpected error occurred. Please try again.');
    }
  }

};


const handleCancel = () => {
  navigate("/Home");  
};
const [wellInfo, setWellInfo] = useState(false);
 
  useEffect(() => {
    const fetchWellOptions = async () => {
      try {
       // Use the viewallwells function
        const wells = await API.viewallwells();
        console.log(wells);
        const options = wells.data.map(well => ({
          value: well.wellId,
          label: well.newWellNo
        }));
       console.log(options);
        
        setWellOptions(options); 
      } catch (error) {
        console.error("Error fetching well options:", error);
        setWellOptions([]); 
      }
    };
    fetchWellOptions();
  }, []);
  
  const navigate = useNavigate();

  
  


  const fetchWellDetails = async () => {
    if (!selectedWell?.label) {
      console.log('Please select a well number to fetch details.');
      return;
    }
  
    try {
      const response = await API.viewwell(selectedWell.label); // Use optional chaining
      console.log("Response from API:", response);
  
      if (response && response.data) {
        const details = response.data;
        console.log("Well details:", details);
  
        setProjectOffice(details.ProjectOffice || "N/A");
        setDistrict(details.selectedDistrict || "N/A");
        setVillage(details.Village || "N/A");
        setDsDivision(details.selectedDSDivision || "N/A");
        setLocation(details.Location || "N/A");
      } else {
        console.log("No well details found.");
      }
    } catch (error) {
      console.error("Error fetching well details:", error);
    }
  };
  
fetchWellDetails();  


useEffect(() => {
  const fetchData = async () => {
    if (selectedWell) {
      const data = await API.viewwell(selectedWell.label);
      setwellData(data?.data);
    }
  };

  fetchData();
}, [selectedWell]);
  
  
  
  const handleWellSelect = (selectedOption) => {
    setSelectedWell(selectedOption);
  };
  const addRow = (log) => {
    setDrillLogs((prevLogs) => [
      ...prevLogs,
      {
        date: log?.date || '',                      // Default to empty string if undefined
        rodNo: log?.rodNo || '',                    // Rod number
        startDrillTime: log?.startDrillTime || '',  // Start drill time
        finishDrillTime: log?.finishDrillTime || '',// Finish drill time
        duration: log?.duration || '',              // Duration
        drillBitNo: log?.drillBitNo || '',          // Drill bit number
        hammerType: log?.hammerType || '',          // Hammer type (missing from original)
        depth: log?.depth || '',                    // Depth
        yieldValue: log?.yieldValue || '',          // Yield value
        ecValue: log?.ecValue || '',                // EC value
        fractureDepth: log?.fractureDepth || '',    // Fracture depth
        description: log?.description || '',        // Description
        soilSampleCollected: log?.soilSample?.collected || '',       // Soil sample collected
        soilSampleDealerName: log?.soilSample?.dealerName || '',     // Soil sample dealer name
        soilSampleSignature: log?.soilSample?.signature || '',       // Soil sample signature
        waterSampleCollected: log?.waterSample?.collected || '',     // Water sample collected
        waterSampleOicName: log?.waterSample?.oicName || '',         // Water sample OIC name
        waterSampleSignature: log?.waterSample?.signature || '',     // Water sample signature
      }
    ]);
  };
  
  
  const allowedRoles = ["Super", "Editor", "Admin"];
  if (!allowedRoles.includes(user.userRole)) {
    return <Navigate to="/404" />;
  }


 
  const handleInputChange = (index, field, value, subfield = null) => {
    const updatedLogs = [...drillLogs];
  
    if (subfield) {
      // Handle nested objects like soilSample and waterSample
      updatedLogs[index][field] = {
        ...updatedLogs[index][field],
        [subfield]: value,
      };
    } else {
      // Handle regular fields
      updatedLogs[index][field] = value;
    }
  
    // Add new log entry when 'rodNo' is filled in for the last item and no duplication
    if (field === 'rodNo' && value !== '' && index === drillLogs.length - 1) {
      updatedLogs.push({
        date: '',
        rodNo: '',
        startDrillTime: '',
        finishDrillTime: '',
        duration: '',
        drillBitNo: '',
        depth: '',
        yieldValue: '',
        ecValue: '',
        fractureDepth: '',
        description: '',
        soilSampleCollected: '',
        soilSampleDealerName: '',
        soilSampleSignature: '',
        waterSampleCollected: '',
        waterSampleOicName: '',
        waterSampleSignature: '',
      });
    }
  
    setDrillLogs(updatedLogs);
  };
  
  
 
  
  
  
  
  const saveDrillLogs = async () => {
    try {
      if (!selectedWell?.label) {
        console.log('Please select a well number before saving drill logs.');
        return;
      }
  
      const data = {
        newWellNo: selectedWell.label,
        drillLogs: drillLogs,
      };
  
  
  
      const response = await API.adddrill(data);
      console.log('API request completed. Response:', response);
      
      if (response && response.data) {
        if (response.data.message === 'Drill logs saved successfully') {
          console.log('Drill logs saved successfully');
        } else {
          console.log(`Failed to save drill logs: ${response.data.message || 'Unknown error occurred'}`);
        }
      } else {
        console.error('Invalid response:', response);
      }
    } catch (error) {
      console.error('Error saving drill logs:', error);
      if (error.response) {
        const { status, data } = error.response;
        console.error(`Error status: ${status}, Response data:`, data);
        console.log(`Error saving drill logs: ${data?.message || 'Unknown server error'}`);
      } else {
        console.log('An unexpected error occurred. Please try again.');
      }
    }
  };
  
  
  

  return (
    <div className="border border-gray-400 w-[95%] h-[500%] shadow-xl mx-auto p-6 flex flex-col rounded-sm">
      <div className="border-b border-gray-400">
        <div className="flex flex-row-reverse items-center space-x-4">
          <div className="w-[26%] p-4 border border-gray-300 rounded-md ">
            <div className="flex items-center whitespace-nowrap">
              <p className="mr-2">New Well No:</p>
              <Select
  options={wellOptions} 
  styles={customStyles}
  value={selectedWell}
  onChange={handleWellSelect}
  placeholder="Select Well Number"
  isSearchable={true}                 // Makes the dropdown searchable
  isClearable={true}                  // Allow clearing the selected value
  noOptionsMessage={() => "No wells available"} 
  required
/>

            </div>

            <div className="flex items-center mt-5">
              <p>Can't Find Well Number?</p>
              <Link
                to="/addwell"
                className="ml-6 text-blue-500 underline hover:text-blue-900"
              >
                Add Well
              </Link>
            </div>
          </div>
        </div>

        <div className="w-[80%] mx-auto">
          {/* Reduce width and center align */}

          <div className="grid grid-cols-2 gap-8 w-2/3 -mt-28 ml-2 p-4 ">
            {/* First Column */}
            <div className="space-y-4 ">
              <div>
                <label className="block text-gray-700">Project Office</label>
                <p id="projectOffice" className="p-2 border border-gray-500 rounded-md w-[68%]">
  {projectOffice || "Project Office"} {/* Show default placeholder text if projectOffice is empty */}
</p>


              </div>
              <div>
                <label className="block text-gray-700">District</label>
                <p
  id="District"
  className="p-2 border border-gray-500 rounded-md w-[68%]">
  {district || "District"}
</p>
              </div>
              <div>
                <label className="block text-gray-700">Village</label>
                <p
    id="village" // Added id for better accessibility
    className="p-2 border border-gray-500 rounded-md w-[68%]">
    {village || "Village"}
  </p>
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-4 ml-2">
              <div>
                <label className="block text-gray-700">DS Division</label>
                <p
   id=" DS Division"
   className="p-2 border border-gray-500 rounded-md w-[68%]">
   {dsDivision || "division"}
</p>

              </div>
              <div>
                <label className="block text-gray-700">Location</label>
                <p
   id=" DS Division"
   className="p-2 border border-gray-500 rounded-md w-[68%]">
 {location || "location"}
</p>

              </div>
            </div>
          </div>



        </div>
      </div>
      {selectedWell && (
              
              <div className="flex items-center w-full p-1 pl-2 bg-primary3 rounded-lg">
             
                {wellInfo === false && (
                  <>Well Infomation | Well Number : {selectedWell.label}</>
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
      {drillLogs.slice(0, 1).map((log, index) => ( 
  <div className="w-[80%] mx-auto mt-4" key={index}>
    <div className="grid grid-cols-3 gap-6 p-4">
      
      {/* Column 1: DATE START, DATE FINISH, and FINAL DEPTH */}
      <div className="space-y-4 ml-2">
        <div>
          <label className="block text-gray-700 mb-1">Date Start</label>
          <input 
            type="date" 
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={log.dataStart || ''} 
            onChange={(e) => handleInputChange(index, 'dataStart', e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Date Finish</label>
          <input 
            type="date" 
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={log.dataFinish || ''} 
            onChange={(e) => handleInputChange(index, 'dataFinish', e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">FINAL DEPTH (m)</label>
          <input
            type="text"
            className="p-2 border border-gray-500 rounded-md"
            placeholder="Enter Final Depth"
            value={log.finalDepth || ''} 
            onChange={(e) => handleInputChange(index, 'finalDepth', e.target.value)} 
          />
        </div>
      </div>

      {/* Column 2: CASING DIA(mm) and CASING LENGTH(m) */}
      <div className="space-y-4 border-r border-gray-400 pr-4 ml-4">
        <div>
          <label className="block text-gray-700 mb-1">Casing Dia (mm)</label>
          <input 
            type="text" 
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
            placeholder="Enter Casing Diameter" 
            value={log.casingDia || ''} 
            onChange={(e) => handleInputChange(index, 'casingDia', e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Casing Length (m)</label>
          <input 
            type="text" 
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
            placeholder="Enter Casing Length" 
            value={log.casingLength || ''} 
            onChange={(e) => handleInputChange(index, 'casingLength', e.target.value)} 
          />
        </div>
        <div>
  <label className="block text-gray-700 mb-1">YIELD (lpm)</label>
  <input 
    type="text" 
    className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
    placeholder="Enter Yield (lpm)" 
    value={log.yieldLpm || ''} 
    onChange={(e) => handleInputChange(index, 'yieldLpm', e.target.value)} 
  />
</div>

      </div>

      {/* Column 3: DRILLING TYPE-OB-ROCK and SCREENS-FROM(m)-TO(m) */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Drilling Type - OB - Rock</label>
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-500 rounded-md" 
              placeholder="Type One" 
              value={log.drillingTypeOne || ''} 
              onChange={(e) => handleInputChange(index, 'drillingTypeOne', e.target.value)} 
            />
            <input 
              type="text" 
              className="w-full p-2 border border-gray-500 rounded-md" 
              placeholder="Type Two" 
              value={log.drillingTypeTwo || ''} 
              onChange={(e) => handleInputChange(index, 'drillingTypeTwo', e.target.value)} 
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Screens - From (m) - To (m)</label>
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-500 rounded-md" 
              placeholder="From" 
              value={log.screenFrom || ''} 
              onChange={(e) => handleInputChange(index, 'screenFrom', e.target.value)} 
            />
            <input 
              type="text" 
              className="w-full p-2 border border-gray-500 rounded-md" 
              placeholder="To" 
              value={log.screenTo || ''} 
              onChange={(e) => handleInputChange(index, 'screenTo', e.target.value)} 
            />
          </div>
        </div>
        <div>
        <label className="text-gray-700"></label>
<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 mb-1">SWL (m)</label>
    <input 
    type="datetime-local" 
      className="w-full p-2 border border-gray-500 rounded-md" 
      placeholder="Enter SWL From" 
      value={log.swlDateTime || ''} 
      onChange={(e) => handleInputChange(index, 'swlDateTime', e.target.value)} 
    />
  </div>

  <div>
    <label className="block text-gray-700 mb-1">Final E.C</label>
    <input 
      type="text" 
      className="w-full p-2 border border-gray-500 rounded-md" 
      placeholder="Enter Final E.C" 
      value={log.finalEc || ''} 
      onChange={(e) => handleInputChange(index, 'finalEc', e.target.value)} 
    />
  </div>
</div>

        </div>
      </div>
    </div>
  </div>
))};





<div className="border border-gray-400 w-[100%] shadow-xl mx-auto p-6 flex flex-col rounded-sm">

{/* Drill Log Table */}
<div className="mt-8">
  <h2 className="text-xl font-bold mb-4">Drill Log Table</h2>
  <table className="min-w-full bg-white border border-gray-400">
    <thead className="bg-gray-200">
      <tr>
        <th className="border px-4 py-2 font-medium">Date</th>
        <th className="border px-4 py-2 font-medium">Rod No</th>
        <th className="border px-4 py-2 font-medium">Start Time / Finish Time (Duration min)</th>
        <th className="border px-4 py-2 font-medium">Drill Bit No & Dia Hammer Type</th>
        <th className="border px-4 py-2 font-medium">Depth (m)</th>
        <th className="border px-4 py-2 font-medium">Yield</th>
        <th className="border px-4 py-2 font-medium">EC (us/cm)</th>
        <th className="border px-4 py-2 font-medium">Fracture Depth (m)</th>
        <th className="border px-4 py-2 font-medium">Description</th>
      </tr>
    </thead>
    <tbody>
      {drillLogs.map((log, index) => (
        <React.Fragment key={index}>
          {/* Main Drill Log Row */}
          <tr className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
            <td className="border px-4 py-2">
              <input
                type="date"
                className="w-24 p-2 border border-gray-500 rounded-md"
                placeholder="Date"
                value={log.date}
                onChange={(e) => handleInputChange(index, "date", e.target.value)}
               
              />
            </td>
            <td className="border px-4 py-2">
            <input
  type="text"
  className="w-24 p-2 border border-gray-500 rounded-md"
  placeholder={`Rod No ${index + 1}`}
  value={log.rodNo || ''}
  onChange={(e) => handleInputChange(index, e.target.value)}
  
/>


            </td>
            <td className="border px-4 py-2">
              <div className="flex flex-col space-y-2 w-6">
                <input
                  type="text"
                  placeholder="Start Time"
                  className="w-24 p-2 border border-gray-500 rounded-md"
                  value={log.startDrillTime || ''}
                  onChange={(e) => handleInputChange(index, "startDrillTime", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Finish Time"
                  className="w-24 p-2 border border-gray-500 rounded-md"
                  value={log.finishDrillTime || ''}
                  onChange={(e) => handleInputChange(index, "finishDrillTime", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  className="w-24 p-2 border border-gray-500 rounded-md"
                  value={log.duration || ''}
                  onChange={(e) => handleInputChange(index, "duration", e.target.value)}
                />
              </div>
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                className="w-24 p-2 border border-gray-500 rounded-md"
                value={log.drillBitNo || ''}
                onChange={(e) => handleInputChange(index, "drillBitNo", e.target.value)}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                className="w-24 p-2 border border-gray-500 rounded-md"
                value={log.depth || ''}
                onChange={(e) => handleInputChange(index, "depth", e.target.value)}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                className="w-24 p-2 border border-gray-500 rounded-md"
                value={log.yieldValue || ''}
                onChange={(e) => handleInputChange(index, "yieldValue", e.target.value)}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                className="w-24 p-2 border border-gray-500 rounded-md"
                value={log.ecValue || ''}
                onChange={(e) => handleInputChange(index, "ecValue", e.target.value)}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                className="w-24 p-2 border border-gray-500 rounded-md"
                value={log.fractureDepth || ''}
                onChange={(e) => handleInputChange(index, "fractureDepth", e.target.value)}
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                className="w-24 p-2 border border-gray-500 rounded-md"
                value={log.description || ''}
                onChange={(e) => handleInputChange(index, "description", e.target.value)}
              />
            </td>
          </tr>
        </React.Fragment>
      ))}
    {drillLogs.slice(0, 1).map((log, index) => (
  <React.Fragment key={index}>
    {/* Soil Sample Sub-Row */}
    <tr className="bg-gray-200">
      <td colSpan={9} className="border px-4 py-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="font-normal mb-2">Soil Sample Collected/Not Collected:</label>
            <input
              type="text"
              className="p-2 border border-gray-500 rounded-md w-1/2"
              value={log.soilSample?.collected || ''}
              onChange={(e) => handleInputChange(index, "soilSample", e.target.value, "collected")}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-normal mb-2">Dealer Name:</label>
            <input
              type="text"
              className="p-2 border border-gray-500 rounded-md w-1/2"
              value={log.soilSample?.dealerName || ''}
              onChange={(e) => handleInputChange(index, "soilSample", e.target.value, "dealerName")}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-normal mb-2">Signature:</label>
            <input
              type="text"
              className="p-2 border border-gray-500 rounded-md w-1/2"
              value={log.soilSample?.signature || ''}
              onChange={(e) => handleInputChange(index, "soilSample", e.target.value, "signature")}
            />
          </div>
        </div>
      </td>
    </tr>

    {/* Water Sample Sub-Row */}
    <tr className="bg-gray-200">
      <td colSpan={9} className="border px-4 py-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="font-normal mb-2">Water Sample Collected/Not Collected:</label>
            <input
              type="text"
              className="p-2 border border-gray-500 rounded-md w-1/2"
              value={log.waterSample?.collected || ''}
              onChange={(e) => handleInputChange(index, "waterSample", e.target.value, "collected")}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-normal mb-2">OIC's (DR) Name:</label>
            <input
              type="text"
              className="p-2 border border-gray-500 rounded-md w-1/2"
              value={log.waterSample?.oicName || ''}
              onChange={(e) => handleInputChange(index, "waterSample", e.target.value, "oicName")}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-normal mb-2">Signature:</label>
            <input
              type="text"
              className="p-2 border border-gray-500 rounded-md w-1/2"
              value={log.waterSample?.signature || ''}
              onChange={(e) => handleInputChange(index, "waterSample", e.target.value, "signature")}
            />
          </div>
        </div>
      </td>
    </tr>
  </React.Fragment>
))}

    </tbody>
    
  </table>
  
</div>

<div>
  <button
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    onClick={addRow}
  >
    Add Row
  </button>
</div>

<div className="flex w-[100%] my-5 px-10">
  <div
    className="flex justify-center w-32 p-2 ml-auto mr-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
    onClick={handleCancel}
  >
    Cancel
  </div>
  <button
  type="submit"
  onClick={async (e) => {
    e.preventDefault(); // Prevent the default form submission
    await saveDrillLogs();
    handleSave(); // Call handleSave directly, if you want to do it regardless of the save result
    navigate("/additionalinfo");
  }}
  className="flex justify-center p-2 text-white rounded-lg w-44 bg-green-500 hover:bg-green-700"
>
  Add Drill Log Data
</button>
</div>
</div>

    </div>
  );
}

export default WellForm;
