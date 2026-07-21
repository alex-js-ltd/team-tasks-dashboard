import { Suspense } from "react";
import { getTasks } from "./features/dashboard/data";
import { TaskList } from "./features/dashboard/_comps/task-list";
import { TaskListFallback } from "./features/dashboard/_comps/task-list-fallback";
import { StatusFilter } from "./features/dashboard/_comps/status-filter";
import {
  type SearchParams,
  SearchParamsSchema,
} from "./features/dashboard/schema";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function IndexPage(props: Props) {
  const searchParams = await props.searchParams;

  const submission = SearchParamsSchema.safeParse(searchParams);

  if (submission.error) {
    console.error(submission);
    notFound();
  }

  const taskListPromise = getTasks(submission.data.status);

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl grid gap-4">
        <StatusFilter />

        <Suspense fallback={<TaskListFallback />}>
          <TaskList taskListPromise={taskListPromise} />
        </Suspense>
      </div>
    </main>
  );
}
