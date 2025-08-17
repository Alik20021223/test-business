import { ReactNode } from 'react';
import HeaderBlock from '@feature/header-block-edit';
import { LayoutType } from '@entities/main/types';

interface BlockEditProps {
  children: ReactNode;
  onSubmit: () => void;
  valueText: string;
  initialText?: string;
  onClose: () => void;
  headerLayout: LayoutType;
  setHeaderLayout: (value: LayoutType) => void;
}

const BlockEdit: React.FC<BlockEditProps> = ({
  children,
  onSubmit,
  valueText,
  onClose,
  setHeaderLayout,
  headerLayout,
  initialText,
}) => {
  const canSubmit = (valueText ?? '').trim() !== (initialText ?? '').trim();

  return (
    <>
      <section className='space-y-4'>
        <HeaderBlock
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          onClose={onClose}
          headerLayout={headerLayout}
          setHeaderLayout={setHeaderLayout}
        />
        {children}
      </section>
    </>
  );
};

export default BlockEdit;
