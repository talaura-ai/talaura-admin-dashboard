import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import AddNewQuestion from '../AddNewQuestion';

export interface ReviewQuestionsProps {
  questions: any;
  module?: any;
}

const ReviewQuestions: React.FC<ReviewQuestionsProps> = ({ module }) => {
  const [isAddNewQuestion, setIsAddNewQuestion] = useState<boolean>(false);
  const currentModule = useAppSelector((state) =>
    state?.modules?.selectedModules?.find((mdl: any) => mdl?.name === module?.name),
  );
  const questions = currentModule?.question ?? [];
  // const [questionsSelectedStatus, setQuestionsSelectedStatusArr] = useState<boolean[]>(
  //   questions?.map((que: any) => que?.selected),
  // );
  // const dispatch = useAppDispatch();
  if (isAddNewQuestion) {
    return (
      <AddNewQuestion
        setIsAddNewQuestion={setIsAddNewQuestion}
        module={module}
        questions={questions}
      />
    );
  }

  return (
    <>
      {/* <div className="relative w-full z-[999]">
        <div className="grid grid-cols-1 h-[450px] overflow-y-auto">
          <div className="flex flex-col rounded-lg shadow-inner bg-white p-8 overflow-scroll z-50">
            {/* <h2 className="font-Sansation_Bold font-[700]">Sample Questions</h2> */}
            {/* {(currentModule?.type === 'Quiz' ? questions.slice(0, 5) : questions)?.map(
              (v: any, index: number) => (
                <div key={v?.title + index} className="flex my-2 items-center"> */}
                  {/* <div className="flex h-6 items-center">
                  <input
                    id="review"
                    aria-describedby="offers-description"
                    name="offers"
                    type="checkbox"
                    checked={questionsSelectedStatus[index]}
                    onChange={() => {
                      setQuestionsSelectedStatusArr((prev) =>
                        prev.map((val, idx) => (idx === index ? !val : val)),
                      );
                    }}
                    className="h-6 w-6 rounded border-gray-300 bg-white shadow-xl text-orange-text checked:bg-orange-text ring-0"
                  />
                </div> */}
                  {/* <div className="ml-4">
                    {v.type === 'Quiz' ? (
                      <h3 className="text-[16px] text-[#000000] font-Sansation">Q. {v?.title}</h3>
                    ) : (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: v?.title.replace(/(\d)(?=\.)/g, '<br>$1'),
                        }}
                      />
                    )}
                    <h3 className="text-[16px] text-[#000000] font-Sansation">{v?.description}</h3>
                  </div>
                </div> */}
             {/* /</> ),
            )} */}
            {/* <div>
              <button
                className="flex flex-row mt-4 items-center gap-3"
                onClick={() => setIsAddNewQuestion(true)}
              >
                <img src={IMAGES.plus} className="w-5 h-5" />
                <span className="text-light-orange">Add New Question</span>
              </button>
            </div> */}
            {/* <div className="flex flex-row justify-center items-center">
              {!questions?.length ? (
                <h1>
                  No Questions found in <span className="text-orange-text">{module?.name}</span>{' '}
                  module
                </h1>
              ) : (
                <></>
              )}
            </div> */}

            {/* <div className="flex flex-row mt-6 justify-center">
              <button
                onClick={() => {
                  dispatch(
                    addQuestionToModule({
                      name: module.name,
                      question: questions?.map((que: any, idx: number) => ({
                        ...que,
                        selected: questionsSelectedStatus[idx],
                      })),
                    }),
                  );
                }}
                className={
                  `mt-2 mx-3 items-center justify-center rounded-md border px-6 py-3 text-base font-medium
                   shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse bg-orange-text text-white`
                }
              >
                Done
              </button>
            </div> */}
          {/* </div>
        </div>
      </div> */}
    </>
  );
};

export default ReviewQuestions;
