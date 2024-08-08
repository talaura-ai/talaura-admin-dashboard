import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  addSkill,
  addSkillInSelectedSkills,
  removeSelectedSkill,
} from '../../app/features/skillsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import IMAGES from '../../assets/images/Images';
import { classNames } from '../Core/classNames';
import { formatAndUniqueSkills } from '../../helpers/utils';
import toast from 'react-hot-toast';

export interface ISkills {
  skills: string[];
  setSkillsData: Dispatch<SetStateAction<string[]>>;
  generateSkills: () => Promise<boolean | undefined>;
}

const Skills: React.FC<ISkills> = () => {
  const { skills, selectedSkills } = useAppSelector((state) => state.skills);
  const [open, setOpen] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmitNewSkill = () => {
    if (selectedSkills.length === formatAndUniqueSkills([...selectedSkills, customSkill]).length) {
      toast.error('Skill already exists');
      return;
    }
    dispatch(addSkill(customSkill));
    dispatch(addSkillInSelectedSkills(customSkill));
    setOpen(false);
    setCustomSkill('');
  };

  const handleCheckboxChange = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;

    if (checked) {
      dispatch(addSkillInSelectedSkills(value));
    } else {
      dispatch(removeSelectedSkill(value));
    }
  };

  return (
    <div className="mt-10">
      <p className="text-black text-2xl font-Sansation ml-10">
        Based on the description, below skills are recommended to be tested.
      </p>
      <p className="ml-10 text-gray-500">(You can add or remove skills.)</p>
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
              </div>
            </div>
          );
        })}
      </div>
      <div className="ml-10">
        <button className="flex flex-row py-5 gap-1" onClick={() => setOpen(true)}>
          <img src={IMAGES.plus} className="w-5 h-5" />
          <span className="text-orange-text text-sm">Add new skill</span>
        </button>
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
