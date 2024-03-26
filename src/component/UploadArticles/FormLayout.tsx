interface Props {
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  size: number;
  currentStep: number;
  onSubmit: () => void;
}

const FormLayout = ({
  children,
  onBack,
  onNext,
  size,
  currentStep,
  onSubmit,
}: Props) => {
  const commonStyles =
    "transition-all duration-500 ease-in-out px-4 py-2 rounded-md";
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="w-full px-4 py-4 text-center text-4xl font-bold">
        Create your article
      </h1>
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center rounded-md bg-slate-50 px-16 py-8 shadow-lg">
        {children}
      </div>

      <div className="flex justify-between py-4">
        <p className={`${commonStyles} text-lg`}>
          {currentStep + 1 + "/" + size}
        </p>

        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={onBack}
              className={`border border-black hover:bg-black hover:text-white ${commonStyles}`}
            >
              Back
            </button>
          )}
          <button
            className={`bg-black text-white hover:bg-gray-700 ${commonStyles}`}
            onClick={currentStep === size - 1 ? onSubmit : onNext}
          >
            {currentStep === size - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
