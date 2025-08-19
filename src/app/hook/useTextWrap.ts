import { getLineHeightPx } from '@shared/utils';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface WrapCalc {
  lines: string[];
  lineHeight: number;
  indicatorShouldDrop: boolean;
  containerWidth: number;
  lastLineWidth: number;
}

export function useTextWrap<T extends HTMLElement = HTMLDivElement>(
  text: string,
  deps: number[] = [],
  opts?: { indicatorWidth?: number; indicatorGap?: number },
): [WrapCalc, React.MutableRefObject<T | null>] {
  const { indicatorWidth = 22, indicatorGap = 8 } = opts || {};
  const ref = useRef<T>(null);
  const [calc, setCalc] = useState<WrapCalc>({
    lines: [],
    lineHeight: 20,
    indicatorShouldDrop: false,
    containerWidth: 0,
    lastLineWidth: 0,
  });

  const recompute = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const lineHeightPx = getLineHeightPx(el);
    let lineCount = 1;
    let lastLineWidth = 0;

    if (el.tagName === 'TEXTAREA') {
      // textarea → считаем через scrollHeight
      lineCount = Math.max(1, Math.ceil(el.scrollHeight / lineHeightPx));
      lastLineWidth = el.scrollWidth % el.clientWidth || el.clientWidth;
    } else {
      // div/contenteditable → через Range API
      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = Array.from(range.getClientRects());
      lineCount = Math.max(1, rects.length);
      lastLineWidth = rects.length ? rects[rects.length - 1].width : 0;
    }

    const width = el.clientWidth;
    const availableOnLastLine = width - (indicatorWidth + indicatorGap);
    const indicatorShouldDrop = lastLineWidth > availableOnLastLine;

    setCalc({
      lines: Array.from({ length: lineCount }, () => ''),
      lineHeight: lineHeightPx,
      indicatorShouldDrop,
      containerWidth: width,
      lastLineWidth,
    });
  }, [indicatorGap, indicatorWidth, text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => recompute());
    ro.observe(el);
    return () => ro.disconnect();
  }, [recompute]);

  useLayoutEffect(() => {
    recompute();
  }, [recompute, ...deps]);

  return [calc, ref];
}
