import { CheckIcon } from '@heroicons/react/20/solid';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import IMAGES from '../../assets/images/Images';
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

// Import Swiper styles
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';
import { v4 as uuid } from 'uuid';
import { logout } from '../../app/features/adminSlice';
import { questionTypes } from '../../app/features/assessmentsSlice';
import { resetSkillsSlice, setSkills } from '../../app/features/skillsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  assessmentApi,
  useCreateAssessmentMutation,
  useSaveModulesToAssessmentMutation,
  useSaveQuestionsToAssessmentMutation,
  useSaveSkillsToAssessmentMutation,
} from '../../app/services/assessments';
import useFormContext from '../../hooks/useFormContext';
import { classNames } from '../Core/classNames';
import Input from '../Core/Input';
import MultipleChoices from '../Core/MultipleChoices';
import EmptyDataScreen from '../EmptyDataScreen/EmptyDataScreen';
import JD from '../JD/JD';
import Skills from '../Skills/Skills';
import InitialQuestion from './InitialQuestion';
// import ReviewQuestions from '../ReviewQuestions/Review';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAllProfiles } from '../../app/features/assessmentProfiles';
import {
  addQuestionToModule,
  resetModulesSlice,
  setModules,
  setSelectedModule,
} from '../../app/features/moduleSlice';
import {
  resetQuestionsSlice,
  setQuestionsToApp,
  updateQuestion,
} from '../../app/features/questions';
import { useGetAssessmentProfilesQuery } from '../../app/services/assessmentProfiles';
import { omit } from '../../helpers/utils';
import LoadingScreen from '../Loading/LoadingScreen';
import Modules from '../Modules/Modules';
import ReviewAssessments from '../ReviewAssessments/ReviewAssessments';

export const AI_API_URL = import.meta.env.VITE_AI_API_URL;

// const steps = [
//   {
//     name: "Create Assessment",
//     href: "#",
//     status: "current",
//     icon: IMAGES.plus,
//   },
//   {
//     name: "Test Modules",
//     href: "#",
//     status: "upcoming",
//     icon: IMAGES.rectangle_3,
//   },
//   {
//     name: "Review",
//     href: "#",
//     status: "upcoming",
//     icon: IMAGES.playButtonCircled,
//   },
// ];

export const Step: React.FC<any> = ({ steps }) => {
  return (
    <nav aria-label="Progress" className="mt-10 mx-9 w-ful">
      <ol role="list" className="flex items-center ">
        {steps.map(
          (
            step: {
              name: any;
              status: string;
              icon: string | undefined;
            },
            stepIdx: number,
          ) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? 'w-full pr-8 sm:pr-20' : '',
                'relative ',
              )}
            >
              {step.status === 'complete' ? (
                <>
                  <div className="absolute inset-0 flex items-center w-full" aria-hidden="true">
                    <div
                      className="h-2 w-full 
                    bg-gradient-to-r from-[#E5A971] from-8% via-[#F3BC84] via-37% to-white to-80% 
                  "
                    />
                  </div>
                  <a className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-white border border-spacing-2 border-brand-color outline outline-1 outline-brand-color shadow-md shadow-brand-color">
                    {/* <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" /> */}
                    <img src={step.icon} className="h-5 w-5" />
                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              ) : step.status === 'current' ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-2 w-full bg-gray-200" />
                  </div>
                  <a
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-color bg-white outline outline-1 outline-brand-color shadow-md shadow-brand-color"
                    aria-current="step"
                  >
                    {/* <span className="h-2.5 w-2.5 rounded-full bg-brand-color" aria-hidden="true" /> */}
                    <img src={step.icon} className="h-5 w-5" />

                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-2 w-full bg-gray-200" />
                  </div>
                  <a className="group relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 outline-brand-color shadow-md shadow-brand-color">
                    {/* <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                  /> */}
                    <img src={step.icon} className="h-5 w-5" />

                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              )}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
};

interface ISliderNav {
  children: any;
  style?: object;
  className?: string;
  action?: any;
  disabled?: boolean;
  hidden?: boolean;
  id: string;
  isPrimary?: boolean;
  slideTo?: string;
  setActionCalledLoading: any;
}

const SwiperNavButton: React.FC<ISliderNav> = ({
  children,
  style,
  className = '',
  action,
  disabled,
  isPrimary,
  hidden,
  slideTo = 'slideNext',
  setActionCalledLoading,
}) => {
  const swiper = useSwiper();

  // const slideTo = () => isPrimary ? swiper.slideNext() :  swiper.slidePrev();

  if (hidden) {
    return null;
  }

  return (
    <button
      disabled={disabled}
      onClick={async () => {
        if (action !== undefined && isPrimary) {
          setActionCalledLoading(true);
          const res = await action();
          setActionCalledLoading(false);

          console.log('resof action', res);
          if (res) {
            // @ts-ignore
            swiper[slideTo]();
            return true;
          }
        } else {
          // @ts-ignore

          swiper[slideTo]();
        }
      }}
      className={classNames(
        'mt-2 mx-3  items-center justify-center rounded-md border   px-6 py-3 text-base font-medium  shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse z-40 min-w-14 min-h-14',
        className,
        disabled ? 'opacity-50' : '',
        isPrimary
          ? 'bg-orange-text text-white'
          : 'bg-transparent hover:bg-transparent border-black',
      )}
      style={style}
    >
      {children}
    </button>
  );
};

export interface IComp {
  question: any;
  assessmentsProfiles?: any;
}

const Comp: React.FC<IComp> = ({ question }) => {
  const { data, setData } = useFormContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setData((oldData: any) => ({
      ...oldData,
      [question.name]:
        question.type === questionTypes.TEXT || question.type === questionTypes.DROPDOWN
          ? question.answer
            ? question.answer
            : ''
          : question.answer
            ? question.answer
            : [],
    }));
    // });
  }, [question]);

  if (!question) return <EmptyDataScreen />;
  const { type, title, name, position, options = [] } = question;

  // return questions
  //   .slice()
  //   .sort((a, b) => (a.position - b.position === 1 ? a : b))
  //   .filter((d) => d.position === 5 || d.position === 1)
  //   .map((question, index) => {
  //     const { type, title, name, position, options = [] } = question;

  //     if (type === questionTypes.TEXT)
  //       return (
  //         <div className="flex flex-col mt-10 px-5">
  //           <div className="flex mt-10">
  //             <Input
  //               label={title}
  //               name={name}
  //               value={data[name] || ""}
  //               setValue={(e: { target: { value: any } }) => {
  //                 console.log("e", e);
  //                 return setData((oldData: any) => {
  //                   return {
  //                     ...oldData,
  //                     [name]: e,
  //                   };
  //                 });
  //               }}
  //               serialNum={position}
  //             />
  //           </div>
  //         </div>
  //       );

  //     if (type === questionTypes.MULTIPLE_CHOICE)
  //       return (
  //         <div className="flex flex-col mt-10 px-5">
  //           <div className="flex mt-10">
  //             <MultipleChoices
  //               label={title}
  //               name={name}
  //               value={data[name] || ""}
  //               setValue={(e: { target: { value: any } }) => {
  //                 console.log("e", e);
  //                 return setData((oldData: any) => {
  //                   return {
  //                     ...oldData,
  //                     [name]: e,
  //                   };
  //                 });
  //               }}
  //               serialNum={position}
  //               options={options}
  //             />
  //           </div>
  //         </div>
  //       );

  //     if (type === questionTypes.DROPDOWN) {
  //       console.log("options~~~~+++++++~~~~)", options);
  //       return (
  //         <div className="flex flex-col mt-10 px-5">
  //           <div className="flex mt-10 flex-col">
  //             <Input
  //               label={title}
  //               name={name}
  //               value={data[name] || ""}
  //               setValue={(e: { target: { value: any } }) => {
  //                 console.log("e", e);
  //                 return setData((oldData: any) => {
  //                   return {
  //                     ...oldData,
  //                     [name]: e,
  //                   };
  //                 });
  //               }}
  //               serialNum={position}
  //               type={type}
  //               options={options}
  //             />
  //           </div>
  //         </div>
  //       );
  //     }
  //   });

  if (type === questionTypes.TEXT)
    return (
      <div className="flex flex-col mt-10 px-5">
        <div className="flex mt-10">
          <Input
            label={title}
            name={name}
            value={data[name] || ''}
            setValue={async (e: { target: { value: any } }) => {
              return setData((oldData: any) => {
                return {
                  ...oldData,
                  [name]: e,
                };
              });
            }}
            onBlur={(e: any) => {
              return dispatch(updateQuestion({ title, answer: e.target.value }));
            }}
            serialNum={position}
          />
        </div>
      </div>
    );

  if (type === questionTypes.MULTIPLE_CHOICE)
    return (
      <div className="flex flex-col mt-10 px-5">
        <div className="flex mt-10">
          <MultipleChoices
            title={title}
            name={name}
            value={data[name] || ''}
            setValue={(e: { target: { value: any } }) => {
              return setData((oldData: any) => {
                return {
                  ...oldData,
                  [name]: e,
                };
              });
            }}
            serialNum={position}
            options={options}
          />
        </div>
      </div>
    );

  if (type === questionTypes.DROPDOWN) {
    return (
      <div className="flex flex-col mt-10 px-5">
        <div className="flex mt-10 flex-col">
          <Input
            label={title}
            name={name}
            value={data[name] || ''}
            setValue={(e: { target: { value: any } }) => {
              return setData((oldData: any) => {
                return {
                  ...oldData,
                  [name]: e,
                };
              });
            }}
            serialNum={position}
            type={type}
            options={options}
            onBlur={(answer: any) => {
              dispatch(updateQuestion({ title, answer }));
            }}
          />
        </div>
      </div>
    );
  }
};

export const ActionButtonContext = createContext<any>('');

const CreateAssessment = () => {
  // const navigate = useNavigate();
  const [btnState, setBtnState] = useState('');
  const dispatch = useAppDispatch();
  const { data: profileData, isLoading: profileLoading } = useGetAssessmentProfilesQuery('');

  const assessmentsProfiles = useAppSelector((state) => state.assessmentProfiles);

  const questionReduxData = useAppSelector((state) => state.questions);

  const [createAssessment, { error: createAssesmentError, isLoading: createAssesmentLoading }] =
    useCreateAssessmentMutation();
  const [saveSkillsToAssessment] = useSaveSkillsToAssessmentMutation();
  const [saveModulesToAssessment] = useSaveModulesToAssessmentMutation();
  const [saveQuestionsToAssessment] = useSaveQuestionsToAssessmentMutation();
  const [getQuestions] = assessmentApi.endpoints.getQuestions.useLazyQuery();

  const [assessment, setAssessment] = useState<any>(null);
  const { selectedModules } = useAppSelector((state) => state.modules);

  const [initialQuestionValue, setInitialQuestionValue] = useState('');
  const [initialQuestionProfile, setInitialQuestionProfile] = useState<any>();

  useEffect(() => {
    if (profileData && profileData.status) {
      dispatch(setAllProfiles(profileData.assessmentProfile));
      if (profileData.assessmentProfile.length)
        setInitialQuestionProfile(profileData.assessmentProfile[0]);
    }
  }, [dispatch, profileData]);

  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);

  const [skillsData, setSkillsData] = useState<any>([]);
  const [saveQuestionPage, setSaveQuestionPage] = useState(0);
  const [jdPage, setJdPage] = useState(0);
  const [skillsPage, setSkillsPage] = useState(0);
  const [modulesPage, setModulesPage] = useState(0);
  const [reviewAssessmentPage, setReviewAssessmentPage] = useState(0);

  const { selectedSkills } = useAppSelector((state) => state.skills);

  useEffect(() => {}, []);

  useEffect(() => {
    setSkillsPage(() => jdPage + 1);
  }, [jdPage]);

  useEffect(() => {
    setModulesPage(() => skillsPage + 1);
  }, [skillsPage]);

  useEffect(() => {
    setReviewAssessmentPage(() => modulesPage + 1);
  }, [modulesPage]);

  const [jdData, setJDData] = useState('');
  const [conversation_id, setConversationID] = useState<string>('');

  const [actionLoading, setActionCalledLoading] = useState(false);

  useEffect(() => {
    setSaveQuestionPage(questions.length);
    setJdPage(questions.length + 1);
    // if (page === modulesPage) {
    //   setSteps((oldSteps) => {
    //     const setState = oldSteps;

    //     const createStep = setState.findIndex((step) => step.id === 1);
    //     const testModuleStep = setState.findIndex((step) => step.id === 2);
    //     const reviewStep = setState.findIndex((step) => step.id === 2);

    //     setState[createStep].status = 'complete';
    //     setState[testModuleStep].status = 'complete';
    //     setState[reviewStep].status = 'upcoming';

    //     return setState;
    //   });
    // }
  }, [questions, initialQuestionProfile, page]);

  useEffect(() => {
    const convoID = uuid();
    setConversationID(convoID);
  }, []);

  const generateSkills = async () => {
    const payloads = {
      description: jdData,
      // user_id: assessment?.assessmentId,
      // conversation_id,
    };
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    try {
      const response = await fetch(`${AI_API_URL}generate_skills`, {
        method: 'POST',
        body: JSON.stringify(payloads),
        headers: myHeaders,
      });

      const resJSON = await response.json();
      if (response.ok) {
        setSkillsData(resJSON.skills);
        dispatch(setSkills(resJSON.skills));
        return Promise.resolve(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getQuestionAndAddToModule = async () => {
    const totalWeightage = selectedModules.reduce(
      (acc: any, val: { Weightage: any }) => Number(val.Weightage) + Number(acc),
      0,
    );
    if (totalWeightage !== 100) {
      toast.error('Weightage should be equal to 100%');
      return undefined;
    }
    try {
      const promiseMap = selectedModules.map(async (selectedModule: any) => {
        const ModuleTypesURLS = {
          'Voice To Voice': 'generate_voice_to_voice_questions',
          Sandbox: 'generate_sandbox_questions',
          'AI Video Interview': 'generate_ai_video_interview_questions',
          Interview: 'generate_voice_to_text_questions',
          'Voice to Text': 'generate_voice_to_text_questions',
          Quiz: 'generate_quiz_questions',
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const fetchModuleQuestionRes = await fetch(
          // @ts-ignore
          `${AI_API_URL}${ModuleTypesURLS[selectedModule.type]}`,
          {
            method: 'POST',
            body: JSON.stringify({ ...selectedModule }),
            headers,
          },
        );

        if (fetchModuleQuestionRes.statusText === 'OK') {
          const resJSON = await fetchModuleQuestionRes.json();
          dispatch(
            addQuestionToModule({
              name: selectedModule.name,
              question: resJSON?.questions?.map((ques: any) => ({ ...ques, selected: true })),
            }),
          );
          return Promise.resolve(true);
        }
      });

      await Promise.all(promiseMap);
      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
    }
  };

  const saveModules = async () => {
    try {
      const { data, error } = await saveModulesToAssessment({
        assessmentId: assessment.assessmentId,
        module: selectedModules.map((mdl: any) => ({
          ...mdl,
          question: mdl?.question
            ?.filter((que: any) => que?.selected)
            .map((que: any) => omit(que, ['selected'])),
        })),
      });

      if (error) {
        toast.error(`${error?.data?.message ?? error}`);
        return;
      }
      if (data.status === true) {
        toast.success(data.message);
        return Promise.resolve(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateModule = async () => {
    const payloads = {
      skills: selectedSkills,
    };
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    try {
      const response = await fetch(`${AI_API_URL}generate_modules`, {
        method: 'POST',
        body: JSON.stringify(payloads),
        headers: myHeaders,
      });
      const resJSON = await response.json();
      if (response.ok) {
        dispatch(setModules(resJSON));
        dispatch(setSelectedModule(resJSON));
        if (assessment?.assessmentId) {
          const saveResult = await saveSkillsToAssessment({
            ...payloads,
            assessmentId: assessment.assessmentId,
          });

          if (saveResult.data.status) {
            toast.success(saveResult.data.message);
          } else {
            toast.error(saveResult.data.message);
          }
        }

        return Promise.resolve(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const saveQuestions = async () => {
    try {
      const { data, error } = await saveQuestionsToAssessment({
        assessmentId: assessment.assessmentId,
        question: questionReduxData.questions,
      });

      if (error) {
        return error;
      }
      if (data.status) {
        toast.success(data.message);
        return Promise.resolve(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const questionsList: any = [
  //   {
  //     title: 'UI/UX Critique:',
  //     description:
  //       "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
  //   },
  //   {
  //     title: 'UI/UX Critique:',
  //     description:
  //       "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
  //   },
  //   {
  //     title: 'UI/UX Critique:',
  //     description:
  //       "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
  //   },
  //   {
  //     title: 'UI/UX Critique:',
  //     description:
  //       "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
  //   },
  //   {
  //     title: 'UI/UX Critique:',
  //     description:
  //       "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
  //   },
  // ];

  const createAssesmentMethod = async () => {
    const result = await createAssessment({
      profile: initialQuestionProfile.name,
      name: initialQuestionValue,
    });

    if (result.data.status === true) {
      setAssessment(result.data);
    }
    return result;
  };

  const [steps, setSteps] = useState(() => [
    {
      id: 1,
      name: 'Create Assessment',
      href: '#',
      status: 'current',
      icon: IMAGES.plus,
    },
    {
      id: 2,
      name: 'Test Modules',
      href: '#',
      status: 'upcoming',
      icon: IMAGES.rectangle_3,
    },
    {
      id: 3,
      name: 'Review',
      href: '#',
      status: 'upcoming',
      icon: IMAGES.playButtonCircled,
    },
  ]);

  // useEffect(() => {
  //   setSteps((oldSteps) => {

  //     return [...oldSteps, ]
  //   })
  // }, [page])

  //   const [slides, setSlides] = useState([])

  // const [currentSlide, setCurrenSlide] = useState(slides[0]);

  //   useEffect(() => {
  //     const  setSlidesMethod = async () => {
  //         let headers:any = {"Content-Type": "application/json"};
  //         if (admin.token) {
  //           headers["Authorization"] = `Bearer ${admin.token}`;
  //         }
  //         const res = await (await fetch(`${BASE_URL}organization/getQuestion/${initialQuestionProfile.name}`, {headers})).json()
  //         console.log('first', res)
  //         if(res.status){
  //             setSlides([,  <Comp
  //                 questions={res.question}
  //               />])
  //         }

  //     }

  //     setSlidesMethod()

  //   }, [])

  useEffect(() => {
    // @ts-ignore
    if (createAssesmentError && createAssesmentError?.status === 401) {
      toast.error('Your login token got expire, please login again');
      dispatch(logout());
    }
  }, [createAssesmentError]);

  const isNextDisabled = useCallback(() => {
    if (actionLoading || btnState === 'hideAll') {
      return true;
    }

    if (!initialQuestionValue) {
      return true;
    }

    if (initialQuestionValue.length < 2) {
      return true;
    }

    if (page === jdPage && (!jdData || !jdData.length)) {
      return true;
    }

    if (page === modulesPage) {
      // const totalWeightage = selectedModules.reduce(
      //   (acc: any, val: { Weightage: any }) =>
      //     Number(val.Weightage) + Number(acc),
      //   0,
      // );
      // if (totalWeightage > 100) return true;

      return false;
    }

    return false;
  }, [actionLoading, btnState, initialQuestionValue, jdData, jdPage, modulesPage, page]);

  const isBackDisabled = useCallback(() => {
    if (page > 1) {
      return false;
    }

    return true;
  }, [page]);

  const isNextHidden = useCallback(() => {
    if (btnState === 'hideAll') {
      return true;
    }
    return false;
  }, [btnState]);

  const isBackHidden = useCallback(() => {
    if (page < 1 || btnState === 'hideAll') {
      return true;
    }
    if (page === reviewAssessmentPage) {
      return false;
    }

    if (page >= jdPage) {
      return true;
    }

    return false;
  }, [btnState, jdPage, page, reviewAssessmentPage]);

  const isCompleteDisabled = () => {
    return false;
  };

  const isCompleteHidden = useCallback(() => {
    return true;
  }, []);

  const actionButtons = useMemo<any[]>(
    () => [
      {
        id: '1',
        title: 'Back',
        // action: "",
        type: 'button',
        hidden: isBackHidden(),
        disabled: isBackDisabled(),
        slideTo: 'slidePrev',
      },
      {
        id: '2',
        title: 'Next',
        type: 'button',
        hidden: isNextHidden(),
        disabled: isNextDisabled(),
        isPrimary: true,
        // action: ,
        slideTo: 'slideNext',
      },
      {
        id: '3',
        title: 'Done',
        // action: "",
        type: 'submit',
        hidden: isCompleteHidden(),
        disabled: isCompleteDisabled(),
        isPrimary: true,
      },
    ],
    [isBackDisabled, isBackHidden, isCompleteHidden, isNextDisabled, isNextHidden],
  );

  useEffect(() => {
    const getQuestionMethod = async () => {
      const questionResult = await getQuestions(initialQuestionProfile.name);
      if (questionResult.isSuccess && questionResult.status === 'fulfilled') {
        const data = questionResult.data;
        if (data.status) {
          setQuestions(data.question);
          dispatch(setQuestionsToApp(data.question));
        }
      }
    };
    console.log('🚀 ~ useEffect ~ initialQuestionProfile:', initialQuestionProfile);

    if (initialQuestionProfile) {
      getQuestionMethod();
    }
  }, [initialQuestionProfile]);

  const getActions = ({ idx }: { idx: any }) => {
    //  ? actionButton.action :
    if (page === 0 && idx === 1) {
      const createAssessmentAction = async () => {
        const createResult = await createAssesmentMethod();

        if (createResult.data.status === true) {
          toast.success(createResult.data.message);
          return Promise.resolve(true);
        }
      };
      return createAssessmentAction;
    }

    if (page === saveQuestionPage) {
      const saveQuestionActions = async () => {
        return saveQuestions();
      };
      return saveQuestionActions;
    }

    if (page === jdPage) {
      const jdActions = async () => {
        return generateSkills();
      };
      return jdActions;
    }

    if (page === skillsPage) {
      const skillsActions = async () => {
        return generateModule();
      };
      return skillsActions;
    }

    if (page === modulesPage) {
      const moduleActions = async () => {
        return getQuestionAndAddToModule();
      };
      return moduleActions;
    }

    if (page === reviewAssessmentPage) {
      const reviewAssessmentActions = async () => {
        const saveRes = await saveModules();
        if (saveRes) {
          dispatch(resetModulesSlice());
          dispatch(resetQuestionsSlice());
          dispatch(resetSkillsSlice());
          navigation('/');
        }
        return saveRes;
      };
      return reviewAssessmentActions;
    }

    return undefined;
  };
  // if(actionLoading){
  //   return <LoadingScreen />
  // }

  const navigation = useNavigate();

  useEffect(() => {
    if (questionReduxData.questions.length) {
      setSteps((oldSteps) => {
        const old = oldSteps;
        old.forEach((s) => {
          if (s.id === 1) {
            s.status = 'current';
          }
          if (s.id === 2) {
            s.status = 'upcoming';
          }

          if (s.id === 3) {
            s.status = 'upcoming';
          }
        });

        return old;
      });
    }

    if (selectedModules.length) {
      setSteps((oldSteps) => {
        const old = oldSteps;
        old.forEach((s) => {
          if (s.id === 1) {
            s.status = 'complete';
          }
          if (s.id === 2) {
            s.status = 'current';
          }

          if (s.id === 3) {
            s.status = 'upcoming';
          }
        });

        return old;
      });
    }

    if (
      selectedModules.length &&
      selectedModules[0].question &&
      selectedModules[0].question.length
    ) {
      setSteps((oldSteps) => {
        const old = oldSteps;
        old.forEach((s) => {
          if (s.id === 1) {
            s.status = 'complete';
          }
          if (s.id === 2) {
            s.status = 'complete';
          }

          if (s.id === 3) {
            s.status = 'current';
          }
        });

        return old;
      });
    }
  }, [questionReduxData, selectedModules]);

  if (
    profileLoading ||
    !initialQuestionProfile ||
    (initialQuestionProfile && !initialQuestionProfile.name && initialQuestionProfile.jobDetails)
  ) {
    return <LoadingScreen />;
  }

  const slides = [
    <InitialQuestion
      value={initialQuestionValue}
      setInitialQuestionValue={setInitialQuestionValue}
      initialQuestionProfile={initialQuestionProfile}
      setInitialQuestionProfile={setInitialQuestionProfile}
      assessmentsProfiles={assessmentsProfiles}
      loading={createAssesmentLoading}
    />,

    ...questionReduxData.questions.map((q: any) => (
      <Comp question={q} assessmentsProfiles={assessmentsProfiles} />
    )),
    <JD
      isJobDescriptionRequired={initialQuestionProfile.jobDetails}
      assessment={assessment}
      jdData={jdData}
      setJDData={setJDData}
      conversation_id={conversation_id}
    />,
    <Skills
      // @ts-ignore
      skills={skillsData}
      setSkillsData={setSkillsData}
      generateSkills={generateSkills}
    />,
    <Modules />,
    <ReviewAssessments />,
    // <ReviewQuestions questions={questionsList}

    // />,
  ];

  return (
    <>
      <h1 className="text-2xl font-Sansation_Bold">Create Program</h1>
      <div className="flex flex-col">
        <ActionButtonContext.Provider value={{ btnState, setBtnState }}>
          <Step steps={steps} setSteps={setSteps} />

          <div className="mx-5">
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              // spaceBetween={50}
              slidesPerView={1}
              //   navigation
              //   pagination={{ clickable: true }}
              //   scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={(swiper) => setPage(swiper.activeIndex)}
              allowTouchMove={false}
              onEnded={() => navigation('/assessments')}
            >
              {slides.map((slideContent, slideIDX) => {
                return (
                  <SwiperSlide
                    key={slideIDX}
                    className="h-[65vh] max-h-[65vh]"
                    data-swiper-parallax={window.screenX * 0.95}
                    data-swiper-parallax-opacity={'0.5'}
                  >
                    {slideContent}
                  </SwiperSlide>
                );
              })}

              <div className={'px-5 w-full   flex flex-row justify-end absolute bottom-0'}>
                {actionButtons.map((actionButton, idx) => {
                  // <SwiperButtonPrev disabled={true}>Back</SwiperButtonPrev>
                  return (
                    <SwiperNavButton
                      key={idx}
                      // id={actionButton.id}
                      //   disabled={actionButton.disabled}
                      //   action={actionButton.action}

                      {...actionButton}
                      action={getActions({ idx })}
                      setActionCalledLoading={setActionCalledLoading}
                    >
                      {actionLoading ? (
                        <div className="flex flex-row items-center">
                          {actionButton.title} <LoaderIcon className="mx-1" />
                        </div>
                      ) : (
                        actionButton.title
                      )}
                    </SwiperNavButton>
                  );
                  // <SwiperButtonDone
                  //   disabled={false}
                  //   hidden={true}
                  //   action={async () => {
                  //     const createResult = await createAssesmentMethod();

                  //     if (createResult.data.status === true) {
                  //       toast.success(createResult.data.message);
                  //       return new Promise((resolve) => resolve(true));
                  //     }
                  //   }}
                  // >
                  //   Done
                  // </SwiperButtonDone>
                })}
              </div>
            </Swiper>
          </div>
        </ActionButtonContext.Provider>
      </div>
    </>
  );
};

export default CreateAssessment;

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
];

export function SelctExample() {
  const [selected, setSelected] = useState(people[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <ListboxOption
                    key={person.id}
                    className={({ focus }) =>
                      classNames(
                        focus ? 'bg-indigo-600 text-white' : '',
                        !focus ? 'text-gray-900' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={person}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {person.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              focus ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
