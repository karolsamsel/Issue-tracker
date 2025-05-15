import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
import { cache } from "react";
import { Issue } from "@prisma/client";

// Inline Client Component
const ClientWrapper = ({ issue }: { issue: Issue }) => {
  "use client";

  // Move the dynamic import here
  const dynamic = require("next/dynamic").default;
  const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  });

  return <IssueForm issue={issue} />;
};

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: parseInt(issueId, 10) } })
);

type params = Promise<{ id: string }>;

const IssueEditPage = async (props: { params: params }) => {
  const id = (await props.params).id;

  const issue = await fetchIssue(id);

  if (!issue) {
    return notFound();
  }

  return <ClientWrapper issue={issue} />;
};

export async function generateMetadata(props: { params: params }) {
  const params = await props.params;

  const issue = await fetchIssue(params.id);

  return {
    title: `Edit an issue: ${issue?.title}`,
    description: `Edit issue ${issue?.id}`,
  };
}

export default IssueEditPage;
