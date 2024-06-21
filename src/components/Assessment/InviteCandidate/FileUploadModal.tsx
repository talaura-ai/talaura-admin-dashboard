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
  return (
    <Dialog open={openUploadModel} onClose={() => {}}>
      <div className="flex w-screen h-screen flex-col items-center justify-center bg-grey-lighter fixed top-0 left-0 z-50 bg-customGray-300 pt-[-20px]">
        <div className="bg-customGray-400 flex items-center justify-center p-3 rounded-xl relative">
          <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg">
            <XCircleIcon
              className="h-10 w-10 absolute right-4 top-4"
              onClick={() => setOpenUploadModel(false)}
            />
            <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">
              File Drop and Upload
            </h1>
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
                <svg
                  className="w-16 h-16 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                <span className="text-gray-600">Drag and drop your files here</span>
                <span className="text-gray-500 text-sm">(or click to select)</span>
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
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FileUploadModal;
