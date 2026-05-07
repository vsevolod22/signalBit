import type { ReactElement } from 'react';

import { findProduct, getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import { buildProductParameterColumns, getDescriptionBlocks } from '@/shared/lib/product-content';
import {
  FLIGHT_CONTROLLER_IMAGES,
  FLIGHT_CONTROLLER_PARAMETER_ITEMS,
  FLIGHT_CONTROLLER_PRICE_ITEM,
} from '../model/flight-controller-data';
import '../styles/createFC.scss';

const fallbackDescriptionBlocks = [
  'Полетный контроллер выполнен с расчётом на дальнейшую интеграцию в БПЛА с различными системами - для этого разработчикам доступны UART-порты для работы с протоколом MAVLink, GPS-приёмниками, другими внешними датчиками/навигационными системами или исполнительными устройствами.',
  'На плате предусмотрены I2C, SPI порты, что расширяет спектр внешних устройств, которые можно использовать в разработке.',
  'Для управления БПЛА с данным полётным контроллером можно использовать как ручное управление (различные приёмопередатчики на протоколах S-Bus, CRSF (ELRS), так и внешний компьютер-компаньон.',
] as const;

export function FlightControllerProduct(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const product = findProduct(siteContent?.products, 'flight-controller');
  const [leftColumn, rightColumn] = buildProductParameterColumns(
    product,
    FLIGHT_CONTROLLER_PARAMETER_ITEMS,
    FLIGHT_CONTROLLER_PRICE_ITEM
  );
  const descriptionBlocks = getDescriptionBlocks(product, fallbackDescriptionBlocks);
  const gallery = product?.gallery ?? [];

  return (
    <div className="createFC">
      <div className="contSens-part1">
        <div className="column1">
          <h3 className="column1-head">
            {product?.headline ?? 'Полётный контроллер для беспилотных автоматизированных систем'}
          </h3>
          <div className="column1-body">
            <div>
              <b>
                {product?.leadHighlight ??
                  'Это электронное устройство, управляющее полетом летательного аппарата, с собственным микропрограммным обеспечением.'}{' '}
              </b>
              {product?.leadText ??
                'Контроллер выполнен в модульной архитектуре - инерциальное измерительное устройство вынесено в отдельный виброразвязанный блок, что позволяет улучшить качество стабилизации и навигации.'}
            </div>
            <div className="column1-body-content">
              <div className="column1-body-content-text">
                {descriptionBlocks.map((block) => (
                  <div className="short-text" key={block}>
                    {block}
                  </div>
                ))}
              </div>
              <div className="column1-body-content-img">
                <img src={getMediaUrl(gallery[3], FLIGHT_CONTROLLER_IMAGES.controller)} />
              </div>
            </div>
          </div>
        </div>

        <div className="column2">
          <img src={getMediaUrl(gallery[0], FLIGHT_CONTROLLER_IMAGES.first)} />
          <img src={getMediaUrl(gallery[1], FLIGHT_CONTROLLER_IMAGES.second)} />
          <img src={getMediaUrl(gallery[2], FLIGHT_CONTROLLER_IMAGES.third)} />
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
