import type { ReactElement } from 'react';

import { HERO_IMAGES } from '../model/hero-assets';
import '../styles/main.css';

export function MainHero(): ReactElement {
  return (
    <div className="main">
      <img className="main_logo" src={HERO_IMAGES.logo} />
      <div className="block_1">
        <div className="descr">
          <h3>Ваш надежный партнер в безопасности</h3>
          <span>
            Мы специализируемся на обеспечении безопасности в области робототехники и
            киберфизических систем. Наша команда разрабатывает интегрированные решения, которые
            помогают предотвратить риски и обеспечить безопасность во всех аспектах работы с
            роботехническими комплексами.
          </span>
        </div>
        <img src={HERO_IMAGES.rightHand} />
      </div>
      <div className="block_2">
        <img src={HERO_IMAGES.leftHand} />
        <div className="descr">
          <h3>
            Наша цель – обеспечить бесперебойное функционирование и безопасность критической
            инфраструктуры и киберфизических систем
          </h3>
          <span>
            С нами вы можете быть уверены в надежной работе своих активов. Мы ставим безопасность
            на первое место и стремимся быть вашим надежным партнером в области безопасности
            робототехники.
          </span>
        </div>
      </div>
    </div>
  );
}
