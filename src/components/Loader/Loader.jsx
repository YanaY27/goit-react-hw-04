import s from "./Loader.module.css";
import { ProgressBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={s.loader}>
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        barColor="#FFD700"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        borderColor="#00008B"
      />
    </div>
  );
};

export default Loader;
