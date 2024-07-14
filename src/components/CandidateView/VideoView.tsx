import { useState } from 'react';

const VideoView = () => {
  const [isVideoPlayed, setIsVideoPlayed] = useState<boolean>(false);
  const Data = {
    score: 74,
    transcript: [
      {
        id: 1,
        sender: 'AI',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
      {
        id: 2,
        sender: 'ME',
        text: 'kjbrk cj ekc ',
      },
      {
        id: 3,
        sender: 'AI',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
      {
        id: 4,
        sender: 'ME',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
      {
        id: 5,
        sender: 'AI',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
      {
        id: 6,
        sender: 'ME',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
      {
        id: 7,
        sender: 'AI',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
      {
        id: 8,
        sender: 'ME',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
      {
        id: 9,
        sender: 'AI',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
      {
        id: 10,
        sender: 'AI',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
      {
        id: 11,
        sender: 'Me',
        text: 'kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf',
      },
    ],
  };
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
              Interview Score : {Data.score}
            </span>
          </div>
          <div className="flex justify-center items-center h-[264px]">
            {isVideoPlayed ? (
              <div className="h-full w-full">
                <iframe
                  src="https://www.youtube.com/embed/vUnv5M3tVwE?autoplay=1"
                  allow="autoplay"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-[264px] p-2"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <button onClick={() => setIsVideoPlayed(true)}>
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
            {Data.transcript.map((dt) => (
              <div
                className={`flex ${dt.sender === 'AI' ? 'flex-row' : 'flex-row-reverse'} justify-start items-center mb-5 gap-2`}
                key={dt.id}
              >
                <div className="chat-img bg-[#E4E1E1] rounded-[110px] h-full w-[30px] px-[7.5px] flex justify-center items-center">
                  <span className={`text-sm text-[#CC8448] w-3 break-all text-center leading-4`}>
                    {dt.sender}
                  </span>
                </div>
                <div className="chat-text">
                  <p
                    className={`text-black text-xs ${dt.sender === 'AI' ? 'text-left' : 'text-right'}`}
                  >
                    {dt.text}
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
          <p>
            kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre
            evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkfkjbrk cj ekc kjekvek jner ernln
            lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev
            erkv ke kve erk vrle rkf kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler
            vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf kjbrk cj
            ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv
            elvknrfnrvkrekjrev erkv ke kve erk vrle rkfkjbrk cj ekc kjekvek jner ernln lekrlrv
            klvnenerk knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve
            erk vrle rkfVerbal Reasoning : kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk
            knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle
            rkfData Interpretation : vrle rkf kjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk
            knvrefvkrler vreknvrklne knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle
            rkfkjbrk cj ekc kjekvek jner ernln lekrlrv klvnenerk knvrefvkrler vreknvrklne
            knrelfnvkre evjkn k kv elvknrfnrvkrekjrev erkv ke kve erk vrle rkf
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoView;
