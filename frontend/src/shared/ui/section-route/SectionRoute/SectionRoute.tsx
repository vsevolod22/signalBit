import type { ReactElement } from 'react';

import './section-route.scss';

interface SectionRouteProps {
  className: string;
  path: string;
}

export function SectionRoute({ className }: SectionRouteProps): ReactElement {
  return (
    <div className={`section-route ${className}`} aria-hidden="true">
      <span className="route-segment route-segment--top" />
      <span className="route-segment route-segment--right" />
      <span className="route-segment route-segment--bottom" />
      <span className="route-segment route-segment--left" />
    </div>
  );
}

interface RouteConnectorProps {
  side: 'left' | 'right';
}

export function RouteConnector({ side }: RouteConnectorProps): ReactElement {
  return <div className={`route-connector route-connector--${side}`} aria-hidden="true" />;
}
