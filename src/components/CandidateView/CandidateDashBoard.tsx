import dayjs from 'dayjs';
import { ICandidateReportData } from '../AssessmentView/types';
import CandidateReportAccordion from './CandidateReportAccordion';
import { useState } from 'react';

const CandidateDashBoard = ({ candidateData }: { candidateData?: ICandidateReportData }) => {
  const [currentExpandedReportId, setCurrentExpandedReportId] = useState<string>('');

  return (
    <div className="main_content flex w-full pt-4 gap-4">
      <div className="col1 w-[300px]">
        <div className="card1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden bg-white">
          {/* <div className="col1_row1 bg-green-200 pt-2 text-center">
            <div>
              <h5 className="text-green-400 text-center text-xl">
                TAL Score: {candidateData?.paiScore ?? 0}
              </h5>
            </div>
          </div>
          <div className="col1_row2 p-4"> */}
          {/* <div className="img_container h-[200px] w-[200px] mx-auto">
              <img src="/images/SampleImg.jpeg" alt="" className="h-full w-full" />
            </div> */}
        </div>
        {/* <div className="col1_row3 text-center pb-4 text-customGray-100 font-bold">
            <h5>{candidateData?.email ?? 'user email'}</h5>
          </div>
        </div> */}
        <div className="card2 bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden mt-4 pt-4 px-6 text-center h-[210px] w-[300px] flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <h6 className="text-[#1F1F25] text-base font-bold">TAL Score</h6>
            </div>
            {/* <div className="flex justify-between items-center gap-2">
              <p className='text-[#3B82F6] text-base font-bold"'>View Details</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 14C2.73333 14 2.5 13.9 2.3 13.7C2.1 13.5 2 13.2667 2 13V3C2 2.73333 2.1 2.5 2.3 2.3C2.5 2.1 2.73333 2 3 2H7.15C7.29167 2 7.41042 2.04819 7.50625 2.14458C7.60208 2.24098 7.65 2.36043 7.65 2.50292C7.65 2.64542 7.60208 2.76389 7.50625 2.85833C7.41042 2.95278 7.29167 3 7.15 3H3V13H13V8.85C13 8.70833 13.0482 8.58958 13.1446 8.49375C13.241 8.39792 13.3604 8.35 13.5029 8.35C13.6454 8.35 13.7639 8.39792 13.8583 8.49375C13.9528 8.58958 14 8.70833 14 8.85V13C14 13.2667 13.9 13.5 13.7 13.7C13.5 13.9 13.2667 14 13 14H3ZM6.01883 9.97682C5.9285 9.88116 5.88056 9.76667 5.875 9.63333C5.86944 9.5 5.91667 9.38333 6.01667 9.28333L12.3 3H9.15C9.00833 3 8.88958 2.95181 8.79375 2.85542C8.69792 2.75902 8.65 2.63957 8.65 2.49708C8.65 2.35458 8.69792 2.23611 8.79375 2.14167C8.88958 2.04722 9.00833 2 9.15 2H13.5C13.6417 2 13.7604 2.04792 13.8563 2.14375C13.9521 2.23958 14 2.35833 14 2.5V6.85C14 6.99167 13.9518 7.11042 13.8554 7.20625C13.759 7.30208 13.6396 7.35 13.4971 7.35C13.3546 7.35 13.2361 7.30208 13.1417 7.20625C13.0472 7.11042 13 6.99167 13 6.85V3.71667L6.71667 10C6.62287 10.0889 6.50775 10.1333 6.37132 10.1333C6.23488 10.1333 6.11739 10.0812 6.01883 9.97682Z"
                  fill="#3B82F6"
                />
              </svg>
            </div> */}
          </div>
          <div className="flex justify-center mt-4 overflow-hidden">
            <div className="w-[204px] h-[102px] border-[20px] border-b-0 rounded-t-full border-[#CCFFD1] flex justify-center relative z-0">
              <div
                className={`w-[204px] h-[102px] border-[20px] border-b-0 rounded-t-full border-[#40B24B] flex justify-center absolute bottom-0 z-10 origin-bottom rotate-[-20deg]`}
                style={{
                  transform: `rotate(${Math.min(candidateData?.paiScore ?? 0, 100) * 1.8 + 180}deg)`,
                }}
              ></div>
              <div className="self-end">
                <h4 className="text-[#0A0A0A] text-2xl">{candidateData?.paiScore}%</h4>
                <p className="text-sm text-[#737373]">Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card2 bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden mt-4 pt-4 px-6 text-center h-[210px] w-[300px] flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <h6 className="text-[#1F1F25] text-base font-bold">Percentile</h6>
            </div>
            {/* <div className="flex justify-between items-center gap-2">
              <p className='text-[#3B82F6] text-base font-bold"'>View Details</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 14C2.73333 14 2.5 13.9 2.3 13.7C2.1 13.5 2 13.2667 2 13V3C2 2.73333 2.1 2.5 2.3 2.3C2.5 2.1 2.73333 2 3 2H7.15C7.29167 2 7.41042 2.04819 7.50625 2.14458C7.60208 2.24098 7.65 2.36043 7.65 2.50292C7.65 2.64542 7.60208 2.76389 7.50625 2.85833C7.41042 2.95278 7.29167 3 7.15 3H3V13H13V8.85C13 8.70833 13.0482 8.58958 13.1446 8.49375C13.241 8.39792 13.3604 8.35 13.5029 8.35C13.6454 8.35 13.7639 8.39792 13.8583 8.49375C13.9528 8.58958 14 8.70833 14 8.85V13C14 13.2667 13.9 13.5 13.7 13.7C13.5 13.9 13.2667 14 13 14H3ZM6.01883 9.97682C5.9285 9.88116 5.88056 9.76667 5.875 9.63333C5.86944 9.5 5.91667 9.38333 6.01667 9.28333L12.3 3H9.15C9.00833 3 8.88958 2.95181 8.79375 2.85542C8.69792 2.75902 8.65 2.63957 8.65 2.49708C8.65 2.35458 8.69792 2.23611 8.79375 2.14167C8.88958 2.04722 9.00833 2 9.15 2H13.5C13.6417 2 13.7604 2.04792 13.8563 2.14375C13.9521 2.23958 14 2.35833 14 2.5V6.85C14 6.99167 13.9518 7.11042 13.8554 7.20625C13.759 7.30208 13.6396 7.35 13.4971 7.35C13.3546 7.35 13.2361 7.30208 13.1417 7.20625C13.0472 7.11042 13 6.99167 13 6.85V3.71667L6.71667 10C6.62287 10.0889 6.50775 10.1333 6.37132 10.1333C6.23488 10.1333 6.11739 10.0812 6.01883 9.97682Z"
                  fill="#3B82F6"
                />
              </svg>
            </div> */}
          </div>
          <div className="flex justify-center mt-4 overflow-hidden">
            <div className="w-[204px] h-[102px] border-[20px] border-b-0 rounded-t-full border-[#CCFFD1] flex justify-center relative z-0">
              <div
                className={`w-[204px] h-[102px] border-[20px] border-b-0 rounded-t-full border-[#40B24B] flex justify-center absolute bottom-0 z-10 origin-bottom`}
                style={{
                  transform: `rotate(${Math.min(candidateData?.percentile ?? 0, 100) * 1.8 + 180}deg)`,
                }}
              ></div>
              <div className="self-end">
                <h4 className="text-[#0A0A0A] text-2xl">{candidateData?.percentile ?? 0}%</h4>
                <p className="text-sm text-[#737373]">Completed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card2 bg-green-200 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden mt-4 pt-4 text-center h-[210px] w-[300px] flex flex-col justify-between">
          <div className="row1">
            <span className="font-bold text-customGray-100 text-xl">AI Proctoring</span>
          </div>
          <div className="col1_row2">
            <h5 className="text-green-400 font-bold text-xl">Not Detected</h5>
            <span className="text-sm">Any Suspicious Activity</span>
          </div>
          <div className="col1_row3 bg-green-400 p-2">
            <h5 className="text-white font-bold text-xl">View Summary</h5>
          </div>
        </div>
      </div>
      <div className="col2 w-[calc(100%-300px)]">
        <div className="col2_card1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden p-4 bg-white">
          <div className="col2_card1_row1">
            <h5 className="text-customGray-100 text-xl font-bold">Assessment Timeline</h5>
          </div>
          <div className="col2_card1_row2 mt-4">
            <div className="progress_section flex flex-row justify-between px-6 text-center text-customGray-50 text-base w-full relative z-0">
              <div className="col1 flex flex-col justify-between items-center h-[90px] w-[80px]">
                <div className="col1_row1">
                  <span>Invite</span>
                </div>
                <div className="col1_row2 h-[18px] w-[18px] relative top-2 bg-sandybrown rounded-full border-4 border-light-gold" />
                <div className="col1_row3 flex flex-col">
                  <span className="text-black text-sm whitespace-nowrap">
                    {dayjs(candidateData?.createdAt).format('DD-MM-YYYY')}
                  </span>
                  <span className="text-[10px]">
                    {dayjs(candidateData?.createdAt).format('hh:mm A')}
                  </span>
                </div>
              </div>
              <div className="col1 flex flex-col justify-between items-center h-[90px] w-[80px]">
                <div className="col1_row1">
                  <span>Start</span>
                </div>
                <div className="col1_row2 h-[18px] w-[18px] relative top-2 bg-sandybrown rounded-full border-4 border-light-gold" />
                <div className="col1_row3 flex flex-col">
                  <span className="text-black text-sm whitespace-nowrap">
                    {dayjs(candidateData?.startsAt).format('DD-MM-YYYY')}
                  </span>
                  <span className="text-[10px]">
                    {dayjs(candidateData?.startsAt).format('hh:mm A')}
                  </span>
                </div>
              </div>
              <div className="col1 flex flex-col justify-between items-center h-[90px] w-[80px]">
                <div className="col1_row1">
                  <span>Completed</span>
                </div>
                <div className="col1_row2 h-[18px] w-[18px] relative top-2 bg-green-400 rounded-full border-4 border-green-100" />
                <div className="col1_row3 flex flex-col">
                  <span className="text-black text-sm whitespace-nowrap">
                    {dayjs(candidateData?.completedOn).format('DD-MM-YYYY')}
                  </span>
                  <span className="text-[10px]">
                    {dayjs(candidateData?.completedOn).format('hh:mm A')}
                  </span>
                </div>
              </div>
              <div className="progress_bar absolute w-full top-11 left-0 flex justify-center -z-10">
                <div className="filled h-[4px] w-[calc(100%-8rem)] bg-light-gold rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="col2_card2 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden px-6 py-4 bg-white mt-4">
          <div className="row1 flex justify-between mb-4">
            <h5 className="text-customGray-100 text-xl font-bold">Assessment Report</h5>
            <div className="row1_col2 flex gap-2 text-base font-bold text-black">
              <div className="container flex items-center justify-center ">
                <div className="indicator h-[10px] w-[10px] bg-red-400 rounded-full mx-2" />
                <span>Low</span>
              </div>
              <div className="container flex items-center justify-center ">
                <div className="indicator h-[10px] w-[10px] bg-golden-700 rounded-full mx-2" />
                <span>Medium</span>
              </div>
              <div className="container flex items-center justify-center ">
                <div className="indicator h-[10px] w-[10px] bg-green-400 rounded-full mx-2" />
                <span>High</span>
              </div>
            </div>
          </div>
          {/* <div className="row2 flex gap-4">
            <div className="row2_card1 border border-customGray-20 shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden px-6 py-4 w-[212px] h-[231px] text-center flex flex-col justify-center items-center">
              <h5 className="text-black text-2xl font-bold">TAL Score</h5>
              <div className="relative w-[150px] h-[150px]">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-customGray-30 stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-green-300  progress-ring__circle stroke-current"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={`calc(251.2 - (251.2 * ${candidateData?.paiScore}) / 100)`}
                  ></circle>

                  <text
                    x="50"
                    y="50"
                    fontFamily="Sansation"
                    fontSize="20"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {candidateData?.paiScore ?? 0}%
                  </text>
                </svg>
              </div>
            </div>
            <div className="row2_card1 border border-customGray-20 shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden px-6 py-4 w-[212px] h-[231px] text-center flex flex-col justify-center items-center">
              <h5 className="text-black text-2xl font-bold">Percentile</h5>
              <div className="relative w-[150px] h-[150px]">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-customGray-30 stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-golden-700  progress-ring__circle stroke-current"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={`calc(251.2 - (251.2 * ${candidateData?.cognitiveScore}) / 100)`}
                  ></circle>

                  <text
                    x="50"
                    y="50"
                    fontFamily="Sansation"
                    fontSize="20"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {candidateData?.cognitiveScore ?? 0}%
                  </text>
                </svg>
              </div>
            </div>
          </div> */}
          <div className="row3 flex flex-col flex-wrap mt-4 gap-4 items-baseline">
            {candidateData?.report?.map((report) => (
              <CandidateReportAccordion
                report={report}
                key={report._id}
                currentExpandedReportId={currentExpandedReportId}
                setCurrentExpandedReportId={setCurrentExpandedReportId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  // }
  return <></>;
};

export default CandidateDashBoard;
