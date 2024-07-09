import {
  DocumentArrowUpIcon,
  EnvelopeIcon,
  PlusCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { FormEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { read, utils } from 'xlsx';
import { addCandidateToInviteList } from '../../../app/features/inviteCandidateSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FileUploadModal from './FileUploadModal';

const AddCandidates = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const isNoError = useRef<boolean>(false);
  const allCandidates = useAppSelector((state) => state.inviteCandidate);
  const dispatch = useAppDispatch();

  const [openUploadModel, setOpenUploadModel] = useState<boolean>(false);

  const onAddCandidate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (allCandidates.find((cnd) => cnd.email === email)) {
      return toast.error('Candidate With Email Already Exists');
    }
    const res = addCandidate({ name, email, mobile });
    if (res) {
      setEmail('');
      setName('');
      setMobile('');
      isNoError.current = false;
      return;
    }
    return toast.error('Candidate With Email Already Exists');
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
      if (allCandidates.find((cnd) => cnd.email === data.email)) {
        return false;
      }
      dispatch(
        addCandidateToInviteList({
          name: data.name as string,
          email: data.email as string,
          mobile: data.mobile as string,
        }),
      );
      return true;
    }
  };

  useEffect(() => {
    // &&      email.match('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}'
    if (name.length > 3 && email.length > 5) {
      isNoError.current = true;
    } else {
      isNoError.current = false;
    }
  }, [email, name.length]);

  return (
    <>
      <FileUploadModal
        openUploadModel={openUploadModel}
        setOpenUploadModel={setOpenUploadModel}
        handleFileUpload={readExcelFile}
      />
      <div className="main_container shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex w-full justify-start items-center bg-white py-4 px-20">
        <form className="col1 flex items-center gap-2.5 w-full" onSubmit={onAddCandidate}>
          <div className="col1_col1 w-full">
            <div className="input_container relative w-full h-[50px]">
              <UserIcon className="w-[27px] h-[20px] absolute left-2 top-3.5" />
              <input
                type="text"
                placeholder="Candidate Name*"
                required
                minLength={4}
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-[35px] h-full rounded-md border border-customGray-80 bg-customGray-70 w-full"
              />
            </div>
          </div>
          <div className="col1_col2 w-full">
            <div className="input_container relative w-full h-[50px]">
              <UserIcon className="w-[27px] h-[20px] absolute left-2 top-3.5" />
              <input
                type="tel"
                placeholder="Candidate Mobile No"
                maxLength={14}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="pl-[35px] h-full rounded-md border border-customGray-80 bg-customGray-70 w-full"
              />
            </div>
          </div>
          <div className="col1_col2 w-full">
            <div className="input_container relative w-full h-[50px]">
              <EnvelopeIcon className="w-[27px] h-[20px] absolute left-2 top-3.5" />
              <input
                type="email"
                placeholder="Candidate Email ID*"
                required
                maxLength={30}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-[35px] h-full rounded-md border border-customGray-80 bg-customGray-70 w-full"
              />
            </div>
          </div>
          <div className="col1_col3">
            <button
              className={`relative w-[111px] h-[50px] rounded-lg ${isNoError.current ? 'bg-peru-100' : 'bg-golden-200 cursor-not-allowed'} flex justify-center items-center text-white-200`}
              type="submit"
              disabled={!isNoError.current}
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
