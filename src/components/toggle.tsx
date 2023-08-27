import clsx from "clsx"

export function Toggle({
  active,
  onChange,
  size = "sm"
}: {
  active: boolean
  onChange: (active: boolean) => void
  size?: "sm" | "lg"
}) {
  return (
    <div className="inline-flex items-center text-xs">
      <div
        className={clsx(
          "relative p-1 rounded-full shadow-inner cursor-pointer",
          size === "lg" ? "w-14" : "w-10",
          active ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
        )}
        onClick={() => onChange(!active)}>
        <div
          className={clsx(
            size === "lg" ? "w-6 h-6" : "w-4 h-4",
            "bg-white border border-solid rounded-full shadow-lg border-slate-300",
            active ? "transform translate-x-full" : ""
          )}
        />
      </div>
    </div>
  )
}
