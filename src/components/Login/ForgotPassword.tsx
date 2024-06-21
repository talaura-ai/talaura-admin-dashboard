import { useState } from 'react';
import IMAGES from '../../assets/images/Images';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(true);

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex  flex-1">
        <div className="flex flex-0.5">
          <img className="h-screen w-full" src={IMAGES.loginSplitPic} alt="" />
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="mx-auto w-8/12 max-w-full">
            <div>
              <h2 className="text-5xl text-black-900 font-Sansation_Bold leading-none text-left">
                Forgot Your Password <br></br>
                Enter your details to recover
              </h2>
              <p className="mt-2 text-left font-Sansation_Regular text-orange-text text-xl	">
                Enter your details to proceed further
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form
                  method="POST"
                  className="space-y-6"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    setOpen(true);
                  }}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Email Id
                    </label>
                    <div className="mt-2 relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full shadow-none border-0	 py-1.5  placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none focus:shadow-none focus-visible:shadow-none
                                                border-gray-300 focus:border-gray-300 focus:ring-0 border-b-2  "
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Please Enter Your Email"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex justify-center size-4/12 rounded-md bg-orange-text px-3 py-1.5  text-md text-white shadow-sm hover:brand-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-text"
                    >
                      Recover
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <img
                    src={IMAGES.Cancel}
                    className="h-8 w-8 text-gray-400 absolute right-0 top-0"
                    onClick={() => setOpen(false)}
                  />

                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-orange-text px-10 "
                      >
                        We’ve sent a verification link to your Email
                      </DialogTitle>

                      <hr className="mt-2 h-1" />
                      <div className="mt-2">
                        <div className="flex justify-center">
                          <img
                            src={IMAGES.successEmailOnForgot}
                            alt="forgot-email-confirm"
                            className="h-4/12 w-4/12"
                          />
                        </div>
                        <p className="text-sm text-gray-400">
                          Please check the email inbox you signed up with. You may need to check the
                          spam folder
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 justify-center flex">
                    <button
                      type="button"
                      className="  justify-center rounded-md bg-orange-text px-7 py-1 text-sm font-semibold text-white shadow-sm hover:bg-brand-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-text"
                      onClick={() => setOpen(false)}
                    >
                      Resend
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

// export  function Example() {

//   return (

//   )
// }
