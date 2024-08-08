import { Dialog } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import * as xlsx from 'xlsx';
import { clearInviteList } from '../../app/features/inviteCandidateSlice';
import { useAppDispatch } from '../../app/hooks';
import { stringToArrayBuffer } from '../../helpers/utils';

const DuplicateCandidatesModal = ({
  duplicateCandidates,
  setDuplicateCandidates,
}: {
  duplicateCandidates: { name: string; email: string }[];
  setDuplicateCandidates: Dispatch<SetStateAction<{ name: string; email: string }[]>>;
}) => {
  const dispatch = useAppDispatch();

  const exportDuplicates = async () => {
    const workbook = xlsx.utils.book_new();

    // Convert JSON data to a worksheet
    const worksheet = xlsx.utils.json_to_sheet(duplicateCandidates);

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a binary string
    const workBookOutPut = xlsx.write(workbook, {
      bookType: 'xlsm',
      type: 'binary',
    });

    // Create a blob from the binary string
    const blob = new Blob([stringToArrayBuffer(workBookOutPut)], {
      type: 'application/octet-stream',
    });

    // Create a link element and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DuplicateCandidates.xlsm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDuplicateCandidates([]);
    dispatch(clearInviteList());
  };

  return (
    <Dialog open={duplicateCandidates?.length !== 0} onClose={() => {}}>
      <div className="flex w-screen h-screen flex-col items-center justify-center bg-grey-lighter fixed top-0 left-0 z-50 bg-customGray-300 pt-[-20px] shadow-lg">
        <div className="bg-white flex items-center justify-center p-3 rounded-lg relative">
          <div className="w-[500px] max-w-md p-3 bg-white rounded-lg">
            <div className="mb-2.5 flex justify-start">
              <h2 className="text-lg font-bold">Duplicate Candidates</h2>
            </div>
            <div>
              <table className="divide-y divide-customGray-250 w-full mb-4">
                <thead className="border-collapse">
                  <tr className="divide-customGray-250">
                    <td>Name</td>
                    <td>Email</td>
                  </tr>
                </thead>
                <tbody>
                  {duplicateCandidates.map((cnd, idx) => (
                    <tr key={idx} className="border-b border-b-customGray-250">
                      <td className="py-1.5">{cnd.name}</td>
                      <td>{cnd.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="py-1 px-11 text-base bg-[#CC8448] rounded-lg text-white"
                onClick={exportDuplicates}
              >
                Export
              </button>{' '}
              <button
                className="py-1 px-11 text-base bg-[#CC8448] rounded-lg text-white"
                onClick={() => setDuplicateCandidates([])}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DuplicateCandidatesModal;
