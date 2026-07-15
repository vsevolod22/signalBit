import type { SiteContent } from '@/shared/model/site-content.types';
import competitionCertificate1 from '../assets/figma-update/competition-certificate-01.webp';
import competitionCertificate2 from '../assets/figma-update/competition-certificate-02.webp';
import premierLeagueThirdPlace from '../assets/figma-update/premier-league-third-place.webp';
import premierLeagueWinner from '../assets/figma-update/premier-league-winner.webp';
import softwareCertificate1 from '../assets/figma-update/software-certificate-01.webp';
import softwareCertificate2 from '../assets/figma-update/software-certificate-02.webp';
import softwareCertificate3 from '../assets/figma-update/software-certificate-03.webp';
import softwareCertificate4 from '../assets/figma-update/software-certificate-04.webp';
import softwareCertificate5 from '../assets/figma-update/software-certificate-05.webp';
import technicalCertificateAist from '../assets/figma-update/technical-certificate-aist.webp';
import technicalCertificateSoroka from '../assets/figma-update/technical-certificate-soroka.webp';

export const DEFAULT_ACHIEVEMENTS_TITLE = 'Наши достижения';

export const DEFAULT_ACHIEVEMENTS: SiteContent['achievements'] = [
  { title: 'Сертификат подтверждения технических характеристик', image: competitionCertificate1 },
  { title: 'Сертификат подтверждения технических характеристик', image: competitionCertificate2 },
  { title: 'Сертификат подтверждения технических характеристик «Сорока»', image: technicalCertificateSoroka },
  { title: 'Сертификат подтверждения технических характеристик учебного БВС «АИСТ»', image: technicalCertificateAist },
  { title: 'Диплом за третье место в Премьер-лиге', image: premierLeagueThirdPlace },
  { title: 'Свидетельство о государственной регистрации программы для ЭВМ', image: softwareCertificate1 },
  { title: 'Свидетельство о государственной регистрации программы для ЭВМ', image: softwareCertificate2 },
  { title: 'Свидетельство о государственной регистрации программы для ЭВМ', image: softwareCertificate3 },
  { title: 'Свидетельство о государственной регистрации программы для ЭВМ', image: softwareCertificate4 },
  { title: 'Свидетельство о государственной регистрации программы для ЭВМ', image: softwareCertificate5 },
  { title: 'Диплом победителя Премьер-лиги', image: premierLeagueWinner },
];
