import { PencilIcon } from "@heroicons/react/24/solid";

const ModuleCard: React.FC<any> = ({
  name,
  type,
  noOfQuestions,
  skills,
  time,
  Weightage,
  handleClick,
}) => {
  return (
    <div
      className="flex rounded-2xl shadow-inner bg-white
        p-5 mt-5  
     flex-col
        "
      onClick={handleClick}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="grow justify-start">
          <h1 className="text-orange-text">{name}</h1>
        </div>
        <div className="grow justify-end">
          <PencilIcon className="h-3 w-3 text-orange-text" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-xs  text-gray-300">{noOfQuestions} Question</h3>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="">Skills</h1>
        </div>
        <div className="grow justify-end p-2">
        <PencilIcon className="h-3 w-3 text-orange-text" />
        </div>
      </div>
      <div className="flex flex-row items-center">
     <p 
        className="text-gray-300 text-sm"
     >{skills.join(",")}</p>
        
      </div>
      <div className="flex flex-row items-center">
        <div>
          <h1 className="">Weightage </h1>
        </div>
        <div className="p-2 w-20" contentEditable>
            <p className="text-gray-300">{Weightage}%</p>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
