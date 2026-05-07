import type { ReactElement } from 'react';

import { getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import {
  ABOUT_COMPANY_IMAGES,
  ABOUT_COMPANY_PARAGRAPHS,
  ABOUT_COMPANY_STATS,
  OFFICIAL_INFO,
} from '../model/about-company-data';
import '../styles/aboutUs.scss';

export function AboutCompany(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const aboutCompany = siteContent?.aboutCompany;
  const missionTitle = aboutCompany?.missionTitle ?? 'Наша миссия – создавать безопасные\nтехнологичные решения';
  const paragraphs = aboutCompany?.paragraphs?.length
    ? aboutCompany.paragraphs
    : ABOUT_COMPANY_PARAGRAPHS;
  const stats = aboutCompany?.stats?.length
    ? aboutCompany.stats.map((stat, index) => ({
        img: getMediaUrl(stat.icon, ABOUT_COMPANY_STATS[index]?.img ?? ABOUT_COMPANY_STATS[0].img),
        text: stat.text ?? ABOUT_COMPANY_STATS[index]?.text ?? '',
      }))
    : ABOUT_COMPANY_STATS;
  const officialItems = aboutCompany?.officialItems?.length
    ? aboutCompany.officialItems
    : OFFICIAL_INFO.items;

  return (
    <div className="aboutUs">
      <h3 className="header-AboutUs">
        {missionTitle.split('\n').map((line, index) => (
          <span key={line}>
            {index > 0 && <br className="desktop-title-break" />}
            {line}
          </span>
        ))}
      </h3>
      <div className="container-block">
        <div className="block1">
          <b className="name">{aboutCompany?.companyLabel ?? 'Мы ИТ-компания'}</b>
          <div className="text block-t">
            {paragraphs.map((paragraph) => (
              <div key={paragraph}>{paragraph}</div>
            ))}
          </div>
        </div>
        <div className="block2">
          <img src={getMediaUrl(aboutCompany?.photo, ABOUT_COMPANY_IMAGES.photo)} />
        </div>
        <div className="block3 text">
          {stats.map((stat) => (
            <div className="block3-cont" key={stat.text}>
              <img src={stat.img} />
              <div>{stat.text}</div>
            </div>
          ))}
        </div>
        <div className="block4 text">
          <h3 className="title_of">{aboutCompany?.officialTitle ?? OFFICIAL_INFO.title}</h3>
          <div className="block4-cont">
            {officialItems.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
