// components/PaginationControls.tsx

import React from "react";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 margin-bottom">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="pad-x py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      <span className="text-sm font-medium text-gray-700">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="pad-x py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
