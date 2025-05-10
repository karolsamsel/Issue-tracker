import { Card, Flex } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const LoadingIssueDetail = () => {
  return (
    <div className="prose max-w-xl">
      <Skeleton />
      <Flex gap="2" my="2">
        <Skeleton width={"5rem"} />
      </Flex>
      <Card mt="5">
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default LoadingIssueDetail;
