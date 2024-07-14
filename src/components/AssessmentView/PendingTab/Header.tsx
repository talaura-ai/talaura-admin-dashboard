import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Dispatch, SetStateAction, useEffect } from 'react';

const Header = ({
  exportDataToCsv,
  setFilterStatus,
  filterStatus,
  statusFromParam,
}: {
  exportDataToCsv: () => void;
  setFilterStatus: Dispatch<SetStateAction<string>>;
  filterStatus: string;
  statusFromParam: string;
}) => {
  useEffect(() => {
    if (statusFromParam === 'Completed') {
      setFilterStatus(statusFromParam);
    } else if (statusFromParam === 'Pending') {
      setFilterStatus('');
    }
  }, [setFilterStatus, statusFromParam]);

  return (
    <div className="flex justify-between w-full items-center bg-white py-4 px-2.5 rounded-t-xl mb-2">
      <div className="col1 flex gap-2">
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-customGray-100" aria-hidden="true" />
          </div>
          <input
            type="search"
            name="search"
            className="block w-full min-w-[15rem] py-2 rounded-md pl-10 text-gray-900 ring-1 ring-inset ring-customGray-300 placeholder:text-customGray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border bg-customGray-70 border-customGray-80"
            placeholder="Search"
          />
        </div>
        {statusFromParam !== 'Completed' && (
          <select
            className="mt-2 block w-full rounded-md py-2 pl-3 pr-10 text-gray ring-1 ring-inset ring-customGray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-customGray-70 border-customGray-80"
            onChange={(e) => setFilterStatus(e.target.value)}
            defaultValue={filterStatus}
          >
            <option value={''}>All Status</option>
            <option value={'Pending'}>Pending</option>
            <option value={'Registered'}>Registered</option>
            <option value={'Not Registered'}>Not Registered</option>
          </select>
        )}
      </div>
      <div className="col2 flex gap-2">
        {/* <button className="cursor-pointer [border:none] py-[0.5rem] pr-[0.5rem] bg-peru-100 flex-1 rounded-3xs flex flex-row items-start justify-start box-border min-w-[6.438rem] z-[1] hover:bg-peru-200">
          <div className="flex-1 relative text-base font-sansation text-white text-center z-[1] mq450:text-[1.188rem]">
            Notify
          </div>
        </button>

        <button className="cursor-pointer [border:none] py-[0.5rem] pr-[0.5rem] bg-peru-100 flex-1 rounded-3xs flex flex-row items-start justify-start box-border min-w-[6.438rem] z-[1] hover:bg-peru-200">
          <div className="flex-1 relative text-base font-sansation text-white text-center z-[1] mq450:text-[1.188rem]">
            Extend
          </div>
        </button> 
        <div className="h-10 w-1 bg-customGray-150" /> */}
        <button
          className="cursor-pointer [border:none] py-[0.5rem] pr-[0.5rem] pl-[1rem] bg-peru-100 flex-1 rounded-3xs flex flex-row items-start justify-start box-border min-w-[6.438rem] z-[1] hover:bg-peru-200"
          onClick={exportDataToCsv}
        >
          <img src="/images/PaperPlane.png" className="h-[25px] object-cover" alt="" />
          <div className="flex-1 relative text-base font-sansation text-white text-center z-[1] mq450:text-[1.188rem]">
            Excel
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
