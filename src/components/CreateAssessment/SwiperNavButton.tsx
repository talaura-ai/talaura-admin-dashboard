import { useNavigate } from 'react-router-dom';
import { useSwiper } from 'swiper/react';
import { ISliderNav } from '../../helpers/types';
import { classNames } from '../Core/classNames';

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
  const navigate = useNavigate();

  const swiper = useSwiper();
  if (hidden) {
    return null;
  }

  return (
    <button
      disabled={disabled}
      onClick={async () => {
        if (children === 'Cancel') {
          return navigate('/assessments');
        }
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

export default SwiperNavButton;
