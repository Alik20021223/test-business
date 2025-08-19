import React, { useRef, useState, useEffect } from 'react';
// import { X } from 'lucide-react';
import { cn } from '@lib/utils';
import ImageFile from '@assets/img-file.svg';
import BlockEdit from '@feature/block-edit';
import { LayoutType, SubmitImageTypeHeaderLayout } from '@entities/main/types';

type Variant = 'textImage' | 'imageText';

interface ImageTextEditorProps {
  headerLayout: LayoutType; // ориентация
  initialText?: string; // начальное значение текста (опц.)
  imageUrl?: string; // начальное изображение (опц.)
  onSubmit?: (data: SubmitImageTypeHeaderLayout) => void;
  className?: string;
  setHeaderLayout: (value: LayoutType) => void;
  onClose: () => void;
}

const ImageTextEditor: React.FC<ImageTextEditorProps> = ({
  headerLayout,
  initialText = '',
  imageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600',
  onSubmit,
  className,
  setHeaderLayout,
  onClose,
}) => {
  const variant: Variant = headerLayout === 'textImage' ? 'textImage' : 'imageText';

  // локальный текст
  const [text, setText] = useState(initialText);
  useEffect(() => setText(initialText), [initialText]);

  // локальная картинка
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | undefined>(imageUrl);
  const objectUrlRef = useRef<string | null>(null);

  const taRef = useRef<HTMLTextAreaElement>(null);

  function autoGrow() {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto'; // сброс корректнее, чем "0px"
    el.style.height = `${el.scrollHeight}px`; // подгоняем к контенту
  }

  useEffect(() => {
    autoGrow();
  }, []);

  useEffect(() => {
    // если поменяли внешнюю ссылку — сбросим file и objectUrl
    setImgUrl(imageUrl);
    setFile(null);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, [imageUrl]);

  // file input
  const fileRef = useRef<HTMLInputElement>(null);
  const pickFile = () => fileRef.current?.click();

  const handleFile = (f?: File) => {
    if (!f) return;
    // подчистим старый blob url
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
  };

  const submit = () => {
    onSubmit?.({ text, file, imageUrl: imgUrl, headerLayout });
  };

  return (
    <BlockEdit
      onSubmit={submit}
      valueText={text}
      headerLayout={headerLayout}
      setHeaderLayout={setHeaderLayout}
      onClose={onClose}
    >
      <div
        className={cn(
          'border-gradient flex overflow-hidden rounded-[25px] bg-white',
          variant === 'imageText' ? 'flex-col' : 'flex-col-reverse',
          className,
        )}
      >
        <input
          ref={fileRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(e) => handleFile(e.target.files?.[0] || undefined)}
        />

        {/* Зона изображения */}
        <div className={`${variant === 'textImage' ? 'px-[1px] pb-[1px]' : 'px-[1px] pt-[1px]'}`}>
          <div
            className={cn(
              'group relative h-[181px] w-full bg-[#F1F6FD] select-none',
              variant === 'textImage'
                ? 'rounded-t-[5px] rounded-b-[24px]'
                : 'rounded-t-[24px] rounded-b-[5px]',
            )}
            onClick={pickFile}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            role='button'
            aria-label='Upload image'
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && pickFile()}
          >
            {imgUrl ? (
              <>
                <img
                  src={imgUrl}
                  alt=''
                  className={cn(
                    'h-full w-full object-cover',
                    variant === 'textImage'
                      ? 'rounded-t-[5px] rounded-b-[24px]'
                      : 'rounded-t-[24px] rounded-b-[5px]',
                  )}
                />
                {/* <button
                  type='button'
                  onClick={clearImage}
                  className='absolute top-2 right-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70'
                  aria-label='Remove image'
                >
                  <X className='h-4 w-4' />
                </button> */}
              </>
            ) : (
              <div className='absolute inset-0 flex items-center justify-center'>
                <img
                  src={ImageFile as unknown as string}
                  alt='upload placeholder'
                  className='h-[77px] w-[121px] cursor-pointer opacity-90'
                />
              </div>
            )}
          </div>
        </div>

        {/* Текст — локально */}
        <div className='flex w-full px-[15px]'>
          <textarea
            ref={taRef}
            rows={1}
            className={cn(
              'flex min-h-[20px] w-[313px] resize-none justify-center text-sm leading-[140%] font-normal text-slate-700 outline-none',
              'placeholder:text-[#C4C4C4]',
              'break-words whitespace-pre-wrap', // переносы
              'max-h-64 overflow-hidden', // ограничение по высоте (опц.)
              variant === 'textImage' ? 'pt-4 pb-2' : 'pt-2 pb-4',
            )}
            placeholder='Write your idea!'
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              autoGrow();
            }}
          />
        </div>
      </div>
    </BlockEdit>
  );
};

export default ImageTextEditor;
