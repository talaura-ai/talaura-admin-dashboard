import { Dialog, DialogPanel, Select, Transition, TransitionChild } from '@headlessui/react';
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from 'react';
import { addModuleInModulesAndSelectedModules } from '../../app/features/moduleSlice';
import { useAppDispatch } from '../../app/hooks';
import IMAGES from '../../assets/images/Images';
import { ActionButtonContext } from '../Assessment/CreateAssessment';

const skills = [
  'Objective-C/Swift Proficiency',
  'UI/UX Standards',
  'Problem Solving',
  'iOS Frameworks',
  'Low-level C Libraries',
  'Collaboration',
  'Offline Storage & Threading',
];

const moduleTypes = ['Quiz', 'AI Video Interview', 'Voice To Voice', 'Voice to Text'];

{
  /* <option value="Sandbox">Sandbox</option>   
<option value="AI Video Interview">AI Video Interview</option>
<option value="Voice To Voice">Voice To Voice</option>
<option value="Voice to Text">Voice to Text</option> */
}
const AddNewModule: React.FC<any> = ({
  setCreateMode,
}: {
  setCreateMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setBtnState } = useContext(ActionButtonContext);

  useEffect(() => {
    setBtnState('hideAll');
    return () => setBtnState('');
  }, [setBtnState]);

  const [moduleSkills] = useState(skills);
  const [open, setOpen] = useState(false);
  const [moduleType, setModuleType] = useState('');
  const dispatch = useAppDispatch();
  const formInitialState = {
    Weightage: 0,
    name: '',
    noOfQuestions: 0,
    skills: [],
    time: 0,
    type: '',
  };
  const reducer = (state = formInitialState, action: any) => {
    switch (action.type) {
      case 'name':
        return { ...state, name: action.payload };
      case 'Weightage':
        return { ...state, Weightage: action.payload };
      case 'noOfQuestions':
        return { ...state, noOfQuestions: action.payload };
      case 'time':
        return { ...state, time: action.payload };
      case 'type':
        return { ...state, type: action.payload };
      case 'skills':
        if (action.operation === 'add') {
          return { ...state, skills: state.skills.concat(action.payload) };
        } else {
          return { ...state, skills: state.skills.filter((skl) => skl !== action.payload) };
        }
      default:
        return state;
    }
  };
  const [formData, localDispatch] = useReducer(reducer, formInitialState);

  return (
    <>
      <div className="relative mt-10 w-90 mx-10 h-full overflow-scroll  pb-20">
        <h1 className="text-[28px] font-Sansation_Regular">Creating a custom module . </h1>
        <div className="grid gap-6 mb-6 md:grid-cols-3 mt-6">
          <div>
            <label className="block mb-2 text-[18px] font-semibold text-[#7D7C7C]">
              Enter Module name<span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="module_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Module name"
              required
              name="name"
              onChange={(e) => localDispatch({ type: e.target.name, payload: e.target.value })}
            />
          </div>
          <div className="z-50">
            <label className="block mb-2 text-[18px] font-semibold text-[#7D7C7C]">
              Module Type<span className="text-red-700">*</span>
            </label>
            <Select
              value={moduleType}
              name="module_type"
              onChange={(e) => {
                localDispatch({ type: 'type', payload: e.target.value });
                setModuleType(e.target.value);
              }}
              aria-label="Project status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled className="text-[#EEE]">
                Select module type
              </option>
              {moduleTypes.map((moduleType: any) => {
                return <option value={moduleType}>{moduleType}</option>;
              })}
            </Select>
          </div>
          <div>
            <label className="block mb-2 text-[18px] font-semibold text-[#7D7C7C]">
              Module Duration<span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              id="company"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="00 mins"
              required
              name="time"
              onChange={(e) => localDispatch({ type: e.target.name, payload: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2 text-[18px] font-semibold text-[#7D7C7C]">
              Number of question
            </label>
            <input
              type="number"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter number of question"
              required
              max={10}
              name="noOfQuestions"
              onChange={(e) => localDispatch({ type: e.target.name, payload: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2 text-[18px] font-semibold text-[#7D7C7C]">
              Weightage %
            </label>
            <input
              type="number"
              id="website"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Weightage"
              required
              name="Weightage"
              onChange={(e) => localDispatch({ type: e.target.name, payload: e.target.value })}
            />
          </div>
        </div>
        <h1 className="text-[20px] font-semibold text-[#7D7C7C] font-Sansation_Regular">
          Select Skills
        </h1>
        <div className="grid gap-6 mb-6 md:grid-cols-3 mt-2">
          {moduleSkills?.map((item, idx: number) => (
            <div className="flex my-1 items-center" key={idx}>
              <div className="flex h-6 items-center">
                <input
                  id="review"
                  aria-describedby="offers-description"
                  name={item}
                  type="checkbox"
                  className="h-6 w-6 rounded border-gray-300 bg-white shadow-xl text-orange-text checked:bg-orange-text ring-0"
                  onChange={(e) => {
                    localDispatch({
                      type: 'skills',
                      payload: e.target.name,
                      operation: e.target.checked ? 'add' : 'remove',
                    });
                  }}
                />
              </div>
              <div className="ml-2">
                <h3 className="text-[18px] text-[#000000] font-Sansation">{item}</h3>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="flex flex-row mt-4 items-center gap-2"
          >
            <img src={IMAGES.plus} className="w-5 h-5" />
            <span className="text-light-orange">Add New Skills</span>
          </button>
        </div>
        <div className="flex flex-row mt-6 justify-center">
          <button
            onClick={() => {
              dispatch(addModuleInModulesAndSelectedModules(formData));
              setCreateMode(false);
            }}
            className="mt-2 mx-3 items-center justify-center rounded-md border px-6 py-2.5 text-base font-medium  shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse bg-orange-text text-white"
          >
            Done
          </button>
        </div>
      </div>
      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="w-full max-w-md relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                  <div className="px-2 pt-2">
                    <h3 className="text-[18px] font-Sansation_Regular">Add New Skill</h3>
                    <div>
                      <div className="sm:mt-2">
                        <hr className="h-1" />
                        <div className="mt-2">
                          <div>
                            <label className="block mb-2 text-[14px] font-semibold text-[#7D7C7C]">
                              Enter Skill
                            </label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2"
                              placeholder="Enter Skill Name"
                            />
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setOpen(true);
                              }}
                              className="flex flex-row mt-4 items-center gap-2"
                            >
                              <img src={IMAGES.plus} className="w-5 h-5" />
                              <span className="text-[#E5A972] text-[16px]">Add New Skills</span>
                            </button>
                          </div>
                          <hr className="mt-2 h-1" />
                        </div>
                      </div>
                    </div>
                    <div className="justify-end flex mt-3">
                      <button
                        onClick={() => {
                          setOpen(false);
                        }}
                        type="button"
                        className="justify-center rounded-[6px] px-7 py-1 text-sm border border-[#000] font-semibold text-black shadow-sm cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setOpen(false);
                        }}
                        type="button"
                        className="justify-center rounded-[6px] bg-orange-text px-7 py-1 text-sm font-semibold text-white shadow-sm ml-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddNewModule;
