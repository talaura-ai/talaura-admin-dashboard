import { Dialog } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useRef } from 'react';

const FileUploadModal = ({
  openUploadModel,
  setOpenUploadModel,
  handleFileUpload,
}: {
  openUploadModel: boolean;
  setOpenUploadModel: Dispatch<SetStateAction<boolean>>;
  handleFileUpload: (_: File) => void;
}) => {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileListRef = useRef<HTMLDivElement>(null);

  const handleFiles = (files: FileList) => {
    if (fileListRef.current) {
      fileListRef.current.innerHTML = '';
    }

    for (const file of files) {
      const listItem = document.createElement('div');
      listItem.textContent = `${file.name} (${formatBytes(file.size)})`;
      if (fileListRef.current) {
        fileListRef.current?.appendChild(listItem);
      }
    }
    handleFileUpload(files[0]);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadSampleFile = () => {
    const link = document.createElement('a');
    link.href = '/TalAuraSampleUser.csv';
    link.download = 'TalAuraSampleUser.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={openUploadModel} onClose={() => {}}>
      <div className="flex w-screen h-screen flex-col items-center justify-center bg-grey-lighter fixed top-0 left-0 z-50 bg-customGray-300 pt-[-20px] shadow-lg">
        <div className="bg-white flex items-center justify-center p-3 rounded-lg relative">
          <div className="w-[500px] max-w-md p-3 bg-white rounded-lg">
            <XCircleIcon
              className="h-6 w-6 absolute right-2 top-2"
              onClick={() => setOpenUploadModel(false)}
            />
            <div className="mb-6 flex justify-center">
              <button
                className="border border-black text-lg px-10 py-2 rounded-lg"
                onClick={downloadSampleFile}
              >
                Export Sample sheet
              </button>
            </div>
            <div
              className="bg-customGray-400 p-8 text-center rounded-lg border-dashed border-2 border-customGray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
              id="dropzone"
              ref={dropzoneRef}
              onDragOver={(e) => {
                e.preventDefault();
                dropzoneRef.current?.classList.add('border-blue-500', 'border-2');
              }}
              onDragLeave={() => {
                dropzoneRef.current?.classList.remove('border-blue-500', 'border-2');
              }}
              onDrop={(e) => {
                e.preventDefault();
                dropzoneRef.current?.classList.remove('border-blue-500', 'border-2');
                const files = e.dataTransfer.files;
                handleFiles(files);
              }}
            >
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <img src="/images/CloudImg.png" className="h-[66px] w-[97px] object-cover" />
                <span className="text-gray-600">Drag and drop your files here</span>
                <span className="text-gray-500 text-sm">(or click to select)</span>
                <span className="text-gray-500 text-sm">csv xls xlsx Allowed</span>
              </label>
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx, .xls, .csv"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    handleFiles(files);
                  }
                }}
              />
            </div>
            <div className="mt-6 text-center" id="fileList" ref={fileListRef}></div>
            <div className="flex justify-end">
              <button className="py-1 px-11 text-xl bg-[#CC8448] rounded-lg text-white">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FileUploadModal;
