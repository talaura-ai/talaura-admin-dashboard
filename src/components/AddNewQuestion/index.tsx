import { Textarea } from '@headlessui/react';
import { useContext, useEffect, useReducer } from 'react';
import { addQuestionToModule } from '../../app/features/moduleSlice';
import { useAppDispatch } from '../../app/hooks';
import { ActionButtonContext } from '../Assessment/CreateAssessment';

const AddNewQuestion = (props: { questions: any; module?: any; setIsAddNewQuestion: any }) => {
  const { questions, setIsAddNewQuestion, module } = props ?? {};
  const { setBtnState } = useContext(ActionButtonContext);

  useEffect(() => {
    setBtnState('hideAll');
    return () => setBtnState('');
  }, [setBtnState]);

  const dispatch = useAppDispatch();
  const formInitialState = {
    title: '',
    type: module?.type ?? '',
    options: ['', '', '', ''],
    expectedAnswer: '',
  };
  const reducer = (state = formInitialState, action: any) => {
    const options = state.options;
    switch (action.type) {
      case 'title':
        return { ...state, title: action.payload };
      case 'expectedAnswer':
        return { ...state, expectedAnswer: action.payload };
      case 'type':
        return { ...state, type: action.payload };
      case 'options':
        options[action.index] = action.payload;
        return { ...state, options: options };
      default:
        return state;
    }
  };
  const [formData, localDispatch] = useReducer(reducer, formInitialState);

  const onSubmitForm = () => {
    dispatch(
      addQuestionToModule({
        name: module.name,
        question: [...questions, formData],
      }),
    );
    setIsAddNewQuestion(false);
  };

  return (
    <>
      <div className="relative mt-10 mx-10 z-[999]">
        <div className="grid grid-cols-1 h-screen w-full">
          <form
            onSubmit={onSubmitForm}
            className="flex flex-col w-full h-[50vh] rounded-lg shadow-inner bg-white p-8 overflow-scroll z-50"
          >
            <div className=" w-full">
              <div className="row1  mb-4">
                <span className="font-bold text-lg">
                  Module : <span className="text-gray-400">Aptitude Quiz</span>
                </span>
              </div>
              <Textarea
                required
                minLength={5}
                rows={6}
                name="jd_descriptions"
                id="jd_descriptions"
                className="block w-full bg-white rounded-lg border-0 py-1.5 text-black shadow-lg ring-1 ring-inset  ring-gray-300 placeholder:text-gray-400  focus:ring-0 text-lg"
                defaultValue={''}
                onChange={(e) => localDispatch({ type: 'title', payload: e.target.value })}
                placeholder="Enter the question with sample input and output"
              />
              <div className="options_container mt-4 mx-4 w-full flex flex-col gap-4">
                <div className="flex items-center gap-4 w-full">
                  <span className="font-bold text-base text-[#7D7C7C]">Option 1</span>
                  <input
                    className="py-3 px-3 rounded-lg border border-[#E4A76F] min-w-[25%]"
                    placeholder="Enter Option 1"
                    required
                    minLength={1}
                    onChange={(e) =>
                      localDispatch({ type: 'options', payload: e.target.value, index: 0 })
                    }
                  />
                </div>
                <div className="flex items-center gap-4 w-full">
                  <span className="font-bold text-base text-[#7D7C7C]">Option 1</span>
                  <input
                    className="py-3 px-3 rounded-lg border border-[#E4A76F] min-w-[25%]"
                    placeholder="Enter Option 2"
                    required
                    minLength={1}
                    onChange={(e) =>
                      localDispatch({ type: 'options', payload: e.target.value, index: 1 })
                    }
                  />
                </div>
                <div className="flex items-center gap-4 w-full">
                  <span className="font-bold text-base text-[#7D7C7C]">Option 1</span>
                  <input
                    className="py-3 px-3 rounded-lg border border-[#E4A76F] min-w-[25%]"
                    placeholder="Enter Option 3"
                    required
                    minLength={1}
                    onChange={(e) =>
                      localDispatch({ type: 'options', payload: e.target.value, index: 2 })
                    }
                  />
                </div>
                <div className="flex items-center gap-4 w-full">
                  <span className="font-bold text-base text-[#7D7C7C]">Option 1</span>
                  <input
                    className="py-3 px-3 rounded-lg border border-[#E4A76F] min-w-[25%]"
                    placeholder="Enter Option 4"
                    required
                    minLength={1}
                    onChange={(e) =>
                      localDispatch({ type: 'options', payload: e.target.value, index: 3 })
                    }
                  />
                </div>
                <div className="flex items-center gap-4 w-full">
                  <span className="font-bold text-base text-[#7D7C7C]">Correct Answer</span>
                  <input
                    className="py-3 px-3 rounded-lg border border-[#E4A76F] min-w-[25%]"
                    placeholder="Enter correct answer"
                    required
                    minLength={1}
                    onChange={(e) =>
                      localDispatch({ type: 'expectedAnswer', payload: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-row mt-6 justify-center">
                <button
                  onClick={() => {
                    setIsAddNewQuestion(false);
                  }}
                  className={
                    'mt-2 mx-3 items-center justify-center rounded-md border px-6 py-3 text-base font-medium  shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse bg-orange-text text-white'
                  }
                >
                  Cancel
                </button>
              </div>
              <div className="flex flex-row mt-6 justify-center">
                <button
                  type="submit"
                  className={
                    'mt-2 mx-3 items-center justify-center rounded-md border px-6 py-3 text-base font-medium  shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse bg-orange-text text-white'
                  }
                >
                  Done
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewQuestion;
