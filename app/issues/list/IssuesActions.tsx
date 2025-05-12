import Link from "next/link";
import React from "react";

const IssuesActions = () => {
  return (
    <div className="mb-5">
      <Link href={"/issues/new"} className="btn btn--primary">
        New issue
      </Link>
    </div>
  );
};

export default IssuesActions;
