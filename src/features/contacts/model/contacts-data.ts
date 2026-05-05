import email from '../assets/email.png';
import logoIctis from '../assets/logo_ictis.png';
import logoIntegra from '../assets/logo_integra.png';
import logoSfedu from '../assets/logo_sfedu.png';
import rightImage from '../assets/right_img.png';

export const CONTACT_IMAGES = {
  email,
  rightImage,
} as const;

export const PARTNER_LOGOS = {
  sfedu: logoSfedu,
  ictis: logoIctis,
  integra: logoIntegra,
} as const;
