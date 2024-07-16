import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../app/features/adminSlice';
import { getAll } from '../../app/features/assessmentsSlice';
import { resetModulesSlice } from '../../app/features/moduleSlice';
import { resetQuestionsSlice } from '../../app/features/questions';
import { resetSkillsSlice } from '../../app/features/skillsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetAllQuery } from '../../app/services/assessments';
import IMAGES from '../../assets/images/Images';
import { IAssessmentModalDt, IMenuItems } from '../../helpers/types';
import { classNames } from '../Core/classNames';
import EmptyDataScreen from '../EmptyDataScreen/EmptyDataScreen';
import AssessmentActionModal from './AssessmentActionModal';

const sortItems: ('date' | 'name' | 'status')[] = ['date', 'name', 'status'];
const menuItems: IMenuItems[] = [
  { id: 1, text: 'Duplicate', onClickModal: 'duplicate' },
  { id: 2, text: 'Rename', onClickModal: 'rename' },
  { id: 3, text: 'Invite', onClickModal: '' },
];
const AssessmentPage = () => {
  const assessments = useAppSelector((state) => state.assessments);
  const [modalToShow, setModalToShow] = useState<IAssessmentModalDt>('');
  const assessmentProfiles = useAppSelector((state) => state.assessmentProfiles);
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const { data: assessmentData, error } = useGetAllQuery('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (assessmentData) {
      dispatch(getAll(assessmentData.assessments));
    } else if (error && 'status' in error && error.status === 401) {
      toast.error('Your login token got expire, please login again');
      dispatch(logout());
    }
  }, [dispatch, assessmentData, error]);

  const showModalFor = useCallback((assessmentId: string, text: IMenuItems['onClickModal']) => {
    if (text) {
      setModalToShow({ assessmentId, text });
    }
  }, []);

  return (
    <div>
      <AssessmentActionModal showModalData={modalToShow} setShowModalData={setModalToShow} />
      <div className="flex">
        <div className="grow">
          <h1 className="text-4xl font-medium text-black">Assessments</h1>
        </div>
        <div className="flex mt-3 sm:ml-4 sm:mt-0 mr-2">
          <label htmlFor="mobile-search" className="sr-only">
            Search
          </label>
          <label htmlFor="desktop-search" className="sr-only">
            Search
          </label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400 focus:stroke-orange-text"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="mobile-search"
                id="mobile-search"
                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-text sm:hidden"
                placeholder="Search"
                onChange={(e) => setFilterBy(e.target.value.toLowerCase())}
              />
              <input
                type="text"
                name="desktop-search"
                id="desktop-search"
                className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-text sm:block"
                placeholder="Search..."
                onChange={(e) => setFilterBy(e.target.value.toLowerCase())}
              />
            </div>
          </div>
        </div>
        <div className="flex grow">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 font-Sansation_Regular">
                {sortBy}
                <img src={IMAGES.sortDown} alt="" className="h-4 w-4 pl-1" />{' '}
              </MenuButton>
            </div>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-150 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortItems.map((item, index) => (
                    <MenuItem key={index}>
                      {({ focus }) => (
                        <button
                          onClick={() => setSortBy(item)}
                          className={classNames(
                            focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm capitalize',
                          )}
                        >
                          {item}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>

        <div className="flex">
          <NavLink
            type="button"
            to="/assessments/create"
            className="inline-flex h-8 w-36 items-center justify-center rounded-md bg-orange-text text-white hover:text-gray-500 focus:outline-none"
            state={{ assessmentProfiles }}
            onClick={() => {
              dispatch(resetSkillsSlice());
              dispatch(resetModulesSlice());
              dispatch(resetQuestionsSlice());
            }}
          >
            <img src={IMAGES.Create} className="h-5 w-5" />
            <h3 className="px-1 text-white">Create</h3>
          </NavLink>
        </div>
      </div>

      <div>
        <div role="list" className="mt-3 grid grid-cols-1 gap-5">
          {assessments.filter((assessment) =>
            filterBy ? assessment.name.toLowerCase().includes(filterBy) : true,
          ).length ? (
            assessments
              .filter((assessment) =>
                filterBy ? assessment.name.toLowerCase().includes(filterBy) : true,
              )
              .slice()

              .sort((a: any, b: any) => {
                if (sortBy === 'name') {
                  return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
                } else if (sortBy === 'date') {
                  return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
                }

                return 0;
              })
              .map((assessment, index) => {
                return (
                  <Link to={`/assessment/view/${assessment._id}`} key={index}>
                    <li className="col-span-1 flex rounded-md shadow-sm">
                      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                        <div
                          className={
                            'absolute bg-brand-color h-10 w-2 flex flex-shrink-0 items-center justify-center rounded-r-md text-sm font-medium text-white'
                          }
                        ></div>
                        <div className="truncate px-4 py-2 text-sm text-center flex flex-col w-[400px]">
                          <span className="font-bold text-orange-text font-Sansation_Regular text-2xl">
                            {assessment.name}
                          </span>
                          {/* <span className="text-gray-400 text-md">
                            {assessment?.department ?? ''}
                          </span> */}
                        </div>
                        <div>
                          <div className="truncate px-4 py-2 text-sm text-center flex flex-col">
                            <span className="text-lg">
                              {assessment?.module?.reduce(
                                (prev, curr) => (prev += +curr.time),
                                0,
                              ) ?? 0}{' '}
                              mins
                            </span>
                            <span className="text-[#BDBDBD]">duration</span>
                          </div>
                          {'totalInvites' in assessment && (
                            <div className="truncate px-4 py-2 text-sm text-center flex flex-col">
                              <span className="text-lg">{assessment.totalInvites}</span>
                              <span className="text-[#BDBDBD]">Invites</span>
                            </div>
                          )}

                          {'totalCompleted' in assessment && (
                            <div className="truncate px-4 py-2 text-sm text-center flex flex-col">
                              <span className="text-lg">{assessment.totalCompleted}</span>
                              <span className="text-[#BDBDBD]">Completed</span>
                            </div>
                          )}

                          {'totalOngoing' in assessment && (
                            <div className="truncate px-4 py-2 text-sm text-center flex flex-col">
                              <span className="text-lg">{assessment.totalOngoing}</span>
                              <span className="text-[#BDBDBD]">Ongoing</span>
                            </div>
                          )}
                        </div>

                        <div className="flex pr-2">
                          <Menu as="div" className="inline-block text-left">
                            <div>
                              <MenuButton className="inline-flex w-full justify-center   bg-white px-3 py-2 text-sm font-semibold text-gray-400   font-Sansation_Regular">
                                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />{' '}
                              </MenuButton>
                            </div>

                            <Transition
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <MenuItems className="absolute right-0 z-[999] mt-2 mr-5 w-150 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="">
                                  {menuItems.map((item, index) => (
                                    <MenuItem key={index}>
                                      {({ focus }) => (
                                        <button
                                          className={classNames(
                                            focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm w-full',
                                          )}
                                          onClick={() =>
                                            showModalFor(assessment._id, item.onClickModal)
                                          }
                                          key={item.id}
                                        >
                                          {item.text}
                                        </button>
                                      )}
                                    </MenuItem>
                                  ))}
                                </div>
                              </MenuItems>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })
          ) : (
            <EmptyDataScreen />
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
