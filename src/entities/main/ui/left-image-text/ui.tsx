import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@lib/utils';
import { useTextWrap } from '@app/hook/useTextWrap';
import Indicator from '@entities/main/ui/indicator';
import EllipsisImg from '@assets/ellips-dots.svg';

type TextWithImageProps = {
  text: string;
  indicator?: string | null;
  positive?: boolean;
  setOpen: (value: boolean) => void;
};

const TextWithImageBlock: React.FC<TextWithImageProps> = ({
  text,
  indicator = null,
  positive = false,
  setOpen,
}) => {
  // const { toggleEditor, } = useMainStore(
  //     useShallow((s) => ({
  //         toggleEditor: s.toggleEditor,
  //     }))
  // );

  // Геометрия
  const IMG_W = 59;
  const IMG_H = 58;
  const INDICATOR_GAP = 8;

  // Меряем фактическую ширину индикатора (нужно для корректной проверки "влезает ли в последнюю строку")
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
    <>
      <div className='relative isolate px-4' style={{ paddingTop: py, paddingBottom: py }}>
        <button className='absolute top-[9px] right-4' onClick={() => setOpen(true)}>
          <img src={EllipsisImg} alt='ellipsis-dots' />
        </button>

        <div className='flex gap-2'>
          <img
            src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600'
            alt=''
            width={IMG_W}
            height={IMG_H}
            className='shrink-0 rounded-[13px] object-cover'
            style={{ width: IMG_W, height: IMG_H }}
          />

          {/* Колонка с текстом и (при необходимости) спейсером строки */}
          <div
            className={cn(twoLinesOrLess ? 'flex items-center' : '')}
            style={{ minHeight: twoLinesOrLess ? IMG_H : undefined }}
          >
            {/* ВАЖНО: внутри — вертикальная колонка, чтобы спейсер был ПОД текстом */}
            <div className='flex w-[246px] flex-col'>
              <div
                ref={textRef}
                className='wrap-text text-sm leading-[140%] font-normal tracking-[-0.01em] tracking-[0px] text-slate-700'
                style={{ overflowWrap: 'anywhere' }}
              >
                {text}
              </div>

              {/* Спейсер "пустой строки" — вне textRef, чтобы не ломать измерение строк */}
              {indicator != null && calc.indicatorShouldDrop && (
                <div
                  aria-hidden='true'
                  className='pointer-events-none select-none'
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
            className='absolute right-3'
            style={{ bottom: 10 }}
            positive={positive}
          />
        )}
      </div>
    </>
  );
};

export default TextWithImageBlock;
