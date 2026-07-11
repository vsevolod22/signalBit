import achievement1 from '../assets/achievement-certificate-01.png';
import achievement2 from '../assets/achievement-certificate-02.png';
import achievement3 from '../assets/achievement-certificate-03.png';
import achievement4 from '../assets/achievement-certificate-04.png';
import achievement5 from '../assets/achievement-certificate-05.png';
import achievement6 from '../assets/achievement-certificate-06.png';
import achievement7 from '../assets/achievement-certificate-07.png';
import achievementPremierLeague from '../assets/achievement-premier-league.png';

import type { SiteContent } from '@/shared/model/site-content.types';

export const DEFAULT_ACHIEVEMENTS_TITLE = 'Наши достижения';

export const DEFAULT_ACHIEVEMENTS: SiteContent['achievements'] = [
  { title: 'Сертификат участника', image: achievement1 },
  { title: 'Диплом', image: achievement2 },
  { title: 'Диплом', image: achievement3 },
  { title: 'Диплом премьер-лиги', image: achievementPremierLeague },
  { title: 'Сертификат', image: achievement4 },
  { title: 'Сертификат участника', image: achievement5 },
  { title: 'Свидетельство', image: achievement6 },
  { title: 'Свидетельство', image: achievement7 },
];
