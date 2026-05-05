import type { MouseEvent, ReactElement } from 'react';

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
  const createSectionHandler =
    (sectionIndex: number) =>
    (event: MouseEvent<HTMLAnchorElement | HTMLImageElement | HTMLButtonElement>): void => {
      event.preventDefault();
      onSectionChange(sectionIndex);
    };

  return (
    <div className="header">
      <img className="logo" src={logo} onClick={createSectionHandler(0)} />
      <div className="modules">
        {navigationLinks.slice(0, 2).map((link) => (
          <a href="#" key={link.label} onClick={createSectionHandler(link.sectionIndex)}>
            {link.label}
          </a>
        ))}

        <div className="dropdown">
          <a className="dropbtn">Продукты</a>
          <div className="dropdown-content">
            {productLinks.map((link) => (
              <a href="#" key={link.label} onClick={createSectionHandler(link.sectionIndex)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {navigationLinks.slice(2).map((link) => (
          <a href="#" key={link.label} onClick={createSectionHandler(link.sectionIndex)}>
            {link.label}
          </a>
        ))}
      </div>
      <button className="contact_us" onClick={createSectionHandler(4)}>
        Свяжитесь с нами
      </button>
    </div>
  );
}
