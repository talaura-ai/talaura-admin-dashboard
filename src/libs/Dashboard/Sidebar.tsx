/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Outlet } from 'react-router-dom';

import Header from './Header';
import { useAppSelector } from '../../app/hooks';
import IMAGES from '../../assets/images/Images';
import { classNames } from '../../components/Core/classNames';

const navigation = [
  { name: 'Dashboard', href: '/', icon: IMAGES.Dashboard, current: true },
  {
    name: 'Assesment',
    href: '/assessments',
    icon: IMAGES.Dashboard,
    current: false,
  },
  { name: 'People', href: '/peoples', icon: IMAGES.People, current: false },
  { name: 'Reports', href: '/reports', icon: IMAGES.Graph, current: false },
];
// const userNavigation = [
//   { name: 'Your profile', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]

export default function Sidebar() {
  const admin = useAppSelector((state) => state.admin);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-app-color px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <h1
                        className="font-sans
                text-2xl text-brand-color text-center "
                      >
                        TalAura
                      </h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="-mx-2 flex-1 space-y-1 justify-center ">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.href}
                              className={({ isActive }) =>
                                classNames(
                                  isActive
                                    ? ' hover:text-orange-text bg-gray-200 hover:bg-gray-200 text-orange-text'
                                    : 'text-gray-400 hover:bg-gray-200',
                                  'group flex gap-x-3 rounded-md  text-sm leading-6 font-semibold items-center',
                                )
                              }
                            >
                              <img src={item.icon} className={'h-8 w-8'} />
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:pb-4 bg-white">
          <div className="flex h-16 shrink-0 items-center justify-center">
            {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            /> */}
          </div>
          <nav className="mt-8">
            <ul role="list" className="flex flex-col items-center space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? 'bg-app-color text-brand-color'
                          : 'text-gray-400 hover:text-brand-color hover:bg-app-color',
                        'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold',
                      )
                    }
                  >
                    <img src={item.icon} className={'h-8 w-8'} />

                    <span className="sr-only">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lg:pl-20">
          <Header user={admin} setSidebarOpen={setSidebarOpen} />

          <main className="  rounded-tl-2xl bg-app-color h-screen shadow-[0px_4px_10px_rgba(172,_172,_172,_0.3)_inset]">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 ">
              {/* <Home /> 
              <CreateAssessment />
              <AssessmentPage /> */}
              <Outlet />
            </div>
          </main>
        </div>

        {/* <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block"> */}
        {/* Secondary column (hidden on smaller screens) */}
        {/* </aside> */}
      </div>
    </>
  );
}
