import React from 'react';

type IndicatorProps = {
  value?: string | null;
  positive?: boolean; // флаг, был ли знак +
  size?: 'narrow' | 'wide';
  className?: string;
  style?: React.CSSProperties;
};

const Indicator = React.forwardRef<HTMLDivElement, IndicatorProps>(
  ({ value, size, className, style, positive }, ref) => {
    if (Number(value) === 0 || value == null || Number.isNaN(value)) return null;

    const narrow = String(value).length <= 1;
    const isWide = size === 'wide' || !narrow;

    return (
      <div
        ref={ref}
        className={[
          'indicator',
          isWide ? 'h-5.5 min-w-[22px] px-2' : 'size-6',
          positive ? 'indicator-blue' : '', // например зелёный фон
          className || '',
        ].join(' ')}
        style={style}
      >
        {positive ? `${value}` : value}
      </div>
    );
  },
);

export default Indicator;
