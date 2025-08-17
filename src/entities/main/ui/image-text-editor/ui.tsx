import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@lib/utils';
import ImageFile from '@assets/img-file.png';
import BlockEdit from '@feature/block-edit';
import { LayoutType } from '@entities/main/types';

type Variant = 'textImage' | 'imageText';

interface ImageTextEditorProps {
  headerLayout: LayoutType; // ориентация
  initialText?: string; // начальное значение текста (опц.)
  imageUrl?: string; // начальное изображение (опц.)
  onSubmit?: (data: {
    // опц. — если нужно забрать результат наружу
    text: string;
    file?: File | null;
    imageUrl?: string; // фактический url (blob или внешний)
  }) => void;
  className?: string;
  setHeaderLayout: (value: LayoutType) => void;
  onClose: () => void;
}

const ImageTextEditor: React.FC<ImageTextEditorProps> = ({
  headerLayout,
  initialText = '',
  imageUrl,
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

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgUrl(undefined);
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const submit = () => {
    onSubmit?.({ text, file, imageUrl: imgUrl });
  };

  return (
    <BlockEdit
      onSubmit={submit}
      valueText={text}
      initialText={initialText}
      headerLayout={headerLayout}
      setHeaderLayout={setHeaderLayout}
      onClose={onClose}
    >
      <div
        className={cn(
          'border-gradient flex overflow-hidden rounded-[25px] bg-white',
          variant === 'textImage' ? 'flex-col' : 'flex-col-reverse',
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
        <div
          className={cn(
            'group relative h-[181px] w-full bg-[#F1F6FD] select-none',
            variant === 'textImage' ? 'rounded-t-[25px]' : 'rounded-b-[25px]',
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
              <img src={imgUrl} alt='' className='h-full w-full object-cover' />
              <button
                type='button'
                onClick={clearImage}
                className='absolute top-2 right-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70'
                aria-label='Remove image'
              >
                <X className='h-4 w-4' />
              </button>
            </>
          ) : (
            <div className='absolute inset-0 flex items-center justify-center'>
              <img
                src={ImageFile as unknown as string}
                alt='upload placeholder'
                className='h-auto w-40 opacity-90'
              />
            </div>
          )}
        </div>

        {/* Текст — локально */}
        <div className='flex w-full'>
          <textarea
            ref={taRef}
            rows={1}
            className={cn(
              'min-h-[20px] w-full resize-none px-4 text-sm leading-[140%] font-normal text-slate-700 outline-none',
              'placeholder:text-[#C4C4C4]',
              'break-words whitespace-pre-wrap', // переносы
              'max-h-64 overflow-hidden', // ограничение по высоте (опц.)
              variant === 'textImage' ? 'rounded-b-[25px] pt-2 pb-4' : 'rounded-t-[25px] pt-4 pb-2',
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
