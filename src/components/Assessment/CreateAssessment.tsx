import { CheckIcon } from "@heroicons/react/20/solid";
import IMAGES from "../../assets/images/Images";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/virtual";
import InitialQuestion from "./InitialQuestion";
import { classNames } from "../Core/classNames";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  assessmentApi,
  useCreateAssessmentMutation,
  useGetQuestionsQuery,
} from "../../app/services/assessments";
import toast, { LoaderIcon } from "react-hot-toast";
import { questionTypes } from "../../app/features/assessmentsSlice";
import Input from "../Core/Input";
import useFormContext from "../../hooks/useFormContext";
import EmptyDataScreen from "../EmptyDataScreen/EmptyDataScreen";
import MultipleChoices from "../Core/MultipleChoices";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import JD from "../JD/JD";
import { logout } from "../../app/features/adminSlice";
import Skills from "../Skills/Skills";
import { v4 as uuid } from "uuid";
import Loading from "../Loading/Loading";
import LoadingScreen from "../Loading/LoadingScreen";
import { setAll, setSkills } from "../../app/features/skillsSlice";
import ReviewQuestions from "../ReviewQuestions/Review";
import ModuleCard from "../Modules/ModuleCard";
import Modules from "../Modules/Modules";
import ReviewAssessments from "../ReviewAssessments/ReviewAssessments";
import { setModules, setSelectedModule } from "../../app/features/moduleSlice";
import AddNewModule from "../Modules/AddNewModule";
const AI_API_URL = import.meta.env.VITE_AI_API_URL;

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

export const Step: React.FC<any> = ({ steps, setSteps }) => {
  return (
    <nav aria-label="Progress" className="mt-10 mx-9 w-ful">
      <ol role="list" className="flex items-center ">
        {steps.map(
          (
            step: {
              name:
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | Key
                | null
                | undefined;
              status: string;
              icon: string | undefined;
            },
            stepIdx: number,
          ) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? "w-full pr-8 sm:pr-20" : "",
                "relative ",
              )}
            >
              {step.status === "complete" ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center w-full"
                    aria-hidden="true"
                  >
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
              ) : step.status === "current" ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
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
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
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
  className = "",
  action,
  disabled,
  isPrimary,
  hidden,
  slideTo = "slideNext",
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
        if (action !== undefined) {
          setActionCalledLoading(true);
          const res = await action();
          setActionCalledLoading(false);

          console.log("resof action", res);
          if (res) {
            swiper[slideTo]();
            return true;
          }
        } else swiper[slideTo]();
      }}
      className={classNames(
        "mt-2 mx-3  items-center justify-center rounded-md border   px-6 py-3 text-base font-medium  shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse ",
        className,
        disabled ? "opacity-50" : "",
        isPrimary
          ? "bg-orange-text text-white"
          : "bg-transparent hover:bg-transparent border-black",
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

const Comp: React.FC<IComp> = ({ question, assessmentsProfiles }) => {
  const {
    steps,
    page,
    setPage,
    data,
    setData,
    canSubmit,
    handleChange,
    disablePrev,
    disableNext,
    prevHide,
    nextHide,
    submitHide,
  } = useFormContext();

  console.log("assessmentsProfiles", assessmentsProfiles);

  console.log("useFormContext()", useFormContext());
  console.log("question~~~~", question);

  useEffect(() => {
    // questions.forEach((question) => {
    //   console.log("question", question);
    setData((oldData: any) => ({
      ...oldData,
      [question.name]:
        question.type === questionTypes.TEXT ||
        question.type === questionTypes.DROPDOWN
          ? question.answer
            ? question.answer
            : ""
          : question.answer
            ? question.answer
            : [],
    }));
    // });
  }, [question]);

  if (!question) return <EmptyDataScreen />;
  console.log("data~~~~", data);
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
            value={data[name] || ""}
            setValue={(e: { target: { value: any } }) => {
              console.log("e", e);
              return setData((oldData: any) => {
                return {
                  ...oldData,
                  [name]: e,
                };
              });
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
            label={title}
            name={name}
            value={data[name] || ""}
            setValue={(e: { target: { value: any } }) => {
              console.log("e", e);
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
    console.log("options~~~~+++++++~~~~)", options);
    return (
      <div className="flex flex-col mt-10 px-5">
        <div className="flex mt-10 flex-col">
          <Input
            label={title}
            name={name}
            value={data[name] || ""}
            setValue={(e: { target: { value: any } }) => {
              console.log("e", e);
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
          />
        </div>
      </div>
    );
  }
};

const CreateAssessment = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const assessmentsProfiles = useAppSelector(
    (state) => state.assessmentProfles,
  );
  const [
    createAssessment,
    { error: createAssesmentError, isLoading: createAssesmentLoading },
  ] = useCreateAssessmentMutation();
  const [getQuestions] = assessmentApi.endpoints.getQuestions.useLazyQuery();
  const [assessment, setAssessment] = useState(null);

  const [initialQuestionValue, setInitialQuestionValue] = useState("");
  const [initialQuestionProfile, setInitialQuestionProfile] = useState(
    assessmentsProfiles[0],
  );
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);

  const [skillsData, setSkillsData] = useState([]);
  const [jdPage, setJdPage] = useState(0);
  const [skillsPage, setSkillsPage] = useState(0);
  const [modulesPage, setModulesPage] = useState(0);

  const { skills, selectedSkills } = useAppSelector((state) => state.skills);

  useEffect(() => {
    setSkillsPage(() => jdPage + 1);
  }, [jdPage]);

  useEffect(() => {
    setModulesPage(() => skillsPage + 1);
  }, [skillsPage]);

  const [jdData, setJDData] = useState("");
  const [conversation_id, setConversationID] = useState<string>("");

  const [actionLoading, setActionCalledLoading] = useState(false);

  useEffect(() => {
    setJdPage(questions.length + 1);
    console.log("jdPage", jdPage, page);

    // if(page === modulesPage){
    //   setSteps((oldSteps) => oldSteps.map(oldStep => {
    //     return oldStep
    //   }))
    // }
  }, [questions, initialQuestionProfile.name, page]);

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
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${AI_API_URL}generate_skills`, {
        method: "POST",
        body: JSON.stringify(payloads),
        headers: myHeaders,
      });

      console.log("response", response);
      const resJSON = await response.json();
      console.log("resJSON", resJSON);
      if (response.ok) {
        setSkillsData(resJSON.skills);
        dispatch(setSkills(resJSON.skills));
        return Promise.resolve(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const generateModule = async () => {
    console.log("generateModule");
    const payloads = {
      skills: selectedSkills,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${AI_API_URL}generate_modules`, {
        method: "POST",
        body: JSON.stringify(payloads),
        headers: myHeaders,
      });
      const resJSON = await response.json();
      console.log("resJSON", resJSON);
      if (response.ok) {
        dispatch(setModules(resJSON));
        dispatch(setSelectedModule(resJSON));

        return Promise.resolve(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const questionsList: any = [
    {
      title: "UI/UX Critique:",
      description:
        "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
    },
    {
      title: "UI/UX Critique:",
      description:
        "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
    },
    {
      title: "UI/UX Critique:",
      description:
        "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
    },
    {
      title: "UI/UX Critique:",
      description:
        "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
    },
    {
      title: "UI/UX Critique:",
      description:
        "Please critique the UI/UX of the Instagram app. Focus on what improvements could be made according to Apple's design guidelines.",
    },
  ];

  const slides = [
    <InitialQuestion
      value={initialQuestionValue}
      setInitialQuestionValue={setInitialQuestionValue}
      initialQuestionProfile={initialQuestionProfile}
      setInitialQuestionProfile={setInitialQuestionProfile}
      assessmentsProfiles={assessmentsProfiles}
      loading={createAssesmentLoading}
    />,

    ...questions.map((q) => (
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
      skills={skillsData}
      setSkillsData={setSkillsData}
      generateSkills={generateSkills}
    />,
    <Modules />,
    <AddNewModule />,
    <ReviewAssessments />,
    <ReviewQuestions questions={questionsList} />,
  ];

  const createAssesmentMethod = async () => {
    console.log("here");
    const result = await createAssessment({
      profile: initialQuestionProfile.name,
      name: initialQuestionValue,
    });

    console.log("result", result);
    if (result.data.status === true) {
      setAssessment(result.data);
    }
    return result;
  };

  const [steps, setSteps] = useState(() => [
    {
      id: 1,
      name: "Create Assessment",
      href: "#",
      status: "current",
      icon: IMAGES.plus,
    },
    {
      id: 2,
      name: "Test Modules",
      href: "#",
      status: "upcoming",
      icon: IMAGES.rectangle_3,
    },
    {
      id: 3,
      name: "Review",
      href: "#",
      status: "upcoming",
      icon: IMAGES.playButtonCircled,
    },
  ]);

  // useEffect(() => {
  //   setSteps((oldSteps) => {

  //     return [...oldSteps, ]
  //   })
  // }, [page])

  //   const [slides, setSlides] = useState([])

  const [currentSlide, setCurrenSlide] = useState(slides[0]);

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
    console.log("createAssesmentError", createAssesmentError);

    if (createAssesmentError && createAssesmentError.status === 401) {
      toast.error("Your login token got expire, please login again");
      dispatch(logout());
    }
  }, [createAssesmentError]);

  const isNextDisabled = () => {
    if (actionLoading) {
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

    return false;
  };

  const isBackDisabled = () => {
    if (page > 1) {
      return false;
    }

    return true;
  };

  const isNextHidden = () => {
    return false;
  };

  const isBackHidden = () => {
    if (page < 1) {
      return true;
    }

    if (page >= jdPage) {
      return true;
    }

    return false;
  };

  const isCompleteDisabled = () => {
    return false;
  };

  const isCompleteHidden = () => {
    return true;
  };

  const actionButtons = [
    {
      id: "1",
      title: "Back",
      // action: "",
      type: "button",
      hidden: isBackHidden(),
      disabled: isBackDisabled(),
      slideTo: "slidePrev",
    },
    {
      id: "2",
      title: "Next",
      type: "button",
      hidden: isNextHidden(),
      disabled: isNextDisabled(),
      isPrimary: true,
      // action: ,
      slideTo: "slideNext",
    },
    {
      id: "3",
      title: "Done",
      // action: "",
      type: "submit",
      hidden: isCompleteHidden(),
      disabled: isCompleteDisabled(),
      isPrimary: true,
    },
  ];

  useEffect(() => {
    const getQuestionMethod = async () => {
      const questionResult = await getQuestions(initialQuestionProfile.name);
      console.log("questionResult", questionResult);
      if (questionResult.isSuccess && questionResult.status === "fulfilled") {
        const data = questionResult.data;
        if (data.status) {
          setQuestions(data.question);
        }
      }
    };
    getQuestionMethod();
  }, [initialQuestionProfile.name]);

  const getActions = ({ idx }) => {
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

    return undefined;
  };
  // if(actionLoading){
  //   return <LoadingScreen />
  // }
  return (
    <>
      <h1 className="text-2xl font-Sansation_Bold">Create Assessment</h1>
      <div className="flex flex-col">
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
          >
            {slides.map((slideContent, slideIDX) => {
              console.log("slideIDX", slideIDX);
              return (
                <SwiperSlide key={slideIDX} className="h-[65vh] max-h-[65vh]">
                  {slideContent}
                </SwiperSlide>
              );
            })}
            {/* <JD 
              isJobDescriptionRequired={initialQuestionProfile.jobDetails}
            /> */}

            <div className="px-5 w-full   flex flex-row justify-end absolute bottom-0 z-50">
              {actionButtons.map((actionButton, idx) => {
                console.log("idx", idx);
                // <SwiperButtonPrev disabled={true}>Back</SwiperButtonPrev>
                return (
                  <SwiperNavButton
                    // id={actionButton.id}
                    //   disabled={actionButton.disabled}
                    //   action={actionButton.action}

                    {...actionButton}
                    action={getActions({ idx })}
                    setActionCalledLoading={setActionCalledLoading}
                  >
                    {actionLoading ? <Loading /> : actionButton.title}
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
      </div>
    </>
  );
};

export default CreateAssessment;

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

export function SelctExample() {
  const [selected, setSelected] = useState(people[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Label className="block text-sm font-medium leading-6 text-gray-900">
            Assigned to
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
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
                        focus ? "bg-indigo-600 text-white" : "",
                        !focus ? "text-gray-900" : "",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={person}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {person.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              focus ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
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
