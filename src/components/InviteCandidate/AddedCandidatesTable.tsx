import { XCircleIcon } from '@heroicons/react/24/outline';
import { removeCandidateFromInviteList } from '../../app/features/inviteCandidateSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const columns = ['Name', 'Mobile', 'Email', 'Remove'];
const AddedCandidatesTable = () => {
  const allCandidates = useAppSelector((state) => state.inviteCandidate);
  const dispatch = useAppDispatch();
  const removeCandidate = (email: string) => {
    dispatch(removeCandidateFromInviteList(email));
  };
  return (
    <div className="mt-6 w-full">
      <div className="flex flex-col justify-center w-full">
        <div className="row1 justify-start my-2 text-left">
          <span className="text-left text-lg text-black w-full">
            {allCandidates.length} Candidates invite
          </span>
        </div>
        <div className="row2 self-center w-full">
          <div className="table_container overflow-scroll max-h-[350px]">
            <table className="w-full divide-y divide-customGray-250 bg-white rounded-md border-collapse">
              <thead className="border-collapse sticky top-0 z-1 bg-white border-none">
                <tr className="">
                  {columns.map((val, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className={`py-3 pl-4 pr-3 text-sm font-semibold text-gray-900  ${val === 'Remove' ? 'text-center' : 'text-left'}`}
                    >
                      <span className="text-lg text-black ">{val}</span>  
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-customGray-250 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] text-sandybrown">
                {allCandidates?.map((candidate, idx) => (
                  <tr key={idx} className={`text-left even:bg-gray-30 odd:bg-gray-50`}>
                    <td
                      className={`whitespace-nowrap py-1.5 pl-4 text-sm font-medium text-customGray-100 sm:pl-0 min-w-[15rem] text-lg ${!candidate.isValid && '!text-[#FB2121]'}`}
                    >
                      <span className="pl-4">{candidate.name}</span>
                    </td>
                    <td
                      className={`whitespace-nowrap py-1.5 pl-4 text-sm font-medium text-customGray-100 sm:pl-0 min-w-[15rem] ${!candidate.isValid && '!text-[#FB2121]'}`}
                    >
                      <span className="pl-4">{candidate.mobile}</span>
                    </td>
                    <td
                      className={`whitespace-nowrap py-1.5 pl-4 text-sm font-medium text-customGray-100 sm:pl-0 min-w-[15rem] ${!candidate.isValid && '!text-[#FB2121]'}`}
                    >
                      <span className="pl-4">{candidate.email}</span>
                    </td>
                    <td
                      className={`whitespace-nowrap py-1.5 pl-4 text-sm font-medium text-sandybrown sm:pl-0 min-w-[15rem] flex text-center items-center justify-center ${!candidate.isValid && '!text-[#FB2121]'}`}
                    >
                      <button className="flex" onClick={() => removeCandidate(candidate.email)}>
                        <span>
                          <XCircleIcon className="h-6 w-6" />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedCandidatesTable;
