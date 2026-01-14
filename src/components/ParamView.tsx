interface ParamViewProps {
  paramKey: string;
  paramValue: string;
}

function ParamView({ paramKey, paramValue }: ParamViewProps) {
  return (
    <div className="flex flex-row flex-nowrap bg-teal-200 p-3 m-2 overflow-x-auto min-w-full max-w-xl rounded text-gray-700">
      <h1 className="font-bold mr-2">{paramKey}:</h1>
      <span className="inline">{paramValue}</span>
    </div>
  );
}

export default ParamView;
