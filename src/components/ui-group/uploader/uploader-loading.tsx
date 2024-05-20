import { ReloadIcon } from '@radix-ui/react-icons';

const UploaderLoading = () => {
  return (
    <div className="flex flex-col justify-center">
      <ReloadIcon className="h-9 w-9 mx-auto animate-spin" />
      <div className="font-semibold text-gray-500 text-xl mt-3">Uploading file</div>
      <div className="text-gray-400">Please wait</div>
    </div>
  );
};

export default UploaderLoading;
