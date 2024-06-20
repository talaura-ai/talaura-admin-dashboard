import { Textarea } from '@headlessui/react';
import IMAGES from '../../assets/images/Images';
import JDMessageInput from './JDMessageInput';

export interface IJDDesc {
  isJobDescriptionRequired: boolean;
  JDactionButtons: any[];
  assessment?: any;
  jdData?: any;
  jdType?: any;
  conversation_id: string;
  setJdData: any;
  assistantMessage: any;
  setAssisstantMessage: any;
}

const JDDesc: React.FC<IJDDesc> = ({
  isJobDescriptionRequired,
  assessment,
  conversation_id,
  jdData,
  setJdData,
  assistantMessage,
  setAssisstantMessage,
}) => {
  return (
    <>
      {!isJobDescriptionRequired ? (
        <div className='my-10'>
          <Textarea
            rows={6}
            name='jd_descriptions'
            id='jd_descriptions'
            className='block w-full rounded-lg border-0 py-1.5 text-black shadow-lg ring-1 ring-inset  ring-gray-300 placeholder:text-gray-400  focus:ring-0 text-lg'
            defaultValue={''}
            placeholder='Describe your requirments here'
          />
        </div>
      ) : (
        <>
          {!jdData ? (
            <>
              <div className='flex  flex-col justify-center items-center h-[50vh] rounded-lg shadow-inner bg-white mt-1'>
                <img
                  src={IMAGES.Empty_JD}
                  alt='empty-jd'
                  className='h-40 w-40 flex'
                />
                <h2 className='mt-4 text-1xl font-bold tracking-tight sm:text-3xl  text-gray-300 flex'>
                  Enter Job description
                </h2>
              </div>
              <div className='rounded-full bg-app-color w-50 h-50 absolute top-20 left-5 border border-sm shadow-md border-[#E5A971] drop-shadow-xl shadow-brand-color p-2'>
                <img src={IMAGES.JD_Logo} className='w-5 h-5' />
              </div>
            </>
          ) : (
            <>
              <div className='flex  flex-col justify-center items-center h-[50vh] rounded-lg shadow-inner bg-white mt-1'>
                <div
                  className='overflow-x-auto
                                    scrollbar
                                    p-5
                                '
                  dangerouslySetInnerHTML={{
                    __html: jdData,
                  }}></div>
              </div>
              <div className='rounded-full bg-app-color w-50 h-50 absolute top-8 -left-5 border border-sm shadow-sm border-[#E5A971] drop-shadow-xl shadow-brand-color p-2'>
                <img src={IMAGES.JD_Logo} className='w-5 h-5' />
              </div>
              <div>
                <JDMessageInput
                  conversation_id={conversation_id}
                  assessmentId={assessment.assessmentId}
                  jdData={jdData}
                  setJdData={setJdData}
                  assistantMessage={assistantMessage}
                  setAssisstantMessage={setAssisstantMessage}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default JDDesc;
