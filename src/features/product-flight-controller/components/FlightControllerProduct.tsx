import type { ReactElement } from 'react';

import {
  FLIGHT_CONTROLLER_IMAGES,
  FLIGHT_CONTROLLER_PARAMETER_COLUMNS,
} from '../model/flight-controller-data';
import '../styles/createFC.scss';

export function FlightControllerProduct(): ReactElement {
  const [leftColumn, rightColumn] = FLIGHT_CONTROLLER_PARAMETER_COLUMNS;

  return (
    <div className="createFC">
      <div className="contSens-part1">
        <div className="column1">
          <div className="column1-head">
            <b>Полётный контроллер для беспилотных автоматизированных систем</b>
          </div>
          <div className="column1-body">
            <div>
              <b>
                Это электронное устройство, управляющее полетом летательного аппарата, с собственным
                микропрограммным обеспечением.{' '}
              </b>
              Контроллер выполнен в модульной архитектуре - инерциальное измерительное устройство
              вынесено в отдельный виброразвязанный блок, что позволяет улучшить качество
              стабилизации и навигации.
            </div>
            <div className="column1-body-content">
              <div className="column1-body-content-text">
                <div className="short-text">
                  Полетный контроллер выполнен с расчётом на дальнейшую интеграцию в БПЛА с
                  различными системами - для этого разработчикам доступны UART-порты для работы с
                  протоколом MAVLink, GPS-приёмниками, другими внешними датчиками/навигационными
                  системами или исполнительными устройствами.
                </div>
                <div className="short-text">
                  На плате предусмотрены I2C, SPI порты, что расширяет спектр внешних устройств,
                  которые можно использовать в разработке.
                </div>
                <div className="short-text">
                  Для управления БПЛА с данным полётным контроллером можно использовать как ручное
                  управление (различные приёмопередатчики на протоколах S-Bus, CRSF (ELRS), так и
                  внешний компьютер-компаньон.
                </div>
              </div>
              <div className="column1-body-content-img">
                <img src={FLIGHT_CONTROLLER_IMAGES.controller} />
              </div>
            </div>
          </div>
        </div>

        <div className="column2">
          <img src={FLIGHT_CONTROLLER_IMAGES.first} />
          <img src={FLIGHT_CONTROLLER_IMAGES.second} />
          <img src={FLIGHT_CONTROLLER_IMAGES.third} />
        </div>
      </div>
      <div className="contSens">
        <div className="part2-head">
          <b>Характерные параметры устройства</b>
        </div>
        <div className="part2-body">
          <div className="part2-column c1">
            {leftColumn.map((item) => (
              <div className="part2-column-cont" key={item.text}>
                <img src={item.img} />
                <div>
                  {item.isPrice ? (
                    <>
                      <b>Стоимость продукта</b>
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
