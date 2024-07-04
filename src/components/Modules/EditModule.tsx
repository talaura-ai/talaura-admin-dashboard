import { useContext, useEffect } from 'react';
import { ActionButtonContext } from '../CreateAssessment';
import ModuleCard from './ModuleCard';

const EditModule: React.FC<any> = ({ module, editMode, setEditMode }) => {
  const { name, type, noOfQuestions, skills, time, Weightage } = module;
  const { setBtnState } = useContext(ActionButtonContext);

  useEffect(() => {
    setBtnState('hideAll');
    return () => setBtnState('');
  }, [setBtnState]);

  return (
    <>
      <div className="scrollbar overflow-y-auto h-full">
        <div className="">
          <div className="">
            <div className="">
              <ModuleCard
                name={name}
                type={type}
                noOfQuestions={noOfQuestions}
                skills={skills}
                time={time}
                Weightage={Weightage}
                editable={false}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModule;
