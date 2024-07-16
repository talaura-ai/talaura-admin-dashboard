import { classNames } from '../Core/classNames';

const Step: React.FC<any> = ({ steps }) => {
  return (
    <nav aria-label="Progress" className="mt-10 mx-9 w-ful">
      <ol role="list" className="flex items-center ">
        {steps.map(
          (
            step: {
              name: any;
              status: string;
              icon: string | undefined;
            },
            stepIdx: number,
          ) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? 'w-full pr-8 sm:pr-20' : '',
                'relative ',
              )}
            >
              {step.status === 'complete' ? (
                <>
                  <div className="absolute inset-0 flex items-center w-full" aria-hidden="true">
                    <div className="h-2 w-full bg-[#F3BC84]" />
                  </div>
                  <a className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-white border border-spacing-2 border-brand-color outline outline-1 outline-brand-color shadow-md shadow-brand-color">
                    {/* <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" /> */}
                    <img src={step.icon} className="h-5 w-5" />
                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              ) : step.status === 'current' ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
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
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
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

export default Step;
