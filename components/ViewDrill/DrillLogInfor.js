import React from 'react'

export default function DrillLogInfor(props) {
    return (
        <div className="flex flex-row gap-8"> {/* Increased gap between columns */}
        
          {/* Column 1: DATE START, DATE FINISH, and FINAL DEPTH */}
          <div className="space-y-4 ml-16">
            <div>
              <label className="block text-gray-700 mb-1">Date Start</label>
              <input 
                type="date" 
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                value={props.data?.dateStart || ''}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Date Finish</label>
              <input 
                type="date" 
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                value={props.data?.dateFinish || ''}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">FINAL DEPTH (m)</label>
              <input
                type="text"
                className="p-2 border border-gray-500 rounded-md"
                value={props.data?.finalDepth || ''}
                readOnly
              />
            </div>
          </div>
      
          {/* Column 2: CASING DIA(mm) and CASING LENGTH(m) */}
          <div className="space-y-4 border-r border-gray-400 pr-7 ml-16"> {/* Added padding and margin */}
            <div>
              <label className="block text-gray-700 mb-1">Casing Dia (mm)</label>
              <input 
                type="text" 
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                value={props.data?.casingDia || ''}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Casing Length (m)</label>
              <input 
                type="text" 
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                value={props.data?.casingLength || ''}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">YIELD (lpm)</label>
              <input 
                type="text" 
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                value={props.data?.yield || ''}
                readOnly
              />
            </div>
          </div>
      
         
          {/* Column 3: DRILLING TYPE-OB-ROCK and SCREENS-FROM(m)-TO(m) */}
<div className="space-y-4 ml-24 w-[55%]"> {/* Set a suitable width */}
  <div>
    <label className="block text-gray-700 mb-1">Drilling Type - OB - Rock</label>
    <div className="grid grid-cols-2 gap-[13rem]">
      <input 
        type="text" 
        className="w-[6rem] p-2 border border-gray-500 rounded-md mr-2" 
        value={props.data?.drillingTypeOne || ''}
        readOnly
      />
      <input 
        type="text" 
        className="w-[6rem] p-2 border border-gray-500 rounded-md -ml-24" 
        value={props.data?.drillingTypeTwo || ''}
        readOnly
      />
    </div>
  </div>
  <div>
    <label className="block text-gray-700 mb-1">Screens - From (m) - To (m)</label>
    <div className="grid grid-cols-2 gap-2">
      <input 
        type="text" 
        className="w-full p-2 border border-gray-500 rounded-md" 
        value={props.data?.screensFrom || ''}
        readOnly
      />
      <input 
        type="text" 
        className="w-full p-2 border border-gray-500 rounded-md" 
        value={props.data?.screensTo || ''}
        readOnly
      />
    </div>
  </div>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700 mb-1">SWL (m)</label>
      <input 
        type="datetime-local" 
        className="w-full p-2 border border-gray-500 rounded-md" 
        value={props.data?.swl || ''}
        readOnly
      />
    </div>

    <div>
      <label className="block text-gray-700 mb-1">Final E.C</label>
      <input 
        type="text" 
        className="w-full p-2 border border-gray-500 rounded-md" 
        value={props.data?.finalEc || ''}
        readOnly
      />
    </div>
  </div>
</div>

        </div>
      );
      
      
}
