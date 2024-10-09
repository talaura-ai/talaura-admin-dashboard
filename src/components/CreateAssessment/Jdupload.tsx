import React, { useState } from 'react';
import uploadLogo from '../../assets/images/icons/Upload to the Cloud.png';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Function to handle file drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);

    uploadJd([...uploadedFiles, ...files]);

    alert(`${files.length} file(s) successfully uploaded.`);
  };

  // Function to handle manual file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);

    uploadJd([...uploadedFiles, ...files]);

    alert(`${files.length} file(s) successfully uploaded.`);
  };

  // Prevent default behavior for dragover
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Required to allow the drop event
  };

  const uploadJd = (files: File[]) => {
    try {
      const formdata = new FormData();
      formdata.append('user_id', '123');
      formdata.append('conversation_id', 'conv123');
      files.map((file) => formdata.append('file', file));

      const requestOptions: any = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch('http://34.93.76.248:8000/upload_jd', requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isOpen && (
      <div className="fixed bg-black bg-opacity-40 z-10 flex justify-center items-center w-screen top-0 h-screen left-0">
        <div className="bg-[#F9F7F0] rounded-lg shadow-lg p-6 max-w-md w-full relative">
          {/* Close Button */}
          <button className="absolute top-2 right-2 text-black" onClick={onClose}>
            &times;
          </button>

          {/* File Upload Section */}
          <div
            className="dropzone p-8 rounded-md"
            onDragOver={handleDragOver} // Required to enable drop event
            onDrop={handleDrop} // Handles drop event
          >
            <input
              type="file"
              id="fileInput"
              multiple
              className="hidden"
              onChange={handleFileSelect} // Handles file select
            />
            <label htmlFor="fileInput" className="cursor-pointer">
              <img src={uploadLogo} alt="Upload" className="mb-4 mx-auto w-[90px] h-[90px]" />
              <p className="text-black text-[24px] font-semibold text-center">
                Drag & Drop or Click to upload
              </p>
              <p className="text-[#7C7A7A] text-center text-[12px]">
                Only .pdf and .docx files are supported
              </p>
            </label>
          </div>

          {/* Uploaded Files Preview */}
          {/* {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-600">Uploaded Files:</h4>
              <ul className="list-disc pl-5">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-gray-500">
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </div>
    )
  );
};

export default FileUploadModal;
