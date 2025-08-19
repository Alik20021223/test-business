import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@lib/utils';
import BlockEdit from '@feature/block-edit';
import { LayoutType, SubmitImageTypeHeaderLayout } from '@entities/main/types';

interface OnlyTextEditorProps {
  headerLayout: LayoutType;
  initialText?: string;
  onSubmit?: (text: SubmitImageTypeHeaderLayout) => void;
  className?: string;
  setHeaderLayout: (value: LayoutType) => void;
  onClose: () => void;
}

const OnlyTextEditor: React.FC<OnlyTextEditorProps> = ({
  headerLayout,
  initialText = '',
  onSubmit,
  className,
  setHeaderLayout,
  onClose,
}) => {
  const [text, setText] = useState(initialText);
  const [py, setPy] = useState<number>(24);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const resizeObsRef = useRef<ResizeObserver | null>(null);

  useEffect(() => setText(initialText), [initialText]);

  const measureLinesAndPadding = () => {
    const el = textRef.current;
    if (!el) return;

    // 1) Авто-рост высоты
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;

    // 2) Подсчёт количества строк с учётом текущих padding'ов
    const cs = window.getComputedStyle(el);
    const lineHeight = parseFloat(cs.lineHeight || '0') || 0;
    const padTop = parseFloat(cs.paddingTop || '0') || 0;
    const padBottom = parseFloat(cs.paddingBottom || '0') || 0;

    const contentHeight = el.scrollHeight - padTop - padBottom;
    const lines = lineHeight > 0 ? Math.max(1, Math.round(contentHeight / lineHeight)) : 1;

    // 3) Установка нужного padding-y
    const nextPy = lines <= 1 ? 24 : 16;
    if (nextPy !== py) setPy(nextPy);
  };

  useEffect(() => {
    measureLinesAndPadding();
    // Подписка на ресайз textarea/контейнера — влияет на перенос строк
    if (textRef.current && !resizeObsRef.current) {
      resizeObsRef.current = new ResizeObserver(() => {
        measureLinesAndPadding();
      });
      resizeObsRef.current.observe(textRef.current);
      // На случай изменения родителя (ширина)
      if (textRef.current.parentElement) {
        resizeObsRef.current.observe(textRef.current.parentElement);
      }
    }
    return () => {
      if (resizeObsRef.current) {
        resizeObsRef.current.disconnect();
        resizeObsRef.current = null;
      }
    };
  }, [text, headerLayout]);

  const submit = () => onSubmit?.({ text, headerLayout });

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
          'border-gradient flex items-center justify-center overflow-hidden rounded-[25px] bg-white px-4',
          className,
        )}
      >
        <textarea
          ref={textRef}
          rows={1}
          className={cn(
            'flex min-h-[20px] w-[313px] w-full resize-none justify-center outline-none',
            'text-sm leading-[140%] font-normal text-slate-700',
            'placeholder:text-[#C4C4C4]',
            'max-h-64 overflow-hidden break-words whitespace-pre-wrap',
          )}
          style={{ paddingTop: py, paddingBottom: py }}
          placeholder='Write your idea!'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </BlockEdit>
  );
};

export default OnlyTextEditor;
