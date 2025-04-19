import { GoArrowUp, GoArrowDown } from "react-icons/go";

interface PropType {
    percentageChange: number;
    isIncreased: boolean;
    bottomText: string;
}

const HeaderStats = ({ percentageChange, isIncreased, bottomText }: PropType) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {/* Arrow + Number with background only on this span */}
            <span
                className={`inline-flex items-center px-1  rounded-md  w-fit 
        ${isIncreased ? "text-[#19C13A] bg-[#19C13A0D]" : "text-[#C11919] bg-[#C119190D]"}`}
            >
                {isIncreased ? <GoArrowUp /> : <GoArrowDown />}
                <span className="ml-1">{percentageChange}%</span>
            </span>

            {/* Description text */}
            <p className="text-gray-500  text-[14px]">{bottomText}</p>
        </div>
    );
};

export default HeaderStats;
