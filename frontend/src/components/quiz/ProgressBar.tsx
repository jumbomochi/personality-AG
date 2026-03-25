
interface ProgressBarProps {
  currentObject: number;
  totalObjects: number;
}

export function ProgressBar({ currentObject, totalObjects }: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (currentObject / totalObjects) * 100));

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Progress
        </span>
        <span className="text-sm font-medium text-slate-700 font-mono">
          {currentObject} / {totalObjects}
        </span>
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
