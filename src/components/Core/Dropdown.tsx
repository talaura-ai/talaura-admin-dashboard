import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { classNames } from "./classNames";

export interface IInput {
  serialNum?: number;
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value: string;
  setValue: any;
}

const Input: React.FC<IInput> = ({
  serialNum = 1,
  label = "title",
  type = "text",
  name = "name",
  placeholder = "Type here ...",
  className = "",
  value,
  setValue,
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
      <div className="relative mt-10 ml-10 w-[75vw]">
        <input
          type={type}
          name={name}
          id={name}
          className={classNames(
            "peer text-2xl  w-full border-0 bg-transparent py-1.5 text-gray-900 focus:ring-0 placeholder-gray-300",
            className,
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Input;
