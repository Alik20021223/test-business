import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTextWrap } from '@app/hook/useTextWrap';
import Indicator from '@entities/main/ui/indicator';
import EllipsisImg from '@assets/ellips-dots.svg';
import { Button } from '@shadcn/button';

type TextOnlyProps = {
  text: string;
  indicator?: string | null;
  positive?: boolean;
  setOpen: (value: boolean) => void;
};

const TextOnlyBlock: React.FC<TextOnlyProps> = ({
  text,
  indicator = null,
  positive = false,
  setOpen,
}) => {
  const INDICATOR_GAP = 8;

  // измеряем ФАКТИЧЕСКУЮ ширину индикатора
  const indRef = useRef<HTMLDivElement | null>(null);
  const [indWidth, setIndWidth] = useState(0);

  useEffect(() => {
    const el = indRef.current;
    if (!el) {
      setIndWidth(0);
      return;
    }
    const measure = () => setIndWidth(el.offsetWidth || 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [indicator]);

  // ВАЖНО: ref вешаем на узел, где ТОЛЬКО текст. Спейсер будет соседним элементом.
  const [calc, textRef] = useTextWrap(text, [indWidth], {
    indicatorWidth: indicator == null ? 0 : indWidth,
    indicatorGap: indicator == null ? 0 : INDICATOR_GAP,
  });

  // Паддинги по ТЗ + corner-case для одной строки с «падением» индикатора
  const py = useMemo(() => {
    const lines = calc.lines.length;
    const base = lines === 1 ? 24 : 16;
    const isCorner = lines === 1 && calc.indicatorShouldDrop && indicator != null;
    return isCorner ? 16 : base;
  }, [calc.lines.length, calc.indicatorShouldDrop, indicator]);

  return (
    <div className='relative isolate px-4'>
      {/* Кнопка с троеточием — поверх всего */}
      <Button
        type='button'
        onClick={() => setOpen(true)}
        className='pointer-events-auto absolute top-[9px] right-4 z-30 h-auto p-0'
        aria-label='More'
      >
        <img src={EllipsisImg} alt='' />
      </Button>

      {indicator != null && (
        <Indicator
          ref={indRef}
          value={indicator}
          className='absolute right-3 z-0'
          style={{ bottom: 10 }}
          positive={positive}
        />
      )}

      {/* Контентная колонка */}
      <div className='relative z-10' style={{ paddingTop: py, paddingBottom: py }}>
        <div
          ref={textRef}
          className='wrap-text w-[314px] text-sm leading-[140%] font-normal text-slate-700'
        >
          {text}
        </div>

        {indicator != null && calc.indicatorShouldDrop && (
          <div
            aria-hidden='true'
            className='pointer-events-none select-none'
            style={{ height: calc.lineHeight }}
          />
        )}
      </div>
    </div>
  );
};

export default TextOnlyBlock;
