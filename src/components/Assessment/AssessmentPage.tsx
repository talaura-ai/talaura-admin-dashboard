import { Link, NavLink } from "react-router-dom";
import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import IMAGES from "../../assets/images/Images";
import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import EmptyDataScreen from "../EmptyDataScreen/EmptyDataScreen";
import moment from "moment";
import { classNames } from "../Core/classNames";
import { useGetAssessmentProfilesQuery } from "../../app/services/assessmentProfiles";
import { setAllProfiles } from "../../app/features/assessmentProfiles";
import { useGetAllQuery } from "../../app/services/assessments";
import { getAll } from "../../app/features/assessmentsSlice";

const assessmentsData = [
  {
    id: 1,
    name: "Graphic Designer",
    department: "iOS Department",
    duration: "125 mins",
    status: "Active",
    invites: 657,
    completed: 625,
    ongoing: 32,
  },
  {
    id: 2,
    name: "HR Manager",
    department: "HR Department",
    duration: "125 mins",
    status: "Active",
    invites: 657,
    completed: 625,
    ongoing: 32,
  },
  {
    id: 3,
    name: "Android Expert",
    department: "Mobile Department",
    duration: "125 mins",
    status: "Active",
    invites: 657,
    completed: 625,
    ongoing: 32,
  },
  {
    id: 4,
    name: "React Developer",
    department: "IT Department",
    duration: "125 mins",
    status: "Active",
    invites: 657,
    completed: 625,
    ongoing: 32,
  },
];

const omitFieldsToRenderInMap = [
  "id",
  "name",
  "department",
  "updatedAt",
  "organizationId",
  "type",
  "answer",
  "_id",
  "options",
  "title",
  "profile",
  "question",
  "module",
  "skills",
  "__v",
];
const sortItems = ["Date", "Name", "Status"];
const menuItems = ["Duplicate", "Rename", "Invite", "Invite via link"];

const AssessmentPage = () => {
  const assessments = useAppSelector((state) => state.assessments);
  const assessmentProfiles = useAppSelector((state) => state.assessmentProfles);
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const { data: profileData } = useGetAssessmentProfilesQuery("");
  const {
    data: assessmentData,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetAllQuery("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profileData && profileData.status) {
      dispatch(setAllProfiles(profileData.assessmentProfile));
    }
    if (assessmentData && profileData.status) {
      dispatch(getAll(assessmentData.assessments));
    }
  }, [dispatch, assessmentData, profileData]);

  return (
    <div>
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
                Sort By
                <img
                  src={IMAGES.sortDown}
                  alt=""
                  className="h-4 w-4 pl-1"
                />{" "}
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
                          onClick={() => setSortBy(item.toLowerCase())}
                          className={classNames(
                            focus
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm",
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
            className="
                          inline-flex
                           h-8 w-36
                            items-center
                             justify-center
                              rounded-md
                               bg-orange-text
                                 text-white
                                  hover:text-gray-500
                                   focus:outline-none  
                                      
                                   "
            state={{ assessmentProfiles }}
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
                filterBy
                  ? assessment.name.toLowerCase().includes(filterBy)
                  : true,
              )
              .slice()

              .sort((a, b) => {
                const sortOrder = 1;

                if (a[sortBy] > b[sortBy]) return 1;
                if (a[sortBy] < b[sortBy]) return -1;
                return 0;

                // const  a[sortBy] - b[sortBy]
              })

              .map((assessment, index) => {
                return (
                  <li
                    key={index}
                    className="col-span-1 flex rounded-md shadow-sm"
                  >
                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                      <div
                        className={
                          "bg-brand-color h-10 w-2 flex flex-shrink-0 items-center justify-center rounded-r-md text-sm font-medium text-white  "
                        }
                      ></div>
                      <div className="flex-1 truncate px-4 py-2 text-sm text-center">
                        <Link
                          to={`/assessment/view/${assessment._id}`}
                          className="font-bold text-orange-text font-Sansation_Regular text-2xl text-center"
                        >
                          {assessment.name}
                        </Link>
                        <p className="text-gray-400 text-md text-center">
                          {assessment.department}{" "}
                        </p>
                      </div>

                      {Object.keys(assessment)
                        .filter((k) => !omitFieldsToRenderInMap.includes(k))
                        .map((key) => {
                          return (
                            <div className="flex-1 truncate px-1 py-2 text-sm text-center">
                              <h2 className="font-bold  font-Sansation_Regular text-md text-center">
                                {moment(assessment[key]).isValid()
                                  ? moment(assessment[key]).format(
                                      "DD MMM YYYY",
                                    )
                                  : assessment[key]}
                              </h2>
                              <p className="text-gray-300 text-sm text-center">
                                {key}
                              </p>
                            </div>
                          );
                        })}

                      <div className="flex pr-2">
                        {/* <button
                                          type="button"
                                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none  "
                                      >
                                          <span className="sr-only">Open options</span>
                                          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                                      </button> */}
                        <Menu as="div" className="inline-block text-left">
                          <div>
                            <MenuButton className="inline-flex w-full justify-center   bg-white px-3 py-2 text-sm font-semibold text-gray-400   font-Sansation_Regular">
                              <EllipsisHorizontalIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />{" "}
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
                              <div className="py-1">
                                {menuItems.map((item, index) => (
                                  <MenuItem key={index}>
                                    {({ focus }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          focus
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-4 py-2 text-sm",
                                        )}
                                      >
                                        {item}
                                      </a>
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
