import { Select, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectContent, SelectLabel } from "@/Components/ui/select";
import { Archivo } from "next/font/google";
import { Skeleton } from "@/Components/ui/skeleton";

const archivo = Archivo({
  weight: "500",
  subsets: ["latin"],
});

const frequencyValues = {
  Quarterly: "Quarterly",
  Monthly: "Monthly",
  Yearly: "Yearly",
};

const Loading = () => {


  return (
    <div className="p-4 md:p-6">
      {/* ✅ Financial Analytics Header */}
      <div className={`${archivo.className} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <h1 className="text-2xl md:text-3xl text-gray-800 font-medium">Financial Analytics</h1>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Quarterly" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Frequency</SelectLabel>
              <SelectItem value={frequencyValues.Monthly}>{frequencyValues.Monthly}</SelectItem>
              <SelectItem value={frequencyValues.Quarterly}>{frequencyValues.Quarterly}</SelectItem>
              <SelectItem value={frequencyValues.Yearly}>{frequencyValues.Yearly}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* ✅ Analytics & Metrics Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Skeleton className="bg-gray-300 py-6 px-4 rounded-lg border border-gray-400 h-[300px] md:h-[400px] w-full" />
        </div>
        <div>
          <Skeleton className="bg-gray-300 px-6 py-6 rounded-lg border border-gray-400 w-full h-[400px]" />
        </div>
      </div>

      {/* ✅ Your Overview Section */}
      <div className="mt-6">
        <h2 className="text-2xl md:text-3xl text-gray-800 font-medium">Your Overview</h2>
      </div>

      {/* ✅ Payment Requests, Recent Expenses, New Customers & Expenses Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <Skeleton className="bg-gray-300 p-5 rounded-lg shadow-md border border-gray-400 h-[300px] md:h-[500px]" />
        <Skeleton className="bg-gray-300 p-5 rounded-lg shadow-md border border-gray-400 h-[300px] md:h-[500px]" />
        <div className="flex flex-col gap-4 h-full">
          <Skeleton className="bg-gray-300 p-5 rounded-lg shadow-md border border-gray-400 flex-1" />
          <Skeleton className="bg-gray-300 p-5 rounded-lg shadow-md border border-gray-400 flex-1" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
