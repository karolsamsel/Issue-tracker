import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type params = Promise<{ id: string }>;

const IssueEditPage = async (props: { params: params }) => {
  const id = (await props.params).id;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    return notFound();
  }

  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
