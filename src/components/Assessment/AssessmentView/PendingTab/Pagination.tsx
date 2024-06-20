import { Select } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';

const Pagination = ({
  totalCandidates,
  currentPage = 1,
  sizePerPage = 20,
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
  return (
    <div className='w-full rounded-b-xl overflow-hidden'>
      <div className='bg-white flex justify-between px-4 py-2'>
        <div className='text-left py-2'>
          <span className='text-lg text-customGray-100'>
            {totalCandidates} Candidates
          </span>
        </div>
        <div className='flex'>
          <div className='flex justify-center items-center mr-4'>
            <nav>
              <ul className='inline-flex items-center justify-center'>
                <li className='flex justify-center items-center mr-1'>
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className={`h-6 w-6 text-base leading-tight hover:bg-antiquewhite rounded-md self-end`}>
                    <ChevronLeftIcon className='h-4 w-6' />
                  </button>
                </li>
                {Array(totalPages)
                  .fill('')
                  .map((_, index) => (
                    <li
                      key={index}
                      className='flex justify-center items-center mx-1'>
                      <button
                        onClick={() => setCurrentPage(index + 1)}
                        className={`h-6 w-6 text-base leading-tight ${
                          currentPage === index + 1
                            ? 'bg-antiquewhite'
                            : 'bg-white'
                        } hover:bg-antiquewhite rounded-md`}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                <li className='flex justify-center items-center ml-1'>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`h-6 w-6 text-base leading-tight hover:bg-antiquewhite rounded-md self-end`}>
                    <ChevronRightIcon className='h-4 w-6' />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className=''>
            <Select
              className={
                'border border-customGray-150 bg-customGray-75 rounded-md'
              }
              defaultValue={sizePerPage}
              onChange={(e) => setSizePerPage(+e.target.value)}>
              {Array(20)
                .fill('')
                .map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
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
