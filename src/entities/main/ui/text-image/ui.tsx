import { Button } from '@shared/shadcn/button';
import EllipsisImg from '@assets/ellips-dots.svg';
import Indicator from '@entities/main/ui/indicator';
// import { useEffect, useRef, useState } from "react";
// import { useTextWrap } from "@app/hook/useTextWrap";

type TextImageProps = {
  text: string;
  indicator?: string | null;
  positive?: boolean;
  setOpen: (value: boolean) => void;
};

const TextImage: React.FC<TextImageProps> = ({ text, indicator, positive, setOpen }) => {
  return (
    <>
      <div className='relative w-full'>
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
            // ref={indRef}
            value={indicator}
            className='absolute right-3 z-10 bg-[#3F3F3F66]! text-white! backdrop-blur-[blur(9px)]!'
            style={{ bottom: 10 }}
            positive={positive}
          />
        )}

        <div className='relative z-10 px-4 pt-4 pb-2'>
          <div
            // ref={textRef}
            className='wrap-text w-[313px] text-sm leading-[140%] font-normal text-slate-700'
          >
            {text}
          </div>
        </div>

        <div className='h-[181px] px-[1px] pb-[1px]'>
          <img
            src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600'
            alt='upload placeholder'
            className='h-full w-full cursor-pointer rounded-t-[5px] rounded-b-[24px] object-cover opacity-90'
          />
        </div>
      </div>
    </>
  );
};

export default TextImage;
