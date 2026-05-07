import type { ReactElement } from 'react';

import { getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import { ACHIEVEMENT_ROWS, MOBILE_ACHIEVEMENT_ROWS } from '../model/achievements-data';
import '../styles/OurAchivement.scss';

export function Achievements(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const cmsAchievements = siteContent?.achievements?.filter((achievement) => achievement.image?.url);
  const desktopRows = cmsAchievements?.length
    ? [
        cmsAchievements
          .filter((achievement) => (achievement.desktopRow ?? 1) === 1)
          .map((achievement) => getMediaUrl(achievement.image, '')),
        cmsAchievements
          .filter((achievement) => (achievement.desktopRow ?? 1) === 2)
          .map((achievement) => getMediaUrl(achievement.image, '')),
      ]
    : ACHIEVEMENT_ROWS;
  const mobileRows = cmsAchievements?.length
    ? [1, 2, 3].map((rowIndex) =>
        cmsAchievements
          .filter((achievement) => (achievement.mobileRow ?? 1) === rowIndex)
          .map((achievement) => getMediaUrl(achievement.image, ''))
      )
    : MOBILE_ACHIEVEMENT_ROWS;
  const [firstRow, secondRow] = ACHIEVEMENT_ROWS;
  const [firstCmsRow, secondCmsRow] = desktopRows;

  return (
    <div className="OurAchivement">
      <h3 className="title">{siteContent?.achievementSetting?.sectionTitle ?? 'Наши достижения'}</h3>

      <div className="bodyUp">
        {(firstCmsRow.length ? firstCmsRow : firstRow).map((image) => (
          <img src={image} key={image} />
        ))}
      </div>
      <div className="bodyDown">
        {(secondCmsRow.length ? secondCmsRow : secondRow).map((image) => (
          <img src={image} key={image} />
        ))}
      </div>
      <div className="mobile-content">
        {mobileRows.map((row) => (
          <div className="achiv-block" key={row.join('-')}>
            {row.map((image) => (
              <img src={image} key={image} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
