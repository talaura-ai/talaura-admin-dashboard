import { Bars3Icon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../app/features/adminSlice';
import IMAGES from '../../assets/images/Images';

interface IHeader {
  user?: any;
  setSidebarOpen: any;
}
const Header: React.FC<IHeader> = ({ user, setSidebarOpen }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4  bg-white px-4  sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      {/* <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" /> */}

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 items-center">
          <h1
            className="font-sans
                text-2xl text-brand-color text-center "
          >
            TalAura
          </h1>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Separator */}
          {/* <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" /> */}

          {/* Profile dropdown */}
          <div className="relative">
            <div className="-m-1.5 flex items-center p-1.5">
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1679477084664-6e86877c401a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {user.username}
                </span>
              </span>
            </div>
          </div>
          <button
            type="button"
            className="-m-2.5 p-1.5 text-gray-400 hover:text-gray-500 border rounded"
          >
            <span className="text-black text-sm">{user.credits} Credits</span>
          </button>
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            onClick={() => dispatch(logout())}
          >
            <span className="sr-only">Logout</span>
            <img src={IMAGES.Logout} alt="logout" className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
