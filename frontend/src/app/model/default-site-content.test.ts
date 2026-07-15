import { describe, expect, it } from 'vitest';

import { DEFAULT_SITE_CONTENT } from './default-site-content';

describe('default landing content', () => {
  it('keeps the Figma hero copy and development prices as the backend fallback', () => {
    expect(DEFAULT_SITE_CONTENT.hero).toMatchObject({
      title: 'ТЕХНОЛОГИИ,',
      headline: 'Ваши задачи – наше профессиональное решение',
    });
    expect(DEFAULT_SITE_CONTENT.developments.map(({ cost }) => cost)).toEqual([
      'от 50 тыс. руб.',
      'от 120 тыс. руб.',
      'от 30 тыс. руб.',
      'от 10 тыс. руб.',
    ]);
  });

  it('stores education emphasis at phrase level instead of making an entire outcome bold', () => {
    const [pilotSchool, engineerOperator] = DEFAULT_SITE_CONTENT.education.programs;

    expect(
      pilotSchool.outcomes.flatMap(({ segments }) =>
        segments.filter(({ emphasized }) => emphasized).map(({ text }) => text),
      ),
    ).toEqual([
      'аэродинамику и устройство БАС',
      'мастерство пилотирования',
      'сертификат о прохождении ДПО «Школа пилотирования»',
    ]);
    expect(
      engineerOperator.outcomes.flatMap(({ segments }) =>
        segments.filter(({ emphasized }) => emphasized).map(({ text }) => text),
      ),
    ).toEqual(['от винта до кода', 'станешь востребованным', '2 документа государственного образца ']);
  });

  it('contains all four Figma products and the corrected autonomous flight tolerance', () => {
    expect(DEFAULT_SITE_CONTENT.products.map(({ slug }) => slug)).toEqual([
      'sokol',
      'aist-basic',
      'aist-autonomous',
      'soroka',
    ]);
    expect(DEFAULT_SITE_CONTENT.products[2].specs).toContain('отклонение от траектории полета: до 2 м');
  });
});
