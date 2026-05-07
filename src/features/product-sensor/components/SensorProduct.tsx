import type { ReactElement } from 'react';

import { findProduct, getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import { buildProductParameterColumns, getDescriptionBlocks } from '@/shared/lib/product-content';
import {
  SENSOR_INTRO_IMAGES,
  SENSOR_PARAMETER_ITEMS,
  SENSOR_PRICE_ITEM,
  SENSOR_PRODUCT_IMAGES,
} from '../model/sensor-data';
import '../styles/createSensor.scss';

const fallbackDescriptionBlocks = [
  'Устройство сканирует диапазоны частот 820-920 МГц, 2,4-2,485 ГГц, 5,6-5,9 ГГц.',
  'На каждом канале проводится обработка сигнала, который отображается как в консоли, так и на столбчатой диаграмме, выводящейся на дисплей.',
  'При обнаружении сигнала срабатывает зуммер, который издает звуковой сигнал, предупреждающий о наличии активности на данном радиочастотном диапазоне.',
  'Ключевой особенностью алгоритма анализа радиочастотного спектра является гибкое взаимодействие с пользователем благодаря возможности смены режимов через нажатие кнопок и свето-звуковому сопровождению опасности БАС.',
] as const;

export function SensorProduct(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const product = findProduct(siteContent?.products, 'sensor');
  const [leftColumn, rightColumn] = buildProductParameterColumns(
    product,
    SENSOR_PARAMETER_ITEMS,
    SENSOR_PRICE_ITEM
  );
  const descriptionBlocks = getDescriptionBlocks(product, fallbackDescriptionBlocks);
  const gallery = product?.gallery ?? [];

  return (
    <div className="createSensor">
      <div className="contSens-part1">
        <div className="column1">
          <h3 className="column1-head">
            {product?.headline ?? 'Сенсор для обнаружения радиоуправлемых устройств'}
          </h3>
          <div className="column1-body">
            <div>
              <b>
                {product?.leadHighlight ??
                  'Это программно-аппаратное устройство для детектирования беспилотных автоматизированных систем (БАС) и других радиоуправляемых устройств.'}{' '}
              </b>
              {product?.leadText ??
                'Устройство с помощью сенсора анализарует радиочастотный спектр путем прохождения по каждой частоте по несколько итераций в зависимости от наличия сигнала, а алгоритм обнаружения позволяет идентифицировать зафиксированную частоту.'}
            </div>
            <div className="column1-body-content">
              <div className="column1-body-content-text">
                {descriptionBlocks.map((block, index) => (
                  <div className={index === 0 ? undefined : 'short-text'} key={block}>
                    {block}
                  </div>
                ))}
              </div>
              <div className="column1-body-content-img">
                <img src={getMediaUrl(gallery[3], SENSOR_PRODUCT_IMAGES.first)} />
                <img src={getMediaUrl(gallery[4], SENSOR_PRODUCT_IMAGES.second)} />
              </div>
            </div>
          </div>
        </div>

        <div className="column2">
          <img src={getMediaUrl(gallery[0], SENSOR_INTRO_IMAGES.first)} />
          <img src={getMediaUrl(gallery[1], SENSOR_INTRO_IMAGES.second)} />
          <img src={getMediaUrl(gallery[2], SENSOR_INTRO_IMAGES.third)} />
        </div>
      </div>
      <div className="contSens">
        <h3 className="part2-head">{product?.parametersTitle ?? 'Характерные параметры системы'}</h3>
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
