import { prisma, Status } from "@repo/database";

export async function getTasks(status?: Status) {
  return prisma.task.findMany({
    where: status ? { status } : undefined,
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}
