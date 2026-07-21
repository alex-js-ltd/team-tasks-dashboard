"use client";

import { use } from "react";
import type { TaskRow } from "../data";
import { TaskCard } from "./task-card";

export function TaskList({
  taskListPromise,
}: {
  taskListPromise: Promise<TaskRow[]>;
}) {
  const taskList = use(taskListPromise);

  if (taskList.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-16 text-center">
        <p className="text-sm font-medium text-zinc-200">No tasks found</p>

        <p className="mt-1 text-sm text-zinc-500">
          Tasks assigned to your team will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {taskList.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
