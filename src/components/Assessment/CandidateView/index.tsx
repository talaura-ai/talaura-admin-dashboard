import { FunctionComponent, useMemo, useState } from 'react';
import Header from '../AssessmentView/Header';
import { useLocation } from 'react-router-dom';
import CandidateDashBoard from './CandidateDashBoard';

const CandidateView: FunctionComponent = () => {
  const location = useLocation();
  const activeTabFromLocation = location?.state?.activeTab;
  const TabData = [
    { id: 1, text: 'Summary' },
    { id: 2, text: 'Cognitive Abilities' },
    { id: 3, text: 'Video' },
    { id: 4, text: 'Custom' },
    { id: 5, text: 'English' },
  ];
  const [activeTab, setActiveTab] = useState<{
    text: string;
  }>(TabData[activeTabFromLocation || 0]);

  const activeTabComponent = useMemo(() => {
    switch (activeTab.text) {
      default:
        return <CandidateDashBoard />;
    }
  }, [activeTab.text]);

  return (
    <section className="flex-1 shadow-[0px_4px_10px_rgba(172,_172,_172,_0.3)_inset] rounded-tl-xl rounded-tr-none rounded-b-none bg-floralwhite flex flex-col items-start justify-start pt-[2.625rem] pb-[1.937rem] pr-[3.125rem] pl-[3.312rem] box-border gap-[1rem] text-center text-[1.25rem] text-customGray-100 font-sansation lg:pl-[1.625rem] lg:pr-[1.563rem] lg:box-border mq750:gap-[1.125rem] mq750:pt-[1.25rem] mq750:box-border mq1050:pt-[1.688rem] mq1050:pb-[1.25rem] mq1050:box-border">
      <Header isCandidateView />
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start relative max-w-full">
        {TabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer [border:none] pt-[0.625rem] px-[0rem] pb-[0rem] rounded-t-mini rounded-b-none flex flex-col items-start justify-start box-border gap-[0.312rem] z-[2] ${activeTab.text === tab.text ? 'bg-antiquewhite' : ''}`}
          >
            <div className="self-stretch relative flex flex-row items-start justify-start py-[0rem] pr-[1.375rem] pl-[1.312rem]">
              <h3
                className={`mb-1 flex-1 relative whitespace-nowrap text-[1.25rem] inline-block font-sansation text-center min-w-[5.638rem] z-[3] mq450:text-[1rem]  ${activeTab.text === tab.text ? 'text-sandybrown' : ''}`}
              >
                {tab.text}
              </h3>
              {activeTab.text === tab.text && (
                <div className="filed_bar h-[8px] w-full bg-sandybrown absolute bottom-[-8px] left-0 " />
              )}
            </div>
          </button>
        ))}
        <div className="progress_bar w-full h-[8px] relative rounded-lg overflow-x-hidden">
          <div className="bg-lightgray h-full w-full" />
        </div>
      </div>
      {activeTabComponent}
    </section>
  );
};

export default CandidateView;
