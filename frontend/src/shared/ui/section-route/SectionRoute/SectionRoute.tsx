import type { ReactElement } from 'react';

import { useElementSize } from '@/shared/ui/section-route/hooks/useElementSize';
import type { ConnectorSide, SectionRouteVariant } from '@/shared/ui/section-route/model/route-paths';
import {
  createConnectorPath,
  createSectionPath,
  getViewBoxSize,
  hasRenderableSize,
} from '@/shared/ui/section-route/model/route-paths';

import './section-route.scss';

interface SectionRouteProps {
  className: string;
  variant: SectionRouteVariant;
}

export function SectionRoute({ className, variant }: SectionRouteProps): ReactElement {
  const [routeRef, size] = useElementSize();
  const routePath = createSectionPath(variant, size.width, size.height);
  const canRenderPath = hasRenderableSize(size);

  return (
    <svg
      ref={routeRef}
      className={`section-route ${className}`}
      viewBox={`0 0 ${getViewBoxSize(size.width)} ${getViewBoxSize(size.height)}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {canRenderPath && <path className="section-route__path" d={routePath} />}
    </svg>
  );
}

export function RouteConnector({ side }: { side: ConnectorSide }): ReactElement {
  const [connectorRef, size] = useElementSize();
  const path = createConnectorPath(side, size);
  const canRenderPath = hasRenderableSize(size);

  return (
    <svg
      ref={connectorRef}
      className={`route-connector route-connector--${side}`}
      viewBox={`0 0 ${getViewBoxSize(size.width)} ${getViewBoxSize(size.height)}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {canRenderPath && <path className="section-route__path" d={path} />}
    </svg>
  );
}
