import dayjs from 'dayjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { clearInviteList } from '../../app/features/inviteCandidateSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useInviteCandidateMutation } from '../../app/services/candidates';
import { IAddCandidateApiPayload, IAssessmentDetails } from '../AssessmentView/types';
import { useMemo, useState } from 'react';
import DuplicateCandidatesModal from './DuplicateCandidatesModal';

interface IFormInput {
  startDateTime: string;
  endDateTime: string;
}
const Footer = ({ assessmentData }: { assessmentData?: IAssessmentDetails }) => {
  const allCandidates = useAppSelector((state) => state.inviteCandidate);
  const assessmentTotalDuration =
    assessmentData?.assessments[0].module.reduce((prev, curr) => (prev += +curr.time), 0) ?? 60;
  const { assessmentId = '' } = useParams();
  const [duplicateCandidates, setDuplicateCandidates] = useState<{ name: string; email: string }[]>(
    [],
  );
  const dispatch = useAppDispatch();
  const [inviteAllCandidate] = useInviteCandidateMutation();

  const timeDateRoundOffToNextHour = useMemo(() => {
    let now = dayjs();
    if (now.minute() !== 0 || now.second() !== 0 || now.millisecond() !== 0) {
      now = now.add(1, 'hour');
    }
    now = now.minute(0).second(0).millisecond(0);
    return now;
  }, []);

  const { register, getValues, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      startDateTime: timeDateRoundOffToNextHour.format('YYYY-MM-DD[T]HH:mm'),
      endDateTime: timeDateRoundOffToNextHour
        .add(assessmentTotalDuration, 'minute')
        .format('YYYY-MM-DD[T]HH:mm'),
    },
  });

  const onSubmitHandler: SubmitHandler<IFormInput> = async (data, e) => {
    try {
      e?.preventDefault();
      const isAnyInvalid = allCandidates.find((cnd) => cnd.isValid === false);
      if (isAnyInvalid) {
        toast.error('Please remove invalid entries.');
        return;
      }
      const payload: IAddCandidateApiPayload = {
        assessmentId,
        candidates: allCandidates.filter((cnd) => cnd.isValid === true),
        startsAt: dayjs(data.startDateTime).valueOf(),
        endsOn: dayjs(data.endDateTime).valueOf(),
      };
      const response = await inviteAllCandidate(payload);
      if (response.data?.status) {
        if (response.data.existingCandidate.length) {
          if (response.data.existingCandidate.length === allCandidates.length) {
            toast.error('No Candidates are invited');
          } else {
            toast.error('Some Candidates are duplicate');
          }
          setDuplicateCandidates(response.data.existingCandidate);
          return;
        } else {
          toast.success('Invite Successfully Sent and Local Invite List is Cleared');
          dispatch(clearInviteList());
        }
      }
    } catch (error) {
      toast.error('Error Inviting');
    }
  };

  const startDateTime = watch('startDateTime');
  const endDateTime = watch('endDateTime');

  const isInviteBtnDisabled = useMemo(() => {
    if (allCandidates.find((cnd) => cnd.isValid == false)) {
      return true;
    }

    const startDateTimeInForm = dayjs(startDateTime);
    const endDateTimeInForm = dayjs(endDateTime);
    if (endDateTimeInForm.diff(startDateTimeInForm, 'minute') < assessmentTotalDuration) {
      return true;
    }
    return false;
  }, [allCandidates, assessmentTotalDuration, endDateTime, startDateTime]);

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
                min: dayjs().format('YYYY-MM-DD[T]HH:mm'),
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
              {...register('endDateTime', {
                required: true,
                min: dayjs(getValues('endDateTime')).format('YYYY-MM-DD[T]HH:mm'),
              })}
              className="h-full pl-10 border border-customGray-80"
            />
          </div>
        </div>
        <div className="col3 flex justify-center self-end">
          <button
            disabled={isInviteBtnDisabled}
            className={`${!isInviteBtnDisabled ? 'bg-peru-100 cursor-pointer  hover:bg-peru-100' : 'bg-golden-200 cursor-not-allowed'} [border:none] px-2 flex-1 rounded-3xs 
                                      flex flex-row items-center justify-start box-border min-w-[6.438rem] h-[50px] z-[1]`}
            type="submit"
          >
            <img src="/images/PaperPlane.png" className="h-[25px] w-[25px] object-cover" alt="" />
            <div className="flex-1 relative font-sansation text-white text-center z-[1] text-xl">
              Invite
            </div>
          </button>
        </div>
      </form>
      <DuplicateCandidatesModal
        duplicateCandidates={duplicateCandidates}
        setDuplicateCandidates={setDuplicateCandidates}
      />
    </footer>
  );
};

export default Footer;
