import Pagination from "@/app/components/Pagination";
import prisma from "@/lib/prisma";
import { Issue, Status } from "@prisma/client";
import IssuesActions from "./IssuesActions";
import IssuesTable from "./IssuesTable";

type searchParams = Promise<{
  status: Status;
  orderBy: keyof Issue;
  page: string;
}>;

const IssuesPage = async (props: { searchParams: searchParams }) => {
  const searchParams = await props.searchParams;
  const statusParam = searchParams.status;

  const statuses = Object.values(Status);
  const status = statuses.includes(statusParam) ? statusParam : undefined;
  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <div>
      <IssuesActions />
      <IssuesTable issues={issues} searchParams={searchParams} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </div>
  );
};

// to force dynamic loading of a page
export const dynamic = "force-dynamic";

export default IssuesPage;

export const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];
