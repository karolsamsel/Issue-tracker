import prisma from "@/lib/prisma";
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
      <p>{issue.title}</p>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
      <p>{issue.updatedAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
