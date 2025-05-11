import prisma from "@/lib/prisma";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

type params = Promise<{ id: string }>;

const IssueDetailPage = async (props: { params: params }) => {
  const id = (await props.params).id;
  const idParsed = parseInt(id);

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
    <Grid
      columns={{ initial: "1", md: "2" }}
      gap={"5"}
      className="prose max-w-xl"
    >
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton id={idParsed} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
