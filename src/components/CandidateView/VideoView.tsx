import { useMemo } from 'react';
import { ICandidateReportData } from '../AssessmentView/types';

const VideoView = ({ candidateData }: { candidateData?: ICandidateReportData }) => {
  // const [isVideoPlayed, setIsVideoPlayed] = useState<boolean>(false);
  const reportData = candidateData?.report.find((rp) => rp.moduleType === 'AI Video Interview');

  const userAiChat: { id: number; sender: string; message: string }[] = useMemo(() => {
    let answer = '';
    if (reportData?.question && reportData.question.length) {
      answer = reportData.question[0].answer;
    }
    const splitMessages = answer.split(/(?=User:|AI:)/);

    let idx = 0;
    return splitMessages.map((message) => {
      const [speaker, ...content] = message.split(':');
      return {
        id: ++idx,
        sender: speaker.trim() === 'AI' ? speaker : 'USR',
        message: content.join(':').trim(),
      };
    });
  }, [reportData?.question]);

  return (
    <div className="flex flex-col w-full">
      <div className="self-end flex justify-between mb-4 w-full">
        <h5 className="text-customGray-100 text-xl font-bold"></h5>
        <div className="row1_col2 flex gap-2 text-base font-bold text-black">
          <div className="container flex items-center justify-center ">
            <div className="indicator h-[10px] w-[10px] bg-red-400 rounded-full mx-2" />
            <span>Low</span>
          </div>
          <div className="container flex items-center justify-center ">
            <div className="indicator h-[10px] w-[10px] bg-golden-700 rounded-full mx-2" />
            <span>Medium</span>
          </div>
          <div className="container flex items-center justify-center ">
            <div className="indicator h-[10px] w-[10px] bg-green-400 rounded-full mx-2" />
            <span>High</span>
          </div>
        </div>
      </div>
      <div className="row2 flex gap-4 justify-between mb-3">
        <div className="w-1/2 border border-[#E0E0E0] shadow-[0_4px_4px_0_(0,0,0,0.25)] rounded-[10px] bg-white">
          <div className="bg-[#E4FFE0] pt-[10px] pb-3">
            <span className="text-[#40B24B] font-Sansation_Regular font-bold text-xl">
              Interview Score : {reportData?.average ?? 0}
            </span>
          </div>
          <div className="flex justify-center items-center h-[264px]">
            {/* {isVideoPlayed ? (
              <div className="h-full w-full">
                <iframe
                  src="https://www.youtube.com/embed/H8Lyj2D_cWo?autoplay=1"
                  allow="autoplay"
                  className="w-full h-[264px] p-2"
                  allowFullScreen
                ></iframe>
              </div>
            ) : ( */}
            <button
            // onClick={() => setIsVideoPlayed(true)}
            >
              <img src="/images/YouTube.png" alt="YouTube Play" />
            </button>
            {/* )} */}
          </div>
        </div>
        <div className="w-1/2 border border-[#E0E0E0] shadow-[0_4px_4px_0_(0,0,0,0.25)] rounded-[10px] bg-white">
          <div className="flex px-4 pt-5 pb-2.5 border-b-2 border-bottom-#[#D6D6D6]">
            <span className="text-2xl text-black text-left font-Sansation_Bold">Transcript</span>
          </div>
          <div className="chat-container h-[254px] overflow-scroll p-[18px]">
            {userAiChat.map((dt) => (
              <div
                className={`flex ${dt.sender === 'AI' ? 'flex-row' : 'flex-row-reverse'} justify-start items-center mb-5 gap-2 w-full`}
                key={dt.id}
              >
                <div className="bg-[#E4E1E1] rounded-full h-[40px] w-[40px] flex justify-center items-center">
                  <span className={`text-sm text-[#CC8448] text-center leading-4`}>
                    {dt.sender}
                  </span>
                </div>
                <div className="chat-text  max-w-[80%]">
                  <p
                    className={`text-black text-xs ${dt.sender === 'AI' ? 'text-left' : 'text-right'}`}
                  >
                    {dt.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full border border-[#E0E0E0] shadow-[0_4px_4px_0_(0,0,0,0.25)] rounded-[10px] bg-white">
        <div className="flex px-4 pt-5 pb-2.5 border-b-2 border-bottom-#[#D6D6D6]">
          <span className="text-2xl text-black text-left font-Sansation_Bold">AI Context</span>
        </div>
        <div className="py-4 px-10 text-black text-left text-sm">
          <p>{reportData?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoView;
