import { prisma, Status, type Prisma } from "@repo/database";
import "server-only";

export const select = {
  id: true,
  title: true,
  status: true,
  dueDate: true,
  assigneeId: true,
  createdAt: true,
  updatedAt: true,
  assignee: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} satisfies Prisma.TaskSelect;

export async function getTasks(status: Status | null) {
  return prisma.task.findMany({
    where: status ? { status } : undefined,
    include: {
      assignee: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        id: "asc",
      },
    ],
  });
}

export type TaskRow = Prisma.TaskGetPayload<{ select: typeof select }>;
