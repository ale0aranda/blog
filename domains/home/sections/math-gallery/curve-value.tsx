type CurveValueProps = {
  visible: boolean;
  value: string;
};

export function CurveValue({ visible, value }: CurveValueProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        'pointer-events-none absolute top-3 right-3',
        'rounded-md bg-bg/90 px-2 py-1',
        'font-mono text-muted text-xs tabular-nums',
        'transition-opacity duration-200 motion-reduce:transition-none',
        visible ? 'opacity-100' : 'opacity-0'
      ].join(' ')}
    >
      {value}
    </span>
  );
}
