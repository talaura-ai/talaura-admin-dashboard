import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import ModuleCard from "./ModuleCard";
import OverView from "./OverView";
import EditModule from "./EditModule";
import AddNewModule from "./AddNewModule";
// const moduleDetails = {
//   type: "Quiz",
//   name: "Microsoft Word Proficiency Test",
//   noOfQuestions: 10,
//   skills: ["Document Formatting", "Text Editing", "Template Usage"],
//   time: 15,
//   Weightage: 20,
// };

const Modules = () => {
  const { selectedModules } = useAppSelector((state) => state.modules);
  const [selectedModule, setSelectedModule] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  if (editMode) {
    return (
      <EditModule
        module={selectedModule}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    );
  }

  if (createMode) {
    return (
      <AddNewModule setCreateMode={setCreateMode} createMode={createMode} />
    );
  }

  return (
    <>
      {/* <button
        className="inline-flex
    h-8 w-24
     items-center
      justify-center
       rounded-md
        bg-orange-text
          text-white
           hover:text-gray-500
            focus:outline-none  
            m-3
               "
        onClick={() => setCreateMode(true)}
      >
        <img src={IMAGES.Create} className="h-5 w-5" />
        <h3 className="px-1 text-white">Create</h3>
      </button> */}
      <div className="scrollbar overflow-y-auto h-full dir-rtl">
        <div className="dir-ltr">
          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-4">
              {selectedModules.map(
                (module: {
                  name: any;
                  type: any;
                  noOfQuestions: any;
                  skills: any;
                  time: any;
                  Weightage: any;
                }) => {
                  const { name, type, noOfQuestions, skills, time, Weightage } =
                    module;

                  return (
                    <ModuleCard
                      name={name}
                      type={type}
                      noOfQuestions={noOfQuestions}
                      skills={skills}
                      time={time}
                      Weightage={Weightage}
                      handleClick={() => {
                        setSelectedModule(module);
                        setEditMode(true);
                      }}
                    />
                  );
                },
              )}
            </div>
            <div className="col-span-3">
              <OverView />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modules;
