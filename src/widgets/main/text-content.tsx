import TextOnlyBlock from '@entities/main/ui/text-block';
import TextWithImageBlock from '@entities/main/ui/left-image-text';
import ImageText from '@entities/main/ui/image-text';
import TextImage from '@entities/main/ui/text-image';

import { useMainStore } from '@entities/main/store';
import { useShallow } from 'zustand/shallow';
import { useState } from 'react';
import { LayoutType, SubmitImageTypeHeaderLayout } from '@entities/main/types';
import { cn } from '@shared/lib/utils';
import RenderEditorByLayout from './renderEditorByLayout';

const TextContent = () => {
  const { textA, indicatorA, changeIndicatorA, setTextA } = useMainStore(
    useShallow((s) => ({
      textA: s.textA,
      setTextA: s.setTextA,
      indicatorA: s.indicatorA,
      changeIndicatorA: s.changeIndicatorA,
    })),
  );

  // ✅ разделяем состояние
  const [viewLayout, setViewLayout] = useState<LayoutType>('onlyText'); // то, что показываем
  const [draftLayout, setDraftLayout] = useState<LayoutType>(viewLayout); // то, чем крутит редактор

  const [openEdit, setOpenEdit] = useState(false);

  const openEditor = () => {
    setDraftLayout(viewLayout);
    setOpenEdit(true);
  };

  const handleSubmit = (data: SubmitImageTypeHeaderLayout) => {
    setTextA(data.text);
    const next = data.headerLayout ?? draftLayout;
    setViewLayout(next);
    setOpenEdit(false);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const renderViewByLayout = (layout: LayoutType) => {
    switch (layout) {
      case 'onlyText':
        return (
          <TextOnlyBlock
            setOpen={(v) => (v ? openEditor() : setOpenEdit(false))}
            text={textA}
            indicator={indicatorA.n}
            positive={indicatorA.positive}
          />
        );
      case 'imageText':
        return (
          <ImageText
            setOpen={(v) => (v ? openEditor() : setOpenEdit(false))}
            text={textA}
            indicator={indicatorA.n}
            positive={indicatorA.positive}
          />
        );
      case 'textImage':
        return (
          <TextImage
            setOpen={(v) => (v ? openEditor() : setOpenEdit(false))}
            text={textA}
            indicator={indicatorA.n}
            positive={indicatorA.positive}
          />
        );
      case 'imgLeftText':
        return (
          <TextWithImageBlock
            setOpen={(v) => (v ? openEditor() : setOpenEdit(false))}
            text={textA}
            indicator={indicatorA.n}
            positive={indicatorA.positive}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='w-full space-y-4'>
      <label className='block text-xs text-slate-500'>Индикатор</label>
      <input
        type='text'
        value={indicatorA.n ?? ''}
        onChange={(e) => changeIndicatorA(e.target.value)}
        className='w-full rounded border p-2 text-sm'
        placeholder='Индикатор (0-9999 или +n)'
      />

      <div className={cn('shadow-block w-[345px] rounded-[25px] bg-white')}>
        {openEdit ? (
          <RenderEditorByLayout
            layout={draftLayout}
            setHeaderLayout={setDraftLayout}
            value={textA}
            onSubmit={handleSubmit}
            onClose={handleClose}
          />
        ) : (
          renderViewByLayout(viewLayout)
        )}
      </div>
    </div>
  );
};

export default TextContent;
