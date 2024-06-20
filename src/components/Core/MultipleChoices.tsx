import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { classNames } from "./classNames";
import { IInput } from "./Input";
import { useState } from "react";
import IMAGES from "../../assets/images/Images";

export interface IMultipleChoices extends IInput {
  options: any[];
}

const MultipleChoices: React.FC<IMultipleChoices> = ({
  serialNum = 1,
  label = "title",
  name = "name",
  options,
}) => {
  const [optionsState, setOptions] = useState(options);
  

  const [customValue, setCustomValue] = useState("");
    const handleCheckboxChange = (event: {
      target: { value: any; checked: any };
    }) => {
      const { value, checked } = event.target;
  
      if (checked) {
        // dispatch(setSelectedSkill(value));
      } else {
        // dispatch(removeSelectedSkill(value));
      }
    };
  

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
        {optionsState.map((option, idx) => {
          return (
            <div className="relative flex items-start" key={option.name}>
              <div className="flex h-6 items-center">
                <input
                  id={option.name}
                  aria-describedby={option.name}
                  name={option.name}
                  value={option.name}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-brand-color focus:ring-brand-color"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label
                  htmlFor={option.name}
                  className="font-medium text-gray-900 font-Sansation_Bold text-xl"
                >
                  {option.title}
                </label>
                {/* <span id="comments-description" className="text-gray-500">
                                    <span className="sr-only">New comments </span>so you always know what's happening.
                                </span> */}
              </div>
            </div>
          );
        })}
        <div className="flex flex-col mt-3">
          <button
            className="flex flex-row gap-3"
            onClick={(e) => {
              e.preventDefault();
              if (customValue && customValue.length) {
                setOptions((oldOptions) => {
                  return [
                    ...oldOptions,
                    {
                      name: customValue,
                      title: customValue,
                    },
                  ];
                });
              }

              setCustomValue("");
            }}
          >
            <img src={IMAGES.plus} className="w-5 h-5" />
            <span className="text-light-orange">Add New Field</span>
          </button>
          <div className="justify-start">
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="text-xs rounded 
                            placeholder-gray-300
                            border-0
                            shadow
                            shadow-inset
                            ring-0
                            focus:ring-0
                            "
              placeholder="Enter your custom field"
            ></input>
          </div>
        </div>

        {/* <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
          aria-hidden="true"
        /> */}
      </div>
    </div>
  );
};

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
export function Example() {
  return (
    <fieldset>
      <legend className="sr-only">Notifications</legend>
      <div className="space-y-5">
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="comments" className="font-medium text-gray-900">
              New comments
            </label>{" "}
            <span id="comments-description" className="text-gray-500">
              <span className="sr-only">New comments </span>so you always know
              what's happening.
            </span>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="candidates"
              aria-describedby="candidates-description"
              name="candidates"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="candidates" className="font-medium text-gray-900">
              New candidates
            </label>{" "}
            <span id="candidates-description" className="text-gray-500">
              <span className="sr-only">New candidates </span>who apply for any
              open postings.
            </span>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="offers"
              aria-describedby="offers-description"
              name="offers"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="offers" className="font-medium text-gray-900">
              Offers
            </label>{" "}
            <span id="offers-description" className="text-gray-500">
              <span className="sr-only">Offers </span>when they are accepted or
              rejected by candidates.
            </span>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default MultipleChoices;
