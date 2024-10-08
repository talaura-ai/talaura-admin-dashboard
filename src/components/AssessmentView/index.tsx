import { useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetAssessmentByIDQuery } from '../../app/services/assessments';
import ErrorPage from '../Error/ErrorPage';
import LoadingScreen from '../Loading/LoadingScreen';
import Header from './Header';
import PendingTab from './PendingTab';
import SummaryTab from './SummaryTab';

const AssessmentView = () => {
  const { assessmentId = '' } = useParams();
  const location = useLocation();
  const [showJd, setShowJd] = useState(false);

  const {
    data: assessmentData,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    isUninitialized,
  } = useGetAssessmentByIDQuery(assessmentId);

  const activeTabFromLocation = location?.state?.activeTab;
  const TabData = [
    { id: 1, text: 'Summary' },
    { id: 2, text: 'Pending' },
    { id: 3, text: 'Expired' },
    { id: 4, text: 'Completed' },
  ];
  const [activeTab, setActiveTab] = useState<{
    text: string;
  }>(TabData[activeTabFromLocation || 0]);

  const activeTabComponent = useMemo(() => {
    switch (activeTab.text) {
      case 'Pending':
        return <PendingTab status="Pending" />;
      case 'Expired':
        return <PendingTab status="Expired" />;
      case 'Completed':
        return <PendingTab status="Completed" />;
      case 'Summary':
      default:
        return <SummaryTab assessmentData={assessmentData} />;
    }
  }, [activeTab.text, assessmentData]);

  if (isLoading || isFetching || isUninitialized) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (isSuccess) {
    return (
      <section className="flex-1 bg-floralwhite flex flex-col items-start justify-start box-border gap-4 text-center text-[1.25rem] text-customGray-100 font-sansation lg:pl-[1.625rem] lg:pr-[1.563rem] lg:box-border ] mq750:pt-[1.25rem] mq750:box-border mq1050:pt-[1.688rem] mq1050:pb-[1.25rem] mq1050:box-border">
        <Header assessmentName={assessmentData.assessments[0].name} />
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start relative max-w-full">
          {TabData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer [border:none] pt-[0.625rem] px-[0rem] pb-[0rem] rounded-t-mini rounded-b-none flex flex-col items-start justify-start box-border gap-[0.312rem] z-[2] ${activeTab.text === tab.text ? 'bg-antiquewhite' : ''}`}
            >
              <div className="self-stretch relative flex flex-row items-start justify-start py-[0rem] pr-[1.375rem] pl-[1.312rem]">
                <h3
                  className={`flex-1 mb-1 relative whitespace-nowrap text-[1.25rem] inline-block font-sansation text-center min-w-[5.638rem] z-[3] mq450:text-[1rem]  ${activeTab.text === tab.text ? 'text-sandybrown' : ''}`}
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
          {showJd && (
            <div className="w-screen h-screen bg-[rgba(0,0,0,0.3)] flex justify-center items-center fixed z-[10] top-0 left-0">
              <div className="bg-white border border-sandybrown rounded-md py-10 px-10 w-1/2 relative">
                <img
                  onClick={() => setShowJd(false)}
                  src="/images/Cross.png"
                  alt="close icon"
                  className="absolute top-2 right-2 w-[25px] h-[25px] cursor-pointer"
                />
                <div className="flex justify-between items-start  w-3/4 my-[15px]">
                  <p>Job Title: iOS Development</p>
                  <p>Level - Senior</p>
                </div>
                <div className="flex justify-between items-start  w-3/4">
                  <p>Department: IT Department</p>
                  <p>Location - Delhi</p>
                </div>
                <div className="flex flex-col items-start mt-[33px]">
                  <p className="text-[20px] font-extrabold">Job Summary</p>
                  <p className="text-start text-[16px]">
                    We are looking for a passionate and motivated Junior iOS Developer to join our
                    team. As a fresher, you will have the opportunity to work alongside experienced.
                  </p>
                  <p className="text-[20px] font-extrabold">Key Responsibilties:</p>
                  <li className="text-start text-[16px]">
                    Collaborate with senior developers to design, build, and maintain
                    high-performance iOS applications.
                  </li>
                  <li className="text-start text-[16px]">
                    Write clean, maintainable, and efficient code using Swift and Objective-C.
                  </li>
                  <p className="text-[20px] font-extrabold">Experience:</p>
                  <li className="text-start text-[16px]">
                    Collaborate with senior developers to design, build, and maintain
                    high-performance iOS applications.
                  </li>
                  <li className="text-start text-[16px]">
                    Write clean, maintainable, and efficient code using Swift and Objective-C.
                  </li>
                  <p className="text-[20px] font-extrabold">Qualifications and Certifications:</p>
                  <p className="text-start text-[16px]">
                    Basic knowledge of Swift and Objective-C.
                  </p>
                </div>
                <button className="mt-[100px] mx-auto cursor-pointer [border:none] py-[0.5rem] pr-[0.5rem] pl-[1.5rem] bg-peru-100 flex-1 rounded-3xs flex flex-row items-start justify-start box-border min-w-[8rem] z-[1] hover:bg-peru-200">
                  <img src="/images/Chart.png" className="h=[25px] object-cover" alt="" />
                  <div className="flex-1 relative text-base font-sansation text-white text-center z-[1] mq450:text-[1.188rem]">
                    Download JD
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
        {activeTabComponent}
      </section>
    );
  }

  return <></>;
};

export default AssessmentView;
