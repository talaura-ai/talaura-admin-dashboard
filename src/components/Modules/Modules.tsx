import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import {
  setModules,
  setSelectedModule as setSelectedModuleToRedux,
} from '../../app/features/moduleSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import IMAGES from '../../assets/images/Images';
import { AI_API_URL } from '../Assessment/CreateAssessment';
import AddNewModule from './AddNewModule';
import EditModule from './EditModule';
import ModuleCard from './ModuleCard';
import OverView from './OverView';

// const moduleDetails = {
//   type: "Quiz",
//   name: "Microsoft Word Proficiency Test",
//   noOfQuestions: 10,
//   skills: ["Document Formatting", "Text Editing", "Template Usage"],
//   time: 15,
//   Weightage: 20,
// };

const Modules = () => {
  const { modules } = useAppSelector((state) => state.modules);
  const [selectedModule, setSelectedModule] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const { selectedSkills } = useAppSelector((state) => state.skills);
  const dispatch = useAppDispatch();

  const regenerateModule = async () => {
    const payloads = {
      skills: selectedSkills,
    };
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    try {
      const response = await fetch(`${AI_API_URL}generate_modules`, {
        method: 'POST',
        body: JSON.stringify(payloads),
        headers: myHeaders,
      });
      const resJSON = await response.json();
      if (response.ok) {
        dispatch(setModules(resJSON));
        dispatch(setSelectedModuleToRedux(resJSON));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  if (editMode) {
    return <EditModule module={selectedModule} editMode={editMode} setEditMode={setEditMode} />;
  }

  if (createMode) {
    return <AddNewModule setCreateMode={setCreateMode} createMode={createMode} />;
  }

  return (
    <>
      <div className="btn_container flex justify-start gap-4 items-center">
        <button
          className="inline-flex
        p-2
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
        </button>

        {modules.length === 0 && (
          <button
            className="inline-flex
        p-2
        items-center
        justify-center
        rounded-md
        bg-orange-text
        text-white
        hover:text-gray-500
        focus:outline-none  
        m-3
        "
            onClick={regenerateModule}
          >
            {/* <img src={IMAGES.Create} className="h-5 w-5" /> */}
            <ArrowPathIcon className="h-5 w-5" />
            <h3 className="px-1 text-white">Regenerate Modules</h3>
          </button>
        )}
      </div>
      <div className="scrollbar overflow-y-auto h-full dir-rtl">
        <div className="dir-ltr">
          <div className="grid grid-cols-7 gap-4   pb-20">
            <div className="col-span-4">
              {modules?.map(
                (
                  module: {
                    name: any;
                    type: any;
                    noOfQuestions: any;
                    skills: any;
                    time: any;
                    Weightage: any;
                  },
                  idx: number,
                ) => {
                  const { name, type, noOfQuestions, skills, time, Weightage } = module;

                  return (
                    <ModuleCard
                      key={idx}
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
                      editMode={false}
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
