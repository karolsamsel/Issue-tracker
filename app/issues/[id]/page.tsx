import prisma from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { auth } from "@/auth";

type params = Promise<{ id: string }>;

const IssueDetailPage = async (props: { params: params }) => {
  const id = (await props.params).id;
  const idParsed = parseInt(id);
  const session = await auth();

  if (!/^\d+$/.test(id)) {
    return notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: idParsed,
    },
  });

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
          <EditIssueButton id={idParsed} />
          <DeleteIssueButton id={idParsed} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
