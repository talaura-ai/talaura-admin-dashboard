import dayjs from 'dayjs';
import { ICandidateReportData } from '../AssessmentView/types';
import CandidateReportAccordion from './CandidateReportAccordion';

const CandidateDashBoard = ({ candidateData }: { candidateData?: ICandidateReportData }) => {
  return (
    <div className="main_content flex w-full pt-4 gap-4">
      <div className="col1 w-[300px]">
        <div className="card1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden bg-white">
          <div className="col1_row1 bg-green-200 pt-2 text-center">
            <div>
              <h5 className="text-green-400 text-center text-xl">
                TAL Score: {candidateData?.paiScore ?? 0}
              </h5>
            </div>
          </div>
          <div className="col1_row2 p-4">
            {/* <div className="img_container h-[200px] w-[200px] mx-auto">
                <img src="/images/SampleImg.jpeg" alt="" className="h-full w-full" />
              </div> */}
          </div>
          <div className="col1_row3 text-center pb-4 text-customGray-100 font-bold">
            <h5>{candidateData?.email ?? 'user email'}</h5>
          </div>
        </div>
        {/* <div className="card2 bg-green-200 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden mt-4 pt-4 text-center h-[210px] w-[300px] flex flex-col justify-between">
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
          </div> */}
      </div>
      <div className="col2 w-[calc(100%-300px)]">
        <div className="col2_card1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-md overflow-hidden p-4 bg-white">
          <div className="col2_card1_row1">
            <h5 className="text-customGray-100 text-xl font-bold">Assessment Timeline</h5>
          </div>
          <div className="col2_card1_row2 mt-4">
            <div className="progress_section flex flex-row justify-between px-6 text-center text-customGray-50 text-base w-full relative z-0">
              <div className="col1 flex flex-col justify-between items-center h-[106px] w-[80px]">
                <div className="col1_row1">
                  <span>Invite</span>
                </div>
                <div className="col1_row2 h-[18px] w-[18px] bg-sandybrown rounded-full border-4 border-light-gold" />
                <div className="col1_row3 flex flex-col">
                  <span className="text-black text-sm whitespace-nowrap">15 jun, 2015</span>
                  <span className="text-[10px]">08:30PM</span>
                </div>
              </div>
              <div className="col1 flex flex-col justify-between items-center h-[106px] w-[80px]">
                <div className="col1_row1">
                  <span>Start</span>
                </div>
                <div className="col1_row2 h-[18px] w-[18px] bg-sandybrown rounded-full border-4 border-light-gold" />
                <div className="col1_row3 flex flex-col">
                  <span className="text-black text-sm whitespace-nowrap">
                    {dayjs(candidateData?.startsAt).format('DD MM YYYY')}
                  </span>
                  <span className="text-[10px]">
                    {dayjs(candidateData?.startsAt).format('hh:mmA')}
                  </span>
                </div>
              </div>
              <div className="col1 flex flex-col justify-between items-center h-[106px] w-[80px]">
                <div className="col1_row1">
                  <span>Completed</span>
                </div>
                <div className="col1_row2 h-[18px] w-[18px] bg-green-400 rounded-full border-4 border-green-100" />
                <div className="col1_row3 flex flex-col">
                  <span className="text-black text-sm whitespace-nowrap">15 jun, 2015</span>
                  <span className="text-[10px]">08:30PM</span>
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
          <div className="row2 flex gap-4">
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
          </div>
          <div className="row3 flex flex-row flex-wrap mt-4 gap-4 items-baseline">
            {candidateData?.report?.map((report) => (
              <CandidateReportAccordion report={report} key={report._id} />
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
