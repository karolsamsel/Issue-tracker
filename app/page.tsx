import prisma from "@/lib/prisma";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export default async function Home() {
  const statusSummary = {
    open: await prisma.issue.count({
      where: {
        status: "OPEN",
      },
    }),
    inProgress: await prisma.issue.count({
      where: {
        status: "IN_PROGRESS",
      },
    }),
    closed: await prisma.issue.count({
      where: {
        status: "CLOSED",
      },
    }),
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary
          open={statusSummary.open}
          inProgress={statusSummary.inProgress}
          closed={statusSummary.closed}
        />
        <IssueChart
          open={statusSummary.open}
          inProgress={statusSummary.inProgress}
          closed={statusSummary.closed}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
