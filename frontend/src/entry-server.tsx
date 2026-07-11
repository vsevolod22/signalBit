import { renderToString } from 'react-dom/server';

import { App } from './App';
import { AppProviders } from './app/providers/AppProviders';

export function render(): string {
  return renderToString(
    <AppProviders>
      <App />
    </AppProviders>,
  );
}
