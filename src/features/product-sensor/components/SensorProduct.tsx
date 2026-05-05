import type { ReactElement } from 'react';

import {
  SENSOR_INTRO_IMAGES,
  SENSOR_PARAMETER_COLUMNS,
  SENSOR_PRODUCT_IMAGES,
} from '../model/sensor-data';
import '../styles/createSensor.scss';

export function SensorProduct(): ReactElement {
  const [leftColumn, rightColumn] = SENSOR_PARAMETER_COLUMNS;

  return (
    <div className="createSensor">
      <div className="contSens-part1">
        <div className="column1">
          <div className="column1-head">
            <b>
              Сенсор для обнаружения
              <br />
              радиоуправлемых устройств
            </b>
          </div>
          <div className="column1-body">
            <div>
              <b>
                Это программно-аппаратное устройство для детектирования беспилотных
                автоматизированных систем (БАС) и других радиоуправляемых устройств.{' '}
              </b>
              Устройство с помощью сенсора анализарует радиочастотный спектр путем прохождения по
              каждой частоте по несколько итераций в зависимости от наличия сигнала, а алгоритм
              обнаружения позволяет идентифицировать зафиксированную частоту.
            </div>
            <div className="column1-body-content">
              <div className="column1-body-content-text">
                <div>Устройство сканирует диапазоны частот 820-920 МГц, 2,4-2,485 ГГц, 5,6-5,9 ГГц. </div>
                <div className="short-text">
                  На каждом канале проводится обработка сигнала, который отображается как в консоли,
                  так и на столбчатой диаграмме, выводящейся на дисплей.
                </div>
                <div className="short-text">
                  При обнаружении сигнала срабатывает зуммер, который издает звуковой сигнал,
                  предупреждающий о наличии активности на данном радиочастотном диапазоне.
                </div>
                <div className="short-text">
                  Ключевой особенностью алгоритма анализа радиочастотного спектра является гибкое
                  взаимодействие с пользователем благодаря возможности смены режимов через нажатие
                  кнопок и свето-звуковому сопровождению опасности БАС.
                </div>
              </div>
              <div className="column1-body-content-img">
                <img src={SENSOR_PRODUCT_IMAGES.first} />
                <img src={SENSOR_PRODUCT_IMAGES.second} />
              </div>
            </div>
          </div>
        </div>

        <div className="column2">
          <img src={SENSOR_INTRO_IMAGES.first} />
          <img src={SENSOR_INTRO_IMAGES.second} />
          <img src={SENSOR_INTRO_IMAGES.third} />
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
