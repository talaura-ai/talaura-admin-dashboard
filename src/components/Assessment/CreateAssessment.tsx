// import { CheckIcon } from '@heroicons/react/20/solid';
// import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// import IMAGES from '../../assets/images/Images';
// import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import {
//   Label,
//   Listbox,
//   ListboxButton,
//   ListboxOption,
//   ListboxOptions,
//   Transition,
// } from '@headlessui/react';
// import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import toast, { LoaderIcon } from 'react-hot-toast';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import 'swiper/css/virtual';
// import { v4 as uuid } from 'uuid';
// import { logout } from '../../app/features/adminSlice';
// import { questionTypes } from '../../app/features/assessmentsSlice';
// import { resetSkillsSlice, setSkills } from '../../app/features/skillsSlice';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import {
//   assessmentApi,
//   useCreateAssessmentMutation,
//   useSaveModulesToAssessmentMutation,
//   useSaveQuestionsToAssessmentMutation,
//   useSaveSkillsToAssessmentMutation,
// } from '../../app/services/assessments';
// import useFormContext from '../../hooks/useFormContext';
// import { classNames } from '../Core/classNames';
// import Input from '../Core/Input';
// import MultipleChoices from '../Core/MultipleChoices';
// import EmptyDataScreen from '../EmptyDataScreen/EmptyDataScreen';
// import JD from '../JD/JD';
// import Skills from '../Skills/Skills';
// import InitialQuestion from './InitialQuestion';
// import { createContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { setAllProfiles } from '../../app/features/assessmentProfiles';
// import {
//   addQuestionToModule,
//   resetModulesSlice,
//   setModules,
//   setSelectedModule,
// } from '../../app/features/moduleSlice';
// import {
//   resetQuestionsSlice,
//   setQuestionsToApp,
//   updateQuestion,
// } from '../../app/features/questions';
// import { useGetAssessmentProfilesQuery } from '../../app/services/assessmentProfiles';
// import { omit } from '../../helpers/utils';
// import LoadingScreen from '../Loading/LoadingScreen';
// import Modules from '../Modules/Modules';
// import ReviewAssessments from '../ReviewAssessments/ReviewAssessments';
// import { IComp, ISliderNav } from '../../helpers/types';

// export const AI_API_URL = import.meta.env.VITE_AI_API_URL;

// export const Step: React.FC<any> = ({ steps }) => {
//   return (
//     <nav aria-label="Progress" className="mt-10 mx-9 w-ful">
//       <ol role="list" className="flex items-center ">
//         {steps.map(
//           (
//             step: {
//               name: any;
//               status: string;
//               icon: string | undefined;
//             },
//             stepIdx: number,
//           ) => (
//             <li
//               key={step.name}
//               className={classNames(
//                 stepIdx !== steps.length - 1 ? 'w-full pr-8 sm:pr-20' : '',
//                 'relative ',
//               )}
//             >
//               {step.status === 'complete' ? (
//                 <>
//                   <div className="absolute inset-0 flex items-center w-full" aria-hidden="true">
//                     <div
//                       className="h-2 w-full
//                     bg-gradient-to-r from-[#E5A971] from-8% via-[#F3BC84] via-37% to-white to-80%
//                   "
//                     />
//                   </div>
//                   <a className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-white border border-spacing-2 border-brand-color outline outline-1 outline-brand-color shadow-md shadow-brand-color">
//                     {/* <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" /> */}
//                     <img src={step.icon} className="h-5 w-5" />
//                     <span className="sr-only">{step.name}</span>
//                   </a>
//                 </>
//               ) : step.status === 'current' ? (
//                 <>
//                   <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                     <div className="h-2 w-full bg-gray-200" />
//                   </div>
//                   <a
//                     className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-color bg-white outline outline-1 outline-brand-color shadow-md shadow-brand-color"
//                     aria-current="step"
//                   >
//                     {/* <span className="h-2.5 w-2.5 rounded-full bg-brand-color" aria-hidden="true" /> */}
//                     <img src={step.icon} className="h-5 w-5" />

//                     <span className="sr-only">{step.name}</span>
//                   </a>
//                 </>
//               ) : (
//                 <>
//                   <div className="absolute inset-0 flex items-center" aria-hidden="true">
//                     <div className="h-2 w-full bg-gray-200" />
//                   </div>
//                   <a className="group relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 outline-brand-color shadow-md shadow-brand-color">
//                     {/* <span
//                     className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
//                     aria-hidden="true"
//                   /> */}
//                     <img src={step.icon} className="h-5 w-5" />

//                     <span className="sr-only">{step.name}</span>
//                   </a>
//                 </>
//               )}
//             </li>
//           ),
//         )}
//       </ol>
//     </nav>
//   );
// };

// const SwiperNavButton: React.FC<ISliderNav> = ({
//   children,
//   style,
//   className = '',
//   action,
//   disabled,
//   isPrimary,
//   hidden,
//   slideTo = 'slideNext',
//   setActionCalledLoading,
// }) => {
//   const swiper = useSwiper();

//   // const slideTo = () => isPrimary ? swiper.slideNext() :  swiper.slidePrev();

//   if (hidden) {
//     return null;
//   }

//   return (
//     <button
//       disabled={disabled}
//       onClick={async () => {
//         if (action !== undefined && isPrimary) {
//           setActionCalledLoading(true);
//           const res = await action();
//           setActionCalledLoading(false);

//           console.log('resof action', res);
//           if (res) {
//             // @ts-ignore
//             swiper[slideTo]();
//             return true;
//           }
//         } else {
//           // @ts-ignore

//           swiper[slideTo]();
//         }
//       }}
//       className={classNames(
//         'mt-2 mx-3  items-center justify-center rounded-md border   px-6 py-3 text-base font-medium  shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse z-40 min-w-14 min-h-14',
//         className,
//         disabled ? 'opacity-50' : '',
//         isPrimary
//           ? 'bg-orange-text text-white'
//           : 'bg-transparent hover:bg-transparent border-black',
//       )}
//       style={style}
//     >
//       {children}
//     </button>
//   );
// };

// const Comp: React.FC<IComp> = ({ question }) => {
//   const { data, setData } = useFormContext();
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     setData((oldData: any) => ({
//       ...oldData,
//       [question.name]:
//         question.type === questionTypes.TEXT || question.type === questionTypes.DROPDOWN
//           ? question.answer
//             ? question.answer
//             : ''
//           : question.answer
//             ? question.answer
//             : [],
//     }));
//     // });
//   }, [question]);

//   if (!question) return <EmptyDataScreen />;
//   const { type, title, name, position, options = [] } = question;

//   // return questions
//   //   .slice()
//   //   .sort((a, b) => (a.position - b.position === 1 ? a : b))
//   //   .filter((d) => d.position === 5 || d.position === 1)
//   //   .map((question, index) => {
//   //     const { type, title, name, position, options = [] } = question;

//   //     if (type === questionTypes.TEXT)
//   //       return (
//   //         <div className="flex flex-col mt-10 px-5">
//   //           <div className="flex mt-10">
//   //             <Input
//   //               label={title}
//   //               name={name}
//   //               value={data[name] || ""}
//   //               setValue={(e: { target: { value: any } }) => {
//   //                 console.log("e", e);
//   //                 return setData((oldData: any) => {
//   //                   return {
//   //                     ...oldData,
//   //                     [name]: e,
//   //                   };
//   //                 });
//   //               }}
//   //               serialNum={position}
//   //             />
//   //           </div>
//   //         </div>
//   //       );

//   //     if (type === questionTypes.MULTIPLE_CHOICE)
//   //       return (
//   //         <div className="flex flex-col mt-10 px-5">
//   //           <div className="flex mt-10">
//   //             <MultipleChoices
//   //               label={title}
//   //               name={name}
//   //               value={data[name] || ""}
//   //               setValue={(e: { target: { value: any } }) => {
//   //                 console.log("e", e);
//   //                 return setData((oldData: any) => {
//   //                   return {
//   //                     ...oldData,
//   //                     [name]: e,
//   //                   };
//   //                 });
//   //               }}
//   //               serialNum={position}
//   //               options={options}
//   //             />
//   //           </div>
//   //         </div>
//   //       );

//   //     if (type === questionTypes.DROPDOWN) {
//   //       console.log("options~~~~+++++++~~~~)", options);
//   //       return (
//   //         <div className="flex flex-col mt-10 px-5">
//   //           <div className="flex mt-10 flex-col">
//   //             <Input
//   //               label={title}
//   //               name={name}
//   //               value={data[name] || ""}
//   //               setValue={(e: { target: { value: any } }) => {
//   //                 console.log("e", e);
//   //                 return setData((oldData: any) => {
//   //                   return {
//   //                     ...oldData,
//   //                     [name]: e,
//   //                   };
//   //                 });
//   //               }}
//   //               serialNum={position}
//   //               type={type}
//   //               options={options}
//   //             />
//   //           </div>
//   //         </div>
//   //       );
//   //     }
//   //   });

//   if (type === questionTypes.TEXT)
//     return (
//       <div className="flex flex-col mt-10 px-5">
//         <div className="flex mt-10">
//           <Input
//             label={title}
//             name={name}
//             value={data[name] || ''}
//             setValue={async (e: { target: { value: any } }) => {
//               return setData((oldData: any) => {
//                 return {
//                   ...oldData,
//                   [name]: e,
//                 };
//               });
//             }}
//             onBlur={(e: any) => {
//               return dispatch(updateQuestion({ title, answer: e.target.value }));
//             }}
//             serialNum={position}
//           />
//         </div>
//       </div>
//     );

//   if (type === questionTypes.MULTIPLE_CHOICE)
//     return (
//       <div className="flex flex-col mt-10 px-5">
//         <div className="flex mt-10">
//           <MultipleChoices
//             title={title}
//             name={name}
//             value={data[name] || ''}
//             setValue={(e: { target: { value: any } }) => {
//               return setData((oldData: any) => {
//                 return {
//                   ...oldData,
//                   [name]: e,
//                 };
//               });
//             }}
//             serialNum={position}
//             options={options}
//           />
//         </div>
//       </div>
//     );

//   if (type === questionTypes.DROPDOWN) {
//     return (
//       <div className="flex flex-col mt-10 px-5">
//         <div className="flex mt-10 flex-col">
//           <Input
//             label={title}
//             name={name}
//             value={data[name] || ''}
//             setValue={(e: { target: { value: any } }) => {
//               return setData((oldData: any) => {
//                 return {
//                   ...oldData,
//                   [name]: e,
//                 };
//               });
//             }}
//             serialNum={position}
//             type={type}
//             options={options}
//             onBlur={(answer: any) => {
//               dispatch(updateQuestion({ title, answer }));
//             }}
//           />
//         </div>
//       </div>
//     );
//   }
// };

// export const ActionButtonContext = createContext<any>('');

// const people = [
//   { id: 1, name: 'Wade Cooper' },
//   { id: 2, name: 'Arlene Mccoy' },
//   { id: 3, name: 'Devon Webb' },
//   { id: 4, name: 'Tom Cook' },
//   { id: 5, name: 'Tanya Fox' },
//   { id: 6, name: 'Hellen Schmidt' },
//   { id: 7, name: 'Caroline Schultz' },
//   { id: 8, name: 'Mason Heaney' },
//   { id: 9, name: 'Claudie Smitham' },
//   { id: 10, name: 'Emil Schaefer' },
// ];

// export function SelctExample() {
//   const [selected, setSelected] = useState(people[3]);

//   return (
//     <Listbox value={selected} onChange={setSelected}>
//       {({ open }) => (
//         <>
//           <Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Label>
//           <div className="relative mt-2">
//             <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
//               <span className="block truncate">{selected.name}</span>
//               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                 <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </span>
//             </ListboxButton>

//             <Transition
//               show={open}
//               leave="transition ease-in duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                 {people.map((person) => (
//                   <ListboxOption
//                     key={person.id}
//                     className={({ focus }) =>
//                       classNames(
//                         focus ? 'bg-indigo-600 text-white' : '',
//                         !focus ? 'text-gray-900' : '',
//                         'relative cursor-default select-none py-2 pl-3 pr-9',
//                       )
//                     }
//                     value={person}
//                   >
//                     {({ selected, focus }) => (
//                       <>
//                         <span
//                           className={classNames(
//                             selected ? 'font-semibold' : 'font-normal',
//                             'block truncate',
//                           )}
//                         >
//                           {person.name}
//                         </span>

//                         {selected ? (
//                           <span
//                             className={classNames(
//                               focus ? 'text-white' : 'text-indigo-600',
//                               'absolute inset-y-0 right-0 flex items-center pr-4',
//                             )}
//                           >
//                             <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </ListboxOption>
//                 ))}
//               </ListboxOptions>
//             </Transition>
//           </div>
//         </>
//       )}
//     </Listbox>
//   );
// }
