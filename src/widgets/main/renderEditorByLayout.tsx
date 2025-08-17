import ImageTextEditor from '@entities/main/ui/image-text-editor';
import { LayoutType, SubmitImageType } from '@entities/main/types';
import OnlyTextEditor from '@entities/main/ui/only-text-editor';
import LeftImageTextEditor from '@entities/main/ui/left-image-text-editor';

interface RenderEditorByLayoutProps {
  layout: LayoutType;
  value: string;
  onSubmit: (data: SubmitImageType) => void;
  onClose: () => void;
  setHeaderLayout: (value: LayoutType) => void;
}

const RenderEditorByLayout: React.FC<RenderEditorByLayoutProps> = ({
  layout,
  value,
  onSubmit,
  onClose,
  setHeaderLayout,
}) => {
  switch (layout) {
    case 'textImage':
    case 'imageText':
      return (
        <ImageTextEditor
          onClose={onClose}
          setHeaderLayout={setHeaderLayout}
          headerLayout={layout}
          initialText={value}
          onSubmit={onSubmit}
        />
      );
    case 'onlyText':
      return (
        <OnlyTextEditor
          onClose={onClose}
          setHeaderLayout={setHeaderLayout}
          headerLayout={layout}
          initialText={value}
          onSubmit={onSubmit}
        />
      ); // TODO: <TextOnlyEditor ... />
    case 'imgLeftText':
      return (
        <LeftImageTextEditor
          onClose={onClose}
          setHeaderLayout={setHeaderLayout}
          headerLayout={layout}
          initialText={value}
          onSubmit={onSubmit}
        />
      ); // TODO: <ImageLeftTextEditor ... />
    default:
      return null;
  }
};

export default RenderEditorByLayout;
