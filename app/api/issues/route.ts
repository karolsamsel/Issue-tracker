import { issueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(reqeust: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await reqeust.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const createdUser = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(createdUser, { status: 201 });
}
