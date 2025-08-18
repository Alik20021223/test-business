import { Button } from '@shared/shadcn/button';
import EllipsisImg from '@assets/ellips-dots-white.svg';
import Indicator from '@entities/main/ui/indicator';
import { useEffect, useRef, useState } from 'react';
import { useTextWrap } from '@app/hook/useTextWrap';

type ImageTextProps = {
  text: string;
  indicator?: string | null;
  positive?: boolean;
  setOpen: (value: boolean) => void;
};

const ImageText: React.FC<ImageTextProps> = ({ text, indicator, positive, setOpen }) => {
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

  return (
    <>
      <div className='relative w-full'>
        <Button
          type='button'
          onClick={() => setOpen(true)}
          className='pointer-events-auto absolute top-[12px] right-3 z-30 h-auto rounded-[11px] bg-[#8585854D] px-1.5 py-2.5 backdrop-blur-[blur(4.400000095367432px)]'
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

        <div className='h-[181px] px-[1px] pt-[1px]'>
          <img
            src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600'
            alt='upload placeholder'
            className='h-full w-full cursor-pointer rounded-t-[24px] rounded-b-[5px] object-cover opacity-90'
          />
        </div>

        <div className='relative z-10 px-4 pt-2 pb-4'>
          <div
            ref={textRef}
            className='wrap-text w-[313px] text-sm leading-[140%] font-normal text-slate-700'
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
    </>
  );
};

export default ImageText;
