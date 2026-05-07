import type { ReactElement } from 'react';

import { findProduct, getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import { buildProductParameterColumns, getDescriptionBlocks } from '@/shared/lib/product-content';
import {
  CANARY_PARAMETER_ITEMS,
  CANARY_PRICE_ITEM,
  CANARY_SHOWCASE_IMAGES,
  CANARY_VIDEO,
} from '../model/canary-data';
import '../styles/creations.css';

const fallbackDescriptionBlocks = [
  'Определение конкретного типа БАС позволяет выбрать наилучший сценарий противодействия, а также сделать предположение о том, какую цель преследует нарушитель.',
  'Модуль противодействия реализует сценарии атак на БАС, чтобы предотвратить приченение вреда объекту критической информационной инфраструктуры.',
  'Модульность системы позволяет проводить анализ окружающей среды в режиме реального времени, а также своевременно применять контрмеры для повышения защиты и безопасности защищаемого объекта.',
] as const;

export function ProductCanary(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const product = findProduct(siteContent?.products, 'canary');
  const [leftColumn, rightColumn] = buildProductParameterColumns(
    product,
    CANARY_PARAMETER_ITEMS,
    CANARY_PRICE_ITEM
  );
  const descriptionBlocks = getDescriptionBlocks(product, fallbackDescriptionBlocks);
  const gallery = product?.gallery ?? [];

  return (
    <div className="creations">
      <div className="creation_1">
        <div className="descr">
          <h3 className="title">
            {product?.headline ?? '«Канарейка» для обнаружения аномалий и радиоуправляемых устройств'}
          </h3>
          <p className="top_text">
            <span className="key_word">
              {product?.leadHighlight ??
                'Это интеллектуальная система детектирования и противодействия беспилотным автоматизированным системам (БАС) для объектов критической информационной инфраструктуры.'}
            </span>{' '}
            {product?.leadText ??
              'Система с помощью сенсора сканирует наиболее популярные диапазоны, в которых работают БАС, и на основе анализа радиочастотного диапазона и спектра определяет тип БАС, который был зафиксирован.'}
          </p>
          <div className="img_text">
            <div className="img_text_list">
              {descriptionBlocks.map((block) => (
                <p key={block}>{block}</p>
              ))}
            </div>
            <video autoPlay loop muted playsInline>
              <source src={getMediaUrl(product?.video, CANARY_VIDEO)} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="imgs">
          <img className="top" src={getMediaUrl(gallery[0], CANARY_SHOWCASE_IMAGES.top)} />
          <img className="middle" src={getMediaUrl(gallery[1], CANARY_SHOWCASE_IMAGES.middle)} />
          <img className="bottom" src={getMediaUrl(gallery[2], CANARY_SHOWCASE_IMAGES.bottom)} />
        </div>
      </div>
      <div className="creation_2">
        <h3 className="title">{product?.parametersTitle ?? 'Характерные параметры системы'}</h3>
        <div className="part2-body">
          <div className="part2-column c1">
            {leftColumn.map((item) => (
              <div className="part2-column-cont" key={item.text}>
                <img src={item.img} />
                <div>
                  {item.isPrice ? (
                    <>
                      <b>{product?.priceLabel ?? 'Стоимость продукта'}</b>
                      <br />
                      {item.text}
                    </>
                  ) : (
                    item.text
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="part2-column c2">
            {rightColumn.map((item) => (
              <div className="part2-column-cont" key={item.text}>
                <img src={item.img} />
                <div>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
