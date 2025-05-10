import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/lib/prisma";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

type params = Promise<{ id: string }>;

const IssueDetailPage = async (props: { params: params }) => {
  const id = (await props.params).id;

  if (!/^\d+$/.test(id)) {
    return notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    return notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.updatedAt.toDateString()}</Text>
      </Flex>
      <Text as="p">{issue.description}</Text>
    </div>
  );
};

export default IssueDetailPage;
