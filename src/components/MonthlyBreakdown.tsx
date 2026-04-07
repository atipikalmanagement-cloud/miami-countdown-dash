interface MonthData {
  label: string;
  current: number;
  goal: number;
}

interface MonthlyBreakdownProps {
  months: MonthData[];
}

const MonthlyBreakdown = ({ months }: MonthlyBreakdownProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full">
      {months.map((month) => {
        const percent = Math.min((month.current / month.goal) * 100, 100);
        const isComplete = month.current >= month.goal;
        return (
          <div
            key={month.label}
            className={`rounded-xl border p-4 sm:p-5 flex flex-col items-center gap-3 transition-all ${
              isComplete ? "border-primary/50 card-glow bg-primary/5" : "border-border bg-secondary"
            }`}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {month.label}
            </span>
            <span className="text-3xl sm:text-4xl font-black gold-text">{month.current}</span>
            <div className="w-full bg-background rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full gold-gradient transition-all duration-700 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {month.current}/{month.goal} — {Math.round(percent)}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyBreakdown;
