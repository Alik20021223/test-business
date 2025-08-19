import { cn } from '@shared/lib/utils';
import ContentPanel from '@feature/contentBlock/ui';
import type { SliceKey } from '@entities/main/types';
import { useBlocksStore } from '@entities/main/store/block.store';
import { useEffect, useRef } from 'react';

export default function BlockItem({ slice }: { slice: SliceKey }) {
    const {
        items, focused, editing,
        setFocus, setEditing, toggleSelected, setLayout
    } = useBlocksStore();

    const ui = items.find(i => i.key === slice)!;
    const isFocused = focused === slice;
    const isEditing = editing === slice;

    const ref = useRef<HTMLDivElement>(null);

    // 🔑 следим за фокусом и скроллим
    useEffect(() => {
        if (isFocused && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [isFocused]);

    return (
        <div
            ref={ref}
            className={cn('w-full max-w-[560px]')}
            onMouseEnter={() => { if (!editing) setFocus(slice); }}
            onClick={() => { if (!editing) toggleSelected(slice); }}
        >
            <div className="p-2">
                <ContentPanel
                    slice={slice}
                    defaultLayout={ui.layout}

                    // управляем редактор
                    editing={isEditing}
                    onOpenEdit={() => { setEditing(slice); setFocus(slice); }}
                    onCloseEdit={() => setEditing(null)}

                    // управляем layout
                    layoutOverride={ui.layout}
                    onLayoutChange={(l) => setLayout(slice, l)}

                    // ✅ визуальные флаги передаём внутрь
                    uiFocused={isFocused}
                    uiSelected={!isEditing && ui.selected}
                />
            </div>
        </div>
    );
}
