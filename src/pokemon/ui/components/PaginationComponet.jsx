import React from 'react';
import { ButtonComponent } from './ButtonComponent';

export const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;
  const pageNumbers = [];

  // Determine the range of pages to display
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Ensure the page range does not go below 1
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4 flex justify-center space-x-2 flex-wrap sm:pt-8">
      {/* Button to go to the first page */}
      <ButtonComponent
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 sm:px-6 sm:py-3"
      >
        &laquo;
      </ButtonComponent>

      {/* "Previous" button */}
      <ButtonComponent
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 sm:px-6 sm:py-3"
      >
        Previous
      </ButtonComponent>

      {/* Render page number buttons with margin between them */}
      {pageNumbers.map((number) => (
        <ButtonComponent
          key={number}
          onClick={() => onPageChange(number)}
          disabled={number === currentPage}
          className={`px-4 py-2 mx-2 ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'} sm:px-6 sm:py-3`}
        >
          {number}
        </ButtonComponent>
      ))}

      {/* "Next" button */}
      <ButtonComponent
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 sm:px-6 sm:py-3"
      >
        Next
      </ButtonComponent>

      {/* Button to go to the last page */}
      <ButtonComponent
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 sm:px-6 sm:py-3"
      >
        &raquo;
      </ButtonComponent>
    </div>
  );
};
