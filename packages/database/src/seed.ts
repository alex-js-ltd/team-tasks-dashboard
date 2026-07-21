import "dotenv/config";

import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";

import { prisma } from "./client";

const USERS = [
  ["Maya Patel", "maya.patel@example.com"],
  ["Daniel Kim", "daniel.kim@example.com"],
  ["Sophie Turner", "sophie.turner@example.com"],
  ["Marcus Reed", "marcus.reed@example.com"],
  ["Elena Rossi", "elena.rossi@example.com"],
  ["Noah Williams", "noah.williams@example.com"],
] as const;

const emails = USERS.map(([, email]) => email) as [string, ...string[]];

const taskSchema = z.object({
  tasks: z
    .array(
      z.object({
        title: z.string(),
        status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
        assigneeEmail: z.enum(emails),
        daysFromToday: z.number().int().min(-14).max(45),
      }),
    )
    .length(30),
});

function getDueDate(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

async function main() {
  const { output } = await generateText({
    model: openai("gpt-4.1-mini"),
    output: Output.object({ schema: taskSchema }),
    prompt: `
      Generate 30 realistic software team tasks.

      Team:
      ${USERS.map(([name, email]) => `${name}: ${email}`).join("\n")}

      Use only these emails. Include frontend, backend, design,
      accessibility, testing, bugs and product tasks.

      Distribute tasks across TODO, IN_PROGRESS and DONE.
      Use daysFromToday between -14 and 45.
      Include some overdue tasks and avoid duplicate titles.
    `,
  });

  if (!output) throw new Error("Failed to generate tasks");

  await prisma.task.deleteMany();

  const users = await Promise.all(
    USERS.map(([name, email]) =>
      prisma.user.upsert({
        where: { email },
        update: { name },
        create: { name, email },
      }),
    ),
  );

  const userIds = new Map(users.map((user) => [user.email, user.id]));

  await prisma.task.createMany({
    data: output.tasks.map((task) => ({
      title: task.title,
      status: task.status,
      dueDate: getDueDate(task.daysFromToday),
      assigneeId: userIds.get(task.assigneeEmail)!,
    })),
  });

  console.log(`Seeded ${users.length} users and ${output.tasks.length} tasks`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
