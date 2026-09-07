export default function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && <div className="flex justify-between text-sm font-semibold mb-1"><span>{label}</span><span>{value}%</span></div>}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${Math.min(100, value)}%` }} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} />
      </div>
    </div>
  )
}
