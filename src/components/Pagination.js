import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex border border-[#e4e4e4] bg-white p-4 rounded-xl mt-4">
        <ul className="flex items-center justify-center w-full">
          <li className="px-[6px]">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-blue"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li className="px-[6px]" key={index}>
              <button
                onClick={() => onPageChange(index + 1)}
                className={`w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-blue ${
                  currentPage === index + 1 ? "text-gray-900 font-bold" : ""
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="px-[6px]">
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-blue"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
