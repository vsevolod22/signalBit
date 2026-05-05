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
      <div className="header-AboutUs">
        <b>
          Наша миссия – создавать безопасные
          <br />
          технологичные решения
        </b>
      </div>
      <div className="container-block">
        <div className="block1">
          <div>
            <h2>Мы ИТ-компания</h2>
          </div>
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
          <b>{OFFICIAL_INFO.title}</b>
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
