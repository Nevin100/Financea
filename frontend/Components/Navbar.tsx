import { FaBell } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-2 shadow-md">
      <div>
        <p className="text-sm font-semibold text-gray-500">Good Morning,</p>
        <h2 className="text-lg font-bold text-gray-800">Riya Paul</h2>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <FaBell className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute top-[-2px] right-[-3px] w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>


        {/* <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-700 font-semibold">R</span>
          </div>
          <div className="text-gray-800">
            <h3 className="text-sm font-medium">Riya Paul</h3>
            <p className="text-xs text-gray-500">riya.paul@gmail.com</p>
          </div>
        </div> */}

        <IoAddCircle className="text-[#5E84EC] cursor-pointer" size={26} />




      </div>
    </div>
  );
};

export default Navbar;
