import type { ReactElement } from 'react';

import { ACHIEVEMENT_ROWS } from '../model/achievements-data';
import '../styles/OurAchivement.scss';

export function Achievements(): ReactElement {
  const [firstRow, secondRow] = ACHIEVEMENT_ROWS;

  return (
    <div className="OurAchivement">
      <div>
        <b>Наши достижения</b>
      </div>

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
    </div>
  );
}
