import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { ArrowRightIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { questionTypes } from '../../app/features/assessmentsSlice';
import { classNames } from './classNames';

export interface IInput {
  serialNum?: number;
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value: string;
  setValue: any;
  options?: any;
  required?: boolean;
  onBlur?: any;
}

const Input: React.FC<IInput> = ({
  serialNum = 1,
  label = 'title',
  type = 'text',
  name = 'name',
  placeholder = 'Enter Program Name',
  className = '',
  value,
  setValue,
  options,
  required,
  onBlur,
}) => {
  return (
    <div>
      <span className="text-black text-2xl font-Sansation ">
        {`${serialNum}.`}
        <ArrowRightIcon className="w-5 h-5 inline mx-2 mb-1" />
      </span>

      <label htmlFor={name} className="text-black text-2xl font-Sansation">
        {label}
      </label>
      {type === questionTypes.TEXT ? (
        <div className="relative mt-8 ml-10 w-[75vw]">
          <input
            type={type}
            name={name}
            id={name}
            className={classNames(
              'peer text-2xl  w-full border-0 bg-transparent py-1.5 text-gray-900 focus:ring-0 placeholder-gray-300',
              className,
            )}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
              if (onBlur) {
                onBlur(e);
              }
            }}
            required={required}
          />
          <div
            className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
            aria-hidden="true"
          />
        </div>
      ) : type === questionTypes.DROPDOWN ? (
        <Listbox
          value={value}
          onChange={(e) => {
            setValue(e);
            onBlur(e);
          }}
        >
          {({ open }) => (
            <>
              {/* <Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Label> */}
              <div className="relative mt-5">
                <ListboxButton className="relative w-full cursor-default rounded-md  py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm  focus:outline-none  sm:leading-6">
                  <span className="block truncate text-2xl">
                    {value && value.length ? value : 'Select from the options below'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <Transition
                  show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  text-xl">
                    {options.map((option: { title: any; name: any }) => (
                      <ListboxOption
                        key={option.name}
                        className={({ focus }) =>
                          classNames(
                            focus ? 'bg-brand-color text-white' : '',
                            !focus ? 'text-gray-900' : '',
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                          )
                        }
                        value={option.name}
                      >
                        {({ selected, focus }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'block truncate',
                              )}
                            >
                              {option.title}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  focus ? 'text-white' : 'text-brand-color',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      ) : null}
    </div>
  );
};

export default Input;
