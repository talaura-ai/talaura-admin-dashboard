import {
  DocumentArrowUpIcon,
  EnvelopeIcon,
  PlusCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { read, utils } from 'xlsx';
import { addCandidateToInviteList } from '../../app/features/inviteCandidateSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  capitalizeEachWordFirstCharacter,
  emailRegex,
  mobileNumberRegex,
  nameRegex,
} from '../../helpers/utils';
import FileUploadModal from './FileUploadModal';

export interface IFormInput {
  name: string;
  mobile: string;
  email: string;
}

const AddCandidates = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormInput>({ mode: 'all' });

  const allCandidates = useAppSelector((state) => state.inviteCandidate);
  const dispatch = useAppDispatch();

  const [openUploadModel, setOpenUploadModel] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInput> = (data, e) => {
    e?.preventDefault();
    if (allCandidates.find((cnd) => cnd.email === data.email || cnd.mobile === data.mobile)) {
      return toast.error('Candidate With Email or Mobile Already Exists');
    }
    const res = addCandidate({
      name: capitalizeEachWordFirstCharacter(data.name),
      email: data.email,
      mobile: data.mobile,
    });
    if (res) {
      reset();
      return;
    }
    return toast.error('Candidate With Email or Mobile Already Exists');
  };

  const readExcelFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result && typeof event.target?.result !== 'string') {
        const data = new Uint8Array(event.target.result);
        const workbook = read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = utils.sheet_to_json(worksheet);

        if (!Array.isArray(jsonData)) return toast.error('File Data is not in List');
        jsonData.forEach((dt) => addCandidate(dt));
        toast.success('Read Success');
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsArrayBuffer(file);
  };

  const addCandidate = (data?: unknown) => {
    if (data && typeof data === 'object' && 'name' in data && 'email' in data && 'mobile' in data) {
      if (allCandidates.find((cnd) => cnd.email === data.email || cnd.mobile === data.mobile)) {
        return false;
      }
      dispatch(
        addCandidateToInviteList({
          name: capitalizeEachWordFirstCharacter(data.name as string),
          email: data.email as string,
          mobile: data.mobile as string,
        }),
      );
      return true;
    }
  };

  return (
    <>
      <FileUploadModal
        openUploadModel={openUploadModel}
        setOpenUploadModel={setOpenUploadModel}
        handleFileUpload={readExcelFile}
      />
      <div className="main_container shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex w-full justify-start items-center bg-white pt-4 pb-6 px-20">
        <form className="col1 flex items-center gap-2.5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="col1_col1 w-full">
            <div className="input_container relative w-full h-[50px]">
              <UserIcon className="w-[27px] h-[20px] absolute left-2 top-3.5" />
              <input
                {...register('name', {
                  required: { value: true, message: 'Name is required' },
                  pattern: { value: nameRegex, message: 'Check name format' },
                })}
                type="text"
                placeholder="Candidate Name*"
                className="pl-[35px] h-full rounded-md border border-customGray-80 bg-customGray-70 w-full"
              />
            </div>
            {errors && errors.name && (
              <p className="mt-1 text-[#FB2121] text-sm font-bold absolute">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="col1_col2 w-full">
            <div className="input_container relative w-full h-[50px]">
              <UserIcon className="w-[27px] h-[20px] absolute left-2 top-3.5" />
              <input
                {...register('mobile', {
                  required: { value: true, message: 'Please enter 10 digit number' },
                  pattern: {
                    value: mobileNumberRegex,
                    message: 'Please enter only numerical value',
                  },
                })}
                type="tel"
                placeholder="Candidate Mobile No"
                className="pl-[35px] h-full rounded-md border border-customGray-80 bg-customGray-70 w-full"
              />
            </div>
            {errors && errors.mobile && (
              <p className="mt-1 text-[#FB2121] text-sm font-bold absolute">
                {errors.mobile.message}
              </p>
            )}
          </div>
          <div className="col1_col2 w-full">
            <div className="input_container relative w-full h-[50px]">
              <EnvelopeIcon className="w-[27px] h-[20px] absolute left-2 top-3.5" />
              <input
                {...register('email', {
                  required: { value: true, message: 'Email is required' },
                  pattern: { value: emailRegex, message: 'Check email format' },
                })}
                type="email"
                placeholder="Candidate Email ID*"
                className="pl-[35px] h-full rounded-md border border-customGray-80 bg-customGray-70 w-full"
              />
            </div>
            {errors && errors.email && (
              <p className="mt-1 text-[#FB2121] text-sm font-bold absolute">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="col1_col3">
            <button
              className={`relative w-[111px] h-[50px] rounded-lg ${isValid ? 'bg-peru-100' : 'bg-golden-200 cursor-not-allowed'} flex justify-center items-center text-white`}
              type="submit"
            >
              <PlusCircleIcon className="w-[27px] h-[20px]" />
              <span>Add</span>
            </button>
          </div>
          <div className="col1_col4 h-14 w-1 rounded-sm bg-customGray-70 mx-2" />
        </form>
        <div className="col2 flex gap-4">
          <div className="col2_col1">
            <button
              className={`border border-sandybrown text-sandybrown rounded-lg flex justify-start items-center py-[12px] px-2.5`}
              onClick={() => setOpenUploadModel(true)}
              disabled={!isValid}
            >
              <DocumentArrowUpIcon className="w-[17px] h-[22px]" />
              <span className="text-base whitespace-nowrap font-normal">Bulk Upload</span>
            </button>
          </div>
          <div className="col2_col2">
            <button className="h-[50px] w-[50px] border border-sandybrown text-sandybrown rounded-lg flex justify-start items-center py-4 px-2.5">
              <img src="/images/DbExport.png" alt="" className="w-[27px] h-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCandidates;
