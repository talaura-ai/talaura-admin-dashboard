import { Textarea } from '@headlessui/react';
import IMAGES from '../../assets/images/Images';
import JDMessageInput from './JDMessageInput';
import { useEffect, useState } from 'react';

export interface IJDDesc {
  isJobDescriptionRequired: boolean;
  JDactionButtons: any[];
  assessment?: any;
  jdData: string;
  jdType?: any;
  conversation_id: string;
  setJdData: any;
  assistantMessage: any;
  setAssisstantMessage: any;
  actionButtonsVisible?: any;
  jdVisible?: any;
  openModal: any;
}

const JDDesc: React.FC<IJDDesc> = ({
  isJobDescriptionRequired,
  assessment,
  conversation_id,
  jdData,
  setJdData,
  assistantMessage,
  setAssisstantMessage,
  actionButtonsVisible,
  openModal,
}) => {
  const [aiMessage, setAiMessage] = useState('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (aiMessage) {
      setJdData(aiMessage);
    }
  }, [aiMessage, isJobDescriptionRequired, setJdData]);

  const handleErrorOnTextChange = (text: string) => {
    const alphabeticCharacters = text.match(/[a-zA-Z]/g);
    if ((alphabeticCharacters && alphabeticCharacters.length < 3) || !alphabeticCharacters) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  if (isJobDescriptionRequired && actionButtonsVisible) {
    return null;
  }
  return (
    <>
      {isJobDescriptionRequired ? (
        <>
          {!jdData ? (
            <>
              <div className="flex  flex-col justify-center items-center h-[50vh] rounded-lg shadow-inner bg-white mt-1">
                <img src={IMAGES.Empty_JD} alt="empty-jd" className="h-40 w-40 flex" />
                <h2 className="mt-4 text-1xl font-bold tracking-tight sm:text-3xl  text-gray-300 flex">
                  Enter Job description
                </h2>
              </div>
              <div className="rounded-full bg-app-color w-50 h-50 absolute top-20 left-5 border border-sm shadow-md border-[#E5A971] drop-shadow-xl shadow-brand-color p-2">
                <img src={IMAGES.JD_Logo} className="w-5 h-5" />
              </div>
            </>
          ) : (
            <>
              {aiMessage && aiMessage.length ? (
                <div
                  contentEditable
                  className="flex  flex-col justify-center items-center h-[50vh] rounded-lg shadow-inner bg-white mt-1
                              p-5 pt-10 scrollbar overflow-y-auto"
                  dangerouslySetInnerHTML={{
                    __html: aiMessage,
                  }}
                ></div>
              ) : (
                <>
                  <div className="flex  flex-col justify-center items-center h-[50vh] rounded-lg shadow-inner bg-white mt-1">
                    <div
                      contentEditable
                      className="overflow-auto
                                  scrollbar
                                  p-5
                                  bg-white
                              "
                      dangerouslySetInnerHTML={{
                        __html: aiMessage && aiMessage.length ? aiMessage : jdData,
                      }}
                    ></div>
                  </div>
                  <div className="rounded-full bg-app-color w-50 h-50 absolute top-8 -left-5 border border-sm shadow-sm border-[#E5A971] drop-shadow-xl shadow-brand-color p-2">
                    <img src={IMAGES.JD_Logo} className="w-5 h-5" />
                  </div>
                </>
              )}
            </>
          )}
          <div>
            <JDMessageInput
              conversation_id={conversation_id}
              assessmentId={assessment.assessmentId}
              jdData={jdData}
              setJdData={setJdData}
              assistantMessage={assistantMessage}
              setAssisstantMessage={setAssisstantMessage}
              setAiMessage={setAiMessage}
              aiMessage={aiMessage}
            />
          </div>
        </>
      ) : (
        <div>
          <div className="mt-10 bg-white">
            <Textarea
              rows={3}
              name="jd_descriptions"
              id="jd_descriptions"
              onBlur={(e) => {
                handleErrorOnTextChange(e.target.value);
              }}
              className="block bg-white rounded-lg shadow-lg ring-1 ring-inset
               ring-gray-300 placeholder:text-gray-400  peer text-2xl  w-full border-0 
               bg-transparent py-1.5 text-gray-900 focus:ring-0 placeholder-gray-300"
              value={jdData}
              onChange={(e) => {
                setJdData(e.target.value);
                handleErrorOnTextChange(e.target.value);
              }}
              placeholder="Describe your requirements here"
            />
          </div>
          {isError && (
            <p className="mt-1 text-[#FB2121] text-sm font-bold">
              Assessment description with minimum 3 alphabet is mandatory
            </p>
          )}
          <p className="text-center my-4">Or</p>
          <button
            type="button"
            onClick={openModal}
            style={{ margin: '0px 25%' }}
            className="w-1/2 bg-[#FFF6ED] text-[#CA9A6F] font-medium py-3 px-6 rounded-lg border border-[#CA9A6F] mb-4 transition-all hover:bg-orange-200"
          >
            Upload Job Descriptions
          </button>{' '}
        </div>
      )}
    </>
  );
};

export default JDDesc;
