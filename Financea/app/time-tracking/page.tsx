// components/TimeEntryList.tsx
import { FC } from "react";
import { FaRegFileAlt } from "react-icons/fa";

interface Entry {
  id: number;
  description?: string;
  project: string;
  time: string;
  duration: string;
  hasFile?: boolean;
}

const entries: Entry[] = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  project: "Web Design",
  time: "9:30 am - 9:34 am",
  duration: "0:04:00",
  hasFile: i === 1 || i === 2,
}));

const TimeEntryList: FC = () => {
  return (
    <div className="w-full bg-white p-4 rounded-md overflow-x-auto">
      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:justify-end gap-2">
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>Project</option>
          </select>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>Client</option>
          </select>
          <button className="border rounded-md px-2 py-1 text-sm">Last 15 days</button>
          <button className="border rounded-md px-2 py-1 text-sm">📅</button>
        </div>
      </div>

      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex flex-col md:flex-row md:justify-between md:items-center border md:border-b md:rounded-none rounded-lg shadow-sm md:shadow-none p-4 md:py-5 mb-4 md:mb-0 text-sm md:text-md"
        >
          {/* Left Section */}
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
            />
            <div className="border border-black rounded px-2 py-1 text-center w-8">
              5
            </div>
            <span className="text-gray-400">Add Description</span>

            {entry.hasFile ? (
              <FaRegFileAlt className="text-gray-600 ml-2 md:ml-4 text-sm md:text-md" />
            ) : (
              <>
                <div className="h-2 w-2 rounded-full bg-purple-700 ml-2 md:ml-4" />
                <span className="ml-1">{entry.project}</span>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <span className="text-gray-500">{entry.time}</span>
            <span className="font-semibold">{entry.duration}</span>
            <button className="text-xl font-bold text-black self-start md:self-auto">•</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeEntryList;
