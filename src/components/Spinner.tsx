import { ClipLoader } from "react-spinners";
import { Spinner } from "../types/interfaces";

const SpinnerComponent = ({ loading }: Spinner) => {
  return (
    <div className="flex w-screen justify-center mt-10">
      <ClipLoader
        color={"gray"}
        loading={loading}
        size={50}
        aria-label="Loading"
      />
    </div>
  );
};

export default SpinnerComponent;
