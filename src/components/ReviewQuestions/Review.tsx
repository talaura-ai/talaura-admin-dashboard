export interface ReviewQuestionsProps {
  questions: any;
  module?: any;
  setShowQuestions: any;
}

const ReviewQuestions: React.FC<ReviewQuestionsProps> = ({
  module,
  questions,
  setShowQuestions,
}) => {
  return (
    <>
      <div className="relative mt-10 w-full mx-10 z-[999]">
        <div className="grid grid-cols-1 h-screen">
          <div className="flex flex-col h-[50vh] rounded-lg shadow-inner bg-white p-8 overflow-scroll z-50">
            {questions?.map((v: any, index: number) => (
              <div key={v?.title + index} className="flex my-2 items-center">
                <div className="flex h-6 items-center">
                  {/* <input
                    id="review"
                    aria-describedby="offers-description"
                    name="offers"
                    type="checkbox"
                    className="h-6 w-6 rounded border-gray-300 bg-white shadow-xl text-orange-text checked:bg-orange-text ring-0"
                  /> */}
                </div>
                <div className="ml-4">
                  <h3 className="text-[16px] text-[#000000] font-Sansation">Q. {v?.title}</h3>
                  <h3 className="text-[16px] text-[#000000] font-Sansation">{v?.description}</h3>
                </div>
              </div>
            ))}
            <div>
              {/* <button className="flex flex-row mt-4 items-center gap-3">
                <img src={IMAGES.plus} className="w-5 h-5" />
                <span className="text-light-orange">Add New Question</span>
              </button> */}
            </div>
            <div className="flex flex-row justify-center items-center">
              {!questions.length ? (
                <h1>
                  No Questions found in <span className="text-orange-text">{module?.name}</span>{' '}
                  module
                </h1>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-row mt-6 justify-center">
              <button
                onClick={() => setShowQuestions(false)}
                className={
                  'mt-2 mx-3 items-center justify-center rounded-md border px-6 py-3 text-base font-medium  shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse bg-orange-text text-white'
                }
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewQuestions;
