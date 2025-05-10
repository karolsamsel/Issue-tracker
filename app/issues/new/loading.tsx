import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssue = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height={"5rem"} />
    </div>
  );
};

export default LoadingNewIssue;
