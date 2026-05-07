import type { ReactElement } from 'react';

import { getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import { HERO_IMAGES } from '../model/hero-assets';
import '../styles/main.css';

export function MainHero(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const hero = siteContent?.hero;

  return (
    <div className="main">
      <img className="main_logo" src={getMediaUrl(hero?.logo, HERO_IMAGES.logo)} />
      <div className="block_1">
        <div className="descr">
          <h3>{hero?.title ?? 'Ваш надежный партнер в безопасности'}</h3>
          <span>
            {hero?.description ??
              'Мы специализируемся на обеспечении безопасности в области робототехники и киберфизических систем. Наша команда разрабатывает интегрированные решения, которые помогают предотвратить риски и обеспечить безопасность во всех аспектах работы с роботехническими комплексами.'}
          </span>
        </div>
        <img src={getMediaUrl(hero?.rightHand, HERO_IMAGES.rightHand)} />
      </div>
      <div className="block_2">
        <img src={getMediaUrl(hero?.leftHand, HERO_IMAGES.leftHand)} />
        <div className="descr">
          <h3>
            {hero?.secondaryTitle ??
              'Наша цель – обеспечить бесперебойное функционирование и безопасность критической инфраструктуры и киберфизических систем'}
          </h3>
          <span>
            {hero?.secondaryDescription ??
              'С нами вы можете быть уверены в надежной работе своих активов. Мы ставим безопасность на первое место и стремимся быть вашим надежным партнером в области безопасности робототехники.'}
          </span>
        </div>
      </div>
    </div>
  );
}
