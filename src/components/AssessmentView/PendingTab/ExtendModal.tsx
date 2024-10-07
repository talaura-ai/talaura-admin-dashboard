import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppSelector } from '../../../app/hooks';
import { useExtendCandidateAssessmentDurationMutation } from '../../../app/services/candidates';
const timeDuration: number = 3;
const ExtendModal = (props: {
  extendUserId: string;
  setExtendUserId: Dispatch<SetStateAction<string>>;
  refetchCandidateList: any;
  assessmentId: string;
}) => {
  const { extendUserId, setExtendUserId, assessmentId } = props;
  const timeDateRoundOffToNextHour = useMemo(() => {
    let now = dayjs();
    if (now.minute() !== 0 || now.second() !== 0 || now.millisecond() !== 0) {
      now = now.add(1, 'hour');
    }
    now = now.minute(0).second(0).millisecond(0);
    return now;
  }, []);
  const assessmentDetails = useAppSelector((stt) =>
    stt.assessments.find(({ _id }) => _id === assessmentId),
  );
  const [startDateTime, setStartDateTime] = useState<string>(
    timeDateRoundOffToNextHour.format('YYYY-MM-DD[T]HH:mm'),
  );
  const [endDateTime, setEndDateTime] = useState<string>(
    timeDateRoundOffToNextHour.add(1, 'hour').format('YYYY-MM-DD[T]HH:mm'),
  );
  const assessmentTotalDuration =
    assessmentDetails?.module.reduce((prev, curr) => (prev += +curr.time), 0) ?? 60;
  const [extendCandidateAssessmentDurationMutation] =
    useExtendCandidateAssessmentDurationMutation();
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!startDateTime || !endDateTime) {
      toast.error('Please Select Start and End Date-Time');
      return;
    }
    const start = dayjs(startDateTime);
    const currTime = dayjs();
    if (start.isBefore(currTime.set('minute', currTime.get('minute') - 1))) {
      toast.error('Start date/time must be after current date/time');
      return;
    }
    if (dayjs(endDateTime).isBefore(dayjs(startDateTime))) {
      toast.error('End date/time must be after the start date/time.');
      return;
    }
    if (dayjs(endDateTime).diff(dayjs(startDateTime), 'minute') <= assessmentTotalDuration) {
      toast.error(
        `There must be at least a ${assessmentTotalDuration} minute gap between start and end time.`,
      );
      return;
    }

    try {
      await extendCandidateAssessmentDurationMutation({
        candidateId: extendUserId,
        startsAt: dayjs(startDateTime).valueOf(),
        endsOn: dayjs(endDateTime).valueOf(),
      });
      toast.success('Done');
      setExtendUserId('');
      props.refetchCandidateList();
    } catch (error) {
      toast.error('Failed');
      setExtendUserId('');
    }
  };
  useEffect(() => {
    const start = dayjs(startDateTime);
    const newEnd = start.add(timeDuration, 'hour');
    setEndDateTime(newEnd.format('YYYY-MM-DD[T]HH:mm'));
  }, [startDateTime]);
  if (!extendUserId) {
    return ;
  }
  return (
    <div className=" bg-[rgba(0,0,0,0.6)]  w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center z-50">
      <div className="flex items-center justify-center relative">
        <div className="relative px-9 pt-10 pb-14 flex flex-col gap-y-8 bg-antiquewhite text-sandybrown rounded-xl max-w-[510px] max-h-[468px] border border-gray-500">
          <div>
            <div className="absolute right-2 top-2">
              <button onClick={() => setExtendUserId('')}>
                <XMarkIcon className="text-3xl h-8" />
              </button>
            </div>
            <div className="font-semibold text-2xl pb-4">Enter Start and End Date</div>
          </div>
          <div>
            <form onSubmit={handleOnSubmit} action="" className="flex flex-col space-y-8">
              <div className="flex flex-col gap-y-8 h-12 space-x-2 w-auto">
                <input
                  type="datetime-local"
                  value={startDateTime}
                  required
                  // min={dayjs().format('YYYY-MM-DD[T]hh:mm')}
                  onChange={(e) => setStartDateTime(e.target.value)}
                  className="h-full pl-10 border border-customGray-80"
                />
              </div>
              <div className="flex flex-col gap-y-8 h-12 space-x-2 w-auto">
                <input
                  type="datetime-local"
                  value={endDateTime}
                  // min={dayjs().add(1, 'minute').format('YYYY-MM-DD[T]hh:mm')}
                  required
                  onChange={(e) => setEndDateTime(e.target.value)}
                  className="h-full pl-10 border border-customGray-80"
                />
              </div>
              <button
                className={`relative w-[111px] h-[50px] rounded-lg ${true ? 'bg-peru-100' : 'bg-golden-200 cursor-not-allowed'} flex justify-center items-center text-white-200`}
                type="submit"
                disabled={!true}
              >
                <PlusCircleIcon className="w-[27px] h-[20px]" />
                <span>Extend</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExtendModal;









