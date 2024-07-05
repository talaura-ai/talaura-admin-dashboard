import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import ModuleCard from '../Modules/ModuleCard';
import ReviewQuestions from '../ReviewQuestions/Review';
export interface ReviewAssessmentsProps {}

const ReviewAssessments: React.FC<ReviewAssessmentsProps> = () => {
  const { selectedModules } = useAppSelector((state) => state.modules);
  // const [showQuestions, setShowQuestions] = useState(false);
  const [currentModule, setCurrentModule] = useState(selectedModules[0]);

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
            <ModuleCard
              key={v?.name + index}
              {...v}
              reviewAble={true}
              editable={false}
              fromReviewAssessmentScreen
              isSelectedModule={currentModule?.name === v?.name}
              handleClick={() => {
                setCurrentModule(v);
              }}
            />
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
