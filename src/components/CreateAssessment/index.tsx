import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuid } from 'uuid';
import { logout } from '../../app/features/adminSlice';
import { setAllProfiles } from '../../app/features/assessmentProfiles';
import {
  addQuestionToModule,
  resetModulesSlice,
  setModules,
  setSelectedModule,
} from '../../app/features/moduleSlice';
import { resetQuestionsSlice, setQuestionsToApp } from '../../app/features/questions';
import { resetSkillsSlice, setSelectedSkill, setSkills } from '../../app/features/skillsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetAssessmentProfilesQuery } from '../../app/services/assessmentProfiles';
import {
  assessmentApi,
  useCreateAssessmentMutation,
  useSaveModulesToAssessmentMutation,
  useSaveQuestionsToAssessmentMutation,
  useSaveSkillsToAssessmentMutation,
} from '../../app/services/assessments';
import IMAGES from '../../assets/images/Images';
import { IModuleType } from '../../helpers/types';
import { AI_API_URL, omit } from '../../helpers/utils';
import InitialQuestion from '../Assessment/InitialQuestion';
import LoadingScreen from '../Loading/LoadingScreen';
import Modules from '../Modules/Modules';
import ReviewAssessments from '../ReviewAssessments/ReviewAssessments';
import Skills from '../Skills/Skills';
import Step from './Step';
import SwiperNavButton from './SwiperNavButton';

export const ActionButtonContext = createContext<any>('');

const CreateAssessment = () => {
  const [btnState, setBtnState] = useState<string>('');
  const dispatch = useAppDispatch();
  const { data: profileData, isLoading: profileLoading } = useGetAssessmentProfilesQuery('');

  const assessmentsProfiles = useAppSelector((state) => state.assessmentProfiles);

  const questionReduxData = useAppSelector((state) => state.questions);

  const [createAssessment, { error: createAssessmentError }] = useCreateAssessmentMutation();
  const [createAssessmentLoading, setCreateAssessmentLoading] = useState<boolean>(false);
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
  const jdPage = 0;
  const [skillsPage, setSkillsPage] = useState(0);
  const [modulesPage, setModulesPage] = useState(0);
  const [reviewAssessmentPage, setReviewAssessmentPage] = useState(0);

  const { selectedSkills } = useAppSelector((state) => state.skills);

  useEffect(() => {}, []);

  useEffect(() => {
    setSkillsPage(() => jdPage + 1);
  }, []);

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
    // setJdPage(questions.length + 1);
  }, [questions, initialQuestionProfile, page]);

  useEffect(() => {
    const convoID = uuid();
    setConversationID(convoID);
  }, []);

  const generateSkills = async () => {
    const payloads = {
      description: jdData,
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
        dispatch(setSelectedSkill(resJSON.skills));
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
      const promiseMap = selectedModules.map(async (selectedModule: IModuleType) => {
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
          `${AI_API_URL}${ModuleTypesURLS[selectedModule.type as keyof typeof ModuleTypesURLS]}`,
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
        const err = error as any;
        toast.error(`${err.data?.message ?? error}`);
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

  const createAssessmentMethod = async () => {
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

  useEffect(() => {
    if (
      createAssessmentError &&
      'status' in createAssessmentError &&
      createAssessmentError?.status === 401
    ) {
      toast.error('Your login token got expire, please login again');
      dispatch(logout());
    }
  }, [createAssessmentError, dispatch]);

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

    if (page === jdPage && (!jdData || jdData.length < 3)) {
      return true;
    }

    if (page === modulesPage) {
      return false;
    }

    return false;
  }, [actionLoading, btnState, initialQuestionValue, jdData, jdPage, modulesPage, page]);

  const isBackDisabled = useCallback(() => {
    if (btnState === 'hideAll') {
      return true;
    }
    return false;
  }, [btnState]);

  const isNextHidden = useCallback(() => {
    if (btnState === 'hideAll') {
      return true;
    }
    return false;
  }, [btnState]);

  const getFirstBtnText = useCallback(() => {
    if (page === 0) {
      return 'Cancel';
    }
    return 'Back';
  }, [page]);

  const isBackHidden = useCallback(() => {
    if (btnState === 'hideAll') {
      return true;
    }
    return false;
  }, [btnState]);

  const isCompleteDisabled = () => {
    return true;
  };

  const isCompleteHidden = useCallback(() => {
    return true;
  }, []);

  const actionButtons = useMemo<any[]>(
    () => [
      {
        id: '1',
        title: getFirstBtnText(),
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
    [getFirstBtnText, isBackDisabled, isBackHidden, isCompleteHidden, isNextDisabled, isNextHidden],
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
    // console.log('🚀 ~ useEffect ~ initialQuestionProfile:', initialQuestionProfile);

    if (initialQuestionProfile) {
      getQuestionMethod();
    }
  }, [initialQuestionProfile]);

  const getActions = ({ idx }: { idx: any }) => {
    if (page === 0 && idx === 1) {
      const createAssessmentAction = async () => {
        setCreateAssessmentLoading(true);
        const createResult = await createAssessmentMethod();

        if (createResult.data.status === true) {
          toast.success(createResult.data.message);
          await generateSkills();
          setCreateAssessmentLoading(false);
          return Promise.resolve(true);
        }
        setCreateAssessmentLoading(false);
      };
      return createAssessmentAction;
    }

    if (page === saveQuestionPage) {
      const saveQuestionActions = async () => {
        return saveQuestions();
      };
      return saveQuestionActions;
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
      loading={createAssessmentLoading}
      assessment={assessment}
      jdData={jdData}
      setJdData={setJDData}
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
  ];

  return (
    <>
      <h1 className="text-2xl font-Sansation_Bold">Create Program</h1>
      <div className="flex flex-col">
        <ActionButtonContext.Provider value={{ btnState, setBtnState }}>
          <Step steps={steps} setSteps={setSteps} />

          <div className="mx-5">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              // onSwiper={(swiper) => console.log(swiper)}
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
                  return (
                    <SwiperNavButton
                      key={idx}
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
