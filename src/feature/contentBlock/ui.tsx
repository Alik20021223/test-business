import { useState } from 'react';
import { cn } from '@shared/lib/utils';
import type { LayoutType, SliceKey, SubmitImageTypeHeaderLayout } from '@entities/main/types';
import RenderEditorByLayout from '@widgets/main/renderEditorByLayout';
import renderViewByLayout from '@widgets/main/renderViewByLayout';
import { useMainSlice } from '@app/hook/useMainSlice';

type ControlledProps = {
  editing?: boolean;
  onOpenEdit?: () => void;
  onCloseEdit?: () => void;

  layoutOverride?: LayoutType;
  onLayoutChange?: (l: LayoutType) => void;

  /** ✅ Управление визуальным состоянием блока */
  uiFocused?: boolean; // рамка
  uiSelected?: boolean; // голубая заливка
};

type Props = {
  slice: SliceKey;
  defaultLayout: LayoutType;
  className?: string;
} & ControlledProps;

export default function ContentPanel({
  slice,
  defaultLayout,
  className,
  editing,
  onOpenEdit,
  onCloseEdit,
  layoutOverride,
  onLayoutChange,
  uiFocused = false,
  uiSelected = false,
}: Props) {
  const { text, setText, indicator } = useMainSlice(slice);

  const [viewLayout, setViewLayout] = useState<LayoutType>(defaultLayout);
  const [draftLayout, setDraftLayout] = useState<LayoutType>(defaultLayout);
  const [openEdit, setOpenEdit] = useState(false);

  const isEditing = editing ?? openEdit;
  const currentLayout = layoutOverride ?? viewLayout;

  const openEditor = () => {
    const base = layoutOverride ?? viewLayout;
    setDraftLayout(base);
    if (onOpenEdit) onOpenEdit();
    else setOpenEdit(true);
  };

  const handleSubmit = (data: SubmitImageTypeHeaderLayout) => {
    setText(data.text);
    const next = data.headerLayout ?? draftLayout;

    if (onLayoutChange) onLayoutChange(next);
    else setViewLayout(next);

    if (onCloseEdit) onCloseEdit();
    else setOpenEdit(false);
  };

  const cardClass = cn(
    'shadow-block w-[345px] rounded-[25px]',
    isEditing
      ? 'bg-white'
      : uiFocused && uiSelected
        ? ' border-gradient blue-shadow bg-[#F1F6FD]' // ✅ и рамка, и голубая заливка
        : uiFocused
          ? 'border-gradient blue-shadow'
          : uiSelected
            ? 'bg-[#F1F6FD] blue-shadow'
            : 'ring-1 ring-sky-200/50 bg-white',
  );

  const stateClasses = cn({
    'state-editing': isEditing,
    'state-focused': !isEditing && uiFocused,
    'state-selected': !isEditing && uiSelected,
  });

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div className={cn(cardClass, stateClasses, 'w-[345px]')}>
        {isEditing ? (
          <RenderEditorByLayout
            onClose={() => (onCloseEdit ? onCloseEdit() : setOpenEdit(false))}
            layout={draftLayout}
            setHeaderLayout={setDraftLayout}
            value={text}
            onSubmit={handleSubmit}
          />
        ) : (
          renderViewByLayout({
            layout: currentLayout,
            setOpen: openEditor,
            text,
            indicator: indicator.n ?? '',
            positive: indicator.positive,
          })
        )}
      </div>
    </div>
  );
}
