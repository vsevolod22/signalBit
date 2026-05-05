import type { ReactElement } from 'react';

import {
  ABOUT_COMPANY_IMAGES,
  ABOUT_COMPANY_PARAGRAPHS,
  ABOUT_COMPANY_STATS,
  MOBILE_OFFICIAL_INFO,
} from '@/features/about-company';
import { MOBILE_ACHIEVEMENT_ROWS } from '@/features/achievements';
import { ACTIVITY_FIELDS } from '@/features/activity-fields';
import { CONTACT_IMAGES, PARTNER_LOGOS } from '@/features/contacts';
import { HERO_IMAGES } from '@/features/main-hero';
import {
  CANARY_PARAMETER_ITEMS,
  CANARY_PRICE_ITEM,
  CANARY_SHOWCASE_IMAGES,
  CANARY_VIDEO,
} from '@/features/product-canary';
import {
  FLIGHT_CONTROLLER_IMAGES,
  FLIGHT_CONTROLLER_PARAMETER_ITEMS,
  FLIGHT_CONTROLLER_PRICE_ITEM,
} from '@/features/product-flight-controller';
import {
  SENSOR_INTRO_IMAGES,
  SENSOR_PARAMETER_ITEMS,
  SENSOR_PRICE_ITEM,
  SENSOR_PRODUCT_IMAGES,
} from '@/features/product-sensor';
import { SERVICE_ITEMS } from '@/features/services';

import signalBit from '../assets/signal_bit.png';
import '../styles/mobileVersion.scss';

interface MobileParameter {
  img: string;
  text: string;
}

interface MobileParameterListProps {
  items: readonly MobileParameter[];
  priceItem: MobileParameter;
}

function MobileParameterList({ items, priceItem }: MobileParameterListProps): ReactElement {
  return (
    <div className="params">
      <h3 className="title">Характерные параметры системы</h3>
      {items.map((item) => (
        <div key={item.text} className="item">
          <img src={item.img} />
          <p>{item.text}</p>
        </div>
      ))}
      <div className="item">
        <img src={priceItem.img} />
        <p>
          <b>Стоимость продукта</b>
          <br />
          {priceItem.text}
        </p>
      </div>
    </div>
  );
}

export function MobileHomePage(): ReactElement {
  const flightControllerMobilePrice = {
    img: SENSOR_PRICE_ITEM.img,
    text: FLIGHT_CONTROLLER_PRICE_ITEM.text,
  };

  return (
    <div className="mobile">
      <img className="main_logo" src={signalBit} />
      <div className="right_hand">
        <div className="text">
          <h3 className="title">Ваш надежный партнер в безопасности</h3>
          <p>
            Мы специализируемся на обеспечении безопасности в области робототехники и киберфизических
            систем. Наша команда разрабатывает интегрированные решения, которые помогают
            предотвратить риски и обеспечить безопасность во всех аспектах работы с роботехническими
            комплексами.
          </p>
        </div>
        <img src={HERO_IMAGES.rightHand} />
      </div>
      <div className="left_hand">
        <div>
          <img src={HERO_IMAGES.leftHand} />
          <h3 className="title">
            Наша цель – обеспечить бесперебойное функционирование и безопасность критической
            инфраструктуры и киберфизических систем
          </h3>
        </div>
        <p>
          С нами вы можете быть уверены в надежной работе своих активов. Мы ставим безопасность на
          первое место и стремимся быть вашим надежным партнером в области безопасности
          робототехники.
        </p>
      </div>
      <div className="research">
        <h3 className="title">Чем мы занимаемся</h3>
        {ACTIVITY_FIELDS.map((field) => (
          <div className="item" key={field.title}>
            <img src={field.img} />
            <div>
              <h3>{field.title}</h3>
              <p>{field.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="price_mob">
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
      <div className="squeaker">
        <h3 className="title">«Канарейка» для обнаружения аномалий и радиоуправляемых устройств</h3>
        <div className="imgs">
          <img className="left" src={CANARY_SHOWCASE_IMAGES.top} />
          <img className="middle" src={CANARY_SHOWCASE_IMAGES.middle} />
          <img className="right" src={CANARY_SHOWCASE_IMAGES.bottom} />
        </div>
        <p>
          <span className="key_word">
            Это интеллектуальная система детектирования и противодействия беспилотным
            автоматизированным системам (БАС) для объектов критической информационной инфраструктуры.
          </span>{' '}
          Система с помощью сенсора сканирует наиболее популярные диапазоны, в которых работают БАС,
          и на основе анализа радиочастотного дисапазона и спектра определяет тип БАС, который был
          зафиксирован.
        </p>
        <p>
          Определение конкретного типа БАС позволяет выбрать наилучший сценарий противодействия, а
          также сделать предположение о том, какую цель преследует нарушитель.
        </p>
        <p>
          Модуль противодействия реализует сценарии атак на БАС, чтобы предотвратить приченение вреда
          объекту критической информационной инфраструктуры.
        </p>
        <p>
          Модульность системы позволяет проводить анализ окружающей среды в режиме реального времени,
          а также своевременно применять контрмеры для повышения защиты и безопасности защищаемого
          объекта.
        </p>
      </div>
      <video className="demonstration" preload="auto" autoPlay loop muted playsInline>
        <source src={CANARY_VIDEO} type="video/mp4" />
      </video>
      <MobileParameterList items={CANARY_PARAMETER_ITEMS} priceItem={CANARY_PRICE_ITEM} />

      <div className="squeaker">
        <h3 className="title">Сенсор для обнаружения радиоуправлемых устройств</h3>
        <div className="imgs">
          <img className="left" src={SENSOR_INTRO_IMAGES.first} />
          <img className="middle" src={SENSOR_INTRO_IMAGES.second} />
          <img className="right" src={SENSOR_INTRO_IMAGES.third} />
        </div>
        <p>
          <span className="key_word">
            Это программно-аппаратное устройство для детектирования беспилотных автоматизированных
            систем (БАС) и других радиоуправляемых устройств.{' '}
          </span>
          Устройство с помощью сенсора анализарует радиочастотный спектр путем прохождения по каждой
          частоте по несколько итераций в зависимости от наличия сигнала, а алгоритм обнаружения
          позволяет идентифицировать зафиксированную частоту.
        </p>
        <p>Устройство сканирует диапазоны частот 820-920 МГц, 2,4-2,485 ГГц, 5,6-5,9 ГГц.</p>
        <p>
          На каждом канале проводится обработка сигнала, который отображается как в консоли, так и на
          столбчатой диаграмме, выводящейся на дисплей.
        </p>
        <p>
          При обнаружении сигнала срабатывает зуммер, который издает звуковой сигнал, предупреждающий
          о наличии активности на данном радиочастотном диапазоне.
        </p>
        <p>
          Ключевой особенностью алгоритма анализа радиочастотного спектра является гибкое
          взаимодействие с пользователем благодаря возможности смены режимов через нажатие кнопок и
          свето-звуковому сопровождению опасности БАС.-
        </p>
      </div>
      <div className="img-cont">
        <img src={SENSOR_PRODUCT_IMAGES.first} />
        <img src={SENSOR_PRODUCT_IMAGES.second} />
      </div>
      <MobileParameterList items={SENSOR_PARAMETER_ITEMS} priceItem={SENSOR_PRICE_ITEM} />

      <div className="squeaker">
        <h3 className="title">Сенсор для обнаружения радиоуправлемых устройств</h3>
        <div className="imgs">
          <img className="left" src={FLIGHT_CONTROLLER_IMAGES.first} />
          <img className="middle" src={FLIGHT_CONTROLLER_IMAGES.second} />
          <img className="right" src={FLIGHT_CONTROLLER_IMAGES.third} />
        </div>
        <p>
          <span className="key_word">
            Это электронное устройство, управляющее полетом летательного аппарата, с собственным
            микропрограммным обеспечением.{' '}
          </span>
          Контроллер выполнен в модульной архитектуре - инерциальное измерительное устройство
          вынесено в отдельный виброразвязанный блок, что позволяет улучшить качество стабилизации и
          навигации.
        </p>
        <p>
          Полетный контроллер выполнен с расчётом на дальнейшую интеграцию в БПЛА с различными
          системами - для этого разработчикам доступны UART-порты для работы с протоколом MAVLink,
          GPS-приёмниками, другими внешними датчиками/навигационными системами или исполнительными
          устройствами. На плате предусмотрены I2C, SPI порты, что расширяет спектр внешних
          устройств, которые можно использовать в разработке.
        </p>
        <p>
          Для управления БПЛА с данным полётным контроллером можно использовать как ручное управление
          (различные приёмопередатчики на протоколах S-Bus, CRSF (ELRS), так и внешний
          компьютер-компаньон.
        </p>
      </div>
      <div className="img-cont">
        <img src={FLIGHT_CONTROLLER_IMAGES.controller} />
      </div>
      <MobileParameterList
        items={FLIGHT_CONTROLLER_PARAMETER_ITEMS}
        priceItem={flightControllerMobilePrice}
      />

      <div className="AboutUs">
        <h3 className="title">Наша миссия – создавать безопасные технологичные решения</h3>
        <div>
          <img src={ABOUT_COMPANY_IMAGES.photo} />
        </div>
        <div className="aboutUs-text">
          <b className="name">Мы ИТ-компания</b>
          {ABOUT_COMPANY_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="block3 text">
          {ABOUT_COMPANY_STATS.map((stat) => (
            <div className="block3-cont" key={stat.text}>
              <img src={stat.img} />
              <div>{stat.text}</div>
            </div>
          ))}
        </div>
        <div className="official_info">
          <h3 className="title_of">{MOBILE_OFFICIAL_INFO.title}</h3>
          {MOBILE_OFFICIAL_INFO.items.map((item) => (
            <p className="item_of" key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="Achivment">
        <h3 className="title">Наши достижения</h3>
        <div className="content">
          {MOBILE_ACHIEVEMENT_ROWS.map((row) => (
            <div className="achiv-block" key={row.join('-')}>
              {row.map((image) => (
                <img src={image} key={image} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="contacts">
        <h3 className="title">Остались вопросы?</h3>
        <div className="email">
          <span>Напишите нам на почту</span>
          <img src={CONTACT_IMAGES.email} />
          <a href="mailto:sigbit@yandex.ru">sigbit@yandex.ru</a>
        </div>
        <p className="to_user">
          Мы свяжемся с вами на следующий рабочий день и ответим на все интересующие вопросы.
        </p>
      </div>
      <img className="last_img" src={CONTACT_IMAGES.rightImage} />
      <div className="partners">
        <h3 className="title">Наши партнеры</h3>
        <img src={PARTNER_LOGOS.sfedu} className="sfedu" />
        <img src={PARTNER_LOGOS.ictis} className="ictis" />
        <img src={PARTNER_LOGOS.integra} className="integra" />
      </div>

      <p className="footer">
        Проект выполнен при поддержке Фонда содействия развитию малых форм предприятий в
        научно-технической сфере
      </p>
    </div>
  );
}
