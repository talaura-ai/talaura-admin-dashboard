import dayjs from 'dayjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { clearInviteList } from '../../app/features/inviteCandidateSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useInviteCandidateMutation } from '../../app/services/candidates';
import { IAddCandidateApiPayload } from '../AssessmentView/types';

interface IFormInput {
  startDateTime: string;
  endDateTime: string;
}
const Footer = () => {
  const allCandidates = useAppSelector((state) => state.inviteCandidate);
  const { assessmentId = '' } = useParams();
  const dispatch = useAppDispatch();
  const [inviteAllCandidate] = useInviteCandidateMutation();

  const {
    register,
    formState: { isValid },
    getValues,
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: {
      startDateTime: dayjs().format('YYYY-MM-DD[T]hh:mm'),
      endDateTime: dayjs().add(1, 'hour').format('YYYY-MM-DD[T]hh:mm'),
    },
  });

  const onSubmitHandler: SubmitHandler<IFormInput> = async (data, e) => {
    try {
      e?.preventDefault();
      const payload: IAddCandidateApiPayload = {
        assessmentId,
        candidates: allCandidates,
        startsAt: dayjs(data.startDateTime).valueOf(),
        endsOn: dayjs(data.endDateTime).valueOf(),
      };
      const response = await inviteAllCandidate(payload);
      if (response.data?.status) {
        toast.success('Invite Successfully Sent and Local Invite List is Cleared');
        dispatch(clearInviteList());
      }
    } catch (error) {
      toast.error('Error Inviting');
    }
  };

  return (
    <footer className="self-end mt-[20px]">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="container flex justify-start items-baseline gap-2.5"
      >
        <div className="col1 flex flex-col">
          <div className="text_container text-lg text-black">
            <span>Assessment start date & time</span>
          </div>
          <div className="input_container h-[40px] relative">
            <img
              src="/images/CalendarGreen.png"
              className="h-[25px] w-[25px] object-cover absolute top-1.5 left-4"
              alt=""
            />
            <input
              type="datetime-local"
              {...register('startDateTime', {
                required: true,
                min: dayjs().format('YYYY-MM-DD[T]hh:mm'),
              })}
              className="h-full pl-10 border border-customGray-80"
            />
          </div>
        </div>
        <div className="col2 flex flex-col">
          <div className="text_container text-lg text-black">
            <span>Assessment end date & time</span>
          </div>
          <div className="input_container h-[40px] relative">
            <img
              src="/images/CalendarRed.png"
              className="h-[25px] w-[25px] object-cover  absolute top-1.5 left-4"
              alt=""
            />
            <input
              type="datetime-local"
              {...register('startDateTime', {
                required: true,
                min: dayjs(getValues('startDateTime')).format('YYYY-MM-DD[T]hh:mm'),
              })}
              className="h-full pl-10 border border-customGray-80"
            />
          </div>
        </div>
        <div className="col3 flex justify-center self-end">
          <button
            className={`${isValid ? 'bg-peru-100 cursor-pointer' : 'bg-golden-200 cursor-not-allowed'} [border:none] px-2 flex-1 rounded-3xs 
                                      flex flex-row items-center justify-start box-border min-w-[6.438rem] h-[50px] z-[1] hover:bg-peru-100`}
            type="submit"
          >
            <img src="/images/PaperPlane.png" className="h-[25px] w-[25px] object-cover" alt="" />
            <div className="flex-1 relative font-sansation text-white text-center z-[1] text-xl">
              Invite
            </div>
          </button>
        </div>
      </form>
    </footer>
  );
};

export default Footer;
