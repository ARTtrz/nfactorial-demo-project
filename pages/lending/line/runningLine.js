import React from 'react';

const RunningLine = () => {
  return (
    <div className="flex overflow-hidden mt-8 p-2 bg-logo">
      <div className="animate-scrolling-text sm:hidden text-xl font-meduim uppercase  text-white ">
        nFactorial - nFactorial - nFactorial - nFactorial - nFactorial - nFactorial - nFactorial - nFactorial - nFactorial
        - nFactorial 
      </div>
      <div className="smm:hidden xs:hidden animate-scrolling-text sm:text-sm text-xl font-meduim uppercase  text-white ">
        nFactorial - nFactorial - nFactorial
        - nFactorial 
      </div>
      <div className="smm:hidden   animate-scrolling-text sm:text-sm text-xl font-meduim uppercase  text-white ">
        nFactorial - nFactorial - nFactorial
  
      </div>
    </div>
  );
};

export default RunningLine;
