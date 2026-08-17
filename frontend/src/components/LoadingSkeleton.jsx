export default function LoadingSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="animate-pulse">
            <div className="mb-4 flex items-start justify-between">
              <div className="space-y-3">
                <div className="h-5 w-40 rounded bg-slate-300 dark:bg-slate-600"></div>
                <div className="h-4 w-64 rounded bg-slate-200 dark:bg-slate-700"></div>
              </div>

              <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            </div>

            <div className="mt-5 flex gap-3">
              <div className="h-9 w-20 rounded-lg bg-slate-300 dark:bg-slate-600"></div>
              <div className="h-9 w-20 rounded-lg bg-slate-300 dark:bg-slate-600"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}