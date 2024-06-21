import IMAGES from '../../assets/images/Images';

const EmptyJDdescriptions = () => {
  return (
    <>
      <div className="flex  flex-col justify-center items-center h-[50vh] rounded-lg shadow-inner bg-white mt-1">
        <img src={IMAGES.Empty_JD} alt="empty-jd" className="h-40 w-40 flex" />
        <h2 className="mt-4 text-1xl font-bold tracking-tight sm:text-3xl  text-gray-300 flex">
          Enter Job description
        </h2>
      </div>
      <div className="rounded-full bg-app-color w-50 h-50 absolute top-20 left-5 border border-sm shadow-md border-[#E5A971] drop-shadow-xl shadow-brand-color p-2">
        <img src={IMAGES.JD_Logo} className="w-5 h-5" />
      </div>
    </>
  );
};

export default EmptyJDdescriptions;
