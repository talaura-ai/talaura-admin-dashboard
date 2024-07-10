import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { IAssessmentModalDt } from '../../helpers/types';
import {
  useDuplicateAssessmentMutation,
  useRenameAssessmentMutation,
} from '../../app/services/assessments';
import LoadingScreen from '../Loading/LoadingScreen';

const AssessmentActionModal = ({
  showModalData,
  setShowModalData,
}: {
  showModalData: IAssessmentModalDt;
  setShowModalData: Dispatch<SetStateAction<IAssessmentModalDt>>;
}) => {
  const [duplicateAssessmentApi, { isLoading }] = useDuplicateAssessmentMutation();
  const [renameAssessmentApi, { isLoading: loadingRename }] = useRenameAssessmentMutation();
  const [name, setName] = useState<string>('');
  let headerText = '';

  if (showModalData === '') {
    return null;
  } else if (showModalData.text === 'duplicate') {
    headerText = 'Name Of Duplicate Assessment';
  } else {
    headerText = 'Rename Assessment';
  }

  const handleSave = async () => {
    try {
      if (showModalData.text === 'duplicate') {
        await duplicateAssessmentApi({ _id: showModalData.assessmentId, name });
      } else {
        await renameAssessmentApi({ _id: showModalData.assessmentId, name });
      }
      setShowModalData('');
    } catch (error) {
      console.log('error', error);
    }
  };

  if (isLoading || loadingRename) {
    <LoadingScreen />;
  }
  return (
    <Transition show={true}>
      <Dialog className="relative z-10" onClose={() => setShowModalData('')}>
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
              <DialogPanel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="w-[700px] h-[300px] rounded-lg bg-white p-5 px-6">
                  <div className="border-b border-b-[#E0E0E0]">
                    <h3 className="text-xl font-bold font-Sansation_Bold mb-4">{headerText}</h3>
                  </div>
                  <div className="pt-5 flex flex-col gap-2 mb-[70px]  px-9">
                    <label htmlFor="name" className="font-Sansation_Bold text-bold text-[#7D7C7C]">
                      Enter Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={30}
                      placeholder="Enter Name"
                      className="rounded-md border border-[#C2C2C2] placeholder-[#9F9D9D] max-w-[350px] py-2.5"
                    />
                  </div>
                  <div className="border-t border-b-[#E0E0E0] flex justify-end gap-5 pt-2.5">
                    <button
                      className="w-[120px] text-xl text-black border border-black py-2 px-7 bg-white rounded-md"
                      onClick={() => setShowModalData('')}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-[120px] text-xl text-white border border-[#CC8448] py-2 px-7 bg-[#CC8448] rounded-md"
                      onClick={handleSave}
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
  );
};

export default AssessmentActionModal;
