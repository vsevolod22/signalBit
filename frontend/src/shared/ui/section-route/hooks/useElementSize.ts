import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

import type { ElementSize } from '@/shared/ui/section-route/model/route-paths';

export function useElementSize(): [RefObject<SVGSVGElement>, ElementSize] {
  const elementRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<ElementSize>({ height: 0, width: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (element === null) {
      return undefined;
    }

    const updateSize = (): void => {
      const bounds = element.getBoundingClientRect();
      setSize({ height: bounds.height, width: bounds.width });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [elementRef, size];
}
