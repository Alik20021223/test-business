import { IndicatorState } from '@entities/main/types';

export function getLineHeightPx(el: HTMLElement): number {
  const cs = getComputedStyle(el);
  const lh = cs.lineHeight;
  const fs = parseFloat(cs.fontSize);

  // 1) Если браузер уже дал пиксели — просто парсим, без округления
  if (lh.endsWith('px')) return parseFloat(lh);

  // 2) Если задано без единиц (например, "1.4") — умножаем на font-size
  const n = parseFloat(lh);
  if (!Number.isNaN(n)) return n * fs;

  // 3) "normal" — измеряем реально через невидимый двухстрочный блок
  const probe = document.createElement('div');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.pointerEvents = 'none';
  probe.style.whiteSpace = 'pre'; // чтобы \n дал вторую строку
  probe.style.padding = '0';
  probe.style.margin = '0';
  probe.style.border = '0';
  probe.style.fontFamily = cs.fontFamily;
  probe.style.fontSize = cs.fontSize;
  probe.style.fontWeight = cs.fontWeight;
  probe.style.letterSpacing = cs.letterSpacing;
  probe.style.lineHeight = 'normal';

  // две строки, чтобы высота/2 дала точный line-height
  probe.textContent = 'A\nA';

  // важно измерять в том же документе
  (el.ownerDocument?.body ?? document.body).appendChild(probe);
  const lhPx = probe.getBoundingClientRect().height / 2;
  probe.remove();

  return lhPx;
}

export const parseIndicator = (v: string): IndicatorState => {
  if (v.trim() === '') return { n: null, positive: false };
  const positive = v.trim().startsWith('+');
  const raw = v.replace('+', '');
  const n = Number(raw);
  if (Number.isNaN(n)) return { n: null, positive };

  const clamped = Math.min(9999, Math.max(0, n));
  if (clamped === 0) return { n: null, positive };
  return { n: positive ? `+${clamped}` : `${clamped}`, positive };
};
