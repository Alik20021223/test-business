import React, { useRef, useState, useEffect } from 'react';
// import { X } from 'lucide-react';
import { cn } from '@lib/utils';
import ImageFile from '@assets/img-file.svg';
import BlockEdit from '@feature/block-edit';
import { LayoutType, SubmitImageTypeHeaderLayout } from '@entities/main/types';

interface LeftImageTextEditorProps {
  headerLayout: LayoutType;
  initialText?: string;
  imageUrl?: string;
  onSubmit?: (data: SubmitImageTypeHeaderLayout) => void;
  className?: string;
  setHeaderLayout: (value: LayoutType) => void;
  onClose: () => void;
}

const TILE = 58; // высота/ширина плитки с картинкой как в режиме просмотра

const LeftImageTextEditor: React.FC<LeftImageTextEditorProps> = ({
  headerLayout,
  initialText = '',
  imageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600',
  onSubmit,
  className,
  setHeaderLayout,
  onClose,
}) => {
  const [text, setText] = useState(initialText);
  useEffect(() => setText(initialText), [initialText]);

  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | undefined>(imageUrl);
  const objectUrlRef = useRef<string | null>(null);

  const taRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // кол-во строк (для центровки при 1-2 строках)
  const [lines, setLines] = useState(1);

  const autoGrowAndMeasure = () => {
    const el = taRef.current;
    if (!el) return;
    // авто-высота
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
    // измеряем строки
    const lh = parseFloat(getComputedStyle(el).lineHeight || '0') || 1;
    const l = Math.max(1, Math.round(el.scrollHeight / lh));
    setLines(l);
  };

  useEffect(() => {
    autoGrowAndMeasure();
    const onResize = () => autoGrowAndMeasure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setImgUrl(imageUrl);
    setFile(null);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, [imageUrl]);

  const openPicker = () => fileRef.current?.click();

  const handleFile = (f?: File) => {
    if (!f) return;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    const url = URL.createObjectURL(f);
    objectUrlRef.current = url;
    setImgUrl(url);
    setFile(f);
  };

//   const clearImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setImgUrl(undefined);
//     setFile(null);
//     if (fileRef.current) fileRef.current.value = '';
//     if (objectUrlRef.current) {
//       URL.revokeObjectURL(objectUrlRef.current);
//       objectUrlRef.current = null;
//     }
//   };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
    taRef.current?.focus();
  };

  const submit = () => onSubmit?.({ text, file, imageUrl: imgUrl, headerLayout: headerLayout });

  const twoLinesOrLess = lines <= 2;

  return (
    <BlockEdit
      onSubmit={submit}
      valueText={text}
      headerLayout={headerLayout}
      setHeaderLayout={setHeaderLayout}
      onClose={onClose}
    >
      <div className={cn('border-gradient overflow-hidden rounded-[25px] bg-white', className)}>
        <div
          onClick={() => taRef.current?.focus()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          role='group'
          tabIndex={0}
          className='px-3 py-3'
        >
          <div className={cn('flex gap-3')}>
            {/* Плитка изображения слева */}
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                openPicker();
              }}
              className='relative shrink-0 overflow-hidden rounded-[14px] bg-[#EEF5FF]'
              style={{ width: TILE, height: TILE }}
              aria-label='Upload image'
            >
              {imgUrl ? (
                <>
                  <img src={imgUrl} alt='' className='h-full w-full object-cover' />
                  {/* <span
                    onClick={clearImage}
                    className='absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white'
                    role='button'
                    aria-label='Remove'
                  >
                    <X className='h-3 w-3' />
                  </span> */}
                </>
              ) : (
                <div className='flex h-full w-full items-center justify-center'>
                  <img
                    src={ImageFile as unknown as string}
                    alt='placeholder'
                    className='h-[24px] w-[41px] object-contain opacity-90'
                  />
                </div>
              )}
            </button>

            {/* Обёртка текста — центр по вертикали при 1–2 строках */}
            <div
              className={cn(twoLinesOrLess ? 'flex items-center' : '', 'w-[246px]')}
              style={{ minHeight: twoLinesOrLess ? TILE : undefined }}
            >
              <textarea
                ref={taRef}
                rows={1}
                className={cn(
                  'block w-full resize-none bg-transparent outline-none ',
                  'placeholder:text-[#C4C4C4]',
                  'text-sm leading-[140%] font-normal text-slate-700',
                )}
                placeholder='Write your idea!'
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  autoGrowAndMeasure();
                }}
              />
            </div>
          </div>
        </div>

        <input
          ref={fileRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(e) => handleFile(e.target.files?.[0] || undefined)}
        />
      </div>
    </BlockEdit>
  );
};

export default LeftImageTextEditor;
