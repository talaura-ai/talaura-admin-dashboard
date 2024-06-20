import { useRef, useState } from 'react';
import IMAGES from '../../assets/images/Images';
import { useLoginMutation } from '../../app/services/auth';
import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from '../../app/features/adminSlice';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [useLogin, result] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const admin = useAppSelector((state) => state.admin);

  const checkRef = useRef(null);

  if (admin.token) {
    navigate('/');
    return;
  }

  const isDisabled = result.isLoading;

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className='flex  flex-1'>
        <div className='flex flex-0.5'>
          <img className='h-screen w-full' src={IMAGES.loginSplitPic} alt='' />
        </div>
        <div className='flex flex-1 justify-center items-center'>
          <div className='mx-auto w-8/12 max-w-full'>
            <div>
              <h2 className='text-5xl text-black-900 font-Sansation_Bold leading-none text-left'>
                Welcome to{' '}
                <span className='talAura-gradient-text'>TalAura</span>
                <br></br>Sign In to start hiring
              </h2>
              <p className='mt-2 text-left font-Sansation_Regular text-orange-text text-xl	'>
                Enter your details to proceed further
              </p>
            </div>

            <div className='mt-10'>
              <div>
                <form
                  method='POST'
                  className='space-y-6'
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const res = await useLogin({
                      email,
                      password,
                    });

                    if (res.error) {
                      return toast.error(
                        // @ts-ignore
                        `${res?.error?.status} - ${res?.error?.data?.message}`
                      );
                    }

                    if (res.data) {
                      toast.success('Login Success');
                      return dispatch(
                        login({
                          ...res.data,
                          // @ts-ignore
                          rememberMe: checkRef.current.checked,
                        })
                      );
                    }
                  }}>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-300'>
                      Email Id
                    </label>
                    <div className='mt-2 relative'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        required
                        className='block w-full shadow-none border-0	 py-1.5  placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none focus:shadow-none focus-visible:shadow-none
                                                border-gray-300 focus:border-gray-300 focus:ring-0 border-b-2  '
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder='Please Enter Your Email'
                        disabled={isDisabled}
                      />
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                        <EnvelopeIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium leading-6 text-gray-300'>
                      Password
                    </label>
                    <div className='mt-2 relative'>
                      <input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        required
                        className='block w-full shadow-none border-0	 py-1.5  placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none focus:shadow-none focus-visible:shadow-none
                                                border-gray-300 focus:border-gray-300 focus:ring-0 border-b-2  
                                                
                                                '
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder='Please Enter Password'
                        disabled={isDisabled}
                      />
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                        <UserIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                        ref={checkRef}
                        // defaultChecked={rememberMe}
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className='h-4 w-4 rounded border-gray-300 text-orange-text checked:bg-orange-text ring-0'
                      />
                      <label
                        htmlFor='remember-me'
                        className='ml-3 block text-sm leading-6 text-gray-300'>
                        Remember me
                      </label>
                    </div>

                    <div className='text-sm leading-6'>
                      <Link
                        to='/forgot-password'
                        className='font-semibold text-orange-text hover:text-brand-color font-Sansation_Regular'>
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      disabled={isDisabled}
                      type='submit'
                      className='flex justify-center size-4/12 rounded-md bg-orange-text px-3 py-1.5  text-md text-white shadow-sm hover:brand-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-text'>
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
