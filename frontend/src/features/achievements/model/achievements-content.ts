import achievement1 from '../assets/d1.jpg';
import achievement2 from '../assets/d2.jpg';
import achievement3 from '../assets/d3.jpg';
import achievement4 from '../assets/d4.jpg';
import achievement5 from '../assets/d5.jpg';
import achievement6 from '../assets/d6.jpg';
import achievement7 from '../assets/d7.jpg';
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
