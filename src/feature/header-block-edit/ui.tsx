import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover';
import OnlyTextIcon from '@assets/only-text-icon.svg';
import TextImageIcon from '@assets/text-image-icon.svg';
import ImageTextIcon from '@assets/image-text-icon.svg';
import ImgLeftTextIcon from '@assets/image-left-text-icon.svg';
import { cn } from '@lib/utils';
import { Button } from '@shadcn/button';
import { ArrowUp, X } from 'lucide-react';
import { LayoutType } from '@entities/main/types';

const ICONS: Record<LayoutType, string> = {
  onlyText: OnlyTextIcon as unknown as string,
  textImage: TextImageIcon as unknown as string,
  imageText: ImageTextIcon as unknown as string,
  imgLeftText: ImgLeftTextIcon as unknown as string,
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
        'cursor-pointer transition-colors',
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
    <header className='flex items-center justify-between px-4 pt-4'>
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
              className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-[7px] border border-[#C6C6C6]'
              aria-label='Choose layout'
            >
              <img
                src={ICONS[headerLayout]}
                alt='current-layout'
                className={cn(
                  'h-[60%] object-contain',
                  headerLayout === 'imgLeftText' ? 'w-[17px]' : 'w-[60%]',
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
              className='rounded-l-[10px] px-[13px] py-[17px]'
            />
            <Option
              v='textImage'
              alt='Текст над картинкой'
              className='border-x-[0.5px] border-[#C6C6C6] p-[13px]'
            />
            <Option
              v='imageText'
              alt='Заголовок над текстом'
              className='border-r-[0.5px] border-[#C6C6C6] p-[13px]'
            />
            <Option
              v='imgLeftText'
              alt='Картинка слева, текст справа'
              className='rounded-r-[10px] px-[6px] py-[18px]'
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={cn(
            'h-6 w-6 rounded-[21px] text-white',
            !canSubmit
              ? 'cursor-not-allowed bg-[#DCDCDC] disabled:opacity-100'
              : 'bg-gradient-btn-active',
          )}
        >
          <ArrowUp className='stroke-[1.5px] text-white' />
        </Button>
      </div>
    </header>
  );
};

export default HeaderBlock;
