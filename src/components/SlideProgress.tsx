interface SlideProgressProps {
  current: number;
  total: number;
}

const SlideProgress = ({ current, total }: SlideProgressProps) => {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-muted-foreground">
          Slide {current + 1} / {total}
        </span>
        <span className="text-sm font-bold text-primary">
          {Math.round(percent)}%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default SlideProgress;
