import FormLogin from './components/form-login';
import bgUrl from '@/assets/bg-dot.svg';

export default function Authentication() {
  return (
    <>
      <div className="container  relative h-screen overflow-hidden flex flex-col items-center justify-center lg:max-w-none lg:px-0">
        <div className="lg:p-8 lg:pt-12 bg-white rounded-xl relative z-[200]">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="relative z-20 flex items-center text-lg font-medium">
                {/* <Icons.HinoLogoFull className="w-3/4 mx-auto" /> */}
                TMT
              </div>
            </div>
            <FormLogin />
          </div>
        </div>
        <div className="absolute inset-0 w-full z-10">
          <img src={bgUrl} alt="" className="w-full" />
        </div>
        <div className="absolute inset-0 bg-[#111827] z-0" />
      </div>
    </>
  );
}
