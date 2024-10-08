import plus from '../../assets/images/icons/Plus.png';
import play from '../../assets/images/icons/Play_Button_Circled.png';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const AddJd = () => {
  const location = useLocation();

  const [insights, setInsights] = useState<string[]>([]);
  const [keyResoponsibilities, setKeyResponsibilities] = useState<string[]>([]);

  const addToKeyResponsibilites = (insight: string) => {
    setKeyResponsibilities([...keyResoponsibilities, insight]);
    // const a = insights?.insights?.filter((element) => element !== insight);
    // console.log('a', a);
    setInsights(insights?.filter((ele) => ele !== insight));
  };

  const removeKeyResponsibilites = (insight: string) => {
    setKeyResponsibilities(keyResoponsibilities.filter((element) => element !== insight));
    setInsights([...insights, insight]);
  };

  const fetchInsight = (insights: string) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        jd_text: !true
          ? insights
          : 'We need a senior software engineer to lead our backend team and develop scalable web applications',
      });

      const requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('http://34.93.76.248:8000/insights_jd', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          setInsights(result?.insights);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscribe = fetchInsight(location?.state?.res?.initial_jd);

    return () => subscribe;
  }, [location?.state?.res?.initial_jd]);

  return (
    <div className="flex justify-center items-start">
      <div className="w-full rounded-lg ">
        {/* Header */}
        <h1 className="text-2xl font-bold text-black mb-6">Create Requisition</h1>

        {/* Stepper */}
        <div className="relative flex items-center mb-8 w-5/6 mx-auto">
          <div className="w-full bg-gray-200 h-2 flex-grow rounded-full">
            <div className="bg-gradient-to-r from-orange-400 to-orange-200 h-full w-1/2 rounded-full"></div>
          </div>
          <div className="absolute -left-4 bg-white border border-orange-300 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img src={plus} alt="plus icon" className="w-[30px] h-[30px] relative object-cover" />
          </div>
          <div className="absolute -right-4 bg-white border border-gray-300 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img src={play} alt="play icon" className="w-[30px] h-[30px] relative object-cover" />
          </div>
        </div>

        <div className="flex justify-between mb-8 text-gray-400">
          <span className="text-orange-400 font-semibold ml-12">Job Description</span>
          <span className="font-semibold mr-4">Assessment Modules</span>
        </div>

        {/* Upload Buttons */}
        <div className="grid grid-cols-6 grid-rows-5 gap-2 parent ">
          <div className="col-span-4 row-span-5 div1 px-4 bg-white shadow-md rounded-md flex items-start justify-start pb-[17px] overflow-y-scroll h-[500px]">
            <img src="/public/images/Group 199.png" className="mt-[17px] mr-[24px]" />
            <div className="flex flex-col items-start mt-[17px]">
              <p className="text-[20px] font-extrabold">Job Summary</p>
              <p className="text-start text-[16px]">{location?.state?.res?.initial_jd}</p>
              <p className="text-[20px] font-extrabold mt-6">Key Responsibilties:</p>
              {keyResoponsibilities &&
                keyResoponsibilities.map((key: string, index: number) => {
                  return (
                    <li
                      className="text-start text-[16px]"
                      key={index}
                      onClick={() => removeKeyResponsibilites(key)}
                    >
                      {key}
                    </li>
                  );
                })}
              <p className="text-[20px] font-extrabold mt-6">Experience:</p>
              <li className="text-start text-[16px]">
                Collaborate with senior developers to design, build, and maintain high-performance
                iOS applications.
              </li>
              <li className="text-start text-[16px]">
                Write clean, maintainable, and efficient code using Swift and Objective-C.
              </li>
              <p className="text-[20px] font-extrabold mt-6">Qualifications and Certifications:</p>
              <p className="text-start text-[16px]">Basic knowledge of Swift and Objective-C.</p>
            </div>
          </div>
          <div className="col-start-5 col-end-7 row-start-1 row-end-6 div2  flex flex-col bg-white shadow-md rounded ">
            {/* First div at the top */}
            <div className="border-b px-4 border-[#D7D7D7] py-2 ">
              <p>AI Insights</p>
            </div>

            {/* Second div at the top */}
            <div className=" mt-4 px-4 h-[360px] overflow-y-scroll ">
              {insights?.map((skill: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center rounded-md shadow-md gap-6 my-2 max-w-max bg-[#F9F7F0] px-3 py-1"
                    onClick={() => addToKeyResponsibilites(skill)}
                  >
                    {skill}
                    <img
                      src="/images/Cross.png"
                      alt="close icon"
                      className=" w-[20px] h-[20px] cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>

            {/* Last div placed at the bottom */}
            <p className="border-b border-[#D7D7D7] mt-auto px-4">Skills</p>
            <div className="flex gap-4 items-center my-2 px-4">
              {Array.from({ length: 3 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center rounded-md shadow-md gap-6 max-w-max bg-[#F9F7F0] px-3 py-1"
                  >
                    <img
                      src="/images/Cross.png"
                      alt="close icon"
                      className=" w-[20px] h-[20px] cursor-pointer"
                    />
                    Skills {index + 1}{' '}
                  </div>
                );
              })}
            </div>
          </div>

          {/* <div className="col-span-3 row-start-5 row-end-6 div3 px-4 bg-white shadow-md rounded-md flex items-start justify-start pb-[17px]">
            <img src="/public/images/Group 199.png" className="mt-[17px] mr-[24px]" />
            <div className="flex flex-col justify-start">
              <p className="text-[20px] font-extrabold">Skills:</p>
              <div className="flex justify-start items-start flex-wrap gap-4">
                {Array.from({ length: 5 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center rounded-full shadow-md gap-6 max-w-max bg-[#FFEFDF] px-3 py-1"
                    >
                      Skills {index + 1}{' '}
                      <img
                        src="/images/Cross.png"
                        alt="close icon"
                        className=" w-[20px] h-[20px] cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div> */}
          <div className="col-span-7 row-span-1 flex justify-end items-center">
            <button className="mt-2 mx-3 items-center justify-center rounded-md border px-6 py-3 text-base font-medium shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse z-40 min-w-14 min-h-14 bg-transparent hover:bg-transparent border-black">
              Cancel
            </button>
            <button className="mt-2 mx-3 items-center justify-center rounded-md border px-6 py-3 text-base font-medium shadow-sm hover:bg-orange-text focus:outline-none focus:ring-0 active:animate-pulse z-40 min-w-14 min-h-14 bg-orange-text text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJd;
