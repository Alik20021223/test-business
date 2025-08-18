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
  useEffect(() => setText(initialText), [initialText]);

  const taRef = useRef<HTMLTextAreaElement>(null);
  const autoGrow = () => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };
  useEffect(() => {
    autoGrow();
  }, []);

  const submit = () => onSubmit?.({ text: text, headerLayout: headerLayout });

  return (
    <BlockEdit
      onSubmit={submit}
      valueText={text}
      headerLayout={headerLayout}
      setHeaderLayout={setHeaderLayout}
      onClose={onClose}
    >
      <div className={cn('border-gradient overflow-hidden rounded-[25px] bg-white', className)}>
        <textarea
          ref={taRef}
          rows={1}
          className={cn(
            'block min-h-[20px] w-full resize-none px-4 py-4 outline-none',
            'text-sm leading-[140%] font-normal text-slate-700',
            'placeholder:text-[#C4C4C4]',
            'max-h-64 overflow-hidden break-words whitespace-pre-wrap',
          )}
          placeholder='Write your idea!'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            autoGrow();
          }}
        />
      </div>
    </BlockEdit>
  );
};

export default OnlyTextEditor;
