'use client';

import { memo, useEffect, useRef } from 'react';

import katex from 'katex';

type MathFormulaProps = {
  formula: string;
};

export const MathFormula = memo(function MathFormula({ formula }: MathFormulaProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    katex.render(formula, element, {
      displayMode: false,
      output: 'htmlAndMathml',
      throwOnError: false,
      trust: false
    });
  }, [formula]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 flex h-12 items-center justify-center px-3 text-muted text-xs">
      <span ref={elementRef} />
    </div>
  );
});
