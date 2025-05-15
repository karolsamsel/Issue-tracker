import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
import { Metadata } from "next";

// Inline Client Component
const ClientWrapper = ({ issue }: { issue: any }) => {
  "use client";

  // Move the dynamic import here
  const dynamic = require("next/dynamic").default;
  const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  });

  return <IssueForm issue={issue} />;
};

type params = Promise<{ id: string }>;

const IssueEditPage = async (props: { params: params }) => {
  const id = (await props.params).id;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!issue) {
    return notFound();
  }

  return <ClientWrapper issue={issue} />;
};

export async function generateMetadata(props: { params: params }) {
  const params = await props.params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return {
    title: `Edit an issue: ${issue?.title}`,
    description: `Edit issue ${issue?.id}`,
  };
}

export default IssueEditPage;
