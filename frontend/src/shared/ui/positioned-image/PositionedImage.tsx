import type { CSSProperties, ImgHTMLAttributes, ReactElement } from 'react';

import type { ImagePosition } from '@/shared/model/site-content';

interface PositionedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  position?: ImagePosition;
}

function getPositionStyle(position: ImagePosition | undefined): CSSProperties | undefined {
  if (position === undefined) {
    return undefined;
  }

  return {
    translate: `${position.offsetX}px ${position.offsetY}px`,
    scale: String(position.scale / 100),
    transformOrigin: 'center',
  };
}

export function PositionedImage({ alt, position, style, ...imageProps }: PositionedImageProps): ReactElement {
  const positionStyle = getPositionStyle(position);

  return <img alt={alt} {...imageProps} style={positionStyle === undefined ? style : { ...style, ...positionStyle }} />;
}
