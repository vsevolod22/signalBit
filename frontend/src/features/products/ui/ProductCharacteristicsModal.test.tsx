import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProductCharacteristicsModal } from './ProductCharacteristicsModal';

const item = {
  code: 'aist',
  name: 'АИСТ',
  kit: [],
  characteristicsTitle: 'Характеристики АИСТ',
  characteristics: [
    { name: 'Полетный контроллер', value: 'наличие', section: true },
    { name: 'PWM выходы', value: '6', unit: 'шт' },
  ],
};

describe('ProductCharacteristicsModal', () => {
  it('opens an accessible characteristics table and closes it again', () => {
    render(<ProductCharacteristicsModal isInteractive item={item} />);

    fireEvent.click(screen.getByRole('button', { name: 'Подробные характеристики' }));

    const dialog = screen.getByRole('dialog', { name: 'Характеристики АИСТ' });
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(screen.getByRole('columnheader', { name: 'Наименование характеристики' })).not.toBeNull();
    expect(screen.getByRole('cell', { name: '6' })).not.toBeNull();
    expect(screen.getByRole('cell', { name: 'шт' })).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(dialog.hasAttribute('open')).toBe(false);
  });
});
