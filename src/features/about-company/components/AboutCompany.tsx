import type { ReactElement } from 'react';

import {
  ABOUT_COMPANY_IMAGES,
  ABOUT_COMPANY_PARAGRAPHS,
  ABOUT_COMPANY_STATS,
  OFFICIAL_INFO,
} from '../model/about-company-data';
import '../styles/aboutUs.scss';

export function AboutCompany(): ReactElement {
  return (
    <div className="aboutUs">
      <h3 className="header-AboutUs">
        Наша миссия – создавать безопасные
        <br className="desktop-title-break" />
        технологичные решения
      </h3>
      <div className="container-block">
        <div className="block1">
          <b className="name">Мы ИТ-компания</b>
          <div className="text block-t">
            {ABOUT_COMPANY_PARAGRAPHS.map((paragraph) => (
              <div key={paragraph}>{paragraph}</div>
            ))}
          </div>
        </div>
        <div className="block2">
          <img src={ABOUT_COMPANY_IMAGES.photo} />
        </div>
        <div className="block3 text">
          {ABOUT_COMPANY_STATS.map((stat) => (
            <div className="block3-cont" key={stat.text}>
              <img src={stat.img} />
              <div>{stat.text}</div>
            </div>
          ))}
        </div>
        <div className="block4 text">
          <h3 className="title_of">{OFFICIAL_INFO.title}</h3>
          <div className="block4-cont">
            {OFFICIAL_INFO.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
