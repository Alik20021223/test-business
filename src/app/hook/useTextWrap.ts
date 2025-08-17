import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type WrapCalc = {
  // Кол-во строк храним как пустой массив нужной длины, чтобы твой текущий код с length не ломать
  lines: string[];
  lineHeight: number;           // px
  indicatorShouldDrop: boolean; // нужно ли уронить индикатор на строку ниже

  // Полезно для отладки, можно не использовать снаружи
  containerWidth?: number;
  lastLineWidth?: number;
};

export function useTextWrap(
  text: string,
  deps: any[] = [],
  opts?: { indicatorWidth?: number; indicatorGap?: number },
): [WrapCalc, React.RefObject<HTMLDivElement | null>] {
  const { indicatorWidth = 22, indicatorGap = 8 } = opts || {};
  const ref = useRef<HTMLDivElement>(null);
  const [calc, setCalc] = useState<WrapCalc>({
    lines: [],
    lineHeight: 20,
    indicatorShouldDrop: false,
  });

  const recompute = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const style = getComputedStyle(el);
    const fontSize = style.fontSize;
    const lineHeightPx =
      style.lineHeight === 'normal'
        ? Math.round(parseFloat(fontSize) * 1.4)
        : Math.round(parseFloat(style.lineHeight));

    // Точная разбивка на строки через Range API
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = Array.from(range.getClientRects()); // по одному rect на каждую строку
    const lineCount = Math.max(1, rects.length);

    const width = el.clientWidth; // фактическая доступная ширина
    const lastRectWidth = rects.length ? rects[rects.length - 1].width : 0;
    console.log(rects.length ? rects[rects.length - 1].width : 0);
    

    // Проверяем, влезает ли индикатор справа от последней строки с учётом зазора
    
    
    const availableOnLastLine = width - (indicatorWidth + indicatorGap);
    console.log("lastRectWidth:", lastRectWidth, "availableOnLastLine: ", availableOnLastLine);
    const indicatorShouldDrop = lastRectWidth > availableOnLastLine;

    setCalc({
      lines: Array.from({ length: lineCount }, () => ''), // нам важна только длина
      lineHeight: lineHeightPx,
      indicatorShouldDrop,
      containerWidth: width,
      lastLineWidth: lastRectWidth,
    });
  }, [indicatorGap, indicatorWidth, text]);

  // Пересчёт при ресайзе текста/контейнера
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => recompute());
    ro.observe(el);
    return () => ro.disconnect();
  }, [recompute]);

  // Пересчёт при изменении текста/зависимостей
  useLayoutEffect(() => {
    recompute();
  }, [recompute, ...deps]);

  return [calc, ref];
}
