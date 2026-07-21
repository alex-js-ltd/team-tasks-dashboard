"use client";

import { useOptimistic, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "../../../comps/ui/select";

const STATUSES = [
  { value: "ALL", label: "All statuses" },
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "DONE", label: "Done" },
] as const;

type StatusFilterValue = (typeof STATUSES)[number]["value"];

function isStatusFilterValue(value: string | null): value is StatusFilterValue {
  return STATUSES.some((status) => status.value === value);
}

export function StatusFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const statusParam = searchParams.get("status");

  const currentStatus: StatusFilterValue = isStatusFilterValue(statusParam)
    ? statusParam
    : "ALL";

  const [optimisticStatus, setOptimisticStatus] = useOptimistic<
    StatusFilterValue,
    StatusFilterValue
  >(currentStatus, (_, nextStatus) => nextStatus);

  function handleStatusChange(value: string) {
    if (!isStatusFilterValue(value)) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (value === "ALL") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    // Useful if you add pagination later.
    params.delete("page");

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      setOptimisticStatus(value);
      router.replace(nextUrl, { scroll: false });
    });
  }

  return (
    <SelectRoot
      value={optimisticStatus}
      disabled={isPending}
      onValueChange={handleStatusChange}
    >
      <SelectTrigger
        id="status"
        aria-label="Filter tasks by status"
        className="inline-flex min-w-44 items-center justify-between gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none transition hover:border-zinc-700 focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-wait disabled:opacity-70"
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          sideOffset={6}
          className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-1 text-zinc-200 shadow-2xl shadow-black/40"
        >
          <SelectViewport>
            {STATUSES.map((status) => (
              <SelectItem
                key={status.value}
                value={status.value}
                className="relative flex cursor-default select-none items-center rounded-lg py-2 pl-8 pr-3 text-sm outline-none data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white"
              >
                <SelectItemIndicator className="absolute left-2.5 flex size-4 items-center justify-center"></SelectItemIndicator>

                <SelectItemText>{status.label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  );
}
