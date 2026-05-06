import type { ReactElement } from 'react';

import { ContactRequestForm } from './ContactRequestForm';
import { CONTACT_IMAGES, PARTNER_LOGOS } from '../model/contacts-data';
import '../styles/callback.scss';

export function ContactSection(): ReactElement {
  return (
    <div className="callback">
      <div className="left_block">
        <div className="email-block">
          <h3 className="title">Остались вопросы?</h3>
          <div className="email">
            <span>Напишите нам на почту</span>
            <img src={CONTACT_IMAGES.email} />
            <a href="mailto:sigbit@yandex.ru">sigbit@yandex.ru</a>
          </div>
          <span className="connect">
            Мы свяжемся с Вами на следующий рабочий день и ответим на все интересующие вопросы.
          </span>
        </div>
        <div className="img-block">
          <img className="right_img" src={CONTACT_IMAGES.rightImage} />
        </div>
      </div>
      <ContactRequestForm />
      <div className="partners">
        <div className="partner_list">
          <h3 className="title">Наши партнеры</h3>
          <img className="sfedu" src={PARTNER_LOGOS.sfedu} />
          <img className="ictis" src={PARTNER_LOGOS.ictis} />
          <img className="integra" src={PARTNER_LOGOS.integra} />
        </div>
      </div>
    </div>
  );
}
