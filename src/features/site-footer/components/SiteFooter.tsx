import type { ReactElement } from 'react';

import '../styles/footer.css';

export function SiteFooter(): ReactElement {
  return (
    <div className="footer">
      <span>
        Проект выполнен при поддержке Фонда содействия развитию малых форм предприятий в
        научно-технической сфере
      </span>
    </div>
  );
}
