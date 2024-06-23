import { useState } from 'react';
import IMAGES from '../../assets/images/Images';
import { Transition, Dialog, TransitionChild, DialogPanel } from '@headlessui/react';
import { classNames } from '../Core/classNames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSkill, removeSelectedSkill, setSelectedSkill } from '../../app/features/skillsSlice';

export interface ISkils {
  setSkillsData: any;
}

// const mockSkills = [
//   "Proficiency in Node.js",
//   "Experience with Express.js or similar frameworks",
//   "Strong understanding of JavaScript (ES6+)",
//   "Knowledge of asynchronous programming and event-driven architecture",
//   "Experience with RESTful API design and development",
//   "Familiarity with database technologies (e.g., MongoDB, MySQL, PostgreSQL)",
//   "Understanding of version control systems (e.g., Git)",
//   "Experience with testing frameworks (e.g., Mocha, Chai, Jest)",
//   "Knowledge of containerization and orchestration tools (e.g., Docker, Kubernetes)",
//   "Familiarity with cloud services (e.g., AWS, Azure, Google Cloud)",
//   "Strong problem-solving skills",
// ];

const Skills: React.FC<ISkils> = () => {
  const { skills, selectedSkills } = useAppSelector((state) => state.skills);

  //    const [skillsState, setSkillsState] = useState(() => skills)

  const [open, setOpen] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  //   const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleSubmitNewSkill = () => {
    // setSkillsState((oldSkills) => [...oldSkills, customSkill]);

    dispatch(addSkill(customSkill));
    setOpen(false);
  };

  const handleCheckboxChange = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;

    if (checked) {
      dispatch(setSelectedSkill(value));
    } else {
      dispatch(removeSelectedSkill(value));
    }
  };

  return (
    <div className="mt-10 w-[60vw]">
      <label className="text-black text-2xl font-Sansation">
        Based on the details you just gave, I’ll be testing the candidates on these skills.{' '}
        <span className="text-gray-400">(Select or Add skills)</span>
      </label>
      <div className="relative mt-10 ml-10 w-[75vw] flex-wrap grid grid-cols-3">
        {skills.map((skill: any, idx: number) => {
          return (
            <div className="relative flex items-start" key={idx}>
              <div className="flex h-6 items-center">
                <input
                  id={skill}
                  aria-describedby={skill}
                  name={skill}
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={handleCheckboxChange}
                  value={skill}
                  className="h-4 w-4 rounded border-gray-300 text-brand-color focus:ring-brand-color"
                />
              </div>
              <div className="ml-3  leading-6">
                <label
                  htmlFor={skill}
                  className="font-medium text-gray-900 font-Sansation_Bold text-sm"
                >
                  {skill}
                </label>
                {/* <span id="comments-description" className="text-gray-500">
                                    <span className="sr-only">New comments </span>so you always know what's happening.
                                </span> */}
              </div>
            </div>
          );
        })}
        <button className="flex flex-row py-5 gap-1" onClick={() => setOpen(true)}>
          <img src={IMAGES.plus} className="w-5 h-5" />
          <span className="text-orange-text text-sm">Add new skill</span>
        </button>

        {/* To add Skills */}
        {/* <div className="flex flex-col mt-3">
          <button
            className="flex flex-row gap-3"
            onClick={(e) => {
              e.preventDefault();
              if (customValue && customValue.length) {
                setSkillsData((oldSkills) => {
                  return [
                    ...oldSkills,
                    {
                      name: customValue,
                      title: customValue,
                    },
                  ];
                });
              }

              setCustomValue("");
            }}
          >
            <img src={IMAGES.plus} className="w-5 h-5" />
            <span className="text-light-orange">Add New Field</span>
          </button>
          <div className="justify-start">
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="text-xs rounded 
                            placeholder-gray-300
                            border-0
                            shadow
                            shadow-inset
                            ring-0
                            focus:ring-0
                            "
              placeholder="Enter your custom field"
            ></input>
          </div>
        </div> */}

        {/* <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
          aria-hidden="true"
        /> */}
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
                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <img
                      src={IMAGES.Cancel}
                      className="h-8 w-8 text-gray-400 absolute right-0 top-0"
                      onClick={() => setOpen(false)}
                    />

                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <hr className="mt-2 h-1" />
                        <div className="mt-2">
                          <div className="flex justify-center">
                            <input
                              type={'text'}
                              name={'customSkill'}
                              id={'customSkill'}
                              className={classNames(
                                'peer text-2xl  w-full border-0 bg-transparent py-1.5 text-gray-900 focus:ring-0 placeholder-gray-300',
                              )}
                              placeholder={'Enter skill'}
                              value={customSkill}
                              onChange={(e) => setCustomSkill(e.target.value)}
                            />
                            <button
                              type="submit"
                              className="  justify-center rounded-xl bg-orange-text px-7 py-1 text-sm font-semibold text-white shadow-sm hover:bg-brand-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-text"
                              onClick={handleSubmitNewSkill}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 justify-center flex"></div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default Skills;
