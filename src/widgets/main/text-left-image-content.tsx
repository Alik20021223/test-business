import TextWithImageBlock from '@entities/main/ui/text-image';
import { useMainStore } from '@entities/main/store';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { LayoutType, SubmitImageType } from '@entities/main/types';
import { cn } from '@shared/lib/utils';
import RenderEditorByLayout from './renderEditorByLayout';

const TextLeftImageContent = () => {
  const { textC, indicatorC, changeIndicatorC, setTextC } = useMainStore(
    useShallow((s) => ({
      setTextC: s.setTextC,

      textC: s.textC,
      indicatorC: s.indicatorC,
      changeIndicatorC: s.changeIndicatorC,
    })),
  );

  const handleSubmit = (data: SubmitImageType) => {
    setTextC(data.text);
    setOpenEdit(false);
  };

  const [headerLayout, setHeaderLayout] = useState<LayoutType>('imageText');
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  return (
    <>
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
              setHeaderLayout={setHeaderLayout}
              onClose={() => setOpenEdit(false)}
              layout={headerLayout}
              value={textC}
              onSubmit={handleSubmit}
            />
          ) : (
            <TextWithImageBlock
              setOpen={setOpenEdit}
              text={textC}
              imageSrc='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600'
              indicator={indicatorC.n}
              positive={indicatorC.positive}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TextLeftImageContent;
