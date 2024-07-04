import { useEffect } from 'react';
import { questionTypes } from '../../app/features/assessmentsSlice';
import { updateQuestion } from '../../app/features/questions';
import { useAppDispatch } from '../../app/hooks';
import { IAssessmentQuestionProps } from '../../helpers/types';
import useFormContext from '../../hooks/useFormContext';
import Input from '../Core/Input';
import MultipleChoices from '../Core/MultipleChoices';
import EmptyDataScreen from '../EmptyDataScreen/EmptyDataScreen';

const AssessmentQuestion: React.FC<IAssessmentQuestionProps> = ({ question }) => {
  const { data, setData } = useFormContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setData((oldData: any) => ({
      ...oldData,
      [question.name]:
        question.type === questionTypes.TEXT || question.type === questionTypes.DROPDOWN
          ? question.answer
            ? question.answer
            : ''
          : question.answer
            ? question.answer
            : [],
    }));
  }, [question]);

  if (!question) return <EmptyDataScreen />;
  const { type, title, name, position, options = [] } = question;

  if (type === questionTypes.TEXT)
    return (
      <div className="flex flex-col mt-10 px-5">
        <div className="flex mt-10">
          <Input
            label={title}
            name={name}
            value={data[name] || ''}
            setValue={async (e: { target: { value: any } }) => {
              return setData((oldData: any) => {
                return {
                  ...oldData,
                  [name]: e,
                };
              });
            }}
            onBlur={(e: any) => {
              return dispatch(updateQuestion({ title, answer: e.target.value }));
            }}
            serialNum={position}
          />
        </div>
      </div>
    );

  if (type === questionTypes.MULTIPLE_CHOICE)
    return (
      <div className="flex flex-col mt-10 px-5">
        <div className="flex mt-10">
          <MultipleChoices
            title={title}
            name={name}
            value={data[name] || ''}
            setValue={(e: { target: { value: any } }) => {
              return setData((oldData: any) => {
                return {
                  ...oldData,
                  [name]: e,
                };
              });
            }}
            serialNum={position}
            options={options}
          />
        </div>
      </div>
    );

  if (type === questionTypes.DROPDOWN) {
    return (
      <div className="flex flex-col mt-10 px-5">
        <div className="flex mt-10 flex-col">
          <Input
            label={title}
            name={name}
            value={data[name] || ''}
            setValue={(e: { target: { value: any } }) => {
              return setData((oldData: any) => {
                return {
                  ...oldData,
                  [name]: e,
                };
              });
            }}
            serialNum={position}
            type={type}
            options={options}
            onBlur={(answer: any) => {
              dispatch(updateQuestion({ title, answer }));
            }}
          />
        </div>
      </div>
    );
  }
};

export default AssessmentQuestion;
