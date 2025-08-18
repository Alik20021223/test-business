import TextOnlyBlock from '@entities/main/ui/text-block';
import TextWithImageBlock from '@/entities/main/ui/left-image-text';
import { useMainStore } from '@entities/main/store';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { LayoutType, SubmitImageTypeHeaderLayout } from '@entities/main/types';
import { cn } from '@shared/lib/utils';
import RenderEditorByLayout from './renderEditorByLayout';
import ImageText from '@entities/main/ui/image-text';
import TextImage from '@entities/main/ui/text-image';

const TextLeftImageContent = () => {
  const { textC, indicatorC, changeIndicatorC, setTextC } = useMainStore(
    useShallow((s) => ({
      setTextC: s.setTextC,
      textC: s.textC,
      indicatorC: s.indicatorC,
      changeIndicatorC: s.changeIndicatorC,
    })),
  );

  // ✅ разделяем состояние
  const [viewLayout, setViewLayout] = useState<LayoutType>('imgLeftText'); // то, что показываем
  const [draftLayout, setDraftLayout] = useState<LayoutType>(viewLayout); // то, чем крутит редактор
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleSubmit = (data: SubmitImageTypeHeaderLayout) => {
    setTextC(data.text);
    const next = data.headerLayout ?? draftLayout;
    setViewLayout(next);
    setOpenEdit(false);
  };

  const renderViewByLayout = (layout: LayoutType) => {
    switch (layout) {
      case 'onlyText':
        return (
          <TextOnlyBlock
            setOpen={setOpenEdit}
            text={textC}
            indicator={indicatorC.n}
            positive={indicatorC.positive}
          />
        );
      case 'imageText':
        return (
          <ImageText
            setOpen={setOpenEdit}
            text={textC}
            indicator={indicatorC.n}
            positive={indicatorC.positive}
          />
        );
      case 'textImage':
        return (
          <TextImage
            setOpen={setOpenEdit}
            text={textC}
            indicator={indicatorC.n}
            positive={indicatorC.positive}
          />
        );
      case 'imgLeftText':
        return (
          <TextWithImageBlock
            setOpen={setOpenEdit}
            text={textC}
            indicator={indicatorC.n}
            positive={indicatorC.positive}
          />
        );
    }
  };

  return (
    <div className='w-full space-y-4'>
      <label className='block text-xs text-slate-500'>Индикатор</label>
      <input
        type='text'
        value={indicatorC.n ?? ''}
        onChange={(e) => changeIndicatorC(e.target.value)}
        className='w-full rounded border p-2 text-sm'
        placeholder='0-9999 или +n (пусто — скрыть)'
      />

      <div className={cn('shadow-block w-[345px] rounded-[25px] bg-white')}>
        {openEdit ? (
          <RenderEditorByLayout
            onClose={() => setOpenEdit(false)}
            layout={draftLayout}
            setHeaderLayout={setDraftLayout}
            value={textC}
            onSubmit={handleSubmit}
          />
        ) : (
          renderViewByLayout(viewLayout)
        )}
      </div>
    </div>
  );
};

export default TextLeftImageContent;
