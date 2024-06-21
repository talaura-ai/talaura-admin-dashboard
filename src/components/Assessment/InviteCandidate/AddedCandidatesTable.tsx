import { XCircleIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { removeCandidateFromInviteList } from '../../../app/features/inviteCandidateSlice';

const columns = ['Name', 'Email', 'Remove'];
const AddedCandidatesTable = () => {
  const allCandidates = useAppSelector((state) => state.inviteCandidate);
  const dispatch = useAppDispatch();
  const removeCandidate = (email: string) => {
    dispatch(removeCandidateFromInviteList(email));
  };
  return (
    <div className="mt-[70px] w-full">
      <div className="flex flex-col justify-center min-w-max">
        <div className="row1 justify-start my-2 text-left ml-20">
          <span className="text-left text-lg text-black w-full">0 Candidates invite</span>
        </div>
        <div className="row2 self-center">
          <div className="table_container overflow-scroll mx-20">
            <table className="w-full divide-y divide-customGray-250 rounded-md">
              <thead className="bg-white border-collapse">
                <tr className="divide-customGray-250 divide-x">
                  {columns.map((val, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className={`py-3 pl-4 pr-3 text-sm font-semibold text-gray-900 text-left`}
                    >
                      <span className="text-lg text-black">{val}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-customGray-250 bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] text-sandybrown">
                {allCandidates?.map((candidate, idx) => (
                  <tr key={idx} className="text-left even:bg-gray-30">
                    <td className="whitespace-nowrap py-1.5 pl-4 text-sm font-medium text-customGray-100 sm:pl-0 min-w-[15rem] text-lg">
                      <span className="pl-4">{candidate.name}</span>
                    </td>
                    <td className="whitespace-nowrap py-1.5 pl-4 text-sm font-medium text-customGray-100 sm:pl-0 min-w-[15rem]">
                      <span className="pl-4">{candidate.email}</span>
                    </td>
                    <td className="whitespace-nowrap py-1.5 pl-4 text-sm font-medium text-sandybrown sm:pl-0 min-w-[15rem] flex text-center items-center justify-center">
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
