import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import ModuleCard from '../Modules/ModuleCard';
import ReviewQuestions from '../ReviewQuestions/Review';
export interface ReviewAssessmentsProps {}

const ReviewAssessments: React.FC<ReviewAssessmentsProps> = () => {
  const { selectedModules } = useAppSelector((state) => state.modules);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentModule, setCurrentModule] = useState({ question: [] });

  return (
    <>
      <div className="relative mt-10 w-90 mx-10 scrollbar overflow-y-auto">
        {showQuestions ? (
          <div className="grid w-full">
            <ReviewQuestions
              module={currentModule}
              questions={currentModule?.question}
              setShowQuestions={setShowQuestions}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 h-[50vh] gap-x-8 gap-y-3">
            {selectedModules?.map((v: any, index: number) => (
              <ModuleCard
                key={v?.name + index}
                {...v}
                reviewAble={true}
                editable={false}
                handleClick={() => {
                  setShowQuestions(true);
                  setCurrentModule(v);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewAssessments;
