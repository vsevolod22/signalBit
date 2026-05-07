import type { ReactElement } from 'react';

import { getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import { ContactRequestForm } from './ContactRequestForm';
import { CONTACT_IMAGES, PARTNER_LOGOS } from '../model/contacts-data';
import '../styles/callback.scss';

export function ContactSection(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const contacts = siteContent?.contactSetting;
  const partnerLogos = contacts?.partnerLogos?.length
    ? {
        sfedu: getMediaUrl(
          contacts.partnerLogos.find((partner) => partner.code === 'sfedu')?.image,
          PARTNER_LOGOS.sfedu
        ),
        ictis: getMediaUrl(
          contacts.partnerLogos.find((partner) => partner.code === 'ictis')?.image,
          PARTNER_LOGOS.ictis
        ),
        integra: getMediaUrl(
          contacts.partnerLogos.find((partner) => partner.code === 'integra')?.image,
          PARTNER_LOGOS.integra
        ),
      }
    : PARTNER_LOGOS;
  const emailAddress = contacts?.emailAddress ?? 'sigbit@yandex.ru';

  return (
    <div className="callback">
      <div className="left_block">
        <div className="email-block">
          <h3 className="title">{contacts?.questionTitle ?? 'Остались вопросы?'}</h3>
          <div className="email">
            <span>{contacts?.emailLabel ?? 'Напишите нам на почту'}</span>
            <img src={getMediaUrl(contacts?.emailIcon, CONTACT_IMAGES.email)} />
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
          </div>
          <span className="connect">
            {contacts?.responseText ??
              'Мы свяжемся с Вами на следующий рабочий день и ответим на все интересующие вопросы.'}
          </span>
        </div>
        <div className="img-block">
          <img className="right_img" src={getMediaUrl(contacts?.rightImage, CONTACT_IMAGES.rightImage)} />
        </div>
      </div>
      <div className="contact-form-row">
        <div className="contact-form-copy">
          <span>{contacts?.formEyebrow ?? 'Обратная связь'}</span>
          <h3>{contacts?.formTitle ?? 'Расскажите, чем мы можем помочь'}</h3>
          <p>
            {contacts?.formDescription ??
              'Оставьте удобный способ связи и коротко опишите вопрос. Заявка сразу появится в админ-панели Strapi.'}
          </p>
        </div>
        <ContactRequestForm />
      </div>
      <div className="partners">
        <div className="partner_list">
          <h3 className="title">{contacts?.partnersTitle ?? 'Наши партнеры'}</h3>
          <img className="sfedu" src={partnerLogos.sfedu} />
          <img className="ictis" src={partnerLogos.ictis} />
          <img className="integra" src={partnerLogos.integra} />
        </div>
      </div>
    </div>
  );
}
