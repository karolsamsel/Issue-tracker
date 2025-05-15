import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);

  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(users);
}
