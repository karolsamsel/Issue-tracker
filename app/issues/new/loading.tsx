import { Skeleton } from "@/app/components";

const LoadingNewIssue = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height={"5rem"} />
    </div>
  );
};

export default LoadingNewIssue;
