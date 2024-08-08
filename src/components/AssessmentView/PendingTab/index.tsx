import dayjs from 'dayjs';
import 'dayjs/locale/en-in';
import timeZone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import * as xlsx from 'xlsx';
import {
  useGetAllCandidatesQuery,
  useResetModulesMutation,
  useUpdateCandidatesStatusMutation,
} from '../../../app/services/candidates';
import {
  ColumnsForCompletedTable,
  InitialExpiredTabColumns,
  InitialPendingTabColumns,
} from '../../../helpers/constants';
import { deepClone, stringToArrayBuffer } from '../../../helpers/utils';
import ErrorPage from '../../Error/ErrorPage';
import LoadingScreen from '../../Loading/LoadingScreen';
import { ICandidate, ICandidateData } from '../types';
import ExtendModal from './ExtendModal';
import Header from './Header';
import Pagination from './Pagination';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
dayjs.locale('en-in');
dayjs.extend(utc);
dayjs.extend(timeZone);

const PendingTab = ({
  status: CurrentTab = 'Pending',
}: {
  status?: 'Pending' | 'Expired' | 'Completed';
}) => {
  const [filterStatus, setFilterStatus] = useState<string>(CurrentTab);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const { assessmentId = '' } = useParams();

  const checkbox = useRef<HTMLInputElement>(null);

  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [extendUserId, setExtendUserId] = useState<string>('');
  // const [allTypesInResponseSet, setAllTypesInResponseSet] = useState(new Set());
  // const allModulesTypesIncluded = new Set(['ai video interview', 'quiz', 'text to text']);
  const [candidatesData, setCandidatesData] = useState<ICandidateData | undefined>();
  const { data, isLoading, isError, isSuccess, isFetching, isUninitialized } =
    useGetAllCandidatesQuery({
      id: assessmentId,
      pageNum: currentPage,
      pageSize: sizePerPage,
      status: filterStatus,
      currentTab: CurrentTab,
    });

  useEffect(() => {
    setCandidatesData(deepClone(data));
    // const allTypesInResponseSetTemp = new Set(
    //   data?.Candidate[0]?.module?.map((mdl) => mdl.type.toLowerCase()),
    // );
    // setAllTypesInResponseSet(new Set(['ai video interview', 'quiz', 'text to text']));
  }, [data]);
  const [updateCandidatesStatus] = useUpdateCandidatesStatusMutation();
  const [resetModule] = useResetModulesMutation();

  const toggleAll = () => {
    setSelectedPeople(
      checked || indeterminate ? [] : candidatesData?.Candidate?.map((pr) => pr._id) ?? [],
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
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

  useEffect(() => {
    setSelectedPeople([]);
    setChecked(false);
  }, [CurrentTab]);

  const handleReset = useCallback(
    async (candidateId?: string) => {
      try {
        const candidatesToUpdates = candidateId ? [candidateId] : selectedPeople;
        if (candidatesToUpdates.length === 0) {
          toast.error('No Candidate to Update');
          return;
        }
        await resetModule(candidatesToUpdates);
        toast.success('Updated Successfully');
      } catch (error) {
        toast.success('Error Updating Status');
      }
    },
    [resetModule, selectedPeople],
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
          statusFromParam={CurrentTab}
          handleUpdateCandidatesStatus={handleUpdateCandidatesStatus}
          handleReset={handleReset}
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
                      {(CurrentTab === 'Pending'
                        ? InitialPendingTabColumns
                        : CurrentTab === 'Expired'
                          ? InitialExpiredTabColumns
                          : ColumnsForCompletedTable
                      ).map((val) => {
                        // if (
                        //   ['Pending', 'Expired'].includes(CurrentTab) &&
                        //   allModulesTypesIncluded.has(val.apiKey) &&
                        //   candidatesData?.Candidate.length &&
                        //   !candidatesData?.Candidate[0]?.module?.find(
                        //     (mdl) => mdl.type.toLowerCase() === val.apiKey,
                        //   ) &&
                        //   false
                        // ) {
                        //   return null;
                        // } else {
                        return (
                          <th
                            key={val.id}
                            scope="col"
                            className={`pl-4 pr-3 text-sm font-semibold text-gray-900 ${val.id === 1 ? 'text-left' : 'text-center'}`}
                          >
                            <span>{val.text}</span>
                          </th>
                        );
                        // }
                      })}
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
                            to={CurrentTab === 'Completed' ? `candidate/${candidate._id}` : ''}
                            className="pl-4 text-customGray-100 flex flex-col justify-start"
                          >
                            <span>{candidate.name}</span>
                            <p>{candidate.email}</p>
                          </Link>
                        </td>
                        {/* Data for Completed Tab */}
                        {CurrentTab === 'Completed' && (
                          <Fragment>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">
                              <span className="text-customGray-100">
                                {candidate.completedOn
                                  ? dayjs(candidate.createdAt).format('DD MMM, YYYY')
                                  : '--'}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                              {candidate.paiScore ?? '--'}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                              {candidate?.percentile ? candidate?.percentile + '/ 100' : '--'}
                            </td>

                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm text-center ${candidate?.suspiciousActivity ? 'text-[#40B24B]' : 'text-[#FB2121]'}`}
                            >
                              {candidate?.suspiciousActivity ? 'Detected' : 'Not Detected'}
                            </td>
                            <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500 text-center flex justify-center items-center gap-2">
                              <div className="flex flex-col gap-1">
                                <button
                                  className={`rounded-[4px] border p-1 px-2 flex items-center gap-1  ${candidate?.selectStatus === 'Select' ? 'border-[#40B24B] text-[#40B24B] cursor-not-allowed' : 'border-[#ACACAC] text-[#ACACAC]'} text-sm`}
                                  onClick={() =>
                                    handleUpdateCandidatesStatus('Select', candidate._id)
                                  }
                                  disabled={candidate?.selectStatus === 'Select'}
                                >
                                  <CheckCircleIcon
                                    fontSize={20}
                                    color={
                                      candidate?.selectStatus === 'Select' ? '#40B24B' : '#ACACAC'
                                    }
                                    className="h-3 w-3"
                                  />
                                  <span>Select</span>
                                </button>
                                <button
                                  className={`rounded-[4px] border p-1 px-2 flex items-center gap-1  ${candidate?.selectStatus === 'Reject' ? 'border-[#FB2121] text-[#FB2121] cursor-not-allowed' : 'border-[#ACACAC] text-[#ACACAC]'} text-sm`}
                                  onClick={() =>
                                    handleUpdateCandidatesStatus('Reject', candidate._id)
                                  }
                                  disabled={candidate?.selectStatus === 'Reject'}
                                >
                                  <XCircleIcon
                                    fontSize={20}
                                    color={
                                      candidate?.selectStatus === 'Reject' ? '#FB2121' : '#ACACAC'
                                    }
                                    className={'h-3 w-3'}
                                  />
                                  <span>Reject</span>
                                </button>
                              </div>
                              {/* <div>
                                <button>
                                  <img src="/images/Download2.png" className="h-6 w-6" />
                                </button>
                              </div> */}
                            </td>
                          </Fragment>
                        )}
                        {CurrentTab === 'Expired' && (
                          <Fragment>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">
                              <span className="text-customGray-100">
                                {candidate?.endsOn
                                  ? dayjs(candidate?.endsOn).format('DD MMM, YYYY')
                                  : '--'}
                              </span>
                            </td>
                            {(() => {
                              // if (allTypesInResponseSet.has('quiz')) {
                              const statusModule = candidate?.module?.find(
                                (mdl) => mdl.type.toLowerCase() === 'quiz',
                              )?.status;
                              return (
                                <td
                                  className={`whitespace-nowrap px-3 py-4 text-sm text-center ${statusModule === 'Pending' ? 'text-[#FB2121]' : statusModule === 'Completed' ? 'text-[#40B24B]' : 'text-[#7D7C7C]'}`}
                                >
                                  {statusModule === 'Pending'
                                    ? 'Interrupted'
                                    : statusModule ?? '--'}
                                </td>
                              );
                              // }
                            })()}

                            {(() => {
                              // if (allTypesInResponseSet.has('text to text')) {
                              const statusModule = candidate?.module?.find(
                                (mdl) => mdl.type.toLowerCase() === 'text to text',
                              )?.status;
                              return (
                                <td
                                  className={`whitespace-nowrap px-3 py-4 text-sm text-center ${statusModule === 'Pending' ? 'text-[#FB2121]' : statusModule === 'Completed' ? 'text-[#40B24B]' : 'text-[#7D7C7C]'}`}
                                >
                                  {statusModule === 'Pending'
                                    ? 'Interrupted'
                                    : statusModule ?? '--'}
                                </td>
                              );
                              // }
                            })()}

                            {(() => {
                              // if (allTypesInResponseSet.has('ai video interview')) {
                              const statusModule = candidate?.module?.find(
                                (mdl) => mdl.type.toLowerCase() === 'ai video interview',
                              )?.status;
                              return (
                                <td
                                  className={`whitespace-nowrap px-3 py-4 text-sm text-center ${statusModule === 'Pending' ? 'text-[#FB2121]' : statusModule === 'Completed' ? 'text-[#40B24B]' : 'text-[#7D7C7C]'}`}
                                >
                                  {statusModule === 'Pending'
                                    ? 'Interrupted'
                                    : statusModule ?? '--'}
                                </td>
                              );
                              // }
                            })()}

                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500`}
                            >
                              Expired
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center flex justify-center items-center">
                              <button
                                onClick={() => setExtendUserId(candidate._id)}
                                className="text-sandybrown pt-2.5"
                              >
                                Extend
                              </button>
                            </td>
                          </Fragment>
                        )}
                        {CurrentTab === 'Pending' && (
                          <Fragment>
                            {(() => {
                              // if (allTypesInResponseSet.has('quiz')) {
                              const statusModule = candidate?.module?.find(
                                (mdl) => mdl.type.toLowerCase() === 'quiz',
                              )?.status;
                              return (
                                <td
                                  className={`whitespace-nowrap px-3 py-4 text-sm text-center ${statusModule === 'Pending' ? 'text-[#FB2121]' : statusModule === 'Completed' ? 'text-[#40B24B]' : 'text-[#7D7C7C]'}`}
                                >
                                  {statusModule === 'Pending'
                                    ? 'Interrupted'
                                    : statusModule ?? '--'}
                                </td>
                              );
                              // }
                            })()}

                            {(() => {
                              // if (allTypesInResponseSet.has('text to text')) {
                              const statusModule = candidate?.module?.find(
                                (mdl) => mdl.type.toLowerCase().toLowerCase() === 'voice to text',
                              )?.status;
                              return (
                                <td
                                  className={`whitespace-nowrap px-3 py-4 text-sm text-center ${statusModule === 'Pending' ? 'text-[#FB2121]' : statusModule === 'Completed' ? 'text-[#40B24B]' : 'text-[#7D7C7C]'}`}
                                >
                                  {statusModule === 'Pending'
                                    ? 'Interrupted'
                                    : statusModule ?? '--'}
                                </td>
                              );
                              // }
                            })()}
                            {(() => {
                              // if (allTypesInResponseSet.has('ai video interview')) {
                              const statusModule = candidate?.module?.find(
                                (mdl) =>
                                  mdl.type.toLowerCase().toLowerCase() === 'ai video interview',
                              )?.status;
                              return (
                                <td
                                  className={`whitespace-nowrap px-3 py-4 text-sm text-center ${statusModule === 'Pending' ? 'text-[#FB2121]' : statusModule === 'Completed' ? 'text-[#40B24B]' : 'text-[#7D7C7C]'}`}
                                >
                                  {statusModule === 'Pending'
                                    ? 'Interrupted'
                                    : statusModule ?? '--'}
                                </td>
                              );
                              // }
                            })()}
                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500`}
                            >
                              Ongoing
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center flex justify-center items-center">
                              <button
                                onClick={() => handleReset(candidate._id)}
                                className={`text-[#CC8448] pt-2.5 ${!candidate?.module?.find((mdl) => mdl.status === 'Pending') && 'cursor-not-allowed text-[#CC844866]'}`}
                                disabled={(() =>
                                  !candidate?.module?.find((mdl) => mdl.status === 'Pending'))()}
                              >
                                Reset
                              </button>
                            </td>
                          </Fragment>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination
            totalCandidates={candidatesData?.totalCandidates ?? 0}
            currentPage={currentPage}
            totalPages={candidatesData?.totalPage ?? 0}
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
