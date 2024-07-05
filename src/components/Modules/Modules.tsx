import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import {
  setModules,
  setSelectedModule as setSelectedModuleToRedux,
} from '../../app/features/moduleSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AI_API_URL } from '../../helpers/utils';
import AddNewModule from './AddNewModule';
import EditModule from './EditModule';
import ModuleCard from './ModuleCard';

const Modules = () => {
  const { selectedModules: selectedModulesInRedux } = useAppSelector((state) => state.modules);
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
        {selectedModulesInRedux.length === 0 && (
          <button
            className="inline-flex p-2 items-center justify-center rounded-md bg-orange-text text-white hover:text-gray-500 focus:outline-none m-3"
            onClick={regenerateModule}
          >
            <ArrowPathIcon className="h-5 w-5" />
            <h3 className="px-1 text-white">Regenerate Modules</h3>
          </button>
        )}
      </div>
      <div>
        <div className="flex gap-2 mr-4 justify-end mt-2">
          <div className="bg-[#FFEFDF] p-2.5 rounded-3xl">
            <span>Modules:</span>
            <span className="ml-2">{selectedModulesInRedux.length}</span>
          </div>
          <div className="bg-[#FFEFDF] p-2.5 rounded-3xl">
            <span>Duration:</span>{' '}
            <span className="ml-2">
              {selectedModulesInRedux?.reduce((accu, curr) => (accu += +curr.time), 0)} mins
            </span>
          </div>
          <div className="bg-[#FFEFDF] p-2.5 rounded-3xl">
            <span>Weightage: </span>
            <span className="ml-2">
              {selectedModulesInRedux?.reduce((accu, curr) => (accu += +curr.Weightage), 0)} %
            </span>
          </div>
        </div>
        <div className="scrollbar overflow-y-auto h-full dir-rtl">
          <div className="dir-ltr ">
            <div className="pb-20">
              <div className="col-span-4">
                {selectedModulesInRedux?.map((module, idx: number) => {
                  const { name, type, noOfQuestions, skills, time, Weightage } = module ?? {};

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
                })}
              </div>
              {/* <div className="col-span-3">
              <OverView />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modules;
