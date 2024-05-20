import { cn } from '@/lib/utility/cn';
import { BarLoader } from 'react-spinners';

type SpinnerProps = {
  loading: boolean;
  loadingText?: string;
  color?: string;
  className?: string;
};

const Spinner = (props: SpinnerProps) => {
  const { color = '#36d7b7', loading, loadingText = '', className } = props;
  return loading ? (
    <div className="w-full h-full absolute flex items-center justify-center flex-col">
      <div className="z-[99]">
        <BarLoader color={color} loading={loading} className={cn(className)} />
        {loadingText ? <div className="text-gray-700 text-center mt-2">{loadingText}</div> : null}
      </div>
      <div className="w-full h-full absolute z-[98] bg-white/80"></div>
    </div>
  ) : null;
};

export default Spinner;
