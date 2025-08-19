import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover';
import OnlyTextIcon from '@assets/only-text-icon.svg';
import TextImageIcon from '@assets/text-image-icon.svg';
import ImageTextIcon from '@assets/image-text-icon.svg';
import ImgLeftTextIcon from '@assets/image-left-text-icon.svg';
import OnlyTextMiniIcon from '@assets/only-text-mini-icon.svg';
import TextImageMiniIcon from '@assets/text-image-mini-icon.svg';
import ImageTextMiniIcon from '@assets/img-text-mini-icon.svg';
import ImgLeftTextMiniIcon from '@assets/img-left-text-mini-icon.svg';
import ArrowUp from '@assets/arrow-up.svg';
import { cn } from '@lib/utils';
import { Button } from '@shadcn/button';
import { X } from 'lucide-react';
import { LayoutType } from '@entities/main/types';

const ICONS: Record<LayoutType, string> = {
  onlyText: OnlyTextIcon as unknown as string,
  textImage: ImageTextIcon as unknown as string,
  imageText: TextImageIcon as unknown as string,
  imgLeftText: ImgLeftTextIcon as unknown as string,
};

const MINIICONS: Record<LayoutType, string> = {
  onlyText: OnlyTextMiniIcon as unknown as string,
  textImage: TextImageMiniIcon as unknown as string,
  imageText: ImageTextMiniIcon as unknown as string,
  imgLeftText: ImgLeftTextMiniIcon as unknown as string,
};

interface HeaderBlockProps {
  onSubmit: () => void;
  headerLayout: LayoutType;
  setHeaderLayout: (value: LayoutType) => void;
  onClose: () => void;
  canSubmit: boolean;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({
  onSubmit,
  headerLayout,
  setHeaderLayout,
  onClose,
  canSubmit,
}) => {
  const [open, setOpen] = React.useState(false);

  const select = (v: LayoutType) => {
    console.log(v);

    setHeaderLayout(v);
    setOpen(false);
  };

  const Option: React.FC<{
    v: LayoutType;
    className?: string;
    alt: string;
  }> = ({ v, className, alt }) => (
    <button
      type='button'
      onClick={() => select(v)}
      className={[
        'cursor-pointer',
        'hover:bg-[#f5f4f4]',
        headerLayout === v ? 'bg-[#E4E4E4]' : '',
        className || '',
      ].join(' ')}
      aria-pressed={headerLayout === v}
      title={alt}
    >
      <img src={ICONS[v]} alt={alt} />
    </button>
  );

  return (
    <header className='w-full p-4'>
      <div className='flex h-6 w-[313px] items-center justify-between'>
        <Button
          type='button'
          onClick={onClose}
          aria-label='Close'
          className='bg-transparent p-0 px-0! shadow-none'
        >
          <X className='h-5! w-5! stroke-[1.3px] text-[#9B9B9B]' />
        </Button>

        <div className='flex gap-6'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type='button'
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-[5px] border-[0.5px] border-[#818181]'
                aria-label='Choose layout'
              >
                <img
                  src={MINIICONS[headerLayout]}
                  alt='current-layout'
                  className={cn(
                    'object-contain',
                    // headerLayout === 'imgLeftText' ? 'w-[17px]' : 'w-[60%]',
                  )}
                />
              </button>
            </PopoverTrigger>

            <PopoverContent
              side='top'
              align='end'
              sideOffset={4}
              className='flex h-fit w-fit items-center rounded-[10px] border border-[#C6C6C6] bg-white p-0'
            >
              <Option
                v='onlyText'
                alt='Только текст'
                className='flex h-12 w-12 items-center justify-center rounded-l-[10px]'
              />
              <Option
                v='textImage'
                alt='Текст над картинкой'
                className='flex h-12 w-12 items-center justify-center border-x-[0.5px] border-[#C6C6C6]'
              />
              <Option
                v='imageText'
                alt='Заголовок над текстом'
                className='flex h-12 w-12 items-center justify-center border-r-[0.5px] border-[#C6C6C6]'
              />

              <Option
                v='imgLeftText'
                alt='Картинка слева, текст справа'
                className='flex h-12 w-12 items-center justify-center rounded-r-[10px]'
              />
            </PopoverContent>
          </Popover>

          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className={cn(
              'flex h-6 w-6 cursor-pointer items-center justify-center rounded-[21px] p-0 text-white',
              !canSubmit
                ? 'cursor-not-allowed bg-[#DCDCDC] disabled:opacity-100'
                : 'bg-gradient-btn-active',
            )}
          >
            <img src={ArrowUp} alt='arrow-up' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBlock;
