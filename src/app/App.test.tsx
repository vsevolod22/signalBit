import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';
import { AppProviders } from './providers/AppProviders';

describe('App', () => {
  it('renders its loading state while CMS content is requested', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );

    expect(screen.getByText(/Загружаем сайт/i)).toBeInTheDocument();
  });
});
