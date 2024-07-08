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
      <div className="relative mt-10 w-90 mx-10 flex flex-row scrollbar overflow-y-auto">
        {/* {showQuestions ? (
          <div className="grid w-full">
            <ReviewQuestions
              module={currentModule}
              questions={currentModule?.question}
              setShowQuestions={setShowQuestions}
            />
          </div>
        ) : ( */}
        <div className="flex flex-col gap-x-8 gap-y-3">
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
        <div className="grid -mt-5 w-full">
          <ReviewQuestions module={currentModule} questions={currentModule?.question} />
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default ReviewAssessments;
