import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { useEffect, useId, useState } from 'react';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { fadeUpVariants, headerEntranceVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import { MotionLink } from '@/shared/ui/link/MotionLink';
import { PositionedImage } from '@/shared/ui/positioned-image/PositionedImage';
import './site-header.scss';

export function SiteHeader(): ReactElement {
  const { content } = useSiteContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      className="site-header"
      aria-label="Главная навигация"
      initial={false}
      animate="visible"
      variants={headerEntranceVariants}
    >
      <MotionLink
        className="site-header__brand"
        href="#top"
        aria-label="СИГНАЛ-БИТ"
        interaction="brand"
        onClick={closeMenu}
      >
        <PositionedImage
          src={content.navigation.logo}
          position={content.navigation.logoPosition}
          alt="СИГНАЛ-БИТ — безопасность и робототехника"
          width="3091"
          height="484"
        />
      </MotionLink>
      <button
        className={`site-header__menu-toggle${isMenuOpen ? ' site-header__menu-toggle--open' : ''}`}
        type="button"
        aria-controls={menuId}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        onClick={() => setIsMenuOpen((menuOpen) => !menuOpen)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <div className={`site-header__menu${isMenuOpen ? ' site-header__menu--open' : ''}`} id={menuId}>
        <motion.nav
          className="site-header__nav"
          aria-label="Разделы сайта"
          initial="hidden"
          animate="visible"
          variants={pageSectionVariants}
        >
          {content.navigation.links.map((link) => (
            <MotionLink
              href={link.href}
              key={link.href}
              variants={fadeUpVariants}
              interaction="lift"
              onClick={closeMenu}
            >
              {link.label}
            </MotionLink>
          ))}
        </motion.nav>
        <MotionLink className="site-header__contact" href="#contacts" interaction="cta" onClick={closeMenu}>
          {content.navigation.contactLabel}
        </MotionLink>
      </div>
    </motion.header>
  );
}
