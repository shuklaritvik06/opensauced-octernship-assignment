import { goBack, Link } from "react-chrome-extension-router";
const Backward = () => {
  return (
    <p className="text-sm w-full flex justify-center">
      Decided Wrongly?&nbsp;
      <span onClick={() => goBack()} className="text-orange-500 cursor-pointer">
        Go Back
      </span>
    </p>
  );
};

export default Backward;
