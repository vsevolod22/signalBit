const ROUTE_RADIUS = 30;

export interface ElementSize {
  height: number;
  width: number;
}

export type ConnectorSide = 'left' | 'right';
export type SectionRouteVariant = 'left-to-right' | 'right-to-left' | 'wrap-right';

export function createSectionPath(variant: SectionRouteVariant, width: number, height: number): string {
  const radius = Math.min(ROUTE_RADIUS, width / 2, height / 2);

  if (variant === 'wrap-right') {
    return `M 0 0 H ${width - radius} Q ${width} 0 ${width} ${radius} V ${height - radius} Q ${width} ${height} ${width - radius} ${height} H ${radius}`;
  }

  if (variant === 'left-to-right') {
    return `M 0 0 V ${height - radius} Q 0 ${height} ${radius} ${height} H ${width - radius}`;
  }

  return `M ${width} 0 V ${height - radius} Q ${width} ${height} ${width - radius} ${height} H ${radius}`;
}

export function createConnectorPath(side: ConnectorSide, size: ElementSize): string {
  const horizontalInset = Math.min(ROUTE_RADIUS, size.width / 2);
  const horizontalControlInset = horizontalInset * 0.45;
  const verticalControlInset = size.height * 0.45;

  if (side === 'left') {
    return `M ${horizontalInset} 0 C ${horizontalControlInset} 0 0 ${verticalControlInset} 0 ${size.height}`;
  }

  return `M ${size.width - horizontalInset} 0 C ${size.width - horizontalControlInset} 0 ${size.width} ${verticalControlInset} ${size.width} ${size.height}`;
}

export function getViewBoxSize(dimension: number): number {
  return dimension > 0 ? dimension : 1;
}

export function hasRenderableSize(size: ElementSize): boolean {
  return size.width > 0 && size.height > 0;
}
