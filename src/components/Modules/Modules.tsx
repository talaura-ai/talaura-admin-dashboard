import ModuleCard from "./ModuleCard";
const module = {
  type: "Quiz",
  name: "Microsoft Word Proficiency Test",
  noOfQuestions: 10,
  skills: ["Document Formatting", "Text Editing", "Template Usage"],
  time: 15,
  Weightage: 20,
};

const Modules = () => {
  const { name, type, noOfQuestions, skills, time, Weightage } = module;
  return (
    <ModuleCard
      name={name}
      type={type}
      noOfQuestions={noOfQuestions}
      skills={skills}
      time={time}
      Weightage={Weightage}
    />
  );
};

export default Modules;
