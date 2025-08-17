import { useEffect, useState } from 'react';
import TextOnlyBlock from '@entities/main/ui/text-block';
import TextWithImageBlock from '@entities/main/ui/text-image';

type IndicatorState = { n: string | null; positive: boolean };

const parseIndicator = (v: string): IndicatorState => {
  if (v.trim() === '') return { n: null, positive: false };
  const positive = v.trim().startsWith('+');
  const raw = v.replace('+', '');
  const n = Number(raw);
  if (Number.isNaN(n)) return { n: null, positive };

  const clamped = Math.min(9999, Math.max(0, n));
  if (clamped === 0) return { n: null, positive };
  return { n: positive ? `+${clamped}` : `${clamped}`, positive };
};

const MainPage = () => {
  // Блок A (TextOnlyBlock)
  const [textA, setTextA] = useState(
    "Drinking water isn't just about quenching your thirst. It plays a crucial role..."
  );
  const [indicatorA, setIndicatorA] = useState<IndicatorState>({ n: '12', positive: false });

  // Блок B (TextOnlyBlock)
  const [textB, setTextB] = useState(
    'Another block starts independently. Try different text here to verify separation.'
  );
  const [indicatorB, setIndicatorB] = useState<IndicatorState>({ n: '+3', positive: true });

  // Блок C (TextWithImageBlock)
  const [textC, setTextC] = useState(
    "Drinking water isn't just about quenching your thirst. It plays a cru bbb лфотывло флыотвфолы флыотв флоыт офы лфтыволфырл фиы вфыл твфо ы"
  );
  const [indicatorC, setIndicatorC] = useState<IndicatorState>({ n: '10', positive: false });

  useEffect(() => {
    // просто чтобы видеть изменения в консоли
    console.log({ indicatorA, indicatorB, indicatorC });
  }, [indicatorA, indicatorB, indicatorC]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Панель для TextOnlyBlock A */}
      <div className="w-full p-4 space-y-4 rounded-md ">
        <h3 className="font-semibold">TextOnly A</h3>
        <input
          type="text"
          value={textA}
          onChange={(e) => setTextA(e.target.value)}
          className="w-full border rounded p-2 text-sm"
          placeholder="Введите текст..."
        />
        <input
          type="text"
          value={indicatorA.n ?? ''}
          onChange={(e) => setIndicatorA(parseIndicator(e.target.value))}
          className="w-full border rounded p-2 text-sm"
          placeholder="Индикатор (0-9999 или +n)"
        />
        <TextOnlyBlock text={textA} indicator={indicatorA.n} positive={indicatorA.positive} />
      </div>

      {/* Панель для TextOnlyBlock B */}
      <div className="w-full p-4 space-y-4 rounded-md ">
        <h3 className="font-semibold">TextOnly B</h3>
        <input
          type="text"
          value={textB}
          onChange={(e) => setTextB(e.target.value)}
          className="w-full border rounded p-2 text-sm"
          placeholder="Введите текст..."
        />
        <input
          type="text"
          value={indicatorB.n ?? ''}
          onChange={(e) => setIndicatorB(parseIndicator(e.target.value))}
          className="w-full border rounded p-2 text-sm"
          placeholder="Индикатор (0-9999 или +n)"
        />
        <TextOnlyBlock text={textB} indicator={indicatorB.n} positive={indicatorB.positive} />
      </div>

      {/* Панель для TextWithImageBlock C */}
      <div className="w-full p-4 space-y-4 rounded-md ">
        <h3 className="font-semibold">Text + Image</h3>

        <label className="block text-xs text-slate-500">Текст</label>
        <input
          type="text"
          value={textC}
          onChange={(e) => setTextC(e.target.value)}
          className="w-full border rounded p-2 text-sm"
          placeholder="Введите текст..."
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-500">Индикатор</label>
            <input
              type="text"
              value={indicatorC.n ?? ''}
              onChange={(e) => setIndicatorC(parseIndicator(e.target.value))}
              className="w-full border rounded p-2 text-sm"
              placeholder="0-9999 или +n (пусто — скрыть)"
            />
          </div>


        </div>

        <TextWithImageBlock
          text={textC}
          imageSrc='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600'
          indicator={indicatorC.n}
          positive={indicatorC.positive}
        />
      </div>
    </div>
  );
};

export default MainPage;
