import { Link, useParams } from 'react-router-dom';

const Header = ({
  isCandidateView = false,
  assessmentName,
}: {
  isCandidateView?: boolean;
  assessmentName?: string;
}) => {
  const params = useParams();
  const { assessmentId = '' } = params;
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0.062rem] pl-[0.187rem] box-border max-w-full text-center text-[1.5rem] text-customGray-100 font-sansation`}>
      <div className='flex-1 flex flex-col justify-between max-w-full gap-2 mq750:flex-wrap'>
        <div className='flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.062rem] box-border max-w-full'>
          <div className='self-stretch flex flex-col items-start justify-start max-w-full'>
            <div className='flex flex-row items-start justify-start'>
              <a className='[text-decoration:none] flex-1 relative text-base font-bold text-[inherit] z-[1] mq450:text-[1.188rem]'>
                Assessments
              </a>
              <div className='flex flex-col items-start justify-start px-[0rem] pb-[0rem] text-base mx-2'>
                &gt;
              </div>
              <a
                className={`[text-decoration:none] relative text-base font-bold ${isCandidateView ? '' : 'text-burlywood-100 '} inline-block min-w-[1.875rem] z-[1] mq450:text-[1.188rem]`}>
                A1
              </a>
              {isCandidateView && (
                <>
                  <div className='flex flex-col items-start justify-start px-[0rem] pb-[0rem] text-base mx-2'>
                    &gt;
                  </div>
                  <a
                    className={`[text-decoration:none] relative text-base font-bold inline-block min-w-[1.875rem] z-[1] mq450:text-[1.188rem]`}>
                    Completed
                  </a>
                  <div className='flex flex-col items-start justify-start px-[0rem] pb-[0rem] text-base mx-2'>
                    &gt;
                  </div>
                  <a
                    className={`[text-decoration:none] relative text-base font-bold text-burlywood-100 inline-block min-w-[1.875rem] z-[1] mq450:text-[1.188rem]`}>
                    Candidate Report
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-between align-middle items-center'>
          <div>
            <h1 className='text-xl text-black font-bold'>
              {isCandidateView ? 'Candidate Name' : assessmentName}
            </h1>
          </div>
          <div className='w-[20.813rem] flex flex-row items-start justify-start gap-[1.062rem] max-w-full mq450:flex-wrap'>
            <button className='cursor-pointer [border:none] py-[0.5rem] pr-[0.5rem] pl-[1.5rem] bg-peru-100 flex-1 rounded-3xs flex flex-row items-start justify-start box-border min-w-[6.438rem] z-[1] hover:bg-peru-200'>
              <img
                src='/images/Chart.png'
                className='h=[25px] object-cover'
                alt=''
              />
              <div className='flex-1 relative text-base font-sansation text-white text-center z-[1] mq450:text-[1.188rem]'>
                Analytics
              </div>
            </button>
            <Link
              className='cursor-pointer [border:none] py-[0.5rem] pr-[0.5rem] pl-[1.5rem] bg-peru-100 flex-1 rounded-3xs flex flex-row items-start justify-start box-border min-w-[6.438rem] z-[1] hover:bg-peru-200'
              to={`/assessments/view/${assessmentId}/invite`}>
              <img
                src='/images/PaperPlane.png'
                className='h-[25px] object-cover'
                alt=''
              />
              <div className='flex-1 relative text-base font-sansation text-white text-center z-[1] mq450:text-[1.188rem]'>
                Invite
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
