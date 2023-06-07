import {  Bars   } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-3 text-white">Wait for opponent's answer</h1>
      <Bars  
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default Loader;
