import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type params = Promise<{ id: string }>;

export async function PATCH(reqeust: NextRequest, props: { params: params }) {
  const id = (await props.params).id;
  const body = await reqeust.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "issue doesn't exist" }, { status: 404 });
  }

  const editedIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(editedIssue);
}

export async function DELETE(request: NextRequest, props: { params: params }) {
  const id = (await props.params).id;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "issue doesn't exist" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json({});
}
