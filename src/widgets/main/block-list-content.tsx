import { useBlocksStore } from '@entities/main/store/block.store';
import BlockItem from '@feature/block-item';
import { useEffect, useRef, useCallback } from 'react';

export default function BlocksList() {
  const { editing, focused, focusNext, focusPrev, toggleSelected, setFocus } = useBlocksStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Отдаём фокус контейнеру при монтировании (и ставим дефолтный фокус, если его нет)
  useEffect(() => {
    if (!focused) setFocus('A'); // или первый ключ динамически, если список не фиксирован
    containerRef.current?.focus();
  }, [focused, setFocus]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (editing) return;

      // стрелки
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusNext();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusPrev();
        return;
      }

      // Space (учитываем разные браузеры)
      if (e.code === 'Space' || e.key === ' ') {
        if (focused) {
          e.preventDefault();
          toggleSelected(focused);
        }
        return;
      }
    },
    [editing, focused, focusNext, focusPrev, toggleSelected],
  );

  return (
    <div
      ref={containerRef}
      tabIndex={0} // 🔑 делает контейнер фокусируемым
      className='flex flex-col items-start gap-4 outline-none'
      onKeyDown={onKeyDown} // 🔑 слушаем клавиатуру здесь, а не на window
    >
      <BlockItem slice='A' />
      <BlockItem slice='B' />
      <BlockItem slice='C' />
      <BlockItem slice='D' />
      <BlockItem slice='E' />
    </div>
  );
}
