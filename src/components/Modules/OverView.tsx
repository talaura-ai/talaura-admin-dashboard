import IMAGES from "../../assets/images/Images";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { removeSelectedModule } from "../../app/features/moduleSlice";

const OverView = () => {
  const { selectedModules } = useAppSelector((state) => state.modules);
  const dispatch = useAppDispatch();

  const handleDeselctModule = (selected: {
    name: any;
    noOfQuestions: any;
    Weightage: any;
    time: any;
  }) => {
    dispatch(removeSelectedModule(selected));
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
          <h1 className="text-orange-text ">Overview</h1>
        </div>
        <div>
          <h1>
            Weightage:{" "}
            <span className="text-gray-300">
              {selectedModules.reduce(
                (acc: any, val: { Weightage: any }) =>
                  Number(val.Weightage) + Number(acc),
                0,
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
          <span className="justify-center items-center ml-1">
            {selectedModules.reduce(
              (acc: any, val: { time: any }) => Number(val.time) + Number(acc),
              0,
            )}
            min
          </span>
        </div>
      </div>
      <hr className="m-5 " />
      <div>
        {selectedModules.map(
          (selectedModule: {
            name: any;
            noOfQuestions: any;
            Weightage: any;
            time: any;
          }) => {
            const { name, noOfQuestions, Weightage, time } = selectedModule;
            return (
              <div className="mx-10">
                <div className="flex flex-row items-center">
                  <div>
                    <h1 className="text-orange-text">{name}</h1>
                  </div>
                  <div className=" ml-3 grow">
                    <span className="text-gray-300">
                      {noOfQuestions} Question
                    </span>
                  </div>
                  <div onClick={() => handleDeselctModule(selectedModule)}>
                    {selectedModules.length > 1 ? (
                      <XCircleIcon className="h-5 w-5" />
                    ) : null}
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
