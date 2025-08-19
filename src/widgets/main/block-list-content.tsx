import { useBlocksStore } from '@entities/main/store/block.store';
import BlockItem from '@feature/block-item';
import { useEffect } from 'react';

export default function BlocksList() {
    const { editing, focused, focusNext, focusPrev, toggleSelected } = useBlocksStore();

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (editing) return; // в редактировании — не перехватываем

            if (e.key === 'ArrowDown') { e.preventDefault(); focusNext(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); focusPrev(); }
            else if (e.key === ' ' || e.code === 'Space') {
                if (focused) { e.preventDefault(); toggleSelected(focused); }
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [editing, focused, focusNext, focusPrev, toggleSelected]);

    return (
        <div className="flex flex-col items-start gap-4">
            <BlockItem slice="A" />
            <BlockItem slice="B" />
            <BlockItem slice="C" />
            <BlockItem slice="D" />
            <BlockItem slice="E" />
        </div>
    );
}
