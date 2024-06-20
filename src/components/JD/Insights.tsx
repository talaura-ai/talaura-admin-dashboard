import { useEffect, useState } from "react";
const AI_API_URL = import.meta.env.VITE_AI_API_URL;

// const mockInsights = [
//   "push notification",
//   "Core Data",
//   "Secure your communications with Apple Push notification service",
//   "Communication",
//   "Enginnering",
//   "Social",
//   "Leadership",
//   "Motivation",
//   "Kubernets",
//   "Docker",
//   "Container",
//   "Cloud Services",
//   "Figma",
// ];

// const random1 = Math.floor(Math.random() * mockInsights.length);
// const random2 = Math.floor(Math.random() * mockInsights.length);
// const random3 = Math.floor(Math.random() * mockInsights.length);

// const randomInsights = () => [
//   mockInsights[random1],
//   mockInsights[random2],
//   mockInsights[random3],
// ];

export interface IInsights {
  isJobDescriptionRequired: boolean;
  jdData:any,
  setJdData:any,
  jdType:any,
  setAssisstantMessage:any
}

const Insights: React.FC<IInsights> = ({ isJobDescriptionRequired,   jdData,
 
  setAssisstantMessage
}) => {
  const [insightsData, setInsightData] = useState(() => []);

  if (!isJobDescriptionRequired) {
    return null;
  }

  useEffect(() => {
    
    const getInsightsMethod = async () => {
      const payloads = {
        "jd_text": jdData  }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

     try {
      const res = await fetch(`${AI_API_URL}insights_jd`, {
        method: "POST",
        body: JSON.stringify(payloads),
        headers
      })
      const resJSON = await res.json();
      if(res.statusText === "OK"){
        setInsightData(resJSON.insights)
      }

     } catch (error) {
        console.log('error', error)
     }
    }

    if(jdData){
      getInsightsMethod();

    }


  }, [jdData])
  

  return (
    <>
      <div className="flex  flex-col  h-[50vh] rounded-lg shadow-inner bg-white mt-1">
        <header className="p-3">
          <h1 className="text-lg text-center ">Assistant suggested insights</h1>
        </header>
        <hr className="m-2" />

        <div className="flex flex-row justify-center items-center mt-2 gap-2 flex-wrap overflow-y-auto scrollbar">
          {insightsData.map((insight) => (
            <div
              onClick={() => {
                setInsightData((oldData) => {
                  return oldData.filter((oldInsight) => oldInsight !== insight);
                })
                let input = "";
                input += insight + " , ";
                console.log('input', input)
                setAssisstantMessage(input)
              }}
              className="rounded-md mx-1 inline  bg-app-color   px-3.5 py-2.5    text-sm font-semibold     text-black shadow-sm      cursor-pointer      focus-visible:outline focus-visible:outline-2       ocus-visible:outline-offset-2 focus-visible:outline-app-color text-pretty break-keep"
            >
              {insight}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Insights;
