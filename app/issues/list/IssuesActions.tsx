import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssuesActions = () => {
  return (
    <Flex mb={"5"} justify={"between"}>
      <IssueStatusFilter />
      <Link href={"/issues/new"} className="btn btn--primary">
        New issue
      </Link>
    </Flex>
  );
};

export default IssuesActions;
