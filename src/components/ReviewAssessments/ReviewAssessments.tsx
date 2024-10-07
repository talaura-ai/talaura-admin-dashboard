import { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { IModuleType } from '../../helpers/types';
import ModuleCard from '../Modules/ModuleCard';
import ReviewQuestions from '../ReviewQuestions/Review';
export interface ReviewAssessmentsProps {}

const ReviewAssessments: React.FC<ReviewAssessmentsProps> = () => {
  const { selectedModules } = useAppSelector((state) => state.modules);
  const [currentModule, setCurrentModule] = useState<IModuleType>();

  useEffect(() => setCurrentModule(selectedModules[0]), [selectedModules]);

  return (
    <>
      <div className="relative mt-10 mx-10 flex flex-row">
        {/* {showQuestions ? (
          <div className="grid w-full">
            <ReviewQuestions
              module={currentModule}
              questions={currentModule?.question}
              setShowQuestions={setShowQuestions}
            />
          </div>
        ) : ( */}
        <div className="flex flex-col gap-x-8 gap-y-3 h-[450px] overflow-y-auto w-1/1 mr-2">
          {selectedModules?.map((v, index: number) => (
            <Fragment key={index}>
              <ModuleCard
                {...v}
                reviewAble={true}
                editable={false}
                fromReviewAssessmentScreen
                isSelectedModule={currentModule?.name === v?.name}
                handleClick={() => {
                  setCurrentModule(v);
                }}
              />
            </Fragment>
          ))}
        </div>
        <div className="grid h-[450px] overflow-y-auto w-1/2">
          <ReviewQuestions module={currentModule} questions={currentModule?.question} />
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default ReviewAssessments;
