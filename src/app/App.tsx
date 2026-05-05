import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';

import { DESKTOP_SECTIONS, isDesktopSectionIndex } from './model/desktop-sections';
import type { DesktopSectionIndex } from './model/desktop-sections';
import { isDesktopUserAgent } from './model/device';
import './styles/App.css';
import './styles/mixin.scss';

import { MobileHomePage } from '@/pages/mobile-home';
import { SiteFooter } from '@/features/site-footer';
import { SiteHeader } from '@/features/site-navigation';

const DEFAULT_SECTION_INDEX: DesktopSectionIndex = 0;

function getInitialIsDesktop(): boolean {
  if (typeof navigator === 'undefined') {
    return true;
  }

  return isDesktopUserAgent(navigator.userAgent);
}

export function App(): ReactElement {
  const [activeSectionIndex, setActiveSectionIndex] =
    useState<DesktopSectionIndex>(DEFAULT_SECTION_INDEX);
  const isDesktop = useMemo(getInitialIsDesktop, []);

  const changeSection = (sectionIndex: number): void => {
    if (isDesktopSectionIndex(sectionIndex)) {
      setActiveSectionIndex(sectionIndex);
    }
  };

  return (
    <div className={`app ${isDesktop ? '' : 'mobile'}`}>
      {isDesktop ? (
        <div>
          <SiteHeader onSectionChange={changeSection} />
          {DESKTOP_SECTIONS[activeSectionIndex]}
          <SiteFooter />
        </div>
      ) : (
        <MobileHomePage />
      )}
    </div>
  );
}

export default App;
