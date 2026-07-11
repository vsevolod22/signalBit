const ROUTE_RADIUS = 30;

export interface ElementSize {
  height: number;
  width: number;
}

export type ConnectorSide = 'left' | 'right';

export function createSectionPath(className: string, width: number, height: number): string {
  const radius = Math.min(ROUTE_RADIUS, width / 2, height / 2);
  const isServicesRoute = className.includes('services-route');
  const isLeftOpeningRoute = className.includes('development-route') || className.includes('about-route');

  if (isServicesRoute) {
    return `M 0 0 H ${width - radius} Q ${width} 0 ${width} ${radius} V ${height - radius} Q ${width} ${height} ${width - radius} ${height} H ${radius}`;
  }

  if (isLeftOpeningRoute) {
    return `M 0 0 V ${height - radius} Q 0 ${height} ${radius} ${height} H ${width - radius}`;
  }

  return `M ${width} 0 V ${height - radius} Q ${width} ${height} ${width - radius} ${height} H ${radius}`;
}

export function createConnectorPath(side: ConnectorSide, size: ElementSize): string {
  const radius = Math.min(ROUTE_RADIUS, size.width / 2, size.height);
  if (side === 'left') {
    return `M ${radius} 0 Q 0 0 0 ${radius} V ${size.height}`;
  }

  return `M ${size.width - radius} 0 Q ${size.width} 0 ${size.width} ${radius} V ${size.height}`;
}

export function getViewBoxSize(dimension: number): number {
  return dimension > 0 ? dimension : 1;
}

export function hasRenderableSize(size: ElementSize): boolean {
  return size.width > 0 && size.height > 0;
}
