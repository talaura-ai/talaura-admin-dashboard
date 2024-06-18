import { useRouteError } from "react-router-dom";
import IMAGES from "../../assets/images/Images";

export default function LoadingScreen() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="loading-screen">
      <main>
        <div className="flex  flex-col justify-center items-center h-[60vh] animate-pulse">
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl talAura-gradient-text ">
            TalAura
          </h1>

          {/* <h2 className="mt-4 text-1xl font-bold tracking-tight sm:text-3xl talAura-gradient-text animate-pulse">
                        Loading ...</h2> */}
          <div className="mt-5 flex flex-row">
            <div className="animate-bounce h-5 w-5 mr-3 bg-orange-text animation-delay-100	"></div>
            <div className="animate-bounce h-5 w-5 mr-3 bg-orange-text animation-delay-200"></div>
            <div className="animate-bounce h-5 w-5 mr-3 bg-orange-text animation-delay-300"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
