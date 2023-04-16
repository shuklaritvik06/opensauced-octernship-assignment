import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Check from "./screens/Check";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1200);
  }, []);
  return (
    <>
      {loaded ? (
        <>
          <Check />
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default App;
