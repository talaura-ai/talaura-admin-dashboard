import { useState } from 'react';
import { ICandidateReportData } from '../AssessmentView/types';

const TextToTextView = ({ candidateData }: { candidateData?: ICandidateReportData }) => {
  const reportData = candidateData?.report.find((rp) => rp.moduleType === 'Voice to Text');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  return (
    <div className="flex flex-col w-full">
      <div className="self-end flex justify-end mb-4 mt-2 w-full">
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
      <div className="row2 flex gap-4 justify-between mb-3">
        <div className="w-full border border-[#E0E0E0] shadow-[0_4px_4px_0_(0,0,0,0.25)] rounded-[10px] rounded-tl-[0] bg-white relative">
          <div className="flex absolute top-[-38px]">
            {reportData?.question?.map((_, idx) => (
              <button
                key={idx}
                className={`w-[58px] h-[38px] rounded-t-md ${activeQuestionIndex === idx ? 'bg-[#FFEFDF]' : 'bg-white '}`}
                onClick={() => setActiveQuestionIndex(idx)}
              >
                Q{idx + 1}
              </button>
            ))}
          </div>
          <div className="flex justify-between px-4 pt-5 pb-2.5 border-b-2 border-bottom-#[#D6D6D6]">
            <h2 className="text-2xl text-black text-left font-Sansation_Bold">Transcript</h2>
            <h2 className="text-2xl text-[#40B24B] text-left font-Sansation_Bold">
              Score: {candidateData?.cognitiveScore}%
            </h2>
          </div>
          <div className="chat-container h-[254px] overflow-scroll p-[18px]">
            <div className={`flex flex-row justify-start items-center mb-5 gap-2 w-full`}>
              <div className="bg-[#E4E1E1] rounded-full h-[40px] w-[40px] flex justify-center items-center">
                <span className={`text-sm text-[#CC8448] text-center leading-4`}>AI</span>
              </div>
              <div className="chat-text max-w-[80%]">
                <p className={`text-black text-xs text-left`}>
                  {reportData?.question &&
                    (reportData?.question?.length ?? 0) > 0 &&
                    reportData?.question[activeQuestionIndex].title}
                </p>
              </div>
            </div>
            <div className={`flex flex-row-reverse justify-start items-center mb-5 gap-2 w-full`}>
              <div className="bg-[#E4E1E1] rounded-full h-[40px] w-[40px] flex justify-center items-center">
                <span className={`text-sm text-[#CC8448] text-center leading-4`}>USR</span>
              </div>
              <div className="chat-text  max-w-[80%]">
                <p className={`text-black text-xs text-right`}>
                  {reportData?.question &&
                    (reportData?.question?.length ?? 0) > 0 &&
                    reportData?.question[activeQuestionIndex].answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2.5">
        <div className="w-1/2 border border-[#E0E0E0] shadow-[0_4px_4px_0_(0,0,0,0.25)] rounded-[10px] bg-white">
          <div className="flex px-4 pt-5 pb-2.5 border-b-2 border-bottom-#[#D6D6D6]">
            <span className="text-2xl text-black text-left font-Sansation_Bold">AI Context</span>
          </div>
          <div className="py-4 px-10 text-black text-left text-sm">
            <p
              dangerouslySetInnerHTML={{
                __html: reportData?.description?.replace(/(\d)(?=\.)/g, '<br>$1') ?? '',
              }}
            />
          </div>
        </div>
        <div className="w-1/2 border border-[#E0E0E0] shadow-[0_4px_4px_0_(0,0,0,0.25)] rounded-[10px] bg-white">
          <div className="flex px-4 pt-5 pb-2.5 border-b-2 border-bottom-#[#D6D6D6]">
            <span className="text-2xl text-black text-left font-Sansation_Bold">
              Skill Wise Report
            </span>
          </div>
          <div className="py-4 px-10 text-black text-left text-sm">
            {reportData?.report.map((rpt) => (
              <div key={rpt._id}>
                <div className={`flex flex-row justify-start items-center mb-5 gap-2 w-full`}>
                  <div className="chat-text max-w-[80%]">
                    <h4 className={`text-[#7D7C7C] text-base font-bold text-left`}>
                      {rpt.name}: <span className="text-[#FB2121]">{rpt.score}%</span>
                    </h4>
                  </div>
                </div>
                {rpt?.text && (
                  <div
                    className={`flex flex-row-reverse justify-start items-center mb-5 gap-2 w-full`}
                  >
                    <div className="chat-text  max-w-[80%]">
                      <p className={`text-black text-base text-right`}>{rpt.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToTextView;
