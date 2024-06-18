import Modules from "../Modules/Modules";
export interface ReviewAssessmentsProps {
}

const ReviewAssessments: React.FC<ReviewAssessmentsProps> = ({
}) => {
  const skill = {
    type: "Quiz",
    name: "Microsoft Word Proficiency Test",
    noOfQuestions: 10,
    skills: ["Document Formatting", "Text Editing", "Template Usage"],
    time: 15,
    Weightage: 20,
  };
  const skillsList = [skill, skill, skill]
  return (
    <>
      <div className="relative mt-10 w-90 mx-10">
        <div className="grid grid-cols-2 h-[50vh] gap-x-8 gap-y-3">
          { skillsList?.map((v: any, index: number) => (
            <Modules key={ v?.name + index } module={ v } />
          )) }
        </div>
      </div>
    </>
  );
};

export default ReviewAssessments;
