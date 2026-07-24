import { getTasks } from "./data";
import { TasksApiSearchParamsSchema } from "./schema";
import { parseSubmission } from "@conform-to/react/future";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const submission = parseSubmission(searchParams);
  const result = TasksApiSearchParamsSchema.safeParse(submission.payload);

  if (!result.success) {
    return Response.json(
      {
        error: {
          issues: result.error.issues,
        },
      },
      { status: 400 },
    );
  }

  const { status, cursorId } = result.data;

  const page = await getTasks(status, cursorId);

  return Response.json(page);
}
