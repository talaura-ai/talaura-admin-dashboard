import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Clipboard from 'clipboard';
import dayjs from 'dayjs';
import 'dayjs/locale/en-in';
import timeZone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import * as xlsx from 'xlsx';
import {
  useGetAllCandidatesQuery,
  useNotifyCandidateMutation,
} from '../../../../app/services/candidates';
import ErrorPage from '../../../Error/ErrorPage';
import LoadingScreen from '../../../Loading/LoadingScreen';
import { ICandidate } from '../types';
import ExtendModal from './ExtendModal';
import Header from './Header';
import Pagination from './Pagination';
dayjs.locale('en-in');
dayjs.extend(utc);
dayjs.extend(timeZone);

const columnsForPendingTable = [
  'Candidate Name',
  'Invite Date',
  'Start Date',
  'Expiry Date',
  'Test Action',
  'Action',
  'Invite Link',
];

const columnsForCompletedTable = [
  'Candidate Name',
  'Start Date',
  'Completed On',
  'TAL Score',
  'Cognitive Score',
  'Status',
];
const PendingTab = ({ status = 'Pending' }: { status?: string }) => {
  const [filterStatus, setFilterStatus] = useState<string>(status);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sizePerPage, setSizePerPage] = useState<number>(5);
  const { assessmentId = '' } = useParams();
  const checkbox = useRef<HTMLInputElement>(null);

  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [extendUserId, setExtendUserId] = useState<string>('');

  const {
    data: candidatesData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    isUninitialized,
  } = useGetAllCandidatesQuery({
    id: assessmentId,
    pageNum: currentPage,
    pageSize: sizePerPage,
    status: filterStatus,
  });

  const [notifyCandidate] = useNotifyCandidateMutation();

  const toggleAll = () => {
    setSelectedPeople(
      checked || indeterminate ? [] : candidatesData?.Candidate?.map((pr) => pr._id) ?? [],
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };
  const stringToArrayBuffer = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };

  const exportDataToCsv = async () => {
    if (candidatesData?.Candidate) {
      let data: ICandidate[] = [];
      if (selectedPeople.length === 0) {
        data = candidatesData?.Candidate;
      } else {
        data = candidatesData?.Candidate?.filter((cnd) => selectedPeople.includes(cnd._id));
      }
      const workbook = xlsx.utils.book_new();

      // Convert JSON data to a worksheet
      const worksheet = xlsx.utils.json_to_sheet(data);

      xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Write the workbook to a binary string
      const workBookOutPut = xlsx.write(workbook, {
        bookType: 'xlsm',
        type: 'binary',
      });

      // Create a blob from the binary string
      const blob = new Blob([stringToArrayBuffer(workBookOutPut)], {
        type: 'application/octet-stream',
      });

      // Create a link element and trigger the download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.xlsm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      toast.error('No Data to Export');
    }
  };

  const onNotifyCandidate = (candidateId: string) => {
    try {
      notifyCandidate(candidateId);
      toast.success('Candidate Notified Successfully');
    } catch (error) {
      toast.success('Problem Notifying Candidate');
    }
  };

  if (isLoading || isFetching || isUninitialized) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (isSuccess) {
    return (
      <div className="w-full">
        <Header
          exportDataToCsv={exportDataToCsv}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          statusFromParam={status}
        />
        <ExtendModal extendUserId={extendUserId} setExtendUserId={setExtendUserId} />
        <div className="">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full pb-2 align-middle sm:px-6 lg:px-8">
              <div className="table_container max-w-[calc(100vw-13rem)] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] overflow-scroll border border-customGray-150">
                <table className="min-w-full divide-y divide-customGray-300 rounded-md">
                  <thead className="bg-white border-collapse">
                    <tr className=" divide-x h-[50px]">
                      <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-customGray-300 text-sandybrown focus:ring-sandybrown"
                          ref={checkbox}
                          checked={checked}
                          onChange={toggleAll}
                        />
                      </th>
                      {(status === 'Pending'
                        ? columnsForPendingTable
                        : columnsForCompletedTable
                      ).map((val, idx) => (
                        <th
                          key={idx}
                          scope="col"
                          className={`pl-4 pr-3 text-sm font-semibold text-gray-900 text-left whitespace-nowrap`}
                        >
                          <span>{val}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-customGray-200 bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
                    {candidatesData?.Candidate?.map((candidate, idx) => (
                      <tr key={idx} className="text-left even:bg-customGray-30 text-customGray-100">
                        <td className="relative px-7 sm:w-12 sm:px-6">
                          {selectedPeople.includes(candidate._id) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-sandybrown" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-customGray-300 text-sandybrown focus:ring-sandybrown"
                            value={candidate._id}
                            checked={selectedPeople.includes(candidate._id)}
                            onChange={(e) =>
                              setSelectedPeople(
                                e.target.checked
                                  ? [...selectedPeople, candidate._id]
                                  : selectedPeople.filter((p) => p !== candidate._id),
                              )
                            }
                          />
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-0 min-w-[8rem]">
                          <Link
                            to={status === 'Completed' ? `candidate/${candidate._id}` : ''}
                            className="pl-4 text-customGray-100"
                          >
                            {candidate.name}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <span className="text-customGray-100">
                            {dayjs(candidate.createdAt).format('DD MMM, YYYY [at] hh:mm A')}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dayjs(
                            status === 'Completed' ? candidate?.completedOn : candidate.startsAt,
                          ).format('DD MMM, YYYY [at] hh:mm A')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {status === 'Completed'
                            ? candidate.paiScore
                            : dayjs(candidate?.endsOn).format('DD MMM, YYYY [at] hh:mm A')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {status === 'Completed'
                            ? Math.floor(Math.random() * (100 - 10))
                            : candidate.status}
                        </td>
                        {status !== 'Completed' && (
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex items-center text-sandybrown">
                              <button onClick={() => setExtendUserId(candidate._id)}>
                                <span>Extend</span>
                              </button>
                              <div className="h-[10px] w-[2px] bg-customGray-50 mx-2" />
                              <button onClick={() => onNotifyCandidate(candidate._id)}>
                                <span>Notify</span>
                              </button>
                            </div>
                          </td>
                        )}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {status === 'Completed' ? (
                            'Completed'
                          ) : (
                            <button
                              className="flex items-center gap-2 text-sandybrown"
                              onClick={() => {
                                Clipboard.copy(candidate?.assessmentId);
                              }}
                            >
                              <DocumentDuplicateIcon className="h-[12px] w-[12px]" />
                              <span>Copy</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination
            totalCandidates={candidatesData.totalCandidates ?? 0}
            currentPage={currentPage}
            totalPages={candidatesData.totalPage}
            setCurrentPage={setCurrentPage}
            sizePerPage={sizePerPage}
            setSizePerPage={setSizePerPage}
          />
        </div>
      </div>
    );
  }

  return <></>;
};

export default PendingTab;
