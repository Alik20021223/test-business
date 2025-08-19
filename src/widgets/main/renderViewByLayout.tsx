// ./renderViewByLayout.tsx
import React, { JSX } from 'react';
import TextOnlyBlock from '@entities/main/ui/text-block';
import TextWithImageBlock from '@/entities/main/ui/left-image-text';
import ImageText from '@entities/main/ui/image-text';
import TextImage from '@entities/main/ui/text-image';
import type { LayoutType } from '@entities/main/types';

type Args = {
    layout: LayoutType;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
    indicator: string;
    positive: boolean;
};

export default function renderViewByLayout({
    layout,
    setOpen,
    text,
    indicator,
    positive,
}: Args): JSX.Element | null {
    switch (layout) {
        case 'onlyText':
            return (
                <TextOnlyBlock
                    setOpen={setOpen}
                    text={text}
                    indicator={indicator}
                    positive={positive}
                />
            );
        case 'imageText':
            return (
                <ImageText
                    setOpen={setOpen}
                    text={text}
                    indicator={indicator}
                    positive={positive}
                />
            );
        case 'textImage':
            return (
                <TextImage
                    setOpen={setOpen}
                    text={text}
                    indicator={indicator}
                    positive={positive}
                />
            );
        case 'imgLeftText':
            return (
                <TextWithImageBlock
                    setOpen={setOpen}
                    text={text}
                    indicator={indicator}
                    positive={positive}
                />
            );
        default:
            return null;
    }
}
