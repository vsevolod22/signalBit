import type { ReactElement } from 'react';

import './site-loading-screen.scss';

export function SiteLoadingScreen(): ReactElement {
  return (
    <div className="site-loader" role="status" aria-live="polite" aria-label="Загрузка актуальных данных сайта">
      <div className="site-loader__signal" aria-hidden="true">
        <span className="site-loader__orbit site-loader__orbit--outer" />
        <span className="site-loader__orbit site-loader__orbit--middle" />
        <span className="site-loader__core">СБ</span>
      </div>
      <div className="site-loader__copy">
        <strong>СИГНАЛ-БИТ</strong>
        <span>Получаем актуальные данные</span>
      </div>
      <span className="site-loader__progress" aria-hidden="true" />
    </div>
  );
}
