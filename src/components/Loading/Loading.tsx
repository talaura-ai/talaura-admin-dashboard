import { classNames } from '../Core/classNames';

export default function Loading(invert: any) {
  return (
    <div id="loading">
      <div className="flex flex-row">
        <div
          className={classNames(
            'animate-bounce h-5 w-5 mr-3  animation-delay-100',

            invert ? 'bg-white' : 'bg-orange-text',
          )}
        ></div>{' '}
        <div
          className={classNames(
            'animate-bounce h-5 w-5 mr-3  animation-delay-100',

            invert ? 'bg-white' : 'bg-orange-text',
          )}
        ></div>{' '}
        <div
          className={classNames(
            'animate-bounce h-5 w-5 mr-3  animation-delay-100',

            invert ? 'bg-white' : 'bg-orange-text',
          )}
        ></div>
      </div>
    </div>
  );
}
