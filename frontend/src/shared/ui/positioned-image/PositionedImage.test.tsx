import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PositionedImage } from './PositionedImage';

describe('PositionedImage', () => {
  it('applies CMS offsets and scale through composable CSS transform properties', () => {
    render(<PositionedImage src="/image.png" alt="Изображение" position={{ offsetX: 12, offsetY: -8, scale: 125 }} />);

    const image = screen.getByRole('img', { name: 'Изображение' });
    expect(image.style.translate).toBe('12px -8px');
    expect(image.style.scale).toBe('1.25');
  });
});
