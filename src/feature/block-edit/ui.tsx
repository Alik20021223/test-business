import { ReactNode } from 'react';
import HeaderBlock from '@feature/header-block-edit';
import { LayoutType } from '@entities/main/types';

interface BlockEditProps {
  children: ReactNode;
  onSubmit: () => void;
  valueText: string;
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
}) => {
  const canSubmit = Boolean((valueText ?? '').trim());

  return (
    <>
      <section>
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
