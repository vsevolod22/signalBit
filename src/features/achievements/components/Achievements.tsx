import type { ReactElement } from 'react';

import { ACHIEVEMENT_ROWS, MOBILE_ACHIEVEMENT_ROWS } from '../model/achievements-data';
import '../styles/OurAchivement.scss';

export function Achievements(): ReactElement {
  const [firstRow, secondRow] = ACHIEVEMENT_ROWS;

  return (
    <div className="OurAchivement">
      <h3 className="title">Наши достижения</h3>

      <div className="bodyUp">
        {firstRow.map((image) => (
          <img src={image} key={image} />
        ))}
      </div>
      <div className="bodyDown">
        {secondRow.map((image) => (
          <img src={image} key={image} />
        ))}
      </div>
      <div className="mobile-content">
        {MOBILE_ACHIEVEMENT_ROWS.map((row) => (
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
