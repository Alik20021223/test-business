import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@lib/utils';
import { useTextWrap } from '@app/hook/useTextWrap';
import Indicator from '@entities/main/ui/indicator';
import EllipsisImg from '@assets/ellips-dots.svg';

type TextWithImageProps = {
    text: string;
    imageSrc: string;
    indicator?: string | null;
    positive?: boolean;
    className?: string;
};

const TextWithImageBlock: React.FC<TextWithImageProps> = ({
    text,
    imageSrc,
    indicator = null,
    positive = false,
    className,
}) => {
    // Геометрия
    const IMG_W = 59;
    const IMG_H = 58;
    const INDICATOR_GAP = 8;

    // Меряем фактическую ширину индикатора (нужно для корректной проверки "влезает ли в последнюю строку")
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

    // ref вешаем на ЭЛЕМЕНТ С ТЕКСТОМ (без спейсера!), чтобы getClientRects не видел дополнительную "строку"
    const [calc, textRef] = useTextWrap(text, [indWidth], {
        indicatorWidth: indicator == null ? 0 : indWidth,
        indicatorGap: indicator == null ? 0 : INDICATOR_GAP,
    });

    // Для "текст + картинка" паддинги всегда 16
    const py = 16;

    // 1–2 строки — вертикально центрируем, 3+ — выравниваем по верху
    const twoLinesOrLess = calc.lines.length <= 2;

    return (
        <div
            className={cn(
                'relative w-[345px] rounded-[25px] bg-white shadow-block px-4',
                className
            )}
            style={{ paddingTop: py, paddingBottom: py }}
        >
            {/* Кнопка с троеточием */}
            <button className="absolute top-[9px] right-4">
                <img src={EllipsisImg} alt="ellipsis-dots" />
            </button>

            <div className="flex gap-2">
                <img
                    src={imageSrc}
                    alt=""
                    width={IMG_W}
                    height={IMG_H}
                    className="shrink-0 rounded-[13px] object-cover"
                    style={{ width: IMG_W, height: IMG_H }}
                />

                {/* Колонка с текстом и (при необходимости) спейсером строки */}
                <div
                    className={cn(twoLinesOrLess ? "flex items-center" : "")}
                    style={{ minHeight: twoLinesOrLess ? IMG_H : undefined }}
                >
                    {/* ВАЖНО: внутри — вертикальная колонка, чтобы спейсер был ПОД текстом */}
                    <div className="flex flex-col w-[246px]">
                        <div
                            ref={textRef}
                            className="text-sm font-normal tracking-[-0.01em] text-slate-700 wrap-text leading-[140%] tracking-[0px]"
                            style={{ overflowWrap: "anywhere" }}
                        >
                            {text}
                        </div>

                        {/* Спейсер "пустой строки" — вне textRef, чтобы не ломать измерение строк */}
                        {indicator != null && calc.indicatorShouldDrop && (
                            <div
                                aria-hidden="true"
                                className="pointer-events-none select-none"
                                style={{ height: calc.lineHeight }}
                            />
                        )}
                    </div>
                </div>

            </div>

            {/* Индикатор справа снизу. Его ширину меряем через ref выше */}
            {indicator != null && (
                <Indicator
                    ref={indRef}
                    value={indicator}
                    className="absolute right-3"
                    style={{ bottom: 10 }}
                    positive={positive}
                />
            )}
        </div>
    );
};

export default TextWithImageBlock;
