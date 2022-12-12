import React, { useContext } from 'react';
import RecordsContext from '../../context/recordsContext';
import StatsContext from '../../context/statsContext';

const FilterPanel = () => {
  const { APIresult, displayRecords } = useContext(RecordsContext);
  const [result] = APIresult;
  const [, setRecords] = displayRecords;
  const [stats] = useContext(StatsContext);

  const filterRecords = (header, value) => {
    const newRecords = result.filter((record) => String(record[header]) === String(value));
    setRecords(newRecords);
  };

  const clearFilter = () => {
    setRecords(result);
  };

  return (
    <div className="w-1/6">
      <ul>
        <li><button type="button" onClick={() => clearFilter()} className="font-semibold text-lg text-blue-700 mb-2">See All</button></li>
        {Object.keys(stats).map((header) => (
          <li key={header}>
            <span className="text-lg font-bold">{header}</span>
            <ul className="mt-1 text-blue-800">
              {Object.keys(stats[header]).map((value) => (
                <li key={value}>
                  <button type="button" onClick={() => filterRecords(header, value)}>
                    {value}
                    :
                    (
                    {stats[header][value]}
                    )
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FilterPanel;
