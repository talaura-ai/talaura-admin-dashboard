import { Dispatch, SetStateAction } from 'react';
import { ICandidateReportDataReportItem } from '../AssessmentView/types';
import { getColorAccordingToScore } from '../../helpers/utils';

const CandidateReportAccordion = ({
  report,
  currentExpandedReportId,
  // setCurrentExpandedReportId,
}: {
  report: ICandidateReportDataReportItem;
  currentExpandedReportId: string;
  setCurrentExpandedReportId: Dispatch<SetStateAction<string>>;
}) => {
  const isExpanded = currentExpandedReportId === report._id;
  return (
    <div className="container border border-customGray-20 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col w-full p-4 rounded-md bg-[#FEFCF5] overflow-y-scroll">
      <div className=" items-center  flex justify-between ">
        <h4 className="text-xl font-bold text-customGray-300 truncate">
          {report.moduleType === 'Voice to Text' ? 'Text To Text' : report.moduleType}
        </h4>
        <div className="flex items-center">
          <span
            className="text-lg font-bold whitespace-nowrap"
            style={{ color: getColorAccordingToScore(report.average, 1) }}
          >
            {report?.average ?? 0} %
          </span>
          {/* <button
            className="flex"
            onClick={() => setCurrentExpandedReportId(isExpanded ? '' : (report._id ?? ''))}
          >
             <span
              className="text-xs ml-1"
              style={{ color: getColorAccordingToScore(report.average, 1) }}
            >
              Correct
            </span>
            {isExpanded ? (
              <ChevronUpIcon className="w-[12px] h-[16px] mr-2 ml-2.5" />
            ) : (
              <ChevronDownIcon className="w-[12px] h-[16px] mr-2 ml-2.5" />
            )}
          </button> */}
        </div>
      </div>
      {!isExpanded && (
        <div className="inner_content">
          {report.report.map((dt, idx) => (
            <div className="flex justify-between flex-row items-end gap-4" key={idx}>
              <div className="content relative my-2 text-left w-full">
                <span className="text-left text-xs font-bold text-black">{dt?.name}</span>
                <div
                  className="overflow-hidden h-2.5 rounded-full w-full"
                  style={{ background: '#f5dfc9' }}
                >
                  <span
                    className={`h-full gradient-y-r block rounded-full`}
                    style={{ width: dt?.score + '%' }}
                  ></span>
                </div>
              </div>
              <div className="mb-1">
                <span
                  className="text-xs whitespace-nowrap"
                  style={{ color: getColorAccordingToScore(dt?.score, 1) }}
                >
                  <span className="font-bold">{dt?.score}%</span>
                  {/* {'  '} Correct */}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateReportAccordion;
