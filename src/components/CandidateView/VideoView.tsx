import { useCallback, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { generateSignedUrlS3, getColorAccordingToScore } from '../../helpers/utils';
import { ICandidateReportData } from '../AssessmentView/types';
import LoadingScreen from '../Loading/LoadingScreen';

const VideoView = ({ candidateData }: { candidateData?: ICandidateReportData }) => {
  const [isVideoPlayed, setIsVideoPlayed] = useState<boolean>(false);
  const [videoSignedUrl, setVideoSignedUrl] = useState<string>('');
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | undefined>('');
  const reportData = candidateData?.report.find((rp) => rp.moduleType === 'AI Video Interview');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const mediaControls = () => {
    if (videoRef.current && audioRef.current) {
      if (!videoRef.current.paused && !audioRef.current.paused) {
        videoRef.current.pause();
        audioRef.current.pause();
      } else {
        videoRef.current.play();
        audioRef.current.play();
      }
    }
  };

  console.log('audio', candidateData?.report[0]?.audioUrl);

  console.log('video url', videoSignedUrl);

  const createSignedUrl = useCallback(async () => {
    try {
      if (!reportData?.videoUrl) {
        return toast.error('No video found');
      }
      setIsVideoLoading(true);
      const urlObject = new URL(reportData?.videoUrl.replace('%2F', '/'));
      const videoPath = urlObject.pathname.slice(1);
      const signedUrl = await generateSignedUrlS3(videoPath);

      setVideoSignedUrl(signedUrl);
      setIsVideoPlayed(true);
      setAudioUrl(candidateData?.report[0]?.audioUrl);

      setIsVideoLoading(false);
      if (videoRef.current && audioRef.current) {
        videoRef.current.play();
        audioRef.current.play();
      }
    } catch (error: any) {
      console.log('Error playing Video', error);
      toast.error(error?.message ?? 'Unable to play video');
      setIsVideoLoading(false);
    }
  }, [reportData?.videoUrl]);

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
      <div className="self-end flex justify-between mb-4 mt-2 w-full">
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
          <div
            className={` pt-[10px] pb-3`}
            style={{ backgroundColor: getColorAccordingToScore(reportData?.average ?? 0, 0.5) }}
          >
            <span
              className={`font-Sansation_Regular font-bold text-xl`}
              style={{ color: getColorAccordingToScore(reportData?.average ?? 0, 1) }}
            >
              Interview Score : {reportData?.average ?? 0}
            </span>
          </div>
          <div className="flex justify-center items-center h-[264px]">
            {isVideoLoading ? (
              <LoadingScreen />
            ) : isVideoPlayed ? (
              <div className="h-full w-full " onClick={() => mediaControls()}>
                <video
                  className="w-full h-[254px] p-2 pointer-events-none"
                  controls
                  autoPlay
                  ref={videoRef}
                >
                  <source src={videoSignedUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <audio src={audioUrl} controls autoPlay ref={audioRef} className="hidden" />
              </div>
            ) : (
              <button onClick={createSignedUrl}>
                <img src="/images/YouTube.png" alt="YouTube Play" />
              </button>
            )}
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
      <div className="flex flex-row gap-2.5">
        <div
          className={`${reportData?.report && reportData?.report.length > 0 ? 'w-1/2' : 'w-full'} border border-[#E0E0E0] shadow-[0_4px_4px_0_(0,0,0,0.25)] rounded-[10px] bg-white`}
        >
          <div className="flex px-4 pt-5 pb-2.5 border-b-2 border-bottom-#[#D6D6D6]">
            <span className="text-2xl text-black text-left font-Sansation_Bold">AI Context</span>
          </div>
          <div className="py-4 px-10 text-black text-left text-sm  max-h-[264px] overflow-y-scroll">
            <p
              dangerouslySetInnerHTML={{
                __html: reportData?.description?.replace(/(\d)(?=\.)/g, '<br>$1') ?? '',
              }}
            />
          </div>
        </div>
        {reportData?.report && reportData?.report.length > 0 && (
          <div className="w-1/2 border border-[#E0E0E0] shadow-[0_4px_4px_0_(0,0,0,0.25)] rounded-[10px] bg-white">
            <div className="flex px-4 pt-5 pb-2.5 border-b-2 border-bottom-#[#D6D6D6]">
              <span className="text-2xl text-black text-left font-Sansation_Bold">
                Skill Wise Report
              </span>
            </div>
            <div className="py-4 px-10 text-black text-left text-sm max-h-[264px] overflow-y-scroll">
              {reportData?.report.map((rpt) => (
                <div key={rpt._id}>
                  <div className={`flex flex-row justify-start items-center mb-5 gap-2 w-full`}>
                    <div className="chat-text max-w-[80%]">
                      <h4 className={`text-[#7D7C7C] text-base font-bold text-left`}>
                        {rpt.name}:{' '}
                        <span
                          style={{
                            color: getColorAccordingToScore(rpt.score ?? 0, 1),
                          }}
                        >
                          {rpt.score}%
                        </span>
                      </h4>
                    </div>
                  </div>
                  {rpt?.text && (
                    <div
                      className={`flex flex-row-reverse justify-start items-center mb-5 gap-2 w-full`}
                    >
                      <div className="chat-text  max-w-[80%]">
                        <p className={`text-black text-base text-right`}>{rpt.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoView;
