import { z } from "zod";
import { Status } from "@repo/database";

export const UpdateTaskStatusInput = z.object({
  id: z.string().min(1, "Task ID is required"),
  status: z.enum(Status, {
    error: "Select a valid task status",
  }),
});

export const SearchParamsSchema = z.object({
  status: z
    .union([z.enum(Status)])
    .nullable()
    .default(null),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;
