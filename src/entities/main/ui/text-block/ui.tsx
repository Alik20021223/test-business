import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@lib/utils';
import { useTextWrap } from '@app/hook/useTextWrap';
import Indicator from '@entities/main/ui/indicator';
import EllipsisImg from '@assets/ellips-dots.svg';

type TextOnlyProps = {
    text: string;
    indicator?: string | null;
    className?: string;
    positive?: boolean;
};

const TextOnlyBlock: React.FC<TextOnlyProps> = ({
    text,
    indicator = null,
    className,
    positive = false,
}) => {
    const INDICATOR_GAP = 8;

    // измеряем ФАКТИЧЕСКУЮ ширину индикатора
    const indRef = useRef<HTMLDivElement | null>(null);
    const [indWidth, setIndWidth] = useState(0);

    useEffect(() => {
        const el = indRef.current;
        if (!el) { setIndWidth(0); return; }
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
        <div className={cn('w-[345px] rounded-[25px] bg-white shadow-block px-4 relative', className)}>
            {/* Кнопка с троеточием */}
            <button className="absolute top-[9px] right-4">
                <img src={EllipsisImg} alt="ellipsis-dots" />
            </button>

            {/* Индикатор (его ширину меряем через ref) */}
            {indicator != null && (
                <Indicator
                    ref={indRef}
                    value={indicator}
                    className="absolute right-3"
                    style={{ bottom: 10 }}
                    positive={positive}
                />
            )}

            {/* Контентная колонка: внутрь кладём ТОЛЬКО текст; спейсер — соседний блок */}
            <div className="relative" style={{ paddingTop: py, paddingBottom: py }}>
                <div ref={textRef} className="text-sm w-[314px] font-normal tracking-[-0.01em] text-slate-700 wrap-text leading-[140%] tracking-[0px]">
                    {text}
                </div>

                {/* «Пустая строка» как отдельный соседний элемент — НЕ внутри textRef */}
                {indicator != null && calc.indicatorShouldDrop && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none select-none"
                        style={{ height: calc.lineHeight }}
                    />
                )}
            </div>
        </div>
    );
};

export default TextOnlyBlock;
