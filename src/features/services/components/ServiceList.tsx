import type { ReactElement } from 'react';

import { SERVICE_ITEMS } from '../model/services-data';
import '../styles/priceList.scss';

export function ServiceList(): ReactElement {
  return (
    <div className="price">
      <h3 className="title">Что мы предлагаем</h3>
      <ul className="list">
        {SERVICE_ITEMS.map((item) => (
          <li key={item.title}>
            <img src={item.img} />
            <div className="descr">
              <h2 className="name">{item.title}</h2>
              <p className="text_d">{item.description}</p>
              <p className="text_h">Используемые технологии</p>
              <p className="text_u">{item.technologies}</p>
              <p className="text_h">Стоимость</p>
              <p className="text_u">{item.cost}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
