import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('renders the desktop landing section by default', () => {
    render(<App />);

    expect(screen.getByText(/Ваш надежный партнер в безопасности/i)).toBeInTheDocument();
  });
});
