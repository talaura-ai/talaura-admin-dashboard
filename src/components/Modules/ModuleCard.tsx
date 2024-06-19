import { PencilIcon } from "@heroicons/react/24/solid";
import IMAGES from "../../assets/images/Images";

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
        <div className="grow justify-start items-start">
          <h1 className="text-orange-text">{name}</h1>
        </div>
        <div className=" items-end ">
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
        <div className="grow justify-end p-2 items-end">
          <PencilIcon className="h-3 w-3 text-orange-text" />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <p className="text-gray-300 text-sm">{skills.join(",")}</p>
      </div>
      <div className="flex flex-row items-center">
        <div>
          <h1 className="">Weightage </h1>
        </div>
        <div className="p-2 w-20 focus:ring-0 active:ring-0 focus:border-0 active:border-0" contentEditable>
          <p className="text-gray-300">{Weightage}%</p>
        </div>
        <div className="flex grow justify-end items-center" >
            <img src={IMAGES.Time} className="h-4 w-4 justify-center items-center" />
            <span className="justify-center items-center ml-1">{time} min</span>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
