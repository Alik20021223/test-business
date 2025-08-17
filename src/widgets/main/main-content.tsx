import TextContent from './text-content';
import TextLeftImageContent from './text-left-image-content';

const MainContent = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {/* Панель для TextOnlyBlock A */}

      <TextContent />
      {/* Панель для TextWithImageBlock C */}
      <TextLeftImageContent />
    </div>
  );
};

export default MainContent;
