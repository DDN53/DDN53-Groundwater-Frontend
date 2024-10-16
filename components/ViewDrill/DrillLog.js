import React from 'react';

function DrillLog(props) {
  return (
    <div className="overflow-x-auto">
      {props.drillLogs ? (
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Rod No</th>
              <th className="px-4 py-2">Start Time / Finish Time (Duration min)</th>
              <th className="px-4 py-2">Drill Bit No & Dia Hammer Type</th>
              <th className="px-4 py-2">Depth (m)</th>
              <th className="px-4 py-2">Yield</th>
              <th className="px-4 py-2">EC (us/cm)</th>
              <th className="px-4 py-2">Fracture Depth (m)</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.drillLogs.map((log, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
                <td className="px-4 py-2">{log.date}</td>
                <td className="px-4 py-2">{log.rodNo}</td>
                <td className="px-4 py-2">{`${log.startDrillTime} / ${log.finishDrillTime} (${log.duration})`}</td>
                <td className="px-4 py-2">{log.drillBitNo}</td>
                <td className="px-4 py-2">{log.depth}</td>
                <td className="px-4 py-2">{log.yieldValue}</td>
                <td className="px-4 py-2">{log.ecValue}</td>
                <td className="px-4 py-2">{log.fractureDepth}</td>
                <td className="px-4 py-2">{log.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No drill logs available</p>
      )}
    </div>
  );
}

export default DrillLog;
