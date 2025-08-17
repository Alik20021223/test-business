import TextOnlyBlock from '@entities/main/ui/text-block';
import { useMainStore } from '@entities/main/store';
import { useShallow } from 'zustand/shallow';
import { useState } from 'react';
import { LayoutType, SubmitImageType } from '@entities/main/types';
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

  const [headerLayout, setHeaderLayout] = useState<LayoutType>('imageText');
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleSubmit = (data: SubmitImageType) => {
    setTextA(data.text);
    setOpenEdit(false);
  };

  return (
    <>
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
              setHeaderLayout={setHeaderLayout}
              onClose={() => setOpenEdit(false)}
              layout={headerLayout}
              value={textA}
              onSubmit={handleSubmit}
            />
          ) : (
            <TextOnlyBlock
              setOpen={setOpenEdit}
              text={textA}
              indicator={indicatorA.n}
              positive={indicatorA.positive}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TextContent;
