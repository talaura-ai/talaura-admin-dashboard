import React, { useState } from 'react';
import plus from '../../assets/images/icons/Plus.png';
import play from '../../assets/images/icons/Play_Button_Circled.png';
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

    alert(`${files.length} file(s) successfully uploaded.`);
  };

  // Function to handle manual file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);

    alert(`${files.length} file(s) successfully uploaded.`);
  };

  // Prevent default behavior for dragover
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Required to allow the drop event
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
          {uploadedFiles.length > 0 && (
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
          )}
        </div>
      </div>
    )
  );
};

// Main Component
const CreateJD: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center items-start h-screen">
      <div className="w-full p-8 rounded-lg ">
        {/* Header */}
        <h1 className="text-2xl font-bold text-black mb-6">Create Requisition</h1>

        {/* Stepper */}
        <div className="relative flex items-center mb-10">
          <div className="w-full bg-gray-200 h-2 flex-grow rounded-full">
            <div className="bg-gradient-to-r from-orange-400 to-orange-200 h-full w-1/2 rounded-full"></div>
          </div>
          <div className="absolute -left-4 bg-white border border-orange-300 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img src={plus} alt="plus icon" className="w-[30px] h-[30px] relative object-cover" />
          </div>
          <div className="absolute -right-4 bg-white border border-gray-300 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img src={play} alt="play icon" className="w-[30px] h-[30px] relative object-cover" />
          </div>
        </div>

        <div className="flex justify-between mb-8 text-gray-400">
          <span className="text-orange-400 font-semibold">Job Description</span>
          <span className="font-semibold">Assessment Modules</span>
        </div>

        {/* Upload Buttons */}
        <div className="flex flex-col items-center mt-[144px]">
          <button
            type="button"
            onClick={openModal}
            className="w-full sm:w-2/3 lg:w-1/2 bg-[#FFF6ED] text-[#CA9A6F] font-medium py-3 px-6 rounded-lg border border-[#CA9A6F] mb-4 transition-all hover:bg-orange-200"
          >
            Upload Job Description
          </button>
          <span className="text-gray-400 my-[41px]">or</span>
          <button className="w-full sm:w-2/3 lg:w-1/2 bg-white text-black font-medium py-3 px-6 rounded-lg border border-gray-300 transition-all hover:bg-gray-100">
            Create Job Description
          </button>
        </div>
      </div>
      <FileUploadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CreateJD;
