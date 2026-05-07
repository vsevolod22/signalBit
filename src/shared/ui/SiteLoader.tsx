import type { ReactElement } from 'react';

import './site-loader.css';

export function SiteLoader(): ReactElement {
  return (
    <main className="site-loader" aria-busy="true" aria-live="polite">
      <div className="site-loader__panel">
        <div className="site-loader__radar" aria-hidden="true">
          <span className="site-loader__ring site-loader__ring--outer" />
          <span className="site-loader__ring site-loader__ring--middle" />
          <span className="site-loader__ring site-loader__ring--inner" />
          <span className="site-loader__sweep" />
          <span className="site-loader__mark">SB</span>
        </div>
        <div className="site-loader__content">
          <span className="site-loader__eyebrow">SignalBit</span>
          <h1>Загружаем сайт</h1>
          <p>Подготавливаем интерфейс и актуальный контент.</p>
          <div className="site-loader__progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </main>
  );
}
