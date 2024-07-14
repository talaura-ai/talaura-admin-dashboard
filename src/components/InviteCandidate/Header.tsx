const Header = () => {
  return (
    <>
      <div
        className={`self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0.062rem] pl-[0.187rem] box-border text-center text-[1.5rem] text-customGray-100 font-sansation`}
      >
        <div className="flex-1 flex flex-col justify-between max-w-full gap-2 mq750:flex-wrap">
          <div className="flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.062rem] box-border max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              <div className="flex flex-row items-start justify-start">
                <a className="[text-decoration:none] flex-1 relative text-base font-bold text-[inherit] z-[1] mq450:text-[1.188rem]">
                  Assessments
                </a>
                <div className="flex flex-col items-start justify-start px-[0rem] pb-[0rem] text-base mx-2">
                  &gt;
                </div>
                <a
                  className={`[text-decoration:none] relative text-base font-bold inline-block min-w-[1.875rem] z-[1] mq450:text-[1.188rem]`}
                >
                  A1
                </a>
                <div className="flex flex-col items-start justify-start px-[0rem] pb-[0rem] text-base mx-2">
                  &gt;
                </div>
                <a
                  className={`[text-decoration:none] relative text-base font-bold text-burlywood-100 inline-block min-w-[1.875rem] z-[1] mq450:text-[1.188rem]`}
                >
                  Invite
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between align-middle items-center">
            <div>
              <h1 className="text-xl text-black font-bold">Send Invites</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
