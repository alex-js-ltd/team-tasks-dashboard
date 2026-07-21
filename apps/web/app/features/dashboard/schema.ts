import { z } from "zod";
import { Status } from "@repo/database";

export const UpdateTaskStatusInput = z.object({
  id: z.string().min(1, "Task ID is required"),
  status: z.enum(Status, {
    error: "Select a valid task status",
  }),
});
