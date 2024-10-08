import { IAssessmentDetails } from './types';

const SummaryTab = ({ assessmentData }: { assessmentData?: IAssessmentDetails }) => {
  const allIcons = [
    '/images/Shop.png',
    '/images/Books.png',
    '/images/Branch.png',
    '/images/Branch.png',
    '/images/Translation.png',
  ];
  const DynamicQuestions = assessmentData?.assessments[0].question
    .filter((ques) => {
      if (!ques.isUser) {
        return true;
      }
    })
    .map((ques) => ({
      text: ques.name,
      value: typeof ques.answer === 'string' ? ques.answer : ques.answer[0]?.name,
      id: ques._id,
      icon: allIcons[Math.floor(Math.random() * (allIcons.length - 0 - 1))],
    }));
  const GridData = [
    {
      id: 1,
      icon: '/images/hash.png',
      text: 'Assessment ID',
      value: assessmentData?.assessments[0]._id.slice(-3),
    },
    ...(DynamicQuestions ?? []),
    {
      id: 7,
      icon: '/images/Clock.png',
      text: 'Time',
      value:
        assessmentData?.assessments[0].module.reduce((prev, curr) => (prev += +curr.time), 0) +
        ' min',
    },
    {
      id: 8,
      icon: '/images/User.png',
      text: 'Proctoring',
      value: 'Enabled',
    },
  ];
  const iconsArr = ['CaseStudy.png', 'Computer.png', 'PersonPuzzle.png', 'User.png'];

  const modulesMap = new Map<string, IAssessmentDetails['assessments']['0']['module']>();

  assessmentData?.assessments[0].module.forEach((mdl) => {
    if (modulesMap.has(mdl.type)) {
      modulesMap.set(mdl.type, [...modulesMap.get(mdl.type)!, mdl]);
    } else {
      modulesMap.set(mdl.type, [mdl]);
    }
  });

  return (
    <div className="self-stretch flex flex-row items-stretch justify-start py-[0rem] pr-[0rem] pl-[0.187rem] box-border max-w-full text-[2.813rem] text-burlywood-100 gap-3 mt-10">
      <div className="flex-1 flex flex-row items-start justify-start gap-[1.187rem] mq1050:flex-wrap">
        <div className="flex-1 flex flex-row items-start justify-start gap-[1.5rem] max-w-full">
          <div className="self-stretch flex flex-col items-center justify-start gap-[1.25rem] max-w-full mq750:flex-wrap">
            <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] h-[110px] py-2.5 w-[100px] rounded-xl bg-white flex flex-col items-start justify-start text-center box-border gap-[0.187rem] z-[1]">
              <div className="flex flex-row items-center justify-center w-full py-[0rem] px-[0.062rem]">
                <p className="relative min-w-[2.563rem] z-[1] font-bold mq450:text-[1.688rem] mq1050:text-[2.25rem]">
                  {assessmentData?.assessments[0].totalCandidates ?? 0}
                </p>
              </div>
              <span className="self-stretch relative text-[0.875rem] inline-block text-customGray-100 min-w-[2.688rem] font-bold z-[1] text-center">
                Invites
              </span>
            </div>
            <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] h-[110px] py-2.5 w-[100px] rounded-xl bg-white flex flex-col items-start justify-start text-center box-border gap-[0.187rem] z-[1]">
              <div className="flex flex-row items-center justify-center w-full py-[0rem] px-[0.062rem]">
                <p className="relative min-w-[2.563rem] z-[1] font-bold mq450:text-[1.688rem] mq1050:text-[2.25rem]">
                  {assessmentData?.assessments[0]?.registeredCandidates ?? 0}
                </p>
              </div>
              <span className="self-stretch relative text-[0.875rem] inline-block text-customGray-100 min-w-[2.688rem] font-bold z-[1] text-center">
                Pending
              </span>
            </div>
            <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] h-[110px] py-2.5 w-[100px] rounded-xl bg-white flex flex-col items-start justify-start text-center box-border gap-[0.187rem] z-[1]">
              <div className="flex flex-row items-center justify-center w-full py-[0rem] px-[0.062rem]">
                <p className="relative min-w-[2.563rem] z-[1] font-bold mq450:text-[1.688rem] mq1050:text-[2.25rem]">
                  {assessmentData?.assessments[0]?.completeCandidates ?? 0}
                </p>
              </div>
              <span className="self-stretch relative text-[0.875rem] inline-block text-customGray-100 min-w-[2.688rem] font-bold z-[1] text-center">
                Completed
              </span>
            </div>
            {/* <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] h-[110px] py-2.5 w-[100px] rounded-xl bg-white flex flex-col items-start justify-start text-center box-border gap-[0.187rem] z-[1]">
              <div className="flex flex-row items-center justify-center w-full py-[0rem] px-[0.062rem]">
                <p className="relative min-w-[2.563rem] z-[1] font-bold mq450:text-[1.688rem] mq1050:text-[2.25rem]">
                  {assessmentData?.assessments[0]?.pendingCandidates ?? 0}
                </p>
              </div>
              <span className="self-stretch relative text-[0.875rem] inline-block text-customGray-100 min-w-[2.688rem] font-bold z-[1] text-center">
                Pending
              </span>
            </div> */}
          </div>
          <div className="w-full flex flex-col gap-7">
            <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-white flex flex-row items-end justify-between py-8 pr-[0rem] pl-[1.687rem] box-border max-w-full gap-[1.25rem] z-[1] text-[0.875rem] text-customGray-100 mq750:flex-wrap mq750:pl-[1.25rem] mq750:pr-[1.25rem] mq750:box-border">
              <div className="flex flex-row flex-wrap justify-start w-full gap-2 pl-8">
                {GridData.map((itm) => (
                  <div
                    key={itm.id}
                    className="flex flex-col justify-start items-start flex-wrap min-w-[150px] w-[23%] text-left"
                  >
                    <div className="img-container w-[30px] h-[30px] mb-2.5">
                      <img src={itm.icon} className="w-full h-full" />
                    </div>
                    <h3 className="whitespace-nowrap">{itm.text}</h3>
                    <h3 className="text-black font-bold"> {itm.value}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0rem] pl-[0.062rem] box-border max-w-full">
              <div className="[border:none] bg-white w-auto [outline:none] flex-1 relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl max-w-full z-[1]">
                <div className="flex flex-wrap justify-start gap-2 text-xl text-black p-6">
                  {assessmentData?.assessments[0].module.map((mdl, idx) => (
                    <div
                      key={idx}
                      className="module flex flex-col text-center items-start p-4 pl-8 min-w-[150px] w-[23%]"
                    >
                      <img
                        src={`/images/${iconsArr[Math.floor(Math.random() * (iconsArr.length - 0))]}`}
                        alt=""
                        className="h-[30px] w-[30px]"
                      />
                      <span className="my-1">
                        {mdl.type === 'Voice to Text' ? 'Text To Text' : mdl.type}
                      </span>
                      {mdl?.type.toLowerCase() !== 'ai video interview' ? (
                        <span className="text-customGray-100 text-sm">
                          {mdl.noOfQuestions} Questions
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-full self-stretch w-full flex flex-col items-start justify-start max-w-[40%] text-[1.5rem] text-black mq750:min-w-full mq1050:flex-1">
        <div className="self-stretch h-full min-h-[38rem] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-white flex flex-col items-start justify-start py-[1.625rem] box-border max-w-full z-[1]">
          <h2 className="m-0 relative text-inherit flex items-end min-w-[8rem] z-[2] font-inherit mq450:text-[1.188rem] border-b-2 border-gainsboro w-full text-left px-[1.25rem] pb-2">
            <span className="w-full">Modules ({assessmentData?.assessments[0].module.length})</span>
          </h2>
          <div className="modules_container p-6 flex flex-col text-left">
            {Array.from(modulesMap).map(([key, valuesArray]) => (
              <div key={key} className="">
                <span className="text-black text-lg font-bold">{key}</span>
                <div className="w-full flex flex-row flex-wrap gap-2 justify-between">
                  {valuesArray.map((module, idx) => (
                    <div
                      key={idx}
                      className="flex text-center items-center p-4 border mb-2 border-gainsboro rounded-md gap-2 w-[200px]"
                    >
                      <img
                        src={`/images/${iconsArr[Math.floor(Math.random() * (iconsArr.length - 0))]}`}
                        alt=""
                        className="h-[30px] w-[30px]"
                      />
                      <div className="text_wrapper flex flex-col w-full text-left overflow-hidden">
                        <span className="text-lg text-customGray-100 whitespace-nowrap truncate">
                          {module.type}
                        </span>
                        <span className="text-customGray-100 text-sm">{module.time} minutes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SummaryTab;
