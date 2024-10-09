import {
  Dialog,
  DialogPanel,
  Radio,
  RadioGroup,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import IMAGES from '../../assets/images/Images';
import { classNames } from '../Core/classNames';
import Insights from './Insights';
import JDDesc from './JDDesc';
const AI_API_URL = import.meta.env.VITE_AI_API_URL;

export interface IJD {
  isJobDescriptionRequired: boolean;
  assessment?: any;
  index?: number;
  jdData: string;
  setJDData: any;
  conversation_id: string;
}

export enum allowedFileTypes {
  PDF = 'application/pdf',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export const JDactionButtons = [
  {
    id: 1,
    label: 'Create job Description',
    name: 'Create',
  },
  {
    id: 2,
    label: 'Upload Job Description',
    name: 'Upload',
  },
];

const JD: React.FC<IJD> = ({
  isJobDescriptionRequired,
  assessment,
  jdData,
  setJDData,
  conversation_id,
}) => {
  const [jdType, setJdType] = useState('');
  const [open, setOpen] = useState(false);
  const [jdVisible, setJdVisible] = useState(false);
  const [actionButtonsVisible, setActionButtonsVisible] = useState(true);
  const [assistantMessage, setAssisstantMessage] = useState('');

  const label = isJobDescriptionRequired ? 'Enter the Job Description here' : 'Program description';

  const inputFile = useRef<any>(null);
  const [attachedFile, setAttachedFile] = useState<any>(null);

  const handleOnChangeFile = (e: { target: { files: SetStateAction<null>[] } }) => {
    if (e.target.files) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const renderFilePreview = () => {
    if (!attachedFile) return null;

    const fileName = attachedFile?.name;
    const length = 10;
    const fileExtension = fileName?.substring(fileName?.lastIndexOf('.') + 1);
    const ellipsisName = fileName.length > length ? `${fileName.substring(0, length)}` : fileName;

    return (
      <span className="overflow-ellipsis px-2">
        {ellipsisName}
        {'.'}
        {fileExtension}
      </span>
    );
  };

  const handleSubmitFile = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!attachedFile) {
      toast.error('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', assessment.assessmentId);
    formData.append('conversation_id', conversation_id);
    formData.append('file', attachedFile);

    try {
      const response = await fetch(`${AI_API_URL}upload_jd`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setJDData(result?.initial_jd);
      } else {
        toast.error(`Error: ${response?.statusText}`);
      }
      // setJDData("Sample Job Description Job Title: Human Resources Assistant Job Description: This position reports to the Human Resources (HR) director and interfaces with company managers and HR staff. Company XYZ is committed to an employee -orientated, hig h performance culture that emphasizes empowerment, quality, continuous improvement, and the recruitment and ongoing development of a superior workforce. The intern will gain exposure to these functional areas: HR Information Systems ; Employee relations ;");
      setJdVisible(true);
      setActionButtonsVisible(false);
    } catch (error) {
      console.error('Error:', error);
    }
    setOpen(false);
  };

  // const uploadJDMethod = () => {
  //   fetch("");

  //   // setOpen(false)
  // };

  function setInitialQuestionAction(value: string): void {
    if (value === 'Upload') {
      setOpen(true);
    }
    setJdType(value);
    // throw new Error("Function not implemented.");
  }
  // return <Insights />;
  useEffect(() => {
    setJdVisible(true);
  }, [isJobDescriptionRequired]);

  return (
    <>
      <div className="relative mt-10 w-90 mx-10">
        {isJobDescriptionRequired && (actionButtonsVisible === false || jdData) ? (
          <></>
        ) : (
          <label className="text-black text-2xl font-Sansation">{label}</label>
        )}
        {isJobDescriptionRequired && actionButtonsVisible ? (
          <>
            <RadioGroup
              onChange={(value) => {
                setInitialQuestionAction(value);
                setActionButtonsVisible(false);
              }}
              className="flex flex-row  gap-5 rounded-md mt-5 "
              value={jdType}
            >
              {JDactionButtons.map((action, actionIdx) => (
                <Radio
                  key={action.label}
                  value={action.name}
                  aria-label={action.label}
                  aria-description={`${action.label}`}
                  className={({ checked }) =>
                    classNames(
                      actionIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                      actionIdx === JDactionButtons.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                      checked ? 'z-10 border-indigo-200 ' : 'border-gray-200',
                      ' flex cursor-pointer flex-col border py-4 focus:outline-none md:grid  md:pl-4 md:pr-4 bg-white',
                    )
                  }
                >
                  {({ focus, checked }) => (
                    <>
                      <span className="flex items-center text-xl">
                        <span
                          className={classNames(
                            checked
                              ? 'border-transparent bg-orange-text'
                              : 'border-gray-300 bg-white',
                            focus ? 'ring-2 ring-orange-text ring-offset-2' : '',
                            'flex h-4 w-4 items-center justify-center rounded-full border',
                          )}
                          aria-hidden="true"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        </span>
                        <span
                          className={classNames(
                            checked ? 'text-indigo-900' : 'text-gray-900',
                            'ml-3 font-medium',
                          )}
                        >
                          {action.label}
                        </span>
                      </span>
                    </>
                  )}
                </Radio>
              ))}
            </RadioGroup>
          </>
        ) : null}
        {jdVisible && (
          <div className="grid grid-cols-4 h-screen gap-2">
            <div className="col-span-3">
              <JDDesc
                actionButtonsVisible={actionButtonsVisible}
                isJobDescriptionRequired={isJobDescriptionRequired}
                assessment={assessment}
                JDactionButtons={JDactionButtons}
                jdData={jdData}
                setJdData={setJDData}
                jdType={jdType}
                conversation_id={conversation_id}
                setAssisstantMessage={setAssisstantMessage}
                assistantMessage={assistantMessage}
                jdVisible={jdVisible}
                openModal={() => null}
              />
            </div>

            <div>
              <Insights
                actionButtonsVisible={actionButtonsVisible}
                isJobDescriptionRequired={isJobDescriptionRequired}
                jdData={jdData}
                setJdData={setJDData}
                jdType={jdType}
                setAssisstantMessage={setAssisstantMessage}
              />
            </div>
          </div>
        )}
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
                          <img
                            src={IMAGES.Upload}
                            alt="forgot-email-confirm"
                            className="h-4/12 w-4/12"
                            onClick={() => inputFile?.current?.click()}
                          />
                          <input
                            type="file"
                            name="file"
                            id="file"
                            hidden
                            // @ts-ignore
                            onChange={handleOnChangeFile}
                            ref={inputFile}
                            accept={`${allowedFileTypes.PDF},${allowedFileTypes.DOCX}`}
                          />
                        </div>
                        <h1 className="text-gray-500">
                          <label htmlFor="file" className="text-orange-text">
                            Chose file
                          </label>{' '}
                          to upload
                        </h1>
                        <p className="text-sm text-gray-400">pdf, docx are allowed</p>
                        {renderFilePreview()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 justify-center flex">
                    <button
                      type="submit"
                      className="  justify-center rounded-xl bg-orange-text px-7 py-1 text-sm font-semibold text-white shadow-sm hover:bg-brand-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-text"
                      onClick={handleSubmitFile}
                    >
                      Upload
                    </button>
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

export default JD;
