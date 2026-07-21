"use server";

import { parseSubmission, report } from "@conform-to/react/future";
import { revalidatePath } from "next/cache";
import { UpdateTaskStatusInput } from "./schema";
import { prisma } from "@repo/database";

export async function updateTaskStatus(_: unknown, formData: FormData) {
  const submission = parseSubmission(formData);
  const result = UpdateTaskStatusInput.safeParse(submission.payload);

  if (!result.success) {
    return report(submission, {
      error: {
        issues: result.error.issues,
      },
    });
  }

  const { id: taskId, status } = result.data;

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/");

  return report(submission, {
    reset: true,
  });
}
