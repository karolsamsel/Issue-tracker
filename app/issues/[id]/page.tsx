import prisma from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { auth } from "@/auth";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

type params = Promise<{ id: string }>;

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async (props: { params: params }) => {
  const id = (await props.params).id;
  const idParsed = parseInt(id);
  const session = await auth();

  if (!/^\d+$/.test(id)) {
    return notFound();
  }

  const issue = await fetchIssue(idParsed);

  if (!issue) {
    return notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"} className="prose">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction={"column"} gap={"3"}>
          <AssigneeSelect issue={issue} />
          <EditIssueButton id={idParsed} />
          <DeleteIssueButton id={idParsed} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata(props: { params: params }) {
  const params = await props.params;

  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: `Description of issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
