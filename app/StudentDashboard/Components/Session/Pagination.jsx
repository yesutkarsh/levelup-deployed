"use client";
// Components/Session/Pagination.jsx
import React from "react";

const Pagination = ({
  currentPage,
  totalResults,
  itemsPerPage,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${
            currentPage === i
              ? "bg-custom text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50"
          } px-4 py-2 border border-gray-300 text-sm font-medium rounded-md mx-1`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
      <div className="flex items-center">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{start}</span> to{" "}
          <span className="font-medium">{end}</span> of{" "}
          <span className="font-medium">{totalResults}</span> results
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          } px-4 py-2 border border-gray-300 text-sm font-medium rounded-md`}
        >
          Previous
        </button>
        {renderPagination()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          } px-4 py-2 border border-gray-300 text-sm font-medium rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
