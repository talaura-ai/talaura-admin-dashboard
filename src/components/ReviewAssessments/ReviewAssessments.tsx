import { useAppSelector } from "../../app/hooks";
import ModuleCard from "../Modules/ModuleCard";
import Modules from "../Modules/Modules";
export interface ReviewAssessmentsProps {}

const ReviewAssessments: React.FC<ReviewAssessmentsProps> = () => {
  const { selectedModules } = useAppSelector((state) => state.modules);

  return (
    <>
      <div className="relative mt-10 w-90 mx-10">
        <div className="grid grid-cols-2 h-[50vh] gap-x-8 gap-y-3">
          {selectedModules?.map((v: any, index: number) => (
            <ModuleCard key={v?.name + index} {...v} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewAssessments;
