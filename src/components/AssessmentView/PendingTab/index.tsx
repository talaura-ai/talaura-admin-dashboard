import dayjs from 'dayjs';
import 'dayjs/locale/en-in';
import timeZone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import * as xlsx from 'xlsx';
import {
  useGetAllCandidatesQuery,
  useUpdateCandidatesStatusMutation,
} from '../../../app/services/candidates';
import ErrorPage from '../../Error/ErrorPage';
import LoadingScreen from '../../Loading/LoadingScreen';
import { ICandidate } from '../types';
import ExtendModal from './ExtendModal';
import Header from './Header';
import Pagination from './Pagination';
dayjs.locale('en-in');
dayjs.extend(utc);
dayjs.extend(timeZone);

const columnsForPendingTable = [
  { id: 1, apiKey: 'name', text: 'Candidate Name' },
  { id: 2, apiKey: 'quizStatus', text: 'Quiz' },
  { id: 3, apiKey: 'textToTextStatus', text: 'Text To Text' },
  { id: 4, apiKey: 'videoAiInterviewStatus', text: 'Video AI Interview' },
  { id: 5, apiKey: '', text: 'Test Action' },
  { id: 6, apiKey: '', text: 'Action' },
];
const columnsForExpiredTable = [
  { id: 1, apiKey: 'name', text: 'Candidate Name' },
  { id: 2, apiKey: 'expiredOn', text: 'Expired On' },
  { id: 3, apiKey: 'quizStatus', text: 'Quiz' },
  { id: 4, apiKey: 'textToTextStatus', text: 'Text To Text' },
  { id: 5, apiKey: 'videoAiInterviewStatus', text: 'Video AI Interview' },
  { id: 6, apiKey: '', text: 'Test Action' },
  { id: 7, apiKey: '', text: 'Action' },
];

const columnsForCompletedTable = [
  { id: 1, apiKey: 'name', text: 'Candidate Name' },
  { id: 2, apiKey: 'completedOn', text: 'Complete On' },
  { id: 3, apiKey: 'taiScore', text: 'TAI Score' },
  { id: 4, apiKey: 'percentile', text: 'Percentile' },
  { id: 5, apiKey: 'suspiciousActivity', text: 'Suspicious Activity' },
  { id: 6, apiKey: '', text: 'Action' },
];
const PendingTab = ({ status = 'Pending' }: { status?: 'Pending' | 'Expired' | 'Completed' }) => {
  const [filterStatus, setFilterStatus] = useState<string>(status);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const { assessmentId = '' } = useParams();
  const checkbox = useRef<HTMLInputElement>(null);

  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [extendUserId, setExtendUserId] = useState<string>('');

  useEffect(() => {
    setSelectedPeople([]);
  }, [status]);

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
    currentTab: status,
  });
  const [updateCandidatesStatus] = useUpdateCandidatesStatusMutation();

  // const [notifyCandidate] = useNotifyCandidateMutation();

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

  // const onNotifyCandidate = (candidateId: string) => {
  //   try {
  //     notifyCandidate(candidateId);
  //     toast.success('Candidate Notified Successfully');
  //   } catch (error) {
  //     toast.success('Problem Notifying Candidate');
  //   }
  // };

  const handleUpdateCandidatesStatus = useCallback(
    async (status: 'Select' | 'Reject', candidate?: string) => {
      try {
        const candidatesToUpdates = candidate ? [candidate] : selectedPeople;
        if (candidatesToUpdates.length === 0) {
          toast.error('No Candidate to Update');
          return;
        }
        await updateCandidatesStatus({
          status,
          candidates: candidatesToUpdates,
        });
        toast.success('Updated Successfully');
      } catch (error) {
        toast.success('Error Updating Status');
      }
    },
    [selectedPeople, updateCandidatesStatus],
  );

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
          handleUpdateCandidatesStatus={handleUpdateCandidatesStatus}
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
                        : status === 'Expired'
                          ? columnsForExpiredTable
                          : columnsForCompletedTable
                      ).map((val) => (
                        <th
                          key={val.id}
                          scope="col"
                          className={`pl-4 pr-3 text-sm font-semibold text-gray-900 ${val.id === 1 ? 'text-left' : 'text-center'}`}
                        >
                          <span>{val.text}</span>
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
                        <td className="whitespace-nowrap pl-4 text-sm font-medium text-gray-900 sm:pl-0 min-w-[8rem]">
                          <Link
                            to={status === 'Completed' ? `candidate/${candidate._id}` : ''}
                            className="pl-4 text-customGray-100 flex flex-col justify-start"
                          >
                            <span>{candidate.name}</span>
                            <p>{candidate.email}</p>
                          </Link>
                        </td>
                        {status === 'Expired' && (
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">
                            <span className="text-customGray-100">
                              {candidate?.expiredOn
                                ? dayjs(candidate?.expiredOn).format('DD MMM, YYYY')
                                : '--'}
                            </span>
                          </td>
                        )}
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">
                          <span className="text-customGray-100">
                            {status === 'Completed'
                              ? candidate.completedOn
                                ? dayjs(candidate.createdAt).format('DD MMM, YYYY')
                                : '--'
                              : candidate?.quizStatus ?? '--'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          {(status === 'Completed'
                            ? candidate.paiScore
                            : candidate?.textToTextStatus) ?? '--'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          {status === 'Completed'
                            ? candidate?.percentile
                              ? candidate?.percentile + '/ 100'
                              : '--'
                            : candidate?.videoAiInterviewStatus ?? '--'}
                        </td>

                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm text-center ${status === 'Completed' ? (candidate?.suspiciousActivity ? 'text-[#40B24B]' : 'text-[#FB2121]') : 'text-gray-500'}`}
                        >
                          {status === 'Pending'
                            ? 'Ongoing'
                            : status === 'Expired'
                              ? 'Expired'
                              : candidate?.suspiciousActivity
                                ? 'Detected'
                                : 'Not Detected'}
                        </td>
                        {status === 'Pending' && (
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center flex justify-center items-center">
                            <button
                              onClick={() => alert('Api Pending')}
                              className="text-sandybrown pt-2.5"
                            >
                              Reset
                            </button>
                          </td>
                        )}
                        {status === 'Expired' && (
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center flex justify-center items-center">
                            <button
                              onClick={() => setExtendUserId(candidate._id)}
                              className="text-sandybrown pt-2.5"
                            >
                              Extend
                            </button>
                          </td>
                        )}
                        {status === 'Completed' && (
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500 text-center flex justify-center items-center gap-2">
                            <div className="flex flex-col gap-1">
                              <button
                                className="rounded-[4px] border border-[#ACACAC] p-1 px-2 flex items-center gap-1 text-[#ACACAC] text-sm"
                                onClick={() =>
                                  handleUpdateCandidatesStatus('Select', candidate._id)
                                }
                              >
                                <img src="/images/Check.png" className="h-3 w-3" />
                                <span>Select</span>
                              </button>
                              <button
                                className="rounded-[4px] border border-[#ACACAC] p-1 px-2 flex items-center gap-1 text-[#ACACAC] text-sm"
                                onClick={() =>
                                  handleUpdateCandidatesStatus('Reject', candidate._id)
                                }
                              >
                                <img src="/images/Cross.png" className="h-3 w-3" />
                                <span>Reject</span>
                              </button>
                            </div>
                            <div>
                              <button onClick={() => alert('Api Pending')}>
                                <img src="/images/Download2.png" className="h-6 w-6" />
                              </button>
                            </div>
                          </td>
                        )}
                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
                        </td> */}
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
