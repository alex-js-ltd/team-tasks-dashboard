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

export type TaskPage = {
  data: Prisma.TaskGetPayload<{ select: typeof select }>[];
  nextCursorId: string | null;
};

const PAGE_SIZE = 12;

export async function getTasks(
  status: Status | null,
  cursorId: string | null,
): Promise<TaskPage> {
  const results = await prisma.task.findMany({
    take: PAGE_SIZE + 1,
    skip: cursorId ? 1 : 0,

    cursor: cursorId
      ? {
          id: cursorId,
        }
      : undefined,

    where: status ? { status } : undefined,

    select,

    orderBy: [
      {
        createdAt: "desc",
      },
      {
        id: "asc",
      },
    ],
  });

  const hasNextPage = results.length > PAGE_SIZE;
  const data = results.slice(0, PAGE_SIZE);

  const nextCursorId = hasNextPage ? data.at(-1)!.id : null;

  return {
    data,
    nextCursorId,
  };
}
