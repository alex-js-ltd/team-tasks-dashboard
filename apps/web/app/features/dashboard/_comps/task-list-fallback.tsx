import { Loading } from "../../../comps/ui/loading";

export function TaskListFallback({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <Loading
          className="min-h-56 w-full rounded-2xl border border-zinc-800/80"
          key={i}
          i={i}
        />
      ))}
    </div>
  );
}
