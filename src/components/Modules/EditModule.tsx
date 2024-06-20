import ModuleCard from "./ModuleCard";
import OverView from "./OverView";

const EditModule: React.FC<any> = ({ module, editMode, setEditMode }) => {
  const { name, type, noOfQuestions, skills, time, Weightage } = module;
  return (
    <>
      <div className="scrollbar overflow-y-auto h-full dir-rtl">
        <div className="dir-ltr">
          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-4">
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
            <div className="col-span-3">
              <OverView
                editMode={editMode}
                module={module}
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
