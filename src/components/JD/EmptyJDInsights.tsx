import IMAGES from '../../assets/images/Images';

const EmptyJDInsights = () => {
  return (
    <div className="flex  flex-col  h-[50vh] rounded-lg shadow-inner bg-white mt-1">
      <header className="p-3">
        <h1 className="text-lg text-center ">Assistant suggested insights</h1>
      </header>
      <hr className="m-2" />

      <div className="flex flex-col justify-center items-center mt-10">
        <img src={IMAGES.Empty_Insight} alt="empty-jd" className="h-20 w-20 " />
        <h2 className="mt-4 text-sm font-bold tracking-tight sm:text-lg  text-gray-300 flex">
          No insights available
        </h2>
      </div>
    </div>
  );
};

export default EmptyJDInsights;
