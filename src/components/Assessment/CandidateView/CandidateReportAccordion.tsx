import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ICandidateReportDataReportItem } from '../AssessmentView/types';
import { useState } from 'react';

const CandidateReportAccordion = ({
  report,
}: {
  report: ICandidateReportDataReportItem;
}) => {
  const [isExpanded, setIExpanded] = useState<boolean>(false);

  return (
    <div className='container border border-customGray-20 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col w-[48%] p-4 rounded-md'>
      <div className=' items-center  flex justify-between '>
        <h4 className='text-xl font-bold text-customGray-300 truncate'>
          {report.moduleName}
        </h4>
        <div className='flex items-center'>
          <span className='text-green-300 text-lg font-bold whitespace-nowrap'>
            {report.report[0].score ?? 0} %
          </span>
          <button
            className='flex'
            onClick={() => setIExpanded((prev) => !prev)}>
            <span className='text-xs text-customGray-250 ml-1'>Correct</span>
            {isExpanded ? (
              <ChevronUpIcon className='w-[12px] h-[16px] mr-2 ml-2.5' />
            ) : (
              <ChevronDownIcon className='w-[12px] h-[16px] mr-2 ml-2.5' />
            )}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className='inner_content'>
          {report.report.map((dt, idx) => (
            <div className='content relative my-2 text-left' key={idx}>
              <span className='text-left text-xs font-bold text-black'>
                {dt.name}
              </span>
              <div className='overflow-hidden bg-sandybrown h-2.5 rounded-full w-[275px]'>
                <span
                  className={`h-full gradient-y-r block rounded-full`}
                  style={{ width: dt.score + '%' }}></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateReportAccordion;
