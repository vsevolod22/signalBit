import type { ReactElement } from 'react';

import {
  CANARY_PARAMETER_COLUMNS,
  CANARY_SHOWCASE_IMAGES,
  CANARY_VIDEO,
} from '../model/canary-data';
import '../styles/creations.css';

export function ProductCanary(): ReactElement {
  const [leftColumn, rightColumn] = CANARY_PARAMETER_COLUMNS;

  return (
    <div className="creations">
      <div className="creation_1">
        <div className="descr">
          <h3 className="title">«Канарейка» для обнаружения аномалий и радиоуправляемых устройств</h3>
          <p className="top_text">
            <span className="key_word">
              Это интеллектуальная система детектирования и противодействия беспилотным
              автоматизированным системам (БАС) для объектов критической информационной
              инфраструктуры.
            </span>{' '}
            Система с помощью сенсора сканирует наиболее популярные диапазоны, в которых работают
            БАС, и на основе анализа радиочастотного диапазона и спектра определяет тип БАС, который
            был зафиксирован.
          </p>
          <div className="img_text">
            <div className="img_text_list">
              <p>
                Определение конкретного типа БАС позволяет выбрать наилучший сценарий
                противодействия, а также сделать предположение о том, какую цель преследует
                нарушитель.
              </p>
              <p>
                Модуль противодействия реализует сценарии атак на БАС, чтобы предотвратить
                приченение вреда объекту критической информационной инфраструктуры.
              </p>
              <p>
                Модульность системы позволяет проводить анализ окружающей среды в режиме реального
                времени, а также своевременно применять контрмеры для повышения защиты и безопасности
                защищаемого объекта.
              </p>
            </div>
            <video autoPlay loop muted>
              <source src={CANARY_VIDEO} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="imgs">
          <img className="top" src={CANARY_SHOWCASE_IMAGES.top} />
          <img className="middle" src={CANARY_SHOWCASE_IMAGES.middle} />
          <img className="bottom" src={CANARY_SHOWCASE_IMAGES.bottom} />
        </div>
      </div>
      <div className="creation_2">
        <h3 className="title">Характерные параметры системы</h3>
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
