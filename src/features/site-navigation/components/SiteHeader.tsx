import type { MouseEvent, ReactElement } from 'react';

import { getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import logo from '../assets/logo.png';
import '../styles/header.scss';

interface SiteHeaderProps {
  onSectionChange: (sectionIndex: number) => void;
}

const navigationLinks = [
  { label: 'Направления деятельности', sectionIndex: 1 },
  { label: 'Услуги', sectionIndex: 3 },
  { label: 'О нас', sectionIndex: 5 },
  { label: 'Наши достижения', sectionIndex: 8 },
] as const;

const productLinks = [
  { label: 'Канарейка', sectionIndex: 2 },
  { label: 'Сенсор', sectionIndex: 7 },
  { label: 'Полётный контроллер', sectionIndex: 6 },
] as const;

export function SiteHeader({ onSectionChange }: SiteHeaderProps): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const navigation = siteContent?.siteNavigation;
  const links = navigation?.links?.length ? navigation.links : navigationLinks;
  const products = navigation?.productLinks?.length ? navigation.productLinks : productLinks;

  const createSectionHandler =
    (sectionIndex: number) =>
    (event: MouseEvent<HTMLAnchorElement | HTMLImageElement | HTMLButtonElement>): void => {
      event.preventDefault();
      onSectionChange(sectionIndex);
    };

  return (
    <div className="header">
      <img className="logo" src={getMediaUrl(navigation?.logo, logo)} onClick={createSectionHandler(0)} />
      <div className="modules">
        {links.slice(0, 2).map((link) => (
          <a href="#" key={link.label} onClick={createSectionHandler(link.sectionIndex ?? 0)}>
            {link.label}
          </a>
        ))}

        <div className="dropdown">
          <a className="dropbtn">Продукты</a>
          <div className="dropdown-content">
            {products.map((link) => (
              <a href="#" key={link.label} onClick={createSectionHandler(link.sectionIndex ?? 0)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {links.slice(2).map((link) => (
          <a href="#" key={link.label} onClick={createSectionHandler(link.sectionIndex ?? 0)}>
            {link.label}
          </a>
        ))}
      </div>
      <button className="contact_us" onClick={createSectionHandler(navigation?.contactSectionIndex ?? 4)}>
        {navigation?.contactLabel ?? 'Свяжитесь с нами'}
      </button>
    </div>
  );
}
