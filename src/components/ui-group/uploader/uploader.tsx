import { cn } from '@/lib/utility';
import { useDropzone } from 'react-dropzone';
import UploaderLoading from './uploader-loading';
import { Icons } from '@/lib/icons/icons';

const Uploader = ({
  selectedFile,
  selectedFileChange,
  isLoading
}: {
  selectedFile: File[];
  selectedFileChange: (_files: File[]) => void;
  isLoading?: boolean;
}) => {
  const { getRootProps: getDropzoneProps, getInputProps: getInputDropProps } = useDropzone({
    disabled: isLoading,
    noKeyboard: true,
    onDrop: files => {
      selectedFileChange([files[0]]);
    }
  });

  const files = selectedFile.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <div
      {...getDropzoneProps({
        className: cn(
          'dropzone h-64 bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-center flex-col',
          isLoading ? 'disabled' : ''
        )
      })}
    >
      {isLoading ? (
        <UploaderLoading />
      ) : (
        <>
          <Icons.FileUpload className="mb-4 w-12 h-12" />
          <input {...getInputDropProps()} />
          <p className="text-gray-400">
            <span className="text-bold text-blackHino hover:cursor-pointer underline underline-offset-4">
              Click to upload
            </span>{' '}
            or drag and drop
          </p>
          <ul className="mt-4">{files}</ul>
        </>
      )}
    </div>
  );
};

export default Uploader;
