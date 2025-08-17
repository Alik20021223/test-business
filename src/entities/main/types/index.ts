export type LayoutType = 'onlyText' | 'textImage' | 'imageText' | 'imgLeftText';

export type IndicatorState = { n: string | null; positive: boolean };

export type SubmitImageType = {
  text: string;
  file?: File | null;
  imageUrl?: string;
};
