"use client";

import { use, useState, useEffect } from "react";
import { TaskCard } from "./task-card";
import { type TaskPage } from "../data";

import { Status } from "@repo/database";
import { InView } from "react-intersection-observer";

export function TaskList({
  taskPagePromise,
  status,
}: {
  taskPagePromise: Promise<TaskPage>;
  status: Status | null;
}) {
  const initial = use(taskPagePromise);

  const [pages, setPages] = useState(initial);

  if (pages.data.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-16 text-center">
        <p className="text-sm font-medium text-zinc-200">No tasks found</p>

        <p className="mt-1 text-sm text-zinc-500">
          Tasks assigned to your team will appear here.
        </p>
      </div>
    );
  }

  console.log(pages);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pages.data.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <InView
        as="div"

        onChange={async (inView) => {
          if (!inView || !pages.nextCursorId) {
            return;
          }

          const res = await fetchNextPage(pages.nextCursorId, status);

          setPages((prev) => ({
            nextCursorId: res.nextCursorId,
            data: [...prev.data, ...res.data],
          }));
        }}
      ></InView>
    </div>
  );
}

async function fetchNextPage(cursorId: string, status: Status | null) {
  const searchParams = new URLSearchParams({
    cursorId,
  });

  if (status) {
    searchParams.set("status", status);
  }

  const res = await fetch(`/features/dashboard?${searchParams}`);

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  return res.json();
}
