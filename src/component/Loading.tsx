import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className="flex h-[100vh] w-full flex-col items-center justify-center text-center">
        <div className="loader mb-4 h-12 w-12 rounded-full border-t-4 border-gray-900"></div>
      </div>
    </div>
  );
};

export default Loading;
