import { Select } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useMemo } from 'react';

const Pagination = ({
  totalCandidates,
  currentPage = 1,
  sizePerPage = 10,
  totalPages = 1,
  setCurrentPage,
  setSizePerPage,
}: {
  totalCandidates: number;
  currentPage: number;
  sizePerPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSizePerPage: Dispatch<SetStateAction<number>>;
}) => {
  const paginationTabs = useMemo(() => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const paginationTabs = [];
    const startPages = [1, 2, 3];
    const endPages = [totalPages - 2, totalPages - 1, totalPages];

    if (currentPage <= 3) {
      paginationTabs.push(...startPages);
      paginationTabs.push('...');
      paginationTabs.push(...endPages);
    } else if (currentPage >= totalPages - 2) {
      paginationTabs.push(1);
      paginationTabs.push('...');
      paginationTabs.push(...endPages);
    } else {
      paginationTabs.push(1);
      paginationTabs.push('...');
      paginationTabs.push(currentPage - 1, currentPage, currentPage + 1);
      paginationTabs.push('...');
      paginationTabs.push(...endPages);
    }

    return paginationTabs;
  }, [currentPage, totalPages]);

  return (
    <div className="w-full rounded-b-xl overflow-hidden">
      <div className="bg-white flex justify-between px-4 py-2">
        <div className="text-left py-2">
          <span className="text-lg text-customGray-100">{totalCandidates} Candidates</span>
        </div>
        <div className="flex">
          <div className="flex justify-center items-center mr-4">
            <nav>
              <ul className="inline-flex items-center justify-center">
                <li className="flex justify-center items-center mr-1">
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className={`h-6 w-6 text-base leading-tight hover:bg-antiquewhite rounded-md self-end`}
                  >
                    <ChevronLeftIcon className="h-4 w-6" />
                  </button>
                </li>
                {paginationTabs.map((val) => (
                  <li key={val} className="flex justify-center items-center mx-1">
                    <button
                      onClick={() => typeof val === 'number' && setCurrentPage(val)}
                      className={`h-6 w-6 text-base leading-tight ${
                        currentPage === val ? 'bg-antiquewhite' : 'bg-white'
                      } hover:bg-antiquewhite rounded-md`}
                    >
                      {val}
                    </button>
                  </li>
                ))}
                <li className="flex justify-center items-center ml-1">
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className={`h-6 w-6 text-base leading-tight hover:bg-antiquewhite rounded-md self-end`}
                  >
                    <ChevronRightIcon className="h-4 w-6" />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="">
            <Select
              className={'border border-customGray-150 bg-customGray-75 rounded-md'}
              defaultValue={sizePerPage}
              onChange={(e) => setSizePerPage(+e.target.value)}
            >
              {[5, 10, 20, 30, 40, 50].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
