import type { ReactElement } from 'react';

import { useSiteContentQuery } from '@/shared/api/site-content';
import '../styles/footer.css';

export function SiteFooter(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();

  return (
    <div className="footer">
      <span>
        {siteContent?.siteFooter?.text ??
          'Проект выполнен при поддержке Фонда содействия развитию малых форм предприятий в научно-технической сфере'}
      </span>
    </div>
  );
}
