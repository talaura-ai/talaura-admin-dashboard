import { PencilIcon } from '@heroicons/react/24/solid';
import IMAGES from '../../assets/images/Images';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { classNames } from '../Core/classNames';
import {
  addModule,
  removeModuleSkill,
  removeSelectedModule,
  setModuleSkill,
  updateDuration,
  updateWeightage,
} from '../../app/features/moduleSlice';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ModuleCard: React.FC<any> = ({
  name,
  // noOfQuestions,
  // skills,
  // time,
  handleClick,
  editable = true,
  editMode,
  setEditMode,
  reviewAble,
}) => {
  const { selectedModules } = useAppSelector((state) => state.modules);
  const dispatch = useAppDispatch();
  const selectedModule = selectedModules.find((m: any) => m.name === name);
  const { selectedSkills } = useAppSelector((state) => state.skills);

  const handleCheckboxChange = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;

    if (checked) {
      dispatch(setModuleSkill({ name, skill: value }));
    } else {
      dispatch(removeModuleSkill({ name, skill: value }));
    }
  };
  // const [openTimer, setOpenTimer] = useState(false);
  // const [timer, setTimer] = useState("50:00");
  const [weight, setWeight] = useState(() =>
    selectedModule && selectedModule.Weightage ? selectedModule.Weightage : 0,
  );

  const [stateTime, setStateTime] = useState(() =>
    selectedModule && selectedModule.time ? selectedModule.time : 0,
  );

  const onChangeWeightage = (e: any) => {
    setWeight(e.target.value);
  };
  const handleChangeWeightage = async () => {
    dispatch(
      updateWeightage({
        name: name,
        Weightage: !isNaN(Number(weight)) ? Number(weight) : 0,
      }),
    );
  };

  const handleChangeDuration = async () => {
    dispatch(
      updateDuration({
        name: name,
        time: !isNaN(Number(stateTime)) ? Number(stateTime) : 0,
      }),
    );
  };

  // const [duration, setDuration] = useState({});
  return (
    <div
      className="flex rounded-2xl shadow-inner bg-white p-5 mt-5 mx-2 flex-col"
      //
      onClick={() => {
        if (reviewAble && handleClick) {
          handleClick();
        }
      }}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="grow justify-start items-start">
          <h1 className="text-orange-text">{name}</h1>
        </div>
        {!reviewAble && (
          <>
            {selectedModules.includes(selectedModule) ? (
              <div className=" items-end ">
                <CheckCircleIcon
                  className="h-6 w-6 text-orange-text"
                  onClick={() => dispatch(removeSelectedModule({ name }))}
                />
              </div>
            ) : (
              <div className=" items-end " onClick={() => dispatch(addModule({ name }))}>
                <PlusCircleIcon className="h-6 w-6 text-orange-text" />
              </div>
            )}
          </>
        )}
        {reviewAble && (
          <div className=" items-end ">
            <PencilIcon className="h-6 w-6 text-orange-text" />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-xs  text-gray-300">
            {selectedModule?.question?.filter((que: any) => que?.selected)?.length ?? 0} Question
          </h3>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mt-2">
        <div className="flex flex-row">
          <h1 className="">Skills</h1>
          {editable && (
            <div className="p-1 mx-2" onClick={handleClick}>
              <PencilIcon className="h-3 w-3 text-orange-text" />
            </div>
          )}
        </div>
      </div>
      <div className={classNames('flex  ', editMode ? 'flex-col' : 'flex-row items-center')}>
        {editMode ? (
          <>
            {selectedSkills?.map((skill: any, idx: number) => {
              return (
                <div className="relative flex items-start my-1" key={idx}>
                  <div className="flex h-6 items-center">
                    <input
                      id={skill}
                      aria-describedby={skill}
                      name={skill}
                      type="checkbox"
                      checked={selectedModule.skills.includes(skill)}
                      onChange={handleCheckboxChange}
                      value={skill}
                      className="h-6 w-6 rounded border-gray-300 text-brand-color focus:ring-brand-color"
                    />
                  </div>
                  <div className="ml-3  leading-6">
                    <label
                      // htmlFor={skill}
                      className="font-medium text-gray-900 font-Sansation_Bold text-lg"
                    >
                      {skill}
                    </label>
                    {/* <span id="comments-description" className="text-gray-500">
                                          <span className="sr-only">New comments </span>so you always know what's happening.
                                      </span> */}
                  </div>
                  <div></div>
                </div>
              );
            })}
          </>
        ) : (
          <p className="text-gray-300 text-sm">
            {selectedModule?.skills?.join(',') ?? 'Some Skills'}
          </p>
        )}
      </div>
      {!editMode ? (
        <div className="flex flex-row items-center">
          <div>
            <h1>
              Weightage:{' '}
              <span className="text-gray-300">
                {selectedModule && selectedModule.Weightage ? (
                  <input
                    className="w-8 p-0 inline ring-0 border-0 focus:ring-0 focus:border-b-1"
                    type="text"
                    value={weight}
                    onChange={(e) => onChangeWeightage(e)}
                    onBlur={() => handleChangeWeightage()}
                  />
                ) : (
                  selectedModules.reduce(
                    (acc: any, val: { Weightage: any }) => Number(val.Weightage) + Number(acc),
                    0,
                  )
                )}
                %
              </span>
            </h1>
          </div>
          {/* <div
          className="p-2 w-20 focus:ring-0 active:ring-0 focus:border-0 active:border-0"
          //   contentEditable
        >
          <p className="text-gray-300">{selectedModule.Weightage}%</p>
        </div> */}
          <div className="flex grow justify-end items-center">
            <img src={IMAGES.Time} className="h-4 w-4 justify-center items-center" />
            <span
              className="justify-center items-center ml-1"
              onClick={() => {
                // setOpenTimer(true);
              }}
            >
              <input
                className="w-8 p-0 inline ring-0 border-0 focus:ring-0 focus:border-b-1"
                type="text"
                value={stateTime}
                onChange={(e) => setStateTime(e.target.value)}
                onBlur={() => handleChangeDuration()}
              />
              min
            </span>
          </div>
        </div>
      ) : null}
      {editMode && (
        <div className="flex items-center justify-center my-5">
          <button
            onClick={() => {
              if (!selectedModule.skills.length) {
                toast.error('Please select atleast one skill in this module');
              } else {
                setEditMode(false);
              }
            }}
            type="button"
            className="justify-center rounded-[6px] bg-orange-text px-7 py-1 text-sm font-semibold text-white shadow-sm ml-2"
          >
            Done
          </button>
        </div>
      )}
      {/* <div className="flex absolute w-[220px]  mx-auto p-1 left-[35vw] top-[27vh]">
            {openTimer &&   <>
              <DurationPicker 
            noHours
            
            
            onChange={duration => setDuration(duration)}
            />
          
            </>
        }
          </div> */}
    </div>
  );
};

export default ModuleCard;
