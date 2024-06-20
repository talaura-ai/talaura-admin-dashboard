import IMAGES from "../../assets/images/Images";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { XCircleIcon } from "@heroicons/react/24/outline";
import {
  removeSelectedModule,
  updateWeightage,
} from "../../app/features/moduleSlice";
import {
  ChangeEvent,
  useState,
} from "react";

const OverView: React.FC<any> = ({ editMode, module }) => {
  const { selectedModules } = useAppSelector((state) => state.modules);
  let selectedModule: any;
  if (editMode && module) {
    selectedModule = selectedModules.find(
      (m: { name: any }) => m.name === module.name,
    );
  }

  const [weight, setWeight] = useState(() =>
    selectedModule && selectedModule.Weightage ? module.Weightage : 0,
  );
  const dispatch = useAppDispatch();

  const handleDeselctModule = (selected: {
    name: any;
    noOfQuestions: any;
    Weightage: any;
    time: any;
  }) => {
    dispatch(removeSelectedModule(selected));
  };

  const onChangeWeightage = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };
  const handleChangeWeightage = async () => {
    dispatch(
      updateWeightage({
        name: module.name,
        Weightage: !isNaN(Number(weight)) ? Number(weight) : 0,
      }),
    );
  };

  return (
    <div
      className="flex rounded-2xl shadow-inner bg-white
      py-5 mt-5 mx-2 
   flex-col
      "
    >
      <div className="flex flex-row justify-evenly leading-1">
        <div>
          <h1 className="text-orange-text ">
            {module ? module?.name : "Overview"}
          </h1>
        </div>
        <div>
          <h1>
            Weightage:{" "}
            <span className="text-gray-300">
              {module && module.Weightage ? (
                <input
                  className="w-6 p-0 inline ring-0 border-0 focus:ring-0 focus:border-b-1"
                  readOnly
                  type="text"
                  value={selectedModule.Weightage}
                  onChange={(e) => onChangeWeightage(e)}
                  onBlur={() => handleChangeWeightage()}
                />
              ) : (
                selectedModules.reduce(
                  (acc: any, val: { Weightage: any }) =>
                    Number(val.Weightage) + Number(acc),
                  0,
                )
              )}
              %
            </span>
          </h1>
        </div>
        <div className="flex justify-end items-center">
          <img
            src={IMAGES.Time}
            className="h-4 w-4 justify-center items-center"
          />
          <span className="justify-center items-center ml-1 text-ellipsis">
            {module && module?.time
              ? module?.time
              : selectedModules.reduce(
                  (acc: any, val: { time: any }) =>
                    Number(val.time) + Number(acc),
                  0,
                )}
            min
          </span>
        </div>
      </div>
      <hr className="m-5 " />
      <div>
        {editMode && module
          ? selectedModule.skills.map((skill: any) => {
              return (
                <div className="mx-10 px-5 py-3">
                  <div className="flex flex-row items-center">
                    <div>
                      <h1 className="text-black">{skill}</h1>
                    </div>
                  </div>
                </div>
              );
            })
          : selectedModules.map(
              (selectedModule: {
                name: any;
                noOfQuestions: any;
                Weightage: any;
                time: any;
              }) => {
                const { name, noOfQuestions, Weightage, time } = selectedModule;
                return (
                  <div className="mx-10 px-5 py-3">
                    <div className="flex flex-row items-center">
                      <div>
                        <h1 className="text-orange-text">{name}</h1>
                      </div>
                      <div className=" ml-3 grow">
                        <span className="text-gray-300 text-xs">
                          {noOfQuestions} Question
                        </span>
                      </div>
                      <div onClick={() => handleDeselctModule(selectedModule)}>
                        {selectedModules.length > 1 ? (
                          <XCircleIcon className="h-5 w-5" />
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div>
                        <h1 className="">
                          Weightage{" "}
                          <span className="text-gray-300 text-sm mx-1">
                            {Weightage} %
                          </span>
                        </h1>
                      </div>
                      <div className="flex justify-end items-center">
                        <img
                          src={IMAGES.Time}
                          className="h-4 w-4 justify-center items-center"
                        />
                        <span className="justify-center items-center ml-1">
                          {time} min
                        </span>
                      </div>
                    </div>
                  </div>
                );
              },
            )}
      </div>
    </div>
  );
};

export default OverView;
