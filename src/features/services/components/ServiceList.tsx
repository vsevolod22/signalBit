import type { ReactElement } from 'react';

import { getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import { SERVICE_ITEMS } from '../model/services-data';
import '../styles/priceList.scss';

export function ServiceList(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const setting = siteContent?.serviceSetting;
  const services = siteContent?.services?.length
    ? siteContent.services.map((item, index) => ({
        img: getMediaUrl(item.image, SERVICE_ITEMS[index]?.img ?? SERVICE_ITEMS[0].img),
        title: item.title ?? SERVICE_ITEMS[index]?.title ?? '',
        description: item.description ?? SERVICE_ITEMS[index]?.description ?? '',
        technologies: item.technologies ?? SERVICE_ITEMS[index]?.technologies ?? '',
        cost: item.cost ?? SERVICE_ITEMS[index]?.cost ?? '',
      }))
    : SERVICE_ITEMS;

  return (
    <div className="price">
      <h3 className="title">{setting?.sectionTitle ?? 'Что мы предлагаем'}</h3>
      <ul className="list">
        {services.map((item) => (
          <li key={item.title}>
            <img src={item.img} />
            <div className="descr">
              <h2 className="name">{item.title}</h2>
              <p className="text_d">{item.description}</p>
              <p className="text_h">{setting?.technologiesLabel ?? 'Используемые технологии'}</p>
              <p className="text_u">{item.technologies}</p>
              <p className="text_h">{setting?.costLabel ?? 'Стоимость'}</p>
              <p className="text_u">{item.cost}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
